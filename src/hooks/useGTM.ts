import { useCallback } from 'react';
import { GTM_CONFIG, GTMEvent, FormTrackingData } from '@/config/gtm';

// Tipagem global já declarada no componente GoogleTagManager

export function useGTM() {
  // Função genérica para empurrar eventos para o dataLayer
  const pushToDataLayer = useCallback((eventData: Partial<GTMEvent>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(eventData as never);
    }
  }, []);

  // Função para rastrear cliques em CTA
  const trackCTAClick = useCallback((ctaName: string, location: string, additionalData?: Record<string, unknown>) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.CTA_CLICK,
      cta_name: ctaName,
      cta_location: location,
      ...additionalData
    });
  }, [pushToDataLayer]);

  // Tracking para formulários
  const trackFormEvent = useCallback((eventType: 'start' | 'submit' | 'success' | 'error', formData: FormTrackingData, additionalData?: Record<string, unknown>) => {  
    let eventName: string;
    
    switch (eventType) {
      case 'start':
        eventName = GTM_CONFIG.EVENTS.FORM_START;
        break;
      case 'submit':
        eventName = GTM_CONFIG.EVENTS.FORM_SUBMIT;
        break;
      case 'success':
        eventName = GTM_CONFIG.EVENTS.FORM_SUCCESS;
        break;
      case 'error':
        eventName = GTM_CONFIG.EVENTS.FORM_ERROR;
        break;
    }

    pushToDataLayer({
      event: eventName,
      form_name: formData.form_name || 'unknown',
      form_location: formData.form_location || 'unknown',
      form_fields: formData.form_fields || [],
      validation_errors: formData.validation_errors || [],
      ...additionalData
    });
  }, [pushToDataLayer]);

  // Tracking para visualização de seções
  const trackSectionView = useCallback((sectionName: string, additionalData?: Record<string, unknown>) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.SECTION_VIEW,
      section_name: sectionName,
      timestamp: new Date().toISOString(),
      ...additionalData
    });
  }, [pushToDataLayer]);

  // Tracking para interações de usuário
  const trackUserEngagement = useCallback((engagementType: string, value?: number, additionalData?: Record<string, unknown>) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.USER_ENGAGEMENT,
      engagement_type: engagementType,
      engagement_value: value,
      timestamp: new Date().toISOString(),
      ...additionalData
    });
  }, [pushToDataLayer]);

  // Tracking customizado
  const trackCustomEvent = useCallback((eventName: string, eventData: Record<string, unknown>) => {
    pushToDataLayer({
      event: eventName,
      ...eventData
    });
  }, [pushToDataLayer]);

  return {
    pushToDataLayer,
    trackCTAClick,
    trackFormEvent,
    trackSectionView,
    trackUserEngagement,
    trackCustomEvent
  };
}

export default useGTM;
