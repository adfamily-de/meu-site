import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, BookOpen, ArrowRight } from 'lucide-react';
import { useSettings } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { Quote } from '@/components/custom/Quote';
import { defaultEGWQuotes } from '@/data/initialData';

export function About() {
  const settings = useSettings();
  const missionStartYear = new Date(settings.missionStartDate).getFullYear();
  const yearsOfMission = new Date().getFullYear() - missionStartYear;

  const faithQuote = defaultEGWQuotes.find(q => q.category === 'missões') || defaultEGWQuotes[0];

  return (
    <section id="quem-somos" className="section-padding bg-white">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
              Quem Somos
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              Nossa História de Chamado
            </h2>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/missionaries/joao-maria.jpg"
                  alt="Família Missionária"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-missionary-green text-white p-6 rounded-xl shadow-missionary-lg">
                <div className="text-4xl font-bold font-cinzel">{yearsOfMission}+</div>
                <div className="text-sm text-white/80">Anos em Missão</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text Content */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-missionary-dark mb-4">
                Família {settings.familyName}
              </h3>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-missionary-brown">
                  <MapPin className="w-4 h-4 text-missionary-green" />
                  <span className="text-sm">{settings.currentField.district}, {settings.currentField.province}</span>
                </div>
                <div className="flex items-center gap-2 text-missionary-brown">
                  <Calendar className="w-4 h-4 text-missionary-green" />
                  <span className="text-sm">Desde {missionStartYear}</span>
                </div>
                <div className="flex items-center gap-2 text-missionary-brown">
                  <Users className="w-4 h-4 text-missionary-green" />
                  <span className="text-sm">Família com 3 filhos</span>
                </div>
              </div>

              <div className="prose prose-missionary max-w-none mb-6">
                {settings.missionStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-missionary-brown leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Link
                to="/quem-somos"
                className="inline-flex items-center gap-2 text-missionary-green font-medium hover:text-missionary-green-dark transition-colors"
              >
                Conheça nossa equipe completa
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Faith Section */}
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-missionary-green" />
                <span className="text-missionary-green font-medium">Nossa Fé</span>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-missionary-dark mb-4">
                Adventistas do Sétimo Dia
              </h3>
              <p className="text-missionary-brown leading-relaxed mb-4">
                Somos membros da Igreja Adventista do Sétimo Dia, movidos pela mensagem 
                dos três anjos de Apocalipse 14. Nossa missão é preparar pessoas para 
                a volta iminente de Jesus Cristo.
              </p>
              <p className="text-missionary-brown leading-relaxed">
                Baseamos nosso trabalho nos escritos de Ellen G. White, especialmente 
                em sua ênfase na obra médico-missionária, educação rural e o cumprimento 
                da mensagem dos três anjos.
              </p>
            </div>
            <Quote 
              quote={faithQuote.quote}
              reference={faithQuote.reference}
              variant="green"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
