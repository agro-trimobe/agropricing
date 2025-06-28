'use client';

import React, { useState, useEffect } from 'react';
import { useGTM } from '@/hooks/useGTM';

export default function Home() {
  const [subscriberCount] = useState(47);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Estados FAQ Accordion
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [fieldsTouched, setFieldsTouched] = useState<{[key: string]: boolean}>({});
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  // Funções de validação
  const validateEmail = (email: string): string => {
    if (!email) return 'Email é obrigatório';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email inválido';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone) return 'WhatsApp é obrigatório';
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phoneRegex.test(phone)) return 'Formato: (11) 99999-9999';
    return '';
  };

  const validateName = (name: string): string => {
    if (!name) return 'Nome é obrigatório';
    if (name.length < 2) return 'Nome muito curto';
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) return 'Apenas letras e espaços';
    return '';
  };

  // Formatação de telefone
  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  // Funções de scroll
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWaitlist = () => {
    scrollToSection('waitlist');
  };

  // Validação em tempo real
  const handleFieldValidation = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
    }

    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let finalValue = value;
    
    // Formatação específica por campo
    if (name === 'phone') {
      finalValue = formatPhone(value);
    }
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: finalValue }));
    }

    // Marcar campo como tocado
    setFieldsTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar campo se foi tocado
    if (fieldsTouched[name] || name === 'phone') {
      handleFieldValidation(name, finalValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFieldsTouched(prev => ({ ...prev, [name]: true }));
  };

  // Função para toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    const targetDate = new Date('2025-07-31T23:59:59');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    // Adicionar meta tags dinâmicas para SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        `Plataforma de IA para consultores agropecuários. ${subscriberCount} consultores já garantiram acesso. Precificação inteligente, teste gratuito de 7 dias.`
      );
    }

    // Adicionar structured data dinâmico baseado no contador
    const updateStructuredData = () => {
      const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic', 'true');
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "AgroPricing Pro",
        "description": "IA especializada para consultores do agronegócio brasileiro",
        "url": "https://agropricing.com.br",
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/RegisterAction",
          "userInteractionCount": subscriberCount
        },
        "offers": {
          "@type": "Offer",
          "description": `Mais de ${subscriberCount} consultores já se inscreveram`,
          "availabilityStarts": "2024-12-25",
          "availabilityEnds": "2025-07-31"
        }
      });
      document.head.appendChild(script);
    };

    updateStructuredData();

    return () => clearInterval(timer);
  }, [subscriberCount]);

  // Hook GTM para tracking
  const { trackFormEvent } = useGTM();

  // Handle form submission - INTEGRADO COM BREVO + GTM TRACKING
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Tracking GTM - Form Start
    trackFormEvent('start', {
      form_name: 'lista_espera',
      form_location: 'hero_section',
      form_fields: ['name', 'email', 'phone']
    });

    try {
      // Enviar para API Brevo
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: 'Landing Page AgroPricing - Hero Section'
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // ✅ SUCESSO - Contato adicionado à Brevo
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Parabéns! Você foi adicionado à Lista de Espera com 50% de desconto!'
        });

        // Tracking GTM - Form Success
        trackFormEvent('success', {
          form_name: 'lista_espera',
          form_location: 'hero_section',
          form_fields: ['name', 'email', 'phone']
        }, {
          conversion_value: 125, // Valor do plano com desconto
          lead_source: 'organic',
          user_segment: 'agronegocio'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: ''
        });
        
      } else {
        // ❌ ERRO DA API
        throw new Error(result.error || 'Erro na submissão');
      }
      
    } catch (error: unknown) {
      console.error('Erro ao enviar formulário:', error);
      
      setSubmitStatus({
        type: 'error',
        message: (error instanceof Error && error.message?.includes('inválido')) 
          ? error.message 
          : 'Erro ao processar sua inscrição. Verifique os dados e tente novamente.'
      });

      // Tracking GTM - Form Error
      trackFormEvent('error', {
        form_name: 'lista_espera',
        form_location: 'hero_section',
        form_fields: ['name', 'email', 'phone'],
        validation_errors: [error instanceof Error ? error.message : 'unknown_error']
      }, {
        error_type: 'api_error',
        error_message: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  role="img"
                  aria-label="Logo do AgroPricing - Plataforma de IA para consultoria agropecuária brasileira"
                >
                  <title>AgroPricing - Precificação Inteligente para Agronegócio</title>
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill="currentColor" stroke="none"/>
                  <circle cx="7" cy="7" r="1.5" fill="white"/>
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">AgroPricing</span>
            </div>
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-3 py-1.5 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-base"
            >
              Lista 50% OFF
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-purple-50 to-purple-100 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Pare de Perder <span className="text-purple-600">Clientes e Dinheiro</span><br className="block" />
              com Propostas Amadoras no Agronegócio
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
              Gere propostas técnicas profissionais e precifique seus serviços com <strong>Inteligência Artificial</strong> e dados reais do agronegócio brasileiro - 
              <strong>sem mais cálculos &ldquo;no chute&rdquo;</strong>
            </p>

            {/* Benefícios Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10">
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">🎯</div>
                <div className="text-sm sm:text-base text-gray-700 text-center font-medium">Precificação Assertiva</div>
                <div className="text-xs sm:text-sm text-gray-600 text-center mt-1">Com dados regionalizados</div>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">🚀</div>
                <div className="text-sm sm:text-base text-gray-700 text-center font-medium">Propostas Profissionais</div>
                <div className="text-xs sm:text-sm text-gray-600 text-center mt-1">Geradas com IA</div>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">⏱️</div>
                <div className="text-sm sm:text-base text-gray-700 text-center font-medium">Economia de Tempo</div>
                <div className="text-xs sm:text-sm text-gray-600 text-center mt-1">Foco no que importa</div>
              </div>
            </div>

            {/* CTAs Principais */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-8">
              <button 
                onClick={() => scrollToWaitlist()}
                className="w-11/12 max-w-sm sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-5 sm:px-8 sm:py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Quero Propostas Profissionais →
              </button>
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-purple-600 hover:text-purple-700 font-semibold text-base sm:text-lg underline transition-colors duration-300"
              >
                Ver Demonstração
              </button>
            </div>

            <p className="text-sm sm:text-base text-gray-500">
              Cadastre-se gratuitamente • Seja notificado do lançamento • Garanta desconto exclusivo
            </p>
          </div>
        </div>
      </section>

      {/* Problemas Section */}
      <section id="problems" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Os Maiores Desafios dos Consultores Agropecuários
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Você se identifica com alguma dessas situações que prejudicam seu crescimento profissional?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Problema 1 */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  📊
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 ml-3 sm:ml-4">
                  Precificação &ldquo;no Chute&rdquo;
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Cálculos baseados em intuição, sem considerar variações regionais, sazonalidade ou especificidades das culturas, resultando em preços fora da realidade do mercado.
              </p>
              <div className="bg-orange-50 p-3 sm:p-4 rounded-xl border-l-4 border-orange-400">
                <p className="text-xs sm:text-sm text-gray-700 italic">
                  &ldquo;Sempre fico na dúvida se estou cobrando o valor certo. Às vezes perco dinheiro, às vezes perco o cliente por cobrar demais...&rdquo;
                </p>
              </div>
            </div>

            {/* Problema 2 */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  📄
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 ml-3 sm:ml-4">
                  Propostas Amadoras
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Documentos mal estruturados, sem fundamentação técnica, que não conseguem justificar o valor do seu trabalho especializado no agronegócio.
              </p>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border-l-4 border-blue-400">
                <p className="text-xs sm:text-sm text-gray-700 italic">
                  &ldquo;Minha proposta parece amadora perto da concorrência. Preciso de algo mais profissional para conquistar produtores maiores...&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-6 px-4 sm:px-6 rounded-2xl shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-3">
                O Resultado? Oportunidades Perdidas
              </h3>
              <p className="text-sm sm:text-base opacity-90">
                Enquanto você luta com esses desafios, consultores mais preparados conquistam os melhores clientes e projetos do agronegócio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona - Versão Otimizada e Mobile-First */}
      <section id="demo" className="py-10 sm:py-12 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Veja Como Funciona
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              Em apenas **2 etapas simples**, nossa IA especializada transforma sua descrição em uma proposta profissional completa
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
              ⚡ Gerado em menos de 3 segundos
            </div>
          </div>

          {/* Demonstração Visual Simplificada */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Etapa 1: Input */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-purple-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-sm font-bold mb-2">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Você Descreve
                </h3>
                <p className="text-sm text-gray-600">
                  Digite naturalmente o que seu cliente precisa
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-300">
                <div className="text-sm text-gray-700 leading-relaxed">
                  {"Consultoria para fazenda de soja, 500ha no MT, agricultura de precisão..."}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">🌾 Soja</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">📍 MT</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">⚙️ Precisão</span>
                </div>
              </div>
            </div>

            {/* Etapa 2: Output */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full text-sm font-bold mb-2">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  IA Gera Proposta
                </h3>
                <p className="text-sm text-gray-600">
                  Proposta profissional completa e precificada
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">📋 Proposta Técnica</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">GERADA</span>
                </div>
                
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>• Análise solo (500ha)</span>
                    <span className="font-medium">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Mapeamento produtividade</span>
                    <span className="font-medium">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Taxa variável</span>
                    <span className="font-medium">✓</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">💰 Investimento:</span>
                  <span className="text-lg font-bold text-purple-600">R$ 29.700</span>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm font-semibold text-green-800">📈 ROI:</span>
                  <span className="text-lg font-bold text-green-600">506%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call-to-Action para próxima seção */}
          <div className="text-center mt-8 sm:mt-10">
            <p className="text-sm text-gray-600 mb-3">
              Veja exemplos reais de propostas geradas pela nossa IA
            </p>
            <div className="inline-flex items-center text-purple-600 font-medium text-sm">
              Explore mais abaixo
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstração Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              AgroPricing: Profissionalismo + Precisão
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              A única solução que te transforma no profissional mais respeitado E mais assertivo do agronegócio brasileiro
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Antes vs Depois */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                Transformação Completa
              </h3>
              
              {/* ANTES */}
              <div className="bg-red-50 p-4 sm:p-6 rounded-xl border-l-4 border-red-500 mb-4 sm:mb-6">
                <h4 className="font-bold text-red-600 mb-3 flex items-center">
                  <span className="text-base sm:text-lg mr-2">❌</span>
                  ANTES (Profissional Comum)
                </h4>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li>• Calcula preços &ldquo;de cabeça&rdquo; sem embasamento</li>
                  <li>• Propostas simples feitas no Word</li>
                  <li>• Compete por preço baixo</li>
                  <li>• Clientes questionam os valores</li>
                  <li>• Status de prestador comum</li>
                </ul>
              </div>

              {/* DEPOIS */}
              <div className="bg-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-500">
                <h4 className="font-bold text-green-600 mb-3 flex items-center">
                  <span className="text-base sm:text-lg mr-2">✅</span>
                  DEPOIS (Especialista Referência)
                </h4>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li>• Precificação científica com dados regionais</li>
                  <li>• Propostas profissionais que impressionam</li>
                  <li>• Posicionamento como especialista premium</li>
                  <li>• Clientes aceitam valores sem questionar</li>
                  <li>• Status de profissional referência</li>
                </ul>
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-purple-50 rounded-xl">
                <p className="text-center font-bold text-purple-600 text-sm sm:text-base">
                  Resultado: <span className="text-gray-900">Mais Respeito + Mais Lucro</span>
                </p>
              </div>
            </div>

            {/* Demonstração Visual */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Exemplo Prático: Prestação de Serviços Agropecuários
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Serviço:</p>
                  <p className="text-gray-600 text-sm sm:text-base">Consultoria técnica especializada para propriedade rural de 500ha no interior de Goiás</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                    <p className="font-semibold text-red-600 text-sm">Método Antigo</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">R$ 8.500</p>
                    <p className="text-sm text-gray-600">&ldquo;Calculei de cabeça&rdquo;</p>
                  </div>
                  <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                    <p className="font-semibold text-green-600 text-sm">Com AgroPricing</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">R$ 12.800*</p>
                    <p className="text-sm text-gray-600">*Projeção com metodologia</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 sm:p-4 rounded-lg border border-green-200">
                  <p className="font-bold text-green-700 text-center text-sm sm:text-base">
                    💰 Diferença Projetada: <span className="text-green-600">+R$ 4.300 (50% mais lucro)</span>
                  </p>
                </div>

                <div className="text-center pt-1 sm:pt-2">
                  <p className="text-xs sm:text-sm text-gray-600 italic">
                    + Proposta profissional que impressiona o cliente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Seção Validação de Necessidade */}
      <section id="validation" className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Problemas Reais Que Estamos Resolvendo
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Consultores do agronegócio confirmaram os desafios que nossa solução abordará
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {/* Problema 1 */}
            <div className="bg-red-50 p-4 sm:p-6 rounded-xl border border-red-200">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-2">
                    Precificação Sem Critério
                  </h3>
                  <p className="text-sm sm:text-base text-red-700 leading-relaxed">
                    {"Cobro por hectare sem saber se é justo. Às vezes perco cliente por preço alto, outras trabalho barato demais."}
                  </p>
                  <p className="text-xs sm:text-sm text-red-600 mt-2 font-medium">
                    Consultor Soja/Milho - MT
                  </p>
                </div>
              </div>
            </div>

            {/* Problema 2 */}
            <div className="bg-red-50 p-4 sm:p-6 rounded-xl border border-red-200">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-2">
                    Propostas Amadoras
                  </h3>
                  <p className="text-sm sm:text-base text-red-700 leading-relaxed">
                    {"Minhas propostas são só texto no Word. Produtores grandes nem respondem porque parece trabalho amador."}
                  </p>
                  <p className="text-xs sm:text-sm text-red-600 mt-2 font-medium">
                    Zootecnista - RS
                  </p>
                </div>
              </div>
            </div>

            {/* Problema 3 */}
            <div className="bg-red-50 p-4 sm:p-6 rounded-xl border border-red-200">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-2">
                    Tempo Desperdiçado
                  </h3>
                  <p className="text-sm sm:text-base text-red-700 leading-relaxed">
                    {"Demoro 4-6 horas fazendo orçamento manual. Podia visitar mais clientes nesse tempo."}
                  </p>
                  <p className="text-xs sm:text-sm text-red-600 mt-2 font-medium">
                    Consultor Geral - GO
                  </p>
                </div>
              </div>
            </div>

            {/* Problema 4 */}
            <div className="bg-red-50 p-4 sm:p-6 rounded-xl border border-red-200">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-2">
                    Concorrência Desleal
                  </h3>
                  <p className="text-sm sm:text-base text-red-700 leading-relaxed">
                    {"Grandes consultorias têm equipe e ferramentas. Sozinho, fico em desvantagem competitiva."}
                  </p>
                  <p className="text-xs sm:text-sm text-red-600 mt-2 font-medium">
                    Engenheiro Agrônomo - PR
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas de Validação */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Validação de Mercado em Andamento
                </h3>
                <p className="text-sm sm:text-base text-green-100">
                  Dados coletados em nossa pesquisa com consultores do agronegócio
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    18
                  </div>
                  <p className="text-xs sm:text-sm text-green-100">
                    Consultores entrevistados
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    89%
                  </div>
                  <p className="text-xs sm:text-sm text-green-100">
                    Confirmam os problemas
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    5
                  </div>
                  <p className="text-xs sm:text-sm text-green-100">
                    Estados mapeados
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    200+
                  </div>
                  <p className="text-xs sm:text-sm text-green-100">
                    Interessados na solução
                  </p>
                </div>
              </div>

              <div className="text-center mt-6 sm:mt-8">
                <p className="text-sm sm:text-base text-green-100">
                  💡 <strong>Estamos desenvolvendo</strong> a solução que estes consultores precisam
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Preços */}
      <section id="pricing" className="py-6 sm:py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-6 leading-tight">
              Garanta Seu Lugar na Revolução<br className="hidden sm:block" />da Consultoria Agropecuária
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              Seja um dos primeiros a usar nossa plataforma e garanta condições especiais
            </p>
          </div>
          
          {/* Plano Único - AgroPricing Pro */}
          <div className="max-w-sm sm:max-w-lg mx-auto px-2 sm:px-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border-2 border-purple-500 p-3 sm:p-6">
              
              <div className="text-center mb-5 sm:mb-6">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">AgroPricing Pro</h3>
                <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-2">
                  R$ 47
                  <span className="text-sm sm:text-lg text-gray-500 font-normal">/mês</span>
                </div>
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm text-gray-500 line-through mr-2">R$ 94</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-50% OFF</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 px-2">💡 Preço de lançamento para acesso antecipado</p>
              </div>
              
              <div className="space-y-2.5 sm:space-y-4 mb-5 sm:mb-8">
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-lg text-gray-700 leading-snug">✅ <strong>Teste grátis por 7 dias</strong></span>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-lg text-gray-700 leading-snug">🎯 <strong>Precificação com IA</strong> + dados regionalizados</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-lg text-gray-700 leading-snug">✨ <strong>Acesso prioritário</strong> ao produto final</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-lg text-gray-700 leading-snug">🧠 <strong>Consultoria personalizada</strong> durante desenvolvimento</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-lg text-gray-700 leading-snug">💳 <strong>Sem cartão de crédito</strong> no período de teste</span>
                </div>
              </div>
              
              <button 
                onClick={scrollToWaitlist}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3.5 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-lg min-h-[44px] sm:min-h-[48px] active:scale-95"
              >
                Começar Teste Grátis Agora →
              </button>
              
              <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4 px-2">
                ⚡ Apenas <strong>89 vagas</strong> disponíveis • <strong>50% OFF</strong> no lançamento
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-6 sm:py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-6">
              Dúvidas dos Prestadores de Serviços do Agronegócio
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              Respostas claras sobre como transformar seu profissionalismo e precisão
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                question: "Como a IA garante preços assertivos para minha área de atuação no agronegócio?",
                answer: "Nossa IA foi treinada especificamente com dados do agronegócio brasileiro, considerando especificidades regionais, sazonalidade e características únicas do setor. Cada preço é calculado com base em dados reais, eliminando o 'chute' e dando embasamento técnico para suas cobranças."
              },
              {
                question: "As propostas realmente vão me fazer parecer mais profissional?",
                answer: "Absolutamente! Nossas propostas incluem análises técnicas detalhadas, justificativas embasadas, cálculos regionalizados e apresentação visual impecável. Seus clientes vão perceber imediatamente o aumento no seu nível de profissionalismo."
              },
              {
                question: "A ferramenta funciona para todos os tipos de serviços agropecuários?",
                answer: "Sim! O AgroPricing é desenvolvido para atender todo o espectro de prestadores de serviços do agronegócio brasileiro, considerando as particularidades e complexidades específicas do setor, independente da sua área de especialização."
              },
              {
                question: "Como posso ter certeza de que não vou mais errar nos preços?",
                answer: "A IA utiliza dados regionais precisos, considera fatores específicos do agronegócio e oferece cálculos automatizados. Você terá justificativa técnica para cada valor, eliminando a insegurança e o medo de precificar incorretamente."
              },
              {
                question: "E se meus clientes questionarem os valores mais altos?",
                answer: "Com o AgroPricing, você terá embasamento técnico completo para justificar seus preços. As propostas incluem análises detalhadas que demonstram o valor do seu trabalho especializado no agronegócio."
              },
              {
                question: "Quanto tempo leva para ver resultados na minha credibilidade?",
                answer: "A transformação é imediata! Na primeira proposta gerada, seus clientes já percebem o aumento de profissionalismo. Em 30 dias, você estará estabelecido como referência técnica na sua região."
              }
            ].map((faq, index) => {
              const isOpen = openFAQs.includes(index);
              return (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 px-2 sm:px-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-3 sm:p-6 flex items-start justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-xl sm:rounded-2xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight pr-2">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isOpen 
                          ? 'border-purple-500 bg-purple-50 text-purple-600 rotate-180' 
                          : 'border-gray-300 bg-gray-50 text-gray-400 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-500'
                      }`}>
                        <svg 
                          className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  <div 
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-3 sm:px-6 pb-3 sm:pb-6 pt-0">
                      <p className="text-xs sm:text-base text-gray-600 leading-relaxed px-1 sm:px-0">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* Formulário Final - Lista de Espera */}
      <section id="waitlist" className="py-6 sm:py-10 lg:py-16 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Garanta Seu Acesso com <span className="text-yellow-300">50% de Desconto</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-purple-100 mb-4 sm:mb-6 px-1">
              Seja um dos primeiros 100 consultores a usar nossa IA!
            </p>

            {/* Contador de Tempo - Elemento Principal */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto">
              <div className="text-xs sm:text-sm text-purple-100 mb-2 font-medium">OFERTA EXPIRA EM:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 text-center">
                {[
                  { label: 'Dias', value: timeLeft.days },
                  { label: 'Horas', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Seg', value: timeLeft.seconds }
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/20 rounded-md sm:rounded-lg p-1.5 sm:p-2 lg:p-3">
                    <div className="text-base sm:text-lg lg:text-2xl font-bold text-white">{value.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-purple-100">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Campos Principais - Layout Mobile-First */}
              <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                      fieldsTouched.name && formErrors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Seu nome completo"
                  />
                  {fieldsTouched.name && formErrors.name && (
                    <div className="text-xs text-red-500 mt-1">{formErrors.name}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                      fieldsTouched.email && formErrors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="seu@email.com"
                  />
                  {fieldsTouched.email && formErrors.email && (
                    <div className="text-xs text-red-500 mt-1">{formErrors.email}</div>
                  )}
                </div>
              </div>

              {/* Campo WhatsApp - Sempre Visível e Obrigatório */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                    fieldsTouched.phone && formErrors.phone ? 'border-red-500' : ''
                  }`}
                  placeholder="(11) 99999-9999"
                />
                {fieldsTouched.phone && formErrors.phone && (
                  <div className="text-xs text-red-500 mt-1">{formErrors.phone}</div>
                )}
              </div>





              {/* Botão de Envio com Loading */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-3 sm:py-3.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:transform-none active:scale-95 min-h-[44px] text-base ${
                  isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </div>
                ) : (
                  'Garantir Meu Acesso'
                )}
              </button>

              {/* Status do Envio */}
              {submitStatus && (
                <div className={`p-4 rounded-lg text-center ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}
            </form>


          </div>
        </div>
      </section>

      {/* Footer Clean */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Contato */}
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm text-gray-500">
                <a href="mailto:contato@trimobe.com" className="hover:text-purple-600 transition-colors duration-300">
                  contato@trimobe.com
                </a>
              </p>
            </div>

            {/* Links Legais e Redes Sociais */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
              {/* Links Legais */}
              <div className="flex items-center space-x-4 text-xs sm:text-sm">
                <button 
                  type="button"
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="text-gray-500 hover:text-purple-600 transition-colors duration-300"
                >
                  Política de Privacidade
                </button>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300">
                  Termos de Uso
                </a>
              </div>

              {/* Redes Sociais */}
              <div className="flex items-center space-x-3">
                <a 
                  href="https://linkedin.com/company/trimobe" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/trimobe" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Política de Privacidade */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Política de Privacidade</h2>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6 text-sm sm:text-base text-gray-600">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Coleta de Dados</h3>
                <p className="mb-3">
                  Coletamos apenas as informações necessárias para fornecer nossos serviços: nome, email, telefone, estado e área de atuação profissional.
                </p>
                <p>
                  Todos os dados são criptografados com AES-256 e armazenados em servidores seguros no Brasil, em conformidade com a LGPD.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Uso dos Dados</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Comunicação sobre o lançamento do AgroPricing Pro</li>
                  <li>Envio de conteúdo educativo relevante ao agronegócio</li>
                  <li>Personalização da experiência na plataforma</li>
                  <li>Análises estatísticas agregadas (sem identificação pessoal)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Proteção de Dados</h3>
                <p className="mb-3">
                  Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
                <p>
                  Nossos servidores utilizam certificação SSL/TLS, backup automático e monitoramento 24/7.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Seus Direitos</h3>
                <p className="mb-3">Conforme a LGPD, você tem direito a:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou inexatos</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar o consentimento a qualquer momento</li>
                  <li>Portabilidade dos dados para outro fornecedor</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Contato</h3>
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco através do email: 
                  <span className="font-medium text-purple-600"> privacidade@agropricingpro.com.br</span>
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Atualizações</h3>
                <p>
                  Esta política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas através do email cadastrado.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </section>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
