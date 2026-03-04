import { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Video, 
  Users,
  Clock,
  Check
} from 'lucide-react';
import { useSettings } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { cn } from '@/lib/utils';

export function Contact() {
  const settings = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/${settings.contact.whatsapp.replace(/\D/g, '')}`,
      color: 'bg-green-500',
      description: 'Resposta em até 24h'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${settings.contact.email}`,
      color: 'bg-blue-500',
      description: settings.contact.email
    },
    {
      name: 'Telefone',
      icon: Phone,
      url: `tel:${settings.contact.phoneMozambique}`,
      color: 'bg-missionary-green',
      description: settings.contact.phoneMozambique
    },
    ...settings.contact.additionalLinks.map(link => ({
      name: link.name,
      icon: link.icon === 'Users' ? Users : link.icon === 'Video' ? Video : Send,
      url: link.url,
      color: 'bg-missionary-orange',
      description: 'Clique para acessar'
    }))
  ];

  return (
    <section id="contato" className="section-padding bg-white">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
              <MessageCircle className="w-4 h-4" />
              Fale Conosco
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              Entre em Contato
            </h2>
            <p className="text-missionary-brown max-w-2xl mx-auto">
              Estamos aqui para ouvir você. Entre em contato através dos canais abaixo 
              ou envie uma mensagem.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Links */}
          <ScrollReveal direction="left">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-6">
                Canais de Contato
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 bg-missionary-cream rounded-xl hover:bg-missionary-beige transition-colors group"
                  >
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-white", link.color)}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-missionary-dark group-hover:text-missionary-green transition-colors">
                        {link.name}
                      </h4>
                      <p className="text-sm text-missionary-brown">{link.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Address */}
              <div className="bg-missionary-green rounded-2xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold mb-1">Endereço</h4>
                    <p className="text-white/80 text-sm">{settings.contact.physicalAddress}</p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-4 bg-missionary-cream rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-missionary-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-missionary-green" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-missionary-dark mb-1">Horário de Atendimento</h4>
                    <p className="text-missionary-brown text-sm">
                      Segunda a Sexta: 8h - 17h<br />
                      Sábado: 8h - 12h<br />
                      Domingo: Fechado
                    </p>
                    <p className="text-xs text-missionary-brown mt-2">
                      Fuso horário: Maputo (GMT+2)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <div className="bg-missionary-cream rounded-2xl p-6 md:p-8">
              <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-6">
                Envie uma Mensagem
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-missionary-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-missionary-dark mb-2">
                    Mensagem Enviada!
                  </h4>
                  <p className="text-missionary-brown">
                    Agradecemos seu contato. Responderemos em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-missionary-dark mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-missionary-beige bg-white focus:ring-2 focus:ring-missionary-green focus:border-transparent transition-all"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-missionary-dark mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-missionary-beige bg-white focus:ring-2 focus:ring-missionary-green focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-missionary-dark mb-1">
                      Assunto
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-missionary-beige bg-white focus:ring-2 focus:ring-missionary-green focus:border-transparent transition-all"
                      placeholder="Assunto da mensagem"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-missionary-dark mb-1">
                      Mensagem
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-missionary-beige bg-white focus:ring-2 focus:ring-missionary-green focus:border-transparent transition-all resize-none"
                      placeholder="Escreva sua mensagem..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
