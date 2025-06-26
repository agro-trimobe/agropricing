'use client';

import React, { useState, useEffect } from 'react';

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
    company: '',
    experience: '',
    focus: '',
    phone: '',
    state: '',
    terms: false
  });
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

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

  // Função para rolar até a lista de espera
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simular envio (implementar API real depois)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus({
        type: 'success',
        message: '🎉 Parabéns! Você foi adicionado à lista VIP com 50% de desconto!'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        experience: '',
        focus: '',
        phone: '',
        state: '',
        terms: false
      });
      
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Erro ao processar sua inscrição. Tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">AgroPricing</span>
            </div>
            <button 
              onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-purple-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              🔥 50% OFF
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-purple-50 to-purple-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-0 mb-8">
                <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  🚀 Pré-lançamento - Acesso Antecipado
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Pare de Perder 
                <span className="text-purple-600"> Dinheiro </span>
                com Precificação
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed">
                IA especializada que calcula preços justos e gera propostas profissionais 
                para consultoria agronômica em minutos, não horas.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-lg text-gray-800">Dados regionalizados de 5.570 municípios</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-lg text-gray-800">Economize 15 horas por mês</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-lg text-gray-800">ROI comprovado na primeira proposta</span>
                </div>
              </div>
              
              {/* Countdown Timer */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <div className="text-red-700 font-semibold text-lg mb-3">⏰ Oferta por tempo limitado - 50% OFF!</div>
                <div className="flex space-x-4 justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{timeLeft.days}</div>
                    <div className="text-sm text-red-500">Dias</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{timeLeft.hours}</div>
                    <div className="text-sm text-red-500">Horas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{timeLeft.minutes}</div>
                    <div className="text-sm text-red-500">Min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{timeLeft.seconds}</div>
                    <div className="text-sm text-red-500">Seg</div>
                  </div>
                </div>
              </div>

              {/* CTA Principal Único */}
              <div className="text-center">
                <button 
                  onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-12 py-6 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl text-xl"
                >
                  🔥 Garantir 50% de Desconto Agora
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  ✅ Sem compromisso • ✅ Lista de espera gratuita • ✅ Acesso prioritário
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Proposta AgroPricing</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Em 3 segundos</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-purple-500 rounded-full w-3/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Análise de Solo</span>
                      <span className="text-sm font-medium">R$ 2.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Consultoria Técnica</span>
                      <span className="text-sm font-medium">R$ 4.200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Relatório Final</span>
                      <span className="text-sm font-medium">R$ 1.800</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-purple-600">R$ 8.500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problemas Section */}
      <section id="problems" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              3 Erros Fatais que Consultores Cometem na Precificação
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Pesquisa com 500+ consultores brasileiros revelou os principais obstáculos para uma precificação rentável
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 border border-red-200 rounded-xl">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-xl sm:text-2xl">💸</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-red-600 mb-3">Preços Abaixo do Mercado</h3>
              <p className="text-sm sm:text-base text-gray-600">
                87% dos consultores no Sul cobram menos que o valor justo por medo de perder clientes
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 border border-yellow-200 rounded-xl">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 text-xl sm:text-2xl">⏰</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Horas Perdidas</h3>
              <p className="text-sm sm:text-base text-gray-600">
                15 horas/mês gastas criando propostas que poderiam ser automatizadas
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 border border-gray-200 rounded-xl sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-600 text-xl sm:text-2xl">😰</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Propostas Amadoras</h3>
              <p className="text-sm sm:text-base text-gray-600">
                72% perdem clientes por propostas mal estruturadas ou incompletas
              </p>
            </div>
          </div>

          {/* Soluções Preview */}
          <div className="mt-12 sm:mt-16 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
              Nossa IA Resolve Todos Esses Problemas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-green-50 p-4 sm:p-6 rounded-xl border border-green-200">
                <div className="text-green-600 text-2xl sm:text-3xl mb-2">✅</div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Preços Regionalizados</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Dados de mercado de todos os 5.570 municípios brasileiros
                </p>
              </div>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border border-blue-200">
                <div className="text-blue-600 text-2xl sm:text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Automação Total</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  De horas para minutos na criação de propostas profissionais
                </p>
              </div>
              <div className="bg-purple-50 p-4 sm:p-6 rounded-xl border border-purple-200 sm:col-span-2 lg:col-span-1">
                <div className="text-purple-600 text-2xl sm:text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Propostas Profissionais</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Templates dinâmicos que impressionam e convertem mais clientes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona - Seção reorganizada */}
      <section id="demo" className="py-12 sm:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Como Funciona o <span className="text-purple-600">AgroPricing Pro</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Em 3 passos simples, nossa IA transforma sua descrição em uma proposta completa e profissional
            </p>
          </div>

          {/* Processo em 3 etapas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Etapa 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Descreva o Projeto</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Digite em linguagem natural o que seu cliente precisa: tipo de consultoria, área, localização e objetivos.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <p className="text-sm text-gray-700 italic">
                  &quot;Consultoria em agricultura de precisão para 800 hectares de milho em Primavera do Leste/MT&quot;
                </p>
              </div>
            </div>

            {/* Etapa 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">IA Analisa e Calcula</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nossa IA especializada analisa a complexidade, consulta dados regionais e calcula automaticamente horas e preços.
              </p>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg shadow-md">
                <p className="text-sm font-medium text-purple-700">
                  ⚡ Processamento em 3 segundos<br/>
                  📊 Dados regionalizados do MT<br/>
                  🎯 180h × R$ 165/h = R$ 29.700
                </p>
              </div>
            </div>

            {/* Etapa 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proposta Profissional</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Receba uma proposta completa com escopo, cronograma, ROI calculado e formatação profissional para enviar ao cliente.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-md border border-green-200">
                <p className="text-sm text-green-700 font-medium">
                  ✅ Proposta completa gerada<br/>
                  📈 ROI: 506% (Payback 2,1 meses)<br/>
                  📄 Pronta para exportar em PDF
                </p>
              </div>
            </div>
          </div>

          {/* Benefícios Quantificados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">3s</div>
              <div className="text-sm text-gray-600">Tempo de processamento</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">15h</div>
              <div className="text-sm text-gray-600">Economizadas por mês</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Precisão regionalizada</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">27</div>
              <div className="text-sm text-gray-600">Estados cobertos</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button 
              onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              🚀 Quero Experimentar Agora
            </button>
          </div>
        </div>
      </section>

      {/* Veja em Ação - Demonstração Visual */}
      <section id="demo-visual" className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Veja Nossa IA em <span className="text-purple-600">Ação</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              De uma descrição simples para uma proposta completa em segundos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Input Side */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 order-2 lg:order-1">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg mr-3 flex-shrink-0"></div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">Sua Descrição</h3>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-700 italic text-sm sm:text-base">
                    &ldquo;Consultoria para implementação de agricultura de precisão em fazenda de milho de 800 hectares em Primavera do Leste/MT. Cliente quer aumentar produtividade e reduzir custos com defensivos.&rdquo;
                  </p>
                </div>
              </div>

              {/* Informações Detectadas */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">🔍 IA Detectou:</h4>
                <div className="space-y-2">
                  {['Tipo: Agricultura de Precisão', 'Área: 800 hectares', 'Local: Primavera do Leste/MT', 'Foco: Produtividade + Economia'].map((item, index) => (
                    <div key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cálculo Automático */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">⚡ Cálculo Automático:</h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span>Tipo:</span>
                    <span className="font-medium">Agricultura de Precisão</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complexidade:</span>
                    <span className="font-medium">Alta</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Área:</span>
                    <span className="font-medium">800 hectares</span>
                  </div>
                  <div className="flex justify-between font-bold text-base sm:text-lg">
                    <span>Total sugerido:</span>
                    <span className="text-purple-600">R$ 29.700</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Side - Proposta Gerada */}
            <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 border border-gray-200 relative order-1 lg:order-2">
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
                <div className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                  ✓ Gerado em 3 segundos
                </div>
              </div>

              {/* Header da Proposta */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6 mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-lg">A</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">PROPOSTA COMERCIAL</h3>
                      <p className="text-xs text-gray-600">Consultoria em Agricultura de Precisão</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">#2024-001</div>
                    <div className="text-xs text-gray-500">25/06/2024</div>
                  </div>
                </div>
              </div>

              {/* Resumo Executivo */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">📊 Resumo Executivo</h4>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row">
                      <span className="text-gray-600">Área:</span>
                      <span className="sm:ml-2 font-medium">800 hectares</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <span className="text-gray-600">Região:</span>
                      <span className="sm:ml-2 font-medium">Primavera do Leste/MT</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <span className="text-gray-600">Cultura:</span>
                      <span className="sm:ml-2 font-medium">Milho</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="sm:ml-2 font-medium">Agricultura de Precisão</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Escopo de Trabalho */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">🎯 Escopo de Trabalho</h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  {[
                    'Análise e mapeamento de variabilidade do solo',
                    'Implementação de sistema de agricultura de precisão',
                    'Treinamento da equipe técnica',
                    'Acompanhamento e otimização do primeiro ciclo'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Valor e ROI */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">💰 Investimento</h4>
                    <div className="text-lg sm:text-2xl font-bold text-purple-600">R$ 29.700</div>
                    <div className="text-xs text-gray-600">180 horas × R$ 165/h (MT)</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">📈 ROI Estimado</h4>
                    <div className="text-lg sm:text-2xl font-bold text-green-600">506%</div>
                    <div className="text-xs text-gray-600">Payback em 2,1 meses</div>
                  </div>
                </div>
              </div>

              {/* Cronograma */}
              <div className="mb-3 sm:mb-4">
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">📅 Cronograma</h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  {[
                    ['Fase 1 - Diagnóstico e Planejamento:', '30 dias'],
                    ['Fase 2 - Implementação:', '60 dias'],
                    ['Fase 3 - Acompanhamento:', '90 dias']
                  ].map(([phase, duration], index) => (
                    <div key={index} className="flex justify-between">
                      <span>{phase}</span>
                      <span className="font-medium">{duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer da Proposta */}
              <div className="text-center pt-3 sm:pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Proposta válida por 30 dias • Gerada automaticamente via AgroPricing Pro
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-12">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Gere Propostas Assim em <span className="text-purple-600">Segundos</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Pare de perder horas criando propostas manualmente. Com o AgroPricing Pro, você foca no que realmente importa: fechar negócios e atender clientes.
              </p>
              <button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                🚀 Quero Testar Gratuitamente
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Exemplo de Proposta Profissional */}
      <section id="proposal" className="py-12 sm:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Veja um Exemplo da <span className="text-purple-600">Proposta Profissional</span> Gerada
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Em segundos, nossa IA transforma sua descrição em uma proposta completa e profissional
            </p>
          </div>

          {/* Benefícios Quantificados */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">112x</div>
              <div className="text-xs sm:text-sm text-gray-600">Mais rápido que processo manual</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">15h</div>
              <div className="text-xs sm:text-sm text-gray-600">Economizadas por mês em média</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">40%</div>
              <div className="text-xs sm:text-sm text-gray-600">Aumento na taxa de conversão</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">27</div>
              <div className="text-xs sm:text-sm text-gray-600">Estados com dados regionalizados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ferramentas Especializadas - Versão Enxuta */}
      <section id="tools" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              3 Ferramentas Essenciais para <span className="text-purple-600">Consultoria Rural</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Solução enxuta e focada que transforma horas de trabalho em minutos de eficiência
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="group p-6 sm:p-8 border border-gray-200 rounded-xl hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">IA Especializada em Agronegócio</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed text-center sm:text-left">
                Motor de IA treinado especificamente com dados do agronegócio brasileiro, classificando automaticamente complexidade e especificidades regionais.
              </p>
              <div className="space-y-2">
                {[
                  'Dados regionalizados por estado/microrregião',
                  'Classificação automática de complexidade',
                  'Conhecimento específico do agronegócio'
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-xs sm:text-sm text-purple-600">
                    <span className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="group p-6 sm:p-8 border border-gray-200 rounded-xl hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">Precificação Inteligente</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed text-center sm:text-left">
                Cálculo automático de horas necessárias e preços justos baseado em dados reais de mercado, com justificativas técnicas regionalizadas.
              </p>
              <div className="space-y-2">
                {[
                  'Cálculo automático de horas necessárias',
                  'Preços baseados em dados reais de mercado',
                  'Justificativas técnicas incluídas'
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-xs sm:text-sm text-green-600">
                    <span className="w-3 h-3 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="group p-6 sm:p-8 border border-gray-200 rounded-xl hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14,2A3,3 0 0,1 17,5V11A3,3 0 0,1 14,14A3,3 0 0,1 11,11V5A3,3 0 0,1 14,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">Propostas Profissionais Dinâmicas</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed text-center sm:text-left">
                Geração automática de propostas personalizadas via IA (sem templates rígidos), incluindo ROI calculado e cronograma detalhado.
              </p>
              <div className="space-y-2">
                {[
                  'Geração dinâmica via IA (sem templates)',
                  'Cálculo de ROI automático incluído',
                  'Export profissional em PDF'
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-xs sm:text-sm text-blue-600">
                    <span className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seção de Simplicidade */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-flex items-center bg-purple-50 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-purple-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
              </svg>
              <span className="text-xs sm:text-sm font-medium text-purple-700">
                Solução enxuta e focada: de horas para minutos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Credibilidade - Depoimentos */}
      <section id="testimonials" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Consultores que <span className="text-purple-600">Transformaram</span> seus Negócios
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como o AgroPricing Pro está revolucionando a consultoria agrícola no Brasil
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-0 sm:mb-4 mr-3 sm:mr-4 flex-shrink-0">
                  <span className="text-white text-sm sm:text-lg">RS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Ricardo Silva</h4>
                  <p className="text-xs text-gray-600">Consultor em Agropecuária - RS</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3 sm:mb-4">★★★★★</div>
              <p className="text-sm sm:text-base text-gray-600 italic mb-3 sm:mb-4">
                &ldquo;Reduzi 80% do tempo gasto em propostas. Antes levava 6 horas, agora faço em 1 hora com muito mais precisão nos valores.&rdquo;
              </p>
              <div className="text-xs sm:text-sm text-purple-600 font-medium">
                ✓ Economiza 20 horas/mês
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-0 sm:mb-4 mr-3 sm:mr-4 flex-shrink-0">
                  <span className="text-white text-sm sm:text-lg">MC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Maria Carvalho</h4>
                  <p className="text-xs text-gray-600">Eng. Agrônoma - MT</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3 sm:mb-4">★★★★★</div>
              <p className="text-sm sm:text-base text-gray-600 italic mb-3 sm:mb-4">
                &ldquo;Minha conversão passou de 30% para 65%. Os clientes ficam impressionados com a precisão dos cálculos regionais.&rdquo;
              </p>
              <div className="text-xs sm:text-sm text-green-600 font-medium">
                ✓ Conversão aumentou 117%
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-0 sm:mb-4 mr-3 sm:mr-4 flex-shrink-0">
                  <span className="text-white text-sm sm:text-lg">JR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">João Rodrigues</h4>
                  <p className="text-xs text-gray-600">Consultor Rural - GO</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-3 sm:mb-4">★★★★★</div>
              <p className="text-sm sm:text-base text-gray-600 italic mb-3 sm:mb-4">
                &ldquo;Finalmente posso cobrar o valor justo. A ferramenta me deu a confiança que faltava para precificar corretamente.&rdquo;
              </p>
              <div className="text-xs sm:text-sm text-blue-600 font-medium">
                ✓ Receita aumentou 45%
              </div>
            </div>
          </div>

          {/* Estatísticas Sociais */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">+500</div>
              <div className="text-xs sm:text-sm text-gray-600">Consultores usando</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">4.9/5</div>
              <div className="text-xs sm:text-sm text-gray-600">Avaliação média</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">15k+</div>
              <div className="text-xs sm:text-sm text-gray-600">Propostas geradas</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">78%</div>
              <div className="text-xs sm:text-sm text-gray-600">Taxa de conversão</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Preços */}
      <section id="pricing" className="py-12 sm:py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
              </svg>
              Oferta por Tempo Limitado
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Seja um dos <span className="text-purple-600">Primeiros</span> a Revolucionar sua Consultoria
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Lista de espera exclusiva com <strong>50% de desconto</strong> no primeiro ano
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-500 relative overflow-hidden transform hover:scale-105 transition-all duration-300">
              {/* Badge de Destaque */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  🚀 MAIS POPULAR
                </div>
              </div>
              
              <div className="p-6 sm:p-8 pt-8 sm:pt-12">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">AgroPricing Pro</h3>
                  <div className="text-4xl sm:text-5xl font-bold text-purple-600 mb-2">
                    R$ 124
                    <span className="text-lg sm:text-xl text-gray-500 font-normal">/mês</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-sm sm:text-base text-gray-500 line-through">R$ 249</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-50%</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Lista de espera - primeiro ano</p>
                </div>

                {/* Features */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Propostas profissionais geradas via IA</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Precificação regionalizada automatizada</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Cálculo de ROI automático incluído</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Até 25 propostas/mês</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Suporte via WhatsApp + garantia 30 dias</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={scrollToWaitlist}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🚀 Garantir Minha Vaga com 50% Off
                </button>
                
                <div className="text-center mt-4 sm:mt-6">
                  <p className="text-xs sm:text-sm text-gray-500">
                    ⏰ Últimas {100 - subscriberCount} vagas disponíveis
                  </p>
                  <p className="text-xs sm:text-sm text-purple-600 font-medium mt-1 sm:mt-2">
                    🎯 Sem compromisso • Cancele quando quiser
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Garantia e Segurança */}
          <div className="text-center mt-8 sm:mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-xs text-gray-500">
              <span>✅ Sem spam</span>
              <span>✅ Cancele quando quiser</span>
              <span>✅ Garantia 30 dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section id="faq" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Perguntas <span className="text-purple-600">Frequentes</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Esclarecemos as principais dúvidas sobre o AgroPricing Pro
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                🤖 Como a IA funciona para precificar projetos agrícolas?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Nossa IA foi treinada com dados de milhares de projetos do agronegócio brasileiro. Ela analisa o tipo de projeto, região, complexidade e dados históricos para calcular automaticamente horas necessárias e valores regionalizados. O sistema aprende continuamente com cada proposta gerada.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                📊 Os dados regionais são realmente precisos?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Sim! Trabalhamos com dados atualizados do IBGE, Sindicatos Rurais, CREA e pesquisas de mercado. Nossa base de dados é atualizada mensalmente e considera variações por estado, microrregião e tipo de cultura/criação.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                ⏱️ Quanto tempo economizo realmente?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Em média, nossos usuários economizam 15-20 horas por mês. Uma proposta que antes levava 4-6 horas para ser criada, agora é gerada em poucos minutos com a mesma qualidade (ou superior) e precisão técnica.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                💰 Posso personalizar os valores sugeridos?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Absolutamente! A IA fornece uma base sólida, mas você tem controle total para ajustar valores conforme sua experiência, relacionamento com o cliente ou particularidades do projeto. O sistema aprende com seus ajustes.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                🔒 Meus dados e dos clientes ficam seguros?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Segurança é nossa prioridade. Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              <p>
                Nossos servidores utilizam certificação SSL/TLS, backup automático e monitoramento 24/7.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                📱 Funciona no celular e tablet?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Sim! O AgroPricing Pro é 100% responsivo e funciona perfeitamente em qualquer dispositivo. Você pode criar propostas no campo, usando apenas seu smartphone ou tablet com conexão à internet.
              </p>
            </div>
          </div>

          {/* CTA Final do FAQ */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Ainda tem dúvidas? Nossa equipe está pronta para ajudar!
            </p>
            <button 
              onClick={scrollToWaitlist}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              💬 Entrar na Lista VIP
            </button>
          </div>
        </div>
      </section>

      {/* Formulário Final - Lista de Espera */}
      <section id="waitlist" className="py-12 sm:py-20 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Garanta sua Vaga na <span className="text-yellow-300">Lista VIP</span>
            </h2>
            <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
              Seja um dos primeiros a revolucionar sua consultoria agrícola com desconto exclusivo de 50%
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Profissional *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Experiência na Consultoria Agrícola *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base bg-white"
                  >
                    <option value="">Selecione sua experiência</option>
                    <option value="iniciante">Iniciante (0-2 anos)</option>
                    <option value="intermediario">Intermediário (3-5 anos)</option>
                    <option value="experiente">Experiente (6-10 anos)</option>
                    <option value="veterano">Veterano (10+ anos)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="focus" className="block text-sm font-medium text-gray-700 mb-2">
                  Principal Área de Atuação
                </label>
                <select
                  id="focus"
                  name="focus"
                  value={formData.focus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base bg-white"
                >
                  <option value="">Selecione a área principal</option>
                  <option value="agricultura">Agricultura</option>
                  <option value="pecuaria">Pecuária</option>
                  <option value="ambas">Agricultura e Pecuária</option>
                  <option value="agronegocio">Agronegócio Geral</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base bg-white"
                >
                  <option value="">Selecione o estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>

              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                  Concordo em receber comunicações sobre o AgroPricing Pro e declaro estar ciente da{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyPolicy(true)}
                    className="text-purple-600 hover:text-purple-500 underline"
                  >
                    Política de Privacidade
                  </button>
                  *
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none"
              >
                {isSubmitting ? '⏳ Processando...' : '🚀 Garantir Minha Vaga VIP'}
              </button>

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

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-4">
                🔒 Seus dados estão protegidos e não serão compartilhados
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-500">
                <span>✅ Sem spam</span>
                <span>✅ Cancele quando quiser</span>
                <span>✅ Garantia 30 dias</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Logo e Descrição */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm sm:text-lg">A</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold">AgroPricing Pro</span>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-md">
                A primeira plataforma de IA especializada em precificação para consultores do agronegócio brasileiro.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm8 7a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Plataforma */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Plataforma</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#features" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">Funcionalidades</a></li>
                <li><a href="#pricing" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">Preços</a></li>
                <li><a href="#faq" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">Documentação</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Legal</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button 
                    onClick={() => setShowPrivacyPolicy(true)}
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 text-left"
                  >
                    Política de Privacidade
                  </button>
                </li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">Termos de Uso</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">LGPD</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">Contato</a></li>
              </ul>
            </div>
          </div>

          {/* Badges de Segurança */}
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-gray-500">
                <span>✅ Sem spam</span>
                <span>✅ Cancele quando quiser</span>
                <span>✅ Garantia 30 dias</span>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs sm:text-sm text-gray-400">
                  2024 AgroPricing Pro. Todos os direitos reservados.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  CNPJ: 00.000.000/0001-00 • Suporte: contato@agropricingpro.com.br
                </p>
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
