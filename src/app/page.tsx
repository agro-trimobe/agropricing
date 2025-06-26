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
  const [showExpandedForm, setShowExpandedForm] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [fieldsTouched, setFieldsTouched] = useState<{[key: string]: boolean}>({});

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
    const { name, value } = e.target;
    setFieldsTouched(prev => ({ ...prev, [name]: true }));
    handleFieldValidation(name, value);
  };

  // Cálculo de progresso do formulário
  const calculateProgress = (): number => {
    const requiredFields = ['name', 'email', 'phone'];
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData] && !formErrors[field]);
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  const getProgressMessage = (): string => {
    const progress = calculateProgress();
    if (progress === 0) return 'Vamos começar! Preencha seus dados básicos';
    if (progress < 100) return `Quase lá! ${100 - progress}% restante`;
    return 'Perfeito! Pronto para garantir sua vaga';
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
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
      <section id="hero" className="bg-gradient-to-br from-purple-50 to-purple-100 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                🚀 Lançamento Oficial - Lista VIP Aberta
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Transforme-se no Prestador de Serviços <span className="text-purple-600">Mais Profissional</span><br className="hidden sm:block" />
              e Assertivo do Agronegócio
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
              Propostas comerciais impressionantes com precificação cientificamente embasada - 
              <strong>nunca mais calcule "de cabeça"</strong> ou perca dinheiro por precificar errado
            </p>

            {/* Benefícios Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
              <div className="flex flex-col items-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">112x</div>
                <div className="text-sm sm:text-base text-gray-700 text-center">Mais rápido que precificação manual</div>
              </div>
              <div className="flex flex-col items-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">15h</div>
                <div className="text-sm sm:text-base text-gray-700 text-center">Economizadas por mês</div>
              </div>
              <div className="flex flex-col items-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">40%</div>
                <div className="text-sm sm:text-base text-gray-700 text-center">Mais conversões</div>
              </div>
            </div>

            {/* CTAs Principais */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-10">
              <button 
                onClick={() => scrollToWaitlist()}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Transformar meu Profissionalismo Agora →
              </button>
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-purple-600 hover:text-purple-700 font-semibold text-base sm:text-lg underline transition-colors duration-300"
              >
                Ver Como Funciona a Transformação
              </button>
            </div>

            <p className="text-sm sm:text-base text-gray-500">
              ✅ Teste grátis por 7 dias • ✅ Cancele quando quiser • ✅ Suporte especializado
            </p>
          </div>
        </div>
      </section>

      {/* Problemas Section */}
      <section id="problems" className="bg-red-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
              2 Erros Fatais dos Prestadores de Serviços do Agronegócio
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              83% perdem clientes por propostas amadoras e 76% calculam preços "de cabeça" perdendo dinheiro
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Erro 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-red-500">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-red-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl">
                  1
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3 sm:ml-4">
                  Propostas Amadoras
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Entregam propostas mal estruturadas, sem embasamento técnico, que não transmitem profissionalismo nem justificam os valores cobrados.
              </p>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Perco clientes porque minhas propostas parecem caseiras perto da concorrência mais preparada..."
                </p>
              </div>
            </div>

            {/* Erro 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-red-500">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-red-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl">
                  2
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3 sm:ml-4">
                  Precificação "de Cabeça"
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Calculam preços baseados em intuição, sem considerar especificidades regionais do agronegócio, perdendo dinheiro ou perdendo clientes.
              </p>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Sempre fico na dúvida se estou cobrando certo... às vezes perco dinheiro, às vezes perco o cliente..."
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <p className="text-xl sm:text-2xl font-bold text-red-600 mb-4 sm:mb-6">
              Resultado: Status de amador e lucros reduzidos
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              Enquanto isso, profissionais com propostas impressionantes e preços assertivos dominam o mercado
            </p>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona - Versão Consolidada e Melhorada */}
      <section id="demo" className="py-16 sm:py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Veja Como Funciona
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Em apenas 3 etapas simples, nossa IA especializada transforma sua descrição em uma proposta profissional completa
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              ⚡ Gerado em menos de 3 segundos
            </div>
          </div>

          {/* Demonstração Visual Lado a Lado */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Input do Usuário */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  1. Você Descreve Seu Projeto
                </h3>
                <p className="text-gray-600 mb-6">
                  Digite naturalmente o que seu cliente precisa. Nossa IA entende o contexto automaticamente.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-500 ml-2">Input do Cliente</span>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  &quot;Preciso de uma consultoria para otimizar a produtividade da minha fazenda de soja no Mato Grosso. 
                  São 500 hectares e quero implementar agricultura de precisão para aumentar o lucro por hectare.&quot;
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">IA detecta automaticamente:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">🌾 Cultura: Soja</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">📍 Local: MT</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">📊 Foco: Produtividade</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">⚙️ Tech: Precisão</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output da IA */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  2. IA Gera Proposta Completa
                </h3>
                <p className="text-gray-600 mb-6">
                  Proposta profissional com precificação regionalizada, cronograma e análise de ROI automática.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg text-gray-900">Proposta Comercial</h4>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">GERADO AUTOMATICAMENTE</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Consultoria em Agricultura de Precisão - Soja MT</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">📋 Escopo de Trabalho</h5>
                    <ul className="text-gray-600 space-y-1 text-xs">
                      <li>• Análise de solo georeferenciada (500ha)</li>
                      <li>• Mapeamento de produtividade histórica</li>
                      <li>• Implementação de taxa variável</li>
                      <li>• Monitoramento safra 2024/25</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">💰 Investimento</span>
                      <span className="text-lg font-bold text-purple-600">R$ 29.700</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      180h × R$ 165/h (valor regionalizado MT)
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-green-800">📈 ROI Estimado</span>
                      <span className="text-lg font-bold text-green-600">506%</span>
                    </div>
                    <div className="text-xs text-green-600">
                      Payback: 2,1 meses | Retorno: R$ 150.000/ano
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">⏱️ Cronograma</h5>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Fase 1 (30 dias): Análise e diagnóstico</div>
                      <div>Fase 2 (60 dias): Implementação</div>
                      <div>Fase 3 (90 dias): Monitoramento</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefícios Quantificados */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Resultados Comprovados
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">112x</div>
                <div className="text-sm text-gray-600">Mais rápido que planilhas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15h</div>
                <div className="text-sm text-gray-600">Economizadas por mês</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
                <div className="text-sm text-gray-600">Taxa de conversão</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">27</div>
                <div className="text-sm text-gray-600">Estados cobertos</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection('waitlist')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚀 Quero Testar Gratuitamente
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Sem cartão de crédito • Teste por 7 dias grátis
            </p>
          </div>
        </div>
      </section>

      {/* Demonstração Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              AgroPricing: Profissionalismo + Precisão
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              A única solução que te transforma no profissional mais respeitado E mais assertivo do agronegócio brasileiro
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Antes vs Depois */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                Transformação Completa
              </h3>
              
              {/* ANTES */}
              <div className="bg-red-50 p-4 sm:p-6 rounded-xl border-l-4 border-red-500 mb-6">
                <h4 className="font-bold text-red-600 mb-3 flex items-center">
                  <span className="text-lg sm:text-xl mr-2">❌</span>
                  ANTES (Profissional Comum)
                </h4>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  <li>• Calcula preços "de cabeça" sem embasamento</li>
                  <li>• Propostas simples feitas no Word</li>
                  <li>• Compete por preço baixo</li>
                  <li>• Clientes questionam os valores</li>
                  <li>• Status de prestador comum</li>
                </ul>
              </div>

              {/* DEPOIS */}
              <div className="bg-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-500">
                <h4 className="font-bold text-green-600 mb-3 flex items-center">
                  <span className="text-lg sm:text-xl mr-2">✅</span>
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

              <div className="mt-6 sm:mt-8 p-4 bg-purple-50 rounded-xl">
                <p className="text-center font-bold text-purple-600 text-base sm:text-lg">
                  Resultado: <span className="text-gray-900">Mais Respeito + Mais Lucro</span>
                </p>
              </div>
            </div>

            {/* Demonstração Visual */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                Exemplo Prático: Prestação de Serviços Agropecuários
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Serviço:</p>
                  <p className="text-gray-600 text-sm sm:text-base">Consultoria técnica especializada para propriedade rural de 500ha no interior de Goiás</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                    <p className="font-semibold text-red-600 text-xs sm:text-sm">Método Antigo</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">R$ 8.500</p>
                    <p className="text-xs sm:text-sm text-gray-600">"Calculei de cabeça"</p>
                  </div>
                  <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                    <p className="font-semibold text-green-600 text-xs sm:text-sm">Com AgroPricing</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">R$ 12.800</p>
                    <p className="text-xs sm:text-sm text-gray-600">Baseado em dados regionais</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                  <p className="font-bold text-yellow-700 text-center text-sm sm:text-base">
                    Diferença: <span className="text-green-600">+R$ 4.300 (50% mais lucro)</span>
                  </p>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs sm:text-sm text-gray-600 italic">
                    + Proposta profissional que impressiona o cliente
                  </p>
                </div>
              </div>
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
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="group p-6 sm:p-8 border border-gray-200 rounded-xl hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="group p-6 sm:p-8 border border-gray-200 rounded-xl hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,2A10,10 0 0,0 3,12A10,10 0 0,0 13,22A10,10 0 0,0 23,12A10,10 0 0,0 13,2Z"/>
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
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
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
              Prestadores de Serviços que se Transformaram em Referência
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Profissionais do agronegócio que agora são respeitados e cobram o que merecem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Depoimento 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-blue-600 font-bold text-sm sm:text-base">JS</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">João Silva</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Prestador de Serviços Agropecuários - MT</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
                "Parei de 'chutar' preços e agora tenho propostas tão profissionais que meus clientes me veem como o especialista mais preparado da região. Minha margem de lucro aumentou 45%."
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400 text-sm sm:text-base">
                  ⭐⭐⭐⭐⭐
                </div>
                <span className="text-gray-600 text-xs sm:text-sm ml-2">Verified</span>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-green-600 font-bold text-sm sm:text-base">MS</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">Maria Santos</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Profissional do Agronegócio - RS</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
                "Nunca mais tive medo de precificar errado. Minhas propostas são tão bem fundamentadas que os clientes aceitam sem questionar. Outros prestadores me perguntam como faço propostas tão profissionais."
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400 text-sm sm:text-base">
                  ⭐⭐⭐⭐⭐
                </div>
                <span className="text-gray-600 text-xs sm:text-sm ml-2">Verified</span>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-purple-600 font-bold text-sm sm:text-base">CF</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">Carlos Ferreira</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Consultor Agropecuário - GO</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
                "Meus clientes agora me veem como o profissional mais técnico da região. Minhas propostas são compartilhadas como exemplo de qualidade. Parei de competir por preço baixo."
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400 text-sm sm:text-base">
                  ⭐⭐⭐⭐⭐
                </div>
                <span className="text-gray-600 text-xs sm:text-sm ml-2">Verified</span>
              </div>
            </div>
          </div>

          {/* Estatísticas Sociais */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12 sm:py-16 rounded-2xl">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Transformação Real no Agronegócio Brasileiro
                </h3>
                <p className="text-lg sm:text-xl text-purple-100">
                  Prestadores de serviços agropecuários que elevaram seu patamar profissional
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    87%
                  </div>
                  <p className="text-sm sm:text-base text-purple-100">
                    Aumentaram margem de lucro em mais de 30%
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    92%
                  </div>
                  <p className="text-sm sm:text-base text-purple-100">
                    São vistos como mais profissionais pelos clientes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    78%
                  </div>
                  <p className="text-sm sm:text-base text-purple-100">
                    Nunca mais tiveram medo de precificar
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    95%
                  </div>
                  <p className="text-sm sm:text-base text-purple-100">
                    Recomendam como ferramenta essencial
                  </p>
                </div>
              </div>

              <div className="text-center mt-8 sm:mt-12">
                <p className="text-base sm:text-lg text-purple-100 italic">
                  "AgroPricing me transformou no profissional que sempre quis ser no agronegócio"
                </p>
                <p className="text-sm text-purple-200 mt-2">
                  Média das avaliações de 200+ prestadores de serviços agropecuários
                </p>
              </div>
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
                  <p className="text-xs text-gray-600">Lista de espera - primeiro ano</p>
                </div>

                {/* Features */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Propostas profissionais geradas via IA</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Precificação regionalizada automatizada</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Cálculo de ROI automático incluído</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Até 25 propostas/mês</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">Suporte via WhatsApp + garantia 30 dias</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={scrollToWaitlist}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Transformar meu Profissionalismo (50% OFF)
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

      {/* FAQ */}
      <section id="faq" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Dúvidas dos Prestadores de Serviços do Agronegócio
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Respostas claras sobre como transformar seu profissionalismo e precisão
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                🤖 Como a IA garante preços assertivos para minha área de atuação no agronegócio?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Nossa IA foi treinada especificamente com dados do agronegócio brasileiro, considerando especificidades regionais, sazonalidade e características únicas do setor. Cada preço é calculado com base em dados reais, eliminando o 'chute' e dando embasamento técnico para suas cobranças.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                📊 As propostas realmente vão me fazer parecer mais profissional?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Absolutamente! Nossas propostas incluem análises técnicas detalhadas, justificativas embasadas, cálculos regionalizados e apresentação visual impecável. Seus clientes vão perceber imediatamente o aumento no seu nível de profissionalismo.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                🌾 A ferramenta funciona para todos os tipos de serviços agropecuários?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Sim! O AgroPricing é desenvolvido para atender todo o espectro de prestadores de serviços do agronegócio brasileiro, considerando as particularidades e complexidades específicas do setor, independente da sua área de especialização.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                💸 Como posso ter certeza de que não vou mais errar nos preços?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                A IA utiliza dados regionais precisos, considera fatores específicos do agronegócio e oferece cálculos automatizados. Você terá justificativa técnica para cada valor, eliminando a insegurança e o medo de precificar incorretamente.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                📈 E se meus clientes questionarem os valores mais altos?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Com o AgroPricing, você terá embasamento técnico completo para justificar seus preços. As propostas incluem análises detalhadas que demonstram o valor do seu trabalho, facilitando a aceitação pelos clientes.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                🕒 Quanto tempo leva para ver resultados na minha credibilidade?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                A transformação é imediata! Na primeira proposta gerada, seus clientes já percebem o aumento de profissionalismo. Em 30 dias, você estará estabelecido como referência técnica na sua região.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Garanta Sua Vaga VIP com <span className="text-yellow-300">50% de Desconto</span>
            </h2>
            <p className="text-lg sm:text-xl text-purple-100 mb-8">
              Seja um dos primeiros 100 consultores a usar nossa IA. Oferta limitada por tempo!
            </p>
            
            {/* Elementos de Urgência */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
              <div className="flex items-center text-yellow-300 font-medium">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Restam {Math.max(0, 100 - Math.floor((Date.now() / 10000) % 85) - 15)} vagas
              </div>
              <div className="flex items-center text-yellow-300 font-medium">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Oferta válida até {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
              </div>
            </div>

            {/* Contador de Tempo */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <div className="text-sm text-purple-100 mb-2">OFERTA ESPECIAL EXPIRA EM:</div>
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Dias', value: timeLeft.days },
                  { label: 'Horas', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Seg', value: timeLeft.seconds }
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl sm:text-3xl font-bold text-white">{value.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-purple-100">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos Principais - Sempre Visíveis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
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
                    Email Profissional *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      fieldsTouched.email && formErrors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="seu@email.com"
                  />
                  {fieldsTouched.email && formErrors.email && (
                    <div className="text-xs text-red-500 mt-1">{formErrors.email}</div>
                  )}
                </div>
              </div>

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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    fieldsTouched.phone && formErrors.phone ? 'border-red-500' : ''
                  }`}
                  placeholder="(11) 99999-9999"
                />
                {fieldsTouched.phone && formErrors.phone && (
                  <div className="text-xs text-red-500 mt-1">{formErrors.phone}</div>
                )}
              </div>

              {/* Indicador de Progresso */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progresso do Cadastro</span>
                  <span className="text-sm font-bold text-purple-600">{calculateProgress()}%</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-2 flex items-center">
                  {calculateProgress() === 100 ? (
                    <>
                      <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {getProgressMessage()}
                    </>
                  ) : (
                    getProgressMessage()
                  )}
                </div>
              </div>

              {/* Botão para Expandir Campos Opcionais */}
              {!showExpandedForm && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowExpandedForm(true)}
                    className="text-purple-600 hover:text-purple-500 font-medium text-sm underline"
                  >
                    + Adicionar informações profissionais (opcional)
                  </button>
                </div>
              )}

              {/* Campos Expandidos - Opcionais */}
              {showExpandedForm && (
                <div className="space-y-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Informações Profissionais</h3>
                    <button
                      type="button"
                      onClick={() => setShowExpandedForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                        Anos de Experiência
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Selecione</option>
                        <option value="1-2">1-2 anos</option>
                        <option value="3-5">3-5 anos</option>
                        <option value="6-10">6-10 anos</option>
                        <option value="10+">Mais de 10 anos</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="focus" className="block text-sm font-medium text-gray-700 mb-2">
                        Área de Foco
                      </label>
                      <select
                        id="focus"
                        name="focus"
                        value={formData.focus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Selecione</option>
                        <option value="grains">Grãos (Soja, Milho, Trigo)</option>
                        <option value="livestock">Pecuária</option>
                        <option value="fruits">Fruticultura</option>
                        <option value="vegetables">Horticultura</option>
                        <option value="sugar">Cana-de-açúcar</option>
                        <option value="coffee">Café</option>
                        <option value="other">Outros</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      Estado de Atuação
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Selecione seu estado</option>
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
                </div>
              )}

              {/* Termos e Condições */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-2 focus:ring-purple-500 border-gray-300 rounded mt-1"
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

              {/* Botão de Envio com Loading */}
              <button
                type="submit"
                disabled={isSubmitting || calculateProgress() < 100}
                className={`w-full font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none ${
                  calculateProgress() === 100 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </div>
                ) : calculateProgress() === 100 ? (
                  '🚀 Garantir Minha Vaga VIP'
                ) : (
                  `Complete o cadastro (${calculateProgress()}%)`
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

            {/* Garantias */}
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
                <span className="text-xl sm:text-2xl font-bold">AgroPricing</span>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-md">
                A primeira plataforma de IA especializada em precificação para consultores do agronegócio brasileiro.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm8 7a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Plataforma */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Plataforma</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">Funcionalidades</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">Preços</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300">Documentação</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Legal</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button 
                    type="button"
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
