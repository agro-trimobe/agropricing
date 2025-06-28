// src/config/brevo.ts
import * as SibApiV3Sdk from '@getbrevo/brevo';

// Configuração da API Brevo
export const brevoApi = new SibApiV3Sdk.TransactionalEmailsApi();

// Configurar API Key
if (process.env.BREVO_API_KEY) {
  brevoApi.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
}

// Configurações do Email
export const BREVO_CONFIG = {
  // Lista de contatos (você precisa criar esta lista na Brevo)
  LISTA_ESPERA_ID: 4, // ⚠️ SUBSTITUA pelo ID da sua lista na Brevo
  
  // Email de remetente (deve ser verificado na Brevo)
  FROM_EMAIL: 'contato@trimobe.com', // ⚠️ SUBSTITUA pelo seu email verificado
  FROM_NAME: 'AgroPricing',
  
  // Template de boas-vindas (opcional)
  WELCOME_TEMPLATE_ID: 1, // ⚠️ SUBSTITUA pelo ID do seu template (opcional)
};

// Interface para dados do formulário
export interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  source?: string;
}

// Função helper para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função helper para validar telefone brasileiro
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
};
