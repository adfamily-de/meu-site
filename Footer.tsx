import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Heart,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useSettings } from '@/context/AppContext';
// import { cn } from '@/lib/utils';

export function Footer() {
  const settings = useSettings();

  const quickLinks = [
    { name: 'Quem Somos', href: '/quem-somos' },
    { name: 'O Que Fazemos', href: '/o-que-fazemos' },
    { name: 'Projetos Urgentes', href: '/urgencias' },
    { name: 'Blog', href: '/blog' },
    { name: 'Loja', href: '/loja' },
    { name: 'Doar', href: '/doar' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: settings.socialMedia.facebook },
    { name: 'Instagram', icon: Instagram, url: settings.socialMedia.instagram },
    { name: 'YouTube', icon: Youtube, url: settings.socialMedia.youtube },
  ];

  return (
    <footer className="bg-missionary-dark text-white">
      {/* Main Footer */}
      <div className="container-missionary py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-missionary-green rounded-full flex items-center justify-center">
                <span className="text-white font-cinzel font-bold text-xl">
                  {settings.familyName.charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-cinzel font-bold text-lg block">Família</span>
                <span className="font-cinzel font-bold text-xl text-missionary-gold leading-none">
                  {settings.familyName}
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Missionários em Moçambique, levando esperança, educação e o evangelho 
              às comunidades rurais mais necessitadas.
            </p>
            <p className="text-missionary-gold text-sm italic font-crimson">
              "{settings.verseMotto.split(' - ')[0]}"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel font-bold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-missionary-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-missionary-gold flex-shrink-0 mt-0.5" />
                {settings.contact.physicalAddress}
              </li>
              <li>
                <a
                  href={`tel:${settings.contact.phoneMozambique}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-missionary-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-missionary-gold" />
                  {settings.contact.phoneMozambique}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-missionary-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-missionary-gold" />
                  {settings.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-cinzel font-bold text-lg mb-4">Redes Sociais</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-missionary-green transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <h4 className="font-cinzel font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-white/70 text-sm mb-3">
              Receba nossas cartas mensais da missão.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-sm text-white placeholder:text-white/50 border border-white/20 focus:border-missionary-gold focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-missionary-green rounded-lg text-sm font-medium hover:bg-missionary-green-light transition-colors"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-missionary py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Família {settings.familyName} - Missão Moçambique. 
              Todos os direitos reservados.
            </p>
            <p className="text-white/50 text-sm flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-missionary-urgent fill-current" /> para a missão
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${settings.contact.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 animate-pulse"
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}
