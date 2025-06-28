'use client';

import { useEffect } from 'react';
import { GTM_CONFIG, FormTrackingData } from '@/config/gtm';

// Interface para as propriedades do componente
interface GoogleTagManagerProps {
  gtmId?: string; // Opcional, usa configuração padrão se não fornecido
}

// Interface para eventos do dataLayer
interface DataLayerEvent {
  event: string;
  [key: string]: string | number | boolean | string[] | Record<string, unknown> | undefined;
}

// Declaração global para o dataLayer
declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Função para inicializar o dataLayer
const initializeDataLayer = () => {
  if (typeof window === 'undefined') return;

  // Inicializa o dataLayer se não existir
  window.dataLayer = window.dataLayer || [];

  // Função gtag helper
  window.gtag = function(...args: unknown[]) {
    window.dataLayer.push(args as unknown as DataLayerEvent);
  };
};

// Componente principal do Google Tag Manager
export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const containerId = gtmId || GTM_CONFIG.GTM_ID;
  
  useEffect(() => {
    // Inicializar o dataLayer
    initializeDataLayer();
    
    // Push do evento inicial de page view
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'gtm.js',
        'gtm.start': new Date().getTime(),
        'gtm.uniqueEventId': Math.random().toString(36).substr(2, 9)
      });
      
      // Push de informações da página inicial
      window.dataLayer.push({
        event: GTM_CONFIG.EVENTS.SECTION_VIEW,
        event_category: 'page_view',
        event_action: 'landing_page_load',
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        ...GTM_CONFIG.CUSTOM_PARAMS,
        timestamp: new Date().toISOString()
      });
      
      // Tracking de scroll automático
      setupScrollTracking();
      
      // Tracking de tempo na página
      setupTimeTracking();
    }
  }, [containerId]);

  return null; // Este componente não renderiza nada
}

// Função para configurar tracking de scroll
const setupScrollTracking = () => {
  const scrollDepths = [25, 50, 75, 100];
  const triggeredDepths = new Set<number>();
  
  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !triggeredDepths.has(depth)) {
        triggeredDepths.add(depth);
        
        if (window.dataLayer) {
          window.dataLayer.push({
            event: GTM_CONFIG.EVENTS.SCROLL_DEPTH,
            event_category: 'engagement',
            event_action: 'scroll',
            event_label: `${depth}%`,
            value: depth,
            timestamp: new Date().toISOString()
          });
        }
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Função para configurar tracking de tempo
const setupTimeTracking = () => {
  const startTime = Date.now();
  const timeIntervals = [30, 60, 120, 300]; // segundos
  const triggeredIntervals: number[] = [];
  
  const trackTimeInterval = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    timeIntervals.forEach(interval => {
      if (timeSpent >= interval && !triggeredIntervals.includes(interval)) {
        triggeredIntervals.push(interval);
        
        if (window.dataLayer) {
          window.dataLayer.push({
            event: GTM_CONFIG.EVENTS.TIME_ON_PAGE,
            event_category: 'engagement',
            event_action: 'time_on_page',
            event_label: `${interval}s`,
            value: interval,
            timestamp: new Date().toISOString()
          });
        }
      }
    });
  };
  
  setInterval(trackTimeInterval, 10000); // Check every 10 seconds
};

// Hook personalizado para facilitar o uso do GTM em outros componentes
export const useGTM = () => {
  const pushToDataLayer = (data: DataLayerEvent) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        ...data,
        timestamp: new Date().toISOString(),
        event_id: Math.random().toString(36).substr(2, 9)
      });
    }
  };
  
  // Função específica para tracking de CTAs
  const trackCTA = (ctaName: string, location: string) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS[ctaName as keyof typeof GTM_CONFIG.EVENTS] || 'cta_click',
      event_category: 'cta',
      event_action: 'click',
      event_label: location,
      cta_name: ctaName,
      cta_location: location
    });
  };
  
  // Função específica para tracking de formulários
  const trackForm = (eventType: 'start' | 'submit' | 'success' | 'error', formData?: FormTrackingData) => {
    const eventMap = {
      start: GTM_CONFIG.EVENTS.FORM_START,
      submit: GTM_CONFIG.EVENTS.FORM_SUBMIT,
      success: GTM_CONFIG.EVENTS.FORM_SUCCESS,
      error: GTM_CONFIG.EVENTS.FORM_ERROR
    };
    
    pushToDataLayer({
      event: eventMap[eventType],
      event_category: 'form',
      event_action: eventType,
      event_label: formData?.form_name || 'lista_espera',
      form_name: formData?.form_name,
      form_location: formData?.form_location,
      timestamp: new Date().toISOString()
    });
  };
  
  // Função para tracking de seções visualizadas
  const trackSectionView = (sectionName: string) => {
    pushToDataLayer({
      event: GTM_CONFIG.EVENTS.SECTION_VIEW,
      event_category: 'engagement',
      event_action: 'section_view',
      event_label: sectionName,
      section_name: sectionName
    });
  };

  return { 
    pushToDataLayer, 
    trackCTA, 
    trackForm, 
    trackSectionView 
  };
};
