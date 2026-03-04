import { useState } from 'react';
import { Copy, Check, Smartphone, Building2, Globe, CreditCard, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useSettings } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
// import { cn } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  steps: string[];
  details?: Record<string, string>;
}

export function Donations() {
  const settings = useSettings();
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'mpesa',
      name: 'M-Pesa / Movitel Money / Vodacom M-Pesa',
      icon: Smartphone,
      description: 'Transferência via mobile money - Moçambique',
      steps: [
        'Digite *150# no seu telemóvel',
        'Selecione "Transferir Dinheiro"',
        'Digite o número: ' + settings.contact.phoneMozambique,
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
        'Envie para: ' + settings.contact.phoneMozambique,
        'Nome: Família ' + settings.familyName,
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
    const message = `Olá! Gostaria de fazer uma doação para a missão da Família ${settings.familyName}.`;
    window.open(`https://wa.me/${settings.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="doar" className="section-padding bg-missionary-cream">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
              <CreditCard className="w-4 h-4" />
              Como Ajudar
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              Faça Sua Doação
            </h2>
            <p className="text-missionary-brown max-w-2xl mx-auto">
              Sua contribuição faz toda a diferença. Escolha a forma de doação 
              que for mais conveniente para você.
            </p>
          </div>
        </ScrollReveal>

        {/* WhatsApp CTA */}
        <ScrollReveal>
          <div className="bg-missionary-green rounded-2xl p-6 text-white text-center mb-8">
            <MessageCircle className="w-10 h-10 mx-auto mb-3 text-missionary-gold" />
            <h3 className="font-cinzel text-xl font-bold mb-2">
              Dúvidas? Fale Conosco
            </h3>
            <p className="text-white/80 mb-4">
              Entre em contato pelo WhatsApp para receber orientações sobre como doar.
            </p>
            <button
              onClick={handleWhatsApp}
              className="bg-white text-missionary-green px-6 py-3 rounded-lg font-medium hover:bg-missionary-cream transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chamar no WhatsApp
            </button>
          </div>
        </ScrollReveal>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-4">
          {paymentMethods.map((method, index) => (
            <ScrollReveal key={method.id} delay={index * 100}>
              <div className="bg-white rounded-xl shadow-missionary overflow-hidden">
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
                      <div className="bg-missionary-cream rounded-lg p-4 space-y-2">
                        <h4 className="text-sm font-medium text-missionary-dark">
                          Dados Bancários:
                        </h4>
                        {Object.entries(method.details).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between gap-2">
                            <span className="text-sm text-missionary-brown">{key}:</span>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-white px-2 py-1 rounded">{value}</code>
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
            </ScrollReveal>
          ))}
        </div>

        {/* Note */}
        <ScrollReveal>
          <div className="mt-8 text-center">
            <p className="text-sm text-missionary-brown">
              Após fazer a doação, envie o comprovativo pelo WhatsApp para que possamos confirmar.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
