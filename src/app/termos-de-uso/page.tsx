import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de Uso - AgroPricing Pro',
  description: 'Termos de Uso da plataforma AgroPricing Pro - Precificação com IA para consultores do agronegócio',
  robots: 'index, follow',
};

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao AgroPricing
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Termos de Uso
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar a plataforma AgroPricing Pro, você concorda em cumprir e estar sujeito aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descrição do Serviço</h2>
              <p>
                O AgroPricing Pro é uma plataforma de inteligência artificial desenvolvida pela Trimobe para auxiliar consultores e prestadores de serviços do agronegócio brasileiro na precificação assertiva de seus serviços, utilizando dados regionalizados e metodologias específicas do setor agropecuário.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Elegibilidade e Cadastro</h2>
              <p>
                Para utilizar nossos serviços, você deve:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Ser maior de 18 anos ou ter autorização legal para contratar</li>
                <li>Fornecer informações verdadeiras, precisas e completas durante o cadastro</li>
                <li>Manter suas informações de conta atualizadas</li>
                <li>Ser responsável pela segurança de sua conta e senha</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Uso Permitido da Plataforma</h2>
              <p>
                Você concorda em utilizar o AgroPricing Pro apenas para:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Fins profissionais relacionados ao agronegócio brasileiro</li>
                <li>Precificação de serviços de consultoria agropecuária</li>
                <li>Atividades legais e éticas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Restrições de Uso</h2>
              <p>
                É expressamente proibido:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Usar a plataforma para atividades ilegais ou não autorizadas</li>
                <li>Tentar acessar contas de outros usuários</li>
                <li>Reproduzir, distribuir ou modificar o conteúdo da plataforma sem autorização</li>
                <li>Interferir no funcionamento normal da plataforma</li>
                <li>Usar dados ou algoritmos para criar produtos concorrentes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Propriedade Intelectual</h2>
              <p>
                Todos os direitos autorais, marcas registradas e outros direitos de propriedade intelectual relacionados ao AgroPricing Pro são de propriedade exclusiva da Trimobe. O acesso à plataforma não concede ao usuário nenhum direito sobre nossa propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Pagamentos e Reembolsos</h2>
              <p>
                Os termos de pagamento, taxas e políticas de reembolso são especificados no momento da contratação. Oferecemos período de teste gratuito conforme anunciado na plataforma. Cancelamentos podem ser feitos a qualquer momento através da área do usuário.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacidade e Proteção de Dados</h2>
              <p>
                Sua privacidade é importante para nós. O tratamento de seus dados pessoais está detalhado em nossa Política de Privacidade, que faz parte integrante destes Termos de Uso e está em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitação de Responsabilidade</h2>
              <p>
                O AgroPricing Pro é fornecido "como está". Embora nos esforcemos para fornecer informações precisas, não garantimos a exatidão absoluta dos dados ou resultados gerados pela IA. Os usuários são responsáveis por validar e utilizar as informações de forma adequada em suas atividades profissionais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações serão comunicadas aos usuários com antecedência mínima de 30 dias e entrarão em vigor na data especificada na notificação.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Lei Aplicável e Foro</h2>
              <p>
                Estes Termos de Uso são regidos pela legislação brasileira. Qualquer controvérsia decorrente deste acordo será resolvida no foro da cidade de São Paulo, Estado de São Paulo, Brasil.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contato</h2>
              <p>
                Para questões relacionadas a estes Termos de Uso, entre em contato conosco através do e-mail: 
                <a href="mailto:contato@trimobe.com" className="text-purple-600 hover:text-purple-700 ml-1">
                  contato@trimobe.com
                </a>
              </p>
            </section>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Última atualização:</strong> 29 de junho de 2025
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simples */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Trimobe. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
