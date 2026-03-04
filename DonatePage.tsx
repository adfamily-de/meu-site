import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Copy, 
  Check, 
  Smartphone, 
  Building2, 
  Globe, 
  CreditCard, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle,
  Heart
} from 'lucide-react';
import { useSettings, useBeneficiaries, useUrgentProjects } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { ProgressBar } from '@/components/custom/ProgressBar';
import { cn } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  steps: string[];
  details?: Record<string, string>;
}

export function DonatePage() {
  const [searchParams] = useSearchParams();
  const settings = useSettings();
  const beneficiaries = useBeneficiaries();
  const urgentProjects = useUrgentProjects();
  
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [donationType, setDonationType] = useState<'general' | 'project' | 'beneficiary'>('general');
  const [amount, setAmount] = useState<string>('');

  const beneficiaryId = searchParams.get('beneficiario');
  const projectId = searchParams.get('projeto');

  const selectedBeneficiary = beneficiaryId ? beneficiaries.find(b => b.id === beneficiaryId) : null;
  const selectedProject = projectId ? urgentProjects.find(p => p.id === projectId) : null;

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'mpesa',
      name: 'M-Pesa / Movitel Money / Vodacom M-Pesa',
      icon: Smartphone,
      description: 'Transferência via mobile money - Moçambique',
      steps: [
        'Digite *150# no seu telemóvel',
        'Selecione "Transferir Dinheiro"',
        `Digite o número: ${settings.contact.phoneMozambique}`,
        'Insira o valor',
        'Confirme com o seu PIN'
      ]
    },
    {
      id: 'banks',
      name: 'Transferência Bancária',
      icon: Building2,
      description: 'BIM, Standard Bank, Millennium BIM',
      steps: [
        'Visite qualquer agência bancária',
        'Solicite transferência para os dados abaixo',
        'Envie o comprovativo pelo WhatsApp'
      ],
      details: settings.showBankDetails ? {
        'BIM - Conta': settings.bankDetails.bim.accountNumber,
        'BIM - IBAN': settings.bankDetails.bim.iban,
        'Standard Bank - Conta': settings.bankDetails.standardBank.accountNumber,
        'Standard Bank - IBAN': settings.bankDetails.standardBank.iban,
      } : undefined
    },
    {
      id: 'international',
      name: 'Western Union / MoneyGram / WorldRemit',
      icon: Globe,
      description: 'Transferência internacional',
      steps: [
        'Visite uma agência Western Union/MoneyGram',
        `Envie para: ${settings.contact.phoneMozambique}`,
        `Nome: Família ${settings.familyName}`,
        'Envie o código de retirada pelo WhatsApp'
      ]
    },
    {
      id: 'paypal',
      name: 'PayPal / Cartão Internacional',
      icon: CreditCard,
      description: 'Doação internacional online',
      steps: [
        'Entre em contato pelo WhatsApp',
        'Enviaremos o link de pagamento',
        'Pague com cartão ou saldo PayPal'
      ]
    }
  ];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleWhatsApp = () => {
    let message = `Olá! Gostaria de fazer uma doação`;
    
    if (selectedBeneficiary) {
      message += ` para ajudar ${selectedBeneficiary.name}`;
    } else if (selectedProject) {
      message += ` para o projeto: ${selectedProject.title}`;
    } else {
      message += ` para a missão`;
    }
    
    if (amount) {
      message += `. Valor: ${amount} MZN`;
    }
    
    message += `.`;
    
    window.open(`https://wa.me/${settings.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-missionary-green py-20">
        <div className="container-missionary text-center text-white">
          <Heart className="w-12 h-12 mx-auto mb-4 text-missionary-gold" />
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            Faça Sua Doação
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Sua contribuição faz toda a diferença no trabalho missionário em Moçambique.
          </p>
        </div>
      </section>

      {/* Selected Cause */}
      {(selectedBeneficiary || selectedProject) && (
        <section className="py-8 bg-missionary-cream">
          <div className="container-missionary">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 shadow-missionary">
                <span className="text-sm text-missionary-brown mb-2 block">
                  Você está doando para:
                </span>
                {selectedBeneficiary && (
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedBeneficiary.photo}
                      alt={selectedBeneficiary.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-cinzel text-xl font-bold text-missionary-dark">
                        {selectedBeneficiary.name}
                      </h3>
                      <ProgressBar 
                        current={selectedBeneficiary.raisedAmount} 
                        total={selectedBeneficiary.needAmount}
                        size="sm"
                      />
                    </div>
                  </div>
                )}
                {selectedProject && (
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-cinzel text-xl font-bold text-missionary-dark">
                        {selectedProject.title}
                      </h3>
                      <ProgressBar 
                        current={selectedProject.raisedAmount} 
                        total={selectedProject.needAmount}
                        size="sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Donation Form */}
      <section className="section-padding bg-white">
        <div className="container-missionary">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Amount Selection */}
            <ScrollReveal direction="left">
              <div>
                <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6">
                  Escolha o Valor
                </h2>

                {!selectedBeneficiary && !selectedProject && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-missionary-dark mb-2">
                      Tipo de Doação
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setDonationType('general')}
                        className={cn(
                          "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          donationType === 'general'
                            ? "bg-missionary-green text-white"
                            : "bg-missionary-cream text-missionary-dark hover:bg-missionary-beige"
                        )}
                      >
                        Missão Geral
                      </button>
                      <button
                        onClick={() => setDonationType('project')}
                        className={cn(
                          "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          donationType === 'project'
                            ? "bg-missionary-green text-white"
                            : "bg-missionary-cream text-missionary-dark hover:bg-missionary-beige"
                        )}
                      >
                        Projeto
                      </button>
                      <button
                        onClick={() => setDonationType('beneficiary')}
                        className={cn(
                          "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          donationType === 'beneficiary'
                            ? "bg-missionary-green text-white"
                            : "bg-missionary-cream text-missionary-dark hover:bg-missionary-beige"
                        )}
                      >
                        Beneficiário
                      </button>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-missionary-dark mb-2">
                    Valor (MZN)
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {['500', '1000', '2000', '5000', '10000', '20000'].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={cn(
                          "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          amount === val
                            ? "bg-missionary-green text-white"
                            : "bg-missionary-cream text-missionary-dark hover:bg-missionary-beige"
                        )}
                      >
                        {parseInt(val).toLocaleString()} MZN
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Outro valor"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green focus:border-transparent"
                  />
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-missionary-green rounded-2xl p-6 text-white">
                  <MessageCircle className="w-10 h-10 mb-3 text-missionary-gold" />
                  <h3 className="font-cinzel text-xl font-bold mb-2">
                    Dúvidas? Fale Conosco
                  </h3>
                  <p className="text-white/80 mb-4">
                    Entre em contato pelo WhatsApp para receber orientações sobre como doar.
                  </p>
                  <button
                    onClick={handleWhatsApp}
                    className="bg-white text-missionary-green px-6 py-3 rounded-lg font-medium hover:bg-missionary-cream transition-colors w-full flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chamar no WhatsApp
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Payment Methods */}
            <ScrollReveal direction="right">
              <div>
                <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6">
                  Formas de Pagamento
                </h2>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="bg-missionary-cream rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedMethod(expandedMethod === method.id ? null : method.id)}
                        className="w-full p-5 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-missionary-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <method.icon className="w-6 h-6 text-missionary-green" />
                          </div>
                          <div>
                            <h3 className="font-cinzel font-bold text-missionary-dark">
                              {method.name}
                            </h3>
                            <p className="text-sm text-missionary-brown">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        {expandedMethod === method.id ? (
                          <ChevronUp className="w-5 h-5 text-missionary-brown" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-missionary-brown" />
                        )}
                      </button>

                      {expandedMethod === method.id && (
                        <div className="px-5 pb-5 border-t border-missionary-beige pt-4">
                          <h4 className="text-sm font-medium text-missionary-dark mb-3">
                            Como fazer:
                          </h4>
                          <ol className="space-y-2 mb-4">
                            {method.steps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-missionary-brown">
                                <span className="w-5 h-5 bg-missionary-green/10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium text-missionary-green">
                                  {idx + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>

                          {method.details && (
                            <div className="bg-white rounded-lg p-4 space-y-2">
                              <h4 className="text-sm font-medium text-missionary-dark">
                                Dados Bancários:
                              </h4>
                              {Object.entries(method.details).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between gap-2">
                                  <span className="text-sm text-missionary-brown">{key}:</span>
                                  <div className="flex items-center gap-2">
                                    <code className="text-xs bg-missionary-cream px-2 py-1 rounded">{value}</code>
                                    <button
                                      onClick={() => handleCopy(value, `${method.id}-${key}`)}
                                      className="text-missionary-green hover:text-missionary-green-dark"
                                    >
                                      {copiedField === `${method.id}-${key}` ? (
                                        <Check className="w-4 h-4" />
                                      ) : (
                                        <Copy className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-missionary-gold/10 rounded-xl p-4">
                  <p className="text-sm text-missionary-brown text-center">
                    Após fazer a doação, envie o comprovativo pelo WhatsApp para que possamos confirmar.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
