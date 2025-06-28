# 🚀 CONFIGURAÇÃO BREVO - INTEGRAÇÃO EMAIL MARKETING

## 📋 Passos para Ativar a Integração

### 1. **Criar Arquivo `.env.local`**

Crie o arquivo `.env.local` na raiz do projeto com:

```bash
# BREVO API KEY
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxx
```

### 2. **Obter API Key da Brevo**

1. Acesse https://app.brevo.com/
2. Vá em **Settings** → **API Keys**
3. Clique em **Generate a new API key**
4. Copie a key e cole no arquivo `.env.local`

### 3. **Configurar Lista na Brevo**

1. Acesse **Contacts** → **Lists**
2. Clique em **Create a list**
3. Nome: "Lista de Espera - AgroPricing Pro"
4. Anote o **List ID** (ex: 123)

### 4. **Atualizar Configuração**

No arquivo `src/config/brevo.ts`:

```typescript
export const BREVO_CONFIG = {
  // Substitua pelo ID real da sua lista
  LISTA_ESPERA_ID: 123, // ← Seu List ID aqui
  
  // Emails da sua conta Brevo
  FROM_EMAIL: 'contato@seudominio.com', // ← Seu email verificado
  FROM_NAME: 'AgroPricing Pro',
  
  // ID do template (opcional - pode deixar 0 para desabilitar)
  WELCOME_TEMPLATE_ID: 0 // ou ID do seu template
};
```

### 5. **Criar Campos Personalizados (Opcional)**

Na Brevo, em **Contacts** → **Contact attributes**:

- **NOME** (TEXT)
- **WHATSAPP** (TEXT) 
- **FONTE** (TEXT)
- **DATA_INSCRICAO** (DATE)
- **INTERESSE** (TEXT)
- **DESCONTO** (TEXT)

### 6. **Testar Integração**

```bash
# Rodar projeto
npm run dev

# Testar formulário na landing page
# Verificar contatos na Brevo Dashboard
```

## 🔥 Funcionalidades Implementadas

✅ **Formulário Integrado:** Hero section conectado à Brevo
✅ **Validação:** Email + telefone brasileiro
✅ **Tracking GTM:** Eventos de sucesso/erro
✅ **Tratamento Erros:** Mensagens amigáveis
✅ **Email Boas-vindas:** Template opcional
✅ **Campos Personalizados:** Dados do agronegócio

## 📊 Eventos GTM Disparados

- **form_start:** Início do preenchimento
- **form_success:** Envio bem-sucedido
- **form_error:** Erro na submissão

## 🛠️ API Endpoints

- **POST** `/api/newsletter` - Enviar contato
- **GET** `/api/newsletter` - Verificar status da API

## ⚠️ Importante

- Nunca versione o arquivo `.env.local`
- Use emails já verificados na Brevo
- IDs devem ser números reais da sua conta
- Teste sempre em desenvolvimento primeiro

---

**🎯 APÓS CONFIGURAÇÃO: A integração estará 100% funcional!**
