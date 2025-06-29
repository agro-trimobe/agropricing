import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade - AgroPricing Pro',
  description: 'Política de Privacidade da plataforma AgroPricing Pro - Como tratamos e protegemos seus dados pessoais',
  robots: 'index, follow',
};

export default function PoliticaDePrivacidade() {
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
            Política de Privacidade
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introdução</h2>
              <p>
                A Trimobe, desenvolvedora da plataforma AgroPricing Pro, está comprometida em proteger e respeitar sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Informações que Coletamos</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">2.1 Dados fornecidos por você:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de cadastro:</strong> nome, e-mail, telefone/WhatsApp, empresa/organização</li>
                <li><strong>Dados profissionais:</strong> área de atuação no agronegócio, região de trabalho, experiência</li>
                <li><strong>Dados de pagamento:</strong> informações de cobrança (processadas por terceiros seguros)</li>
                <li><strong>Dados de comunicação:</strong> mensagens enviadas através de nossos canais de suporte</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">2.2 Dados coletados automaticamente:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de uso:</strong> como você interage com nossa plataforma</li>
                <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador, sistema operacional</li>
                <li><strong>Cookies:</strong> para melhorar sua experiência de usuário</li>
                <li><strong>Dados de precificação:</strong> consultas realizadas e resultados gerados (anonimizados)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Como Utilizamos suas Informações</h2>
              <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
              
              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">3.1 Prestação do Serviço:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer acesso à plataforma AgroPricing Pro</li>
                <li>Processar consultas de precificação com IA</li>
                <li>Personalizar recomendações baseadas em sua região e setor</li>
                <li>Oferecer suporte técnico e atendimento ao cliente</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">3.2 Comunicação:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enviar notificações sobre atualizações da plataforma</li>
                <li>Comunicar mudanças nos termos ou políticas</li>
                <li>Responder suas solicitações de suporte</li>
                <li>Enviar conteúdo educativo sobre agronegócio (com seu consentimento)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">3.3 Melhoria do Serviço:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analisar padrões de uso para melhorar nossa IA</li>
                <li>Desenvolver novos recursos e funcionalidades</li>
                <li>Garantir a segurança e prevenir fraudes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Base Legal para o Tratamento</h2>
              <p>Tratamos seus dados pessoais com base nas seguintes bases legais da LGPD:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Execução de contrato:</strong> para fornecer os serviços contratados</li>
                <li><strong>Consentimento:</strong> para comunicações de marketing e cookies não essenciais</li>
                <li><strong>Legítimo interesse:</strong> para melhoria do serviço e prevenção de fraudes</li>
                <li><strong>Cumprimento de obrigação legal:</strong> quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Compartilhamento de Dados</h2>
              <p>
                Não vendemos seus dados pessoais. Compartilhamos informações apenas nas seguintes situações:
              </p>
              
              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">5.1 Prestadores de Serviços:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provedores de pagamento (para processar transações)</li>
                <li>Serviços de hospedagem e infraestrutura de TI</li>
                <li>Ferramentas de análise e monitoramento</li>
                <li>Serviços de e-mail e comunicação</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">5.2 Requisitos Legais:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Quando exigido por lei ou ordem judicial</li>
                <li>Para proteger nossos direitos legais</li>
                <li>Em caso de investigações de segurança</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Seus Direitos</h2>
              <p>
                De acordo com a LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Acesso:</strong> solicitar informações sobre o tratamento de seus dados</li>
                <li><strong>Correção:</strong> solicitar a correção de dados incompletos ou inexatos</li>
                <li><strong>Exclusão:</strong> solicitar a eliminação de dados desnecessários</li>
                <li><strong>Portabilidade:</strong> solicitar a transferência de seus dados</li>
                <li><strong>Oposição:</strong> opor-se ao tratamento de dados</li>
                <li><strong>Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento</li>
              </ul>
              
              <p className="bg-blue-50 p-4 rounded-lg mt-6">
                <strong>Como exercer seus direitos:</strong> Entre em contato conosco através do e-mail 
                <a href="mailto:privacidade@trimobe.com" className="text-purple-600 hover:text-purple-700 ml-1">
                  privacidade@trimobe.com
                </a> ou pelo canal de suporte da plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Segurança dos Dados</h2>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Treinamento regular de nossa equipe sobre proteção de dados</li>
                <li>Avaliações periódicas de segurança</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Retenção de Dados</h2>
              <p>
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Dados de conta ativa:</strong> enquanto você utilizar nossos serviços</li>
                <li><strong>Dados após cancelamento:</strong> até 5 anos para fins de auditoria e cumprimento legal</li>
                <li><strong>Dados de marketing:</strong> até a revogação do consentimento</li>
                <li><strong>Dados financeiros:</strong> conforme exigido pela legislação fiscal</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies e Tecnologias Similares</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência:
              </p>
              
              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">9.1 Tipos de Cookies:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essenciais:</strong> necessários para o funcionamento da plataforma</li>
                <li><strong>Funcionais:</strong> para lembrar suas preferências</li>
                <li><strong>Analíticos:</strong> para entender como você usa nossa plataforma</li>
                <li><strong>Marketing:</strong> para personalizar conteúdo (com seu consentimento)</li>
              </ul>
              
              <p className="mt-4">
                Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Transferência Internacional</h2>
              <p>
                Alguns de nossos prestadores de serviços podem estar localizados fora do Brasil. Quando isso ocorrer, garantimos que:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>A transferência atende aos requisitos da LGPD</li>
                <li>Implementamos salvaguardas adequadas</li>
                <li>Os dados recebem nível de proteção equivalente ao brasileiro</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Menores de Idade</h2>
              <p>
                Nossos serviços são destinados a profissionais maiores de 18 anos. Não coletamos conscientemente dados pessoais de menores de idade. Se tomarmos conhecimento de que coletamos dados de menores, tomaremos medidas para deletá-los imediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos alterações significativas, notificaremos você através de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>E-mail para o endereço cadastrado</li>
                <li>Notificação na plataforma</li>
                <li>Aviso em nosso site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contato</h2>
              <p>
                Para questões relacionadas à privacidade e proteção de dados:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p><strong>Contato para questões de privacidade:</strong></p>
                <p>E-mail: <a href="mailto:contato@trimobe.com" className="text-purple-600 hover:text-purple-700">contato@trimobe.com</a></p>
                <p className="mt-4">
                  <strong>Trimobe Tecnologia Ltda.</strong><br/>
                  Endereço para correspondência será fornecido mediante solicitação
                </p>
              </div>
            </section>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Última atualização:</strong> 29 de junho de 2025<br/>
                <strong>Versão:</strong> 1.0
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
