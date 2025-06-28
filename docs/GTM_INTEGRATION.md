# Google Tag Manager - Guia de Integração

## 📋 Visão Geral

Este guia documenta a integração completa do Google Tag Manager (GTM) na landing page do AgroPricing Pro, implementada com arquitetura centralizada e TypeScript para facilitar o gerenciamento de eventos de tracking.

## 🗂️ Arquitetura dos Arquivos

```
src/
├── config/
│   └── gtm.ts                    # Configuração centralizada do GTM
├── components/
│   └── GoogleTagManager.tsx      # Componente principal do GTM
├── hooks/
│   └── useGTM.ts                # Hook para tracking de eventos
└── app/
    └── layout.tsx               # Implementação no layout global
```

## ⚙️ Configuração Principal

### 1. Configuração Centralizada (`src/config/gtm.ts`)

```typescript
export const GTM_CONFIG = {
  GTM_ID: 'GTM-XXXXXXXXX', // ⚠️ SUBSTITUA pelo seu ID real
  EVENTS: {
    PAGE_VIEW: 'page_view',
    CTA_CLICK: 'cta_click',
    FORM_START: 'form_start',
    FORM_SUBMIT: 'form_submit',
    FORM_SUCCESS: 'form_success',
    SECTION_VIEW: 'section_view',
    USER_ENGAGEMENT: 'user_engagement',
    SCROLL_DEPTH: 'scroll_depth',
    TIME_ON_PAGE: 'time_on_page'
  }
};
```

### 2. Componente GTM (`src/components/GoogleTagManager.tsx`)

O componente gerencia:
- ✅ Inicialização do `dataLayer` e `gtag`
- ✅ Tracking automático de page views
- ✅ Tracking automático de scroll depth (25%, 50%, 75%, 100%)
- ✅ Tracking automático de tempo na página (30s, 60s, 120s, 300s)
- ✅ Eventos automáticos de visualização de seções

## 🎯 Como Usar o Hook `useGTM`

### 1. Importação Básica

```typescript
import { useGTM } from '@/hooks/useGTM';

export default function MeuComponente() {
  const { trackCTAClick, trackFormEvent, trackSectionView } = useGTM();
  
  // Seus handlers aqui...
}
```

### 2. Tracking de CTAs

```typescript
const handleCTAClick = () => {
  trackCTAClick('Acesso Antecipado', 'Hero Section', {
    button_text: 'Garantir Acesso Antecipado',
    button_style: 'primary',
    user_segment: 'anonymous'
  });
  
  // Sua lógica de navegação...
};
```

### 3. Tracking de Formulários

```typescript
const handleFormSubmit = async (formData) => {
  // Tracking do envio
  trackFormEvent('submit', {
    form_name: 'lista_espera',
    form_location: 'main_form',
    form_fields: ['nome', 'email', 'whatsapp']
  });

  try {
    const response = await submitForm(formData);
    
    // Tracking de sucesso
    trackFormEvent('success', {
      form_name: 'lista_espera',
      form_location: 'main_form',
      conversion_value: 125 // valor do lead
    });
  } catch (error) {
    // Tracking de erro
    trackFormEvent('error', {
      form_name: 'lista_espera',
      form_location: 'main_form',
      validation_errors: ['email_invalid']
    });
  }
};
```

### 4. Tracking de Visualização de Seções

```typescript
import { useEffect, useRef } from 'react';

export default function MinhaSecao() {
  const { trackSectionView } = useGTM();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView('pricing_section', {
              section_visible_percentage: Math.round(entry.intersectionRatio * 100),
              scroll_position: window.scrollY
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [trackSectionView]);

  return (
    <section ref={sectionRef}>
      {/* Conteúdo da seção */}
    </section>
  );
}
```

## 🏷️ Eventos Automáticos Implementados

### 1. Page View
- **Evento:** `page_view`
- **Quando:** Carregamento de cada página
- **Dados:** URL, referrer, user agent, timestamp

### 2. Scroll Depth
- **Evento:** `scroll_depth`
- **Quando:** 25%, 50%, 75%, 100% da página
- **Dados:** Porcentagem, tempo para atingir, altura da página

### 3. Tempo na Página
- **Evento:** `time_on_page`
- **Quando:** 30s, 60s, 120s, 300s
- **Dados:** Tempo decorrido, engagement score

### 4. Visualização de Seções
- **Evento:** `section_view`
- **Quando:** Seção fica visível (intersection observer)
- **Dados:** Nome da seção, timestamp, posição do scroll

## 🔧 Configuração no GTM Dashboard

### 1. Triggers Recomendados

```javascript
// Trigger para CTA Clicks
Event Name: cta_click

// Trigger para Form Submissions
Event Name: form_submit

// Trigger para Scroll Depth
Event Name: scroll_depth
Variable: scroll_depth_percentage >= 50

// Trigger para Time on Page
Event Name: time_on_page
Variable: time_seconds >= 60
```

### 2. Variables Customizadas

```javascript
// CTA Name
Data Layer Variable: cta_name

// Form Name
Data Layer Variable: form_name

// Scroll Depth Percentage
Data Layer Variable: scroll_depth_percentage

// Engagement Time
Data Layer Variable: time_seconds
```

### 3. Tags de Exemplo

```javascript
// Google Analytics 4 - CTA Click
Event Name: click
Parameters:
- button_name: {{cta_name}}
- button_location: {{cta_location}}

// Facebook Pixel - Lead
Event Name: Lead
Parameters:
- content_name: {{form_name}}
- value: {{conversion_value}}

// Google Ads - Conversion
Conversion ID: AW-XXXXXXXXX/XXXXXXX
Conversion Value: {{conversion_value}}
```

## 🚀 Implementação em Produção

### 1. Substituir o GTM ID

Edite `src/config/gtm.ts`:

```typescript
export const GTM_CONFIG = {
  GTM_ID: 'GTM-SEU_ID_REAL', // ⚠️ Substitua aqui
  // ... resto das configurações
};
```

### 2. Testar em Modo Preview

1. Acesse o Google Tag Manager
2. Clique em "Preview"
3. Digite a URL do seu site
4. Verifique se os eventos estão disparando corretamente

### 3. Validar DataLayer

```javascript
// No console do navegador
console.log(window.dataLayer);

// Verificar eventos específicos
window.dataLayer.filter(event => event.event === 'cta_click');
```

## 📊 Métricas Principais para Tracking

### 1. Conversão (Landing Page)
- **Formulário iniciado** vs **Formulário enviado**
- **Taxa de abandono** por campo
- **Tempo médio** para completar formulário

### 2. Engagement
- **Tempo médio** na página
- **Scroll depth médio**
- **Seções mais visualizadas**
- **CTAs mais clicados**

### 3. Qualificação de Leads
- **Origem do tráfego** vs **qualidade do lead**
- **Comportamento** antes da conversão
- **Dispositivo** mais usado para conversão

## 🛠️ Troubleshooting

### Problema: Eventos não aparecem no GTM Preview

**Solução:**
```typescript
// Verificar se o dataLayer está inicializado
if (typeof window !== 'undefined' && window.dataLayer) {
  console.log('GTM carregado:', window.dataLayer);
} else {
  console.error('GTM não carregado');
}
```

### Problema: TypeScript errors

**Solução:**
```typescript
// Adicionar tipagem global (já incluída)
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
```

### Problema: Eventos duplicados

**Solução:**
- Verificar se o componente `GoogleTagManager` está sendo renderizado apenas uma vez
- Usar `useCallback` nos event handlers
- Implementar debounce para eventos de scroll

## 📚 Recursos Adicionais

- [Documentação Oficial GTM](https://developers.google.com/tag-manager)
- [GTM with Next.js Best Practices](https://nextjs.org/docs/messages/next-script-for-ga)
- [Google Analytics 4 Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)

---

**✅ Status:** Implementação completa e funcional
**📅 Última atualização:** Janeiro 2024
**👨‍💻 Responsável:** Equipe Trimobe
