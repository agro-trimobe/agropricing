// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as SibApiV3Sdk from '@getbrevo/brevo';
import { BREVO_CONFIG, FormSubmission, isValidEmail, isValidPhone } from '@/config/brevo';

export async function POST(request: NextRequest) {
  try {
    const formData: FormSubmission = await request.json();
    
    // Validação básica dos campos obrigatórios
    if (!formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação do formato do email
    if (!isValidEmail(formData.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validação do formato do telefone
    if (!isValidPhone(formData.phone)) {
      return NextResponse.json(
        { error: 'Telefone inválido. Use o formato (11) 99999-9999' },
        { status: 400 }
      );
    }

    // Verificar se a API key está configurada
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY não configurada');
      return NextResponse.json(
        { error: 'Configuração de email não encontrada' },
        { status: 500 }
      );
    }

    // Configurar API Brevo
    const apiInstance = new SibApiV3Sdk.ContactsApi();
    apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    // Criar contato na lista
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = formData.email;
    
    // Formatar número de WhatsApp para formato internacional
    const formatWhatsApp = (phone: string): string => {
      // Remove todos os caracteres não numéricos
      const cleanPhone = phone.replace(/\D/g, '');
      
      // Se já começa com 55, manter como está
      if (cleanPhone.startsWith('55')) {
        return `+${cleanPhone}`;
      }
      
      // Se tem 11 dígitos (DDD + 9 dígitos), adicionar código do Brasil
      if (cleanPhone.length === 11) {
        return `+55${cleanPhone}`;
      }
      
      // Se tem 10 dígitos (DDD + 8 dígitos), adicionar código do Brasil
      if (cleanPhone.length === 10) {
        return `+55${cleanPhone}`;
      }
      
      // Retornar como está se não conseguir identificar o formato
      return cleanPhone;
    };

    // Definir atributos do contato
    const formattedWhatsApp = formatWhatsApp(formData.phone);
    console.log('WhatsApp original:', formData.phone);
    console.log('WhatsApp formatado:', formattedWhatsApp);
    
    // Usar campos padrão + alguns personalizados básicos
    const attributes = {
      FIRSTNAME: formData.name.split(' ')[0], // Primeiro nome
      LASTNAME: formData.name.split(' ').slice(1).join(' ') || '', // Resto do nome
      SMS: formattedWhatsApp, // Campo SMS padrão para WhatsApp
      WHATSAPP: formattedWhatsApp, // Campo personalizado também
      FONTE: formData.source || 'Landing Page AgroPricing',
      DATA_INSCRICAO: new Date().toISOString().split('T')[0],
    };
    
    // Converter para formato aceito pela API Brevo
    createContact.attributes = Object.fromEntries(
      Object.entries(attributes).map(([key, value]) => [key, value as unknown as object])
    );
    createContact.listIds = [BREVO_CONFIG.LISTA_ESPERA_ID];

    // Enviar para Brevo
    const contactResponse = await apiInstance.createContact(createContact);
    console.log('Contato criado com sucesso:', contactResponse);

    // Opcional: Enviar email de boas-vindas
    if (BREVO_CONFIG.WELCOME_TEMPLATE_ID && BREVO_CONFIG.WELCOME_TEMPLATE_ID > 0) {
      try {
        const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();
        emailApi.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.templateId = BREVO_CONFIG.WELCOME_TEMPLATE_ID;
        sendSmtpEmail.to = [{ email: formData.email, name: formData.name }];
        sendSmtpEmail.params = {
          NOME: formData.name,
          PRODUTO: 'AgroPricing Pro',
          DESCONTO: '50%',
          PRECO_ORIGINAL: 'R$ 249/mês',
          PRECO_DESCONTO: 'R$ 125/mês',
          DATA_INSCRICAO: new Date().toLocaleDateString('pt-BR')
        };

        await emailApi.sendTransacEmail(sendSmtpEmail);
        console.log('Email de boas-vindas enviado com sucesso');
      } catch (emailError) {
        console.warn('Erro ao enviar email de boas-vindas (não crítico):', emailError);
        // Não falha a operação principal se o email de boas-vindas falhar
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Parabéns! Você foi adicionado à Lista de Espera com 50% de desconto!' 
    });

  } catch (error: unknown) {
    console.error('Erro ao processar inscrição:', error);
    
    // Interface para erros HTTP do Brevo
    interface BrevoHttpError {
      statusCode: number;
      body?: {
        message?: string;
        code?: string;
      };
      response?: unknown;
    }
    
    // Verificar tipos de erro específicos
    if (error && typeof error === 'object' && 'response' in error) {
      const httpError = error as BrevoHttpError;
      console.error('Status Code:', httpError.statusCode);
      console.error('Response Body:', httpError.body);
      
      if (httpError.statusCode === 400) {
        const errorBody = httpError.body;
        
        // Log detalhado para debug
        console.error('Erro 400 - Bad Request:', {
          body: errorBody,
          message: errorBody?.message,
          code: errorBody?.code
        });
        
        if (errorBody?.message?.includes('Contact already exist')) {
          return NextResponse.json(
            { error: 'Este email já está cadastrado em nossa lista!' },
            { status: 400 }
          );
        }
        
        if (errorBody?.message?.includes('List not found') || errorBody?.code === 'invalid_parameter') {
          return NextResponse.json(
            { error: 'Configuração do Brevo incompleta. Verifique as configurações da API.' },
            { status: 500 }
          );
        }

        if (errorBody?.message?.includes('Invalid email')) {
          return NextResponse.json(
            { error: 'Email inválido. Verifique se digitou corretamente.' },
            { status: 400 }
          );
        }

        if (errorBody?.message?.includes('Invalid WhatsApp number')) {
          return NextResponse.json(
            { error: 'Formato do WhatsApp inválido. Use apenas números com DDD (ex: 11999999999).' },
            { status: 400 }
          );
        }
        
        // Retornar erro genérico para outros casos de 400
        return NextResponse.json(
          { error: `Erro de validação: ${errorBody?.message || 'Dados inválidos'}` },
          { status: 400 }
        );
      }
      
      if (httpError.statusCode === 401 || httpError.statusCode === 403) {
        console.error('Erro de autenticação - verifique BREVO_API_KEY');
        return NextResponse.json(
          { error: 'Erro de configuração da API. Verifique a chave de API do Brevo.' },
          { status: 500 }
        );
      }

      if (httpError.statusCode === 404) {
        console.error('Recurso não encontrado - verifique IDs da lista/template');
        return NextResponse.json(
          { error: 'Configuração da lista de contatos não encontrada.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente em alguns minutos.' },
      { status: 500 }
    );
  }
}

// Endpoint para verificar saúde da API
export async function GET() {
  return NextResponse.json({ 
    status: 'API Newsletter funcionando',
    timestamp: new Date().toISOString(),
    brevoConfigured: !!process.env.BREVO_API_KEY
  });
}
