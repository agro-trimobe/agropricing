// Configurações do Google Tag Manager
export const GTM_CONFIG = {
  // ⚠️ SUBSTITUA por seu ID real obtido em https://tagmanager.google.com
  // Exemplo: 'GTM-N7B2K5W' ou 'GTM-WXYZ123'
  GTM_ID: 'GTM-MQ3RPS8J',
  
  // Eventos personalizados para tracking
  EVENTS: {
    // Formulário Lista de Espera
    FORM_START: 'form_start_lista_espera',
    FORM_SUBMIT: 'form_submit_lista_espera',
    FORM_SUCCESS: 'form_success_lista_espera',
    FORM_ERROR: 'form_error_lista_espera',
    
    // CTAs
    CTA_CLICK: 'cta_click',
    CTA_HERO_PRIMARY: 'cta_hero_primary_click',
    CTA_HERO_SECONDARY: 'cta_hero_secondary_click',
    CTA_PRECOS: 'cta_precos_click',
    CTA_HEADER: 'cta_header_click',
    
    // Engajamento
    PAGE_VIEW: 'page_view',
    SCROLL_DEPTH: 'scroll_depth',
    FAQ_EXPAND: 'faq_expand',
    TIME_ON_PAGE: 'time_on_page',
    USER_ENGAGEMENT: 'user_engagement',
    
    // Conversões
    LEAD_QUALIFIED: 'lead_qualified',
    WHATSAPP_PROVIDED: 'whatsapp_provided',
    
    // Seções visualizadas
    SECTION_VIEW: 'section_view'
  },
  
  // Parâmetros customizados
  CUSTOM_PARAMS: {
    // Para identificar origem do tráfego
    traffic_source: 'organic',
    landing_page: 'agropricing_home',
    user_type: 'visitor',
    
    // Para campanhas futuras
    campaign_name: '',
    campaign_medium: '',
    campaign_source: '',
    campaign_content: ''
  }
};

// Função helper para eventos ecommerce (futuramente)
export const ECOMMERCE_EVENTS = {
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase'
};

// Tipos TypeScript para melhor desenvolvimento
export interface GTMEvent {
  event: string;
  // Propriedades comuns
  timestamp?: string;
  page_url?: string;
  user_agent?: string;
  
  // CTA tracking
  cta_name?: string;
  cta_location?: string;
  button_text?: string;
  
  // Form tracking
  form_name?: string;
  form_location?: string;
  form_fields?: string[];
  validation_errors?: string[];
  
  // Section tracking
  section_name?: string;
  scroll_position?: number;
  
  // Engagement tracking
  engagement_type?: string;
  engagement_value?: number;
  scroll_depth_percentage?: number;
  time_seconds?: number;
  
  // Conversão
  conversion_value?: number;
  lead_quality?: string;
  
  // Propriedades extras
  [key: string]: unknown;
}

export interface FormTrackingData {
  form_name: string;
  form_location: string;
  form_fields?: string[];
  validation_errors?: string[];
  additional_data?: Record<string, unknown>;
}
