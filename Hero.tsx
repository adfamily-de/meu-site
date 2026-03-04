import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Users, Calendar, Heart, Church } from 'lucide-react';
import { useSettings } from '@/context/AppContext';
import { defaultEGWQuotes, defaultMissionaries } from '@/data/initialData';
import { CountUp } from '@/components/custom/CountUp';
import { cn } from '@/lib/utils';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const settings = useSettings();
  
  const missionariesCount = defaultMissionaries.filter(m => m.status === 'active').length;
  const yearsOfMission = Math.floor((new Date().getTime() - new Date(settings.missionStartDate).getTime()) / (1000 * 60 * 60 * 24 * 365));
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { icon: Users, value: missionariesCount, label: 'Missionários Ativos', suffix: '+' },
    { icon: Calendar, value: yearsOfMission, label: 'Anos de Missão', suffix: '' },
    { icon: Heart, value: 340, label: 'Almas Alcançadas', suffix: '+' },
    { icon: Church, value: 12, label: 'Comunidades Atendidas', suffix: '' },
  ];

  const egwQuote = defaultEGWQuotes.find(q => q.category === 'missões') || defaultEGWQuotes[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className={cn(
          'absolute inset-0 transition-transform duration-[1000ms] ease-out',
          isLoaded ? 'scale-100' : 'scale-105'
        )}
      >
        <img
          src={settings.coverPhoto}
          alt="Família Missionária"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-missionary pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Greeting */}
          <div 
            className={cn(
              'transition-all duration-700 delay-200',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Bem-vindo ao nosso ministério
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className={cn(
              'font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-300',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            Somos a{' '}
            <span className="text-missionary-gold">Família {settings.familyName}</span>
          </h1>

          {/* Subtitle */}
          <p 
            className={cn(
              'text-xl sm:text-2xl md:text-3xl font-light mb-8 transition-all duration-700 delay-400',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            Missionários em Moçambique
          </p>

          {/* Bible Verse */}
          <div 
            className={cn(
              'max-w-2xl mx-auto mb-8 transition-all duration-700 delay-500',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <p className="text-lg sm:text-xl italic text-white/90 font-crimson leading-relaxed">
              "{settings.verseMotto.split(' - ')[0]}"
            </p>
            <p className="text-missionary-gold mt-2 font-medium">
              {settings.verseMotto.split(' - ')[1]}
            </p>
          </div>

          {/* EGW Quote */}
          <div 
            className={cn(
              'max-w-xl mx-auto mb-10 transition-all duration-700 delay-600',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <p className="text-white/80 italic font-crimson">
              "{egwQuote.quote}"
            </p>
            <p className="text-missionary-gold/80 text-sm mt-1">
              — {egwQuote.reference}
            </p>
          </div>

          {/* CTA Buttons */}
          <div 
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <Link
              to="/quem-somos"
              className="btn-primary bg-white text-missionary-dark hover:bg-missionary-cream w-full sm:w-auto"
            >
              Conheça Nossa Equipe
            </Link>
            <Link
              to="/doar"
              className="btn-accent w-full sm:w-auto"
            >
              Apoie Nossa Missão
            </Link>
            <Link
              to="/urgencias"
              className="px-7 py-3.5 rounded-lg border-2 border-white text-white font-semibold text-sm uppercase tracking-wide
                         transition-all duration-200 hover:bg-white hover:text-missionary-dark w-full sm:w-auto"
            >
              Projetos Urgentes
            </Link>
          </div>

          {/* Stats */}
          <div 
            className={cn(
              'grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-800',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-missionary-gold" />
                <div className="text-2xl sm:text-3xl font-bold font-cinzel">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <a 
          href="#projetos-urgentes"
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs mb-2">Role para baixo</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
