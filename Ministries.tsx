import { Link } from 'react-router-dom';
import { Church, Heart, BookOpen, Wheat, HandHeart, Baby, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { defaultMinistries } from '@/data/initialData';
// import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Church,
  Heart,
  BookOpen,
  Wheat,
  HandHeart,
  Baby,
};

export function Ministries() {
  return (
    <section id="o-que-fazemos" className="section-padding bg-missionary-cream">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
              Nosso Trabalho
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              O Que Fazemos
            </h2>
            <p className="text-missionary-brown max-w-2xl mx-auto">
              Nosso ministério abrange diversas áreas, todas com o objetivo de 
              levar esperança e transformar vidas em Moçambique.
            </p>
          </div>
        </ScrollReveal>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultMinistries.map((ministry, index) => {
            const Icon = iconMap[ministry.icon] || Church;
            
            return (
              <ScrollReveal key={ministry.id} delay={index * 100}>
                <div className="group bg-white rounded-2xl p-6 shadow-missionary hover:shadow-missionary-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-missionary-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-missionary-green group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-missionary-green group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-2">
                    {ministry.title}
                  </h3>
                  <p className="text-missionary-brown text-sm leading-relaxed mb-4 flex-grow">
                    {ministry.description}
                  </p>

                  {/* Quote */}
                  {ministry.quote && (
                    <blockquote className="border-l-2 border-missionary-gold pl-3 mb-4">
                      <p className="text-xs text-missionary-brown italic font-crimson">
                        "{ministry.quote}"
                      </p>
                      <cite className="text-xs text-missionary-gold not-italic">
                        — {ministry.quoteAuthor}
                      </cite>
                    </blockquote>
                  )}

                  {/* Stats */}
                  {ministry.stats && (
                    <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-missionary-beige">
                      {ministry.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-bold text-missionary-green font-cinzel">
                            {stat.value}
                          </div>
                          <div className="text-xs text-missionary-brown">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Link */}
                  <Link
                    to={`/o-que-fazemos#${ministry.id}`}
                    className="inline-flex items-center gap-2 text-missionary-green text-sm font-medium hover:text-missionary-green-dark transition-colors"
                  >
                    Saiba mais
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Featured Projects */}
        <ScrollReveal>
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {/* Education Project */}
            <div className="bg-gradient-to-br from-missionary-green to-missionary-green-dark rounded-2xl p-8 text-white">
              <BookOpen className="w-10 h-10 text-missionary-gold mb-4" />
              <h3 className="font-cinzel text-2xl font-bold mb-2">
                Escola de Esperança
              </h3>
              <p className="text-white/80 mb-4">
                Nosso programa de alfabetização que já transformou a vida de mais 
                de 180 alunos, ensinando-os a ler e escrever para conhecer a Bíblia.
              </p>
              <Link
                to="/o-que-fazemos#educacao"
                className="inline-flex items-center gap-2 text-missionary-gold font-medium hover:text-white transition-colors"
              >
                Conheça o projeto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Farm Project */}
            <div className="bg-gradient-to-br from-missionary-orange to-missionary-urgent rounded-2xl p-8 text-white">
              <Wheat className="w-10 h-10 text-white mb-4" />
              <h3 className="font-cinzel text-2xl font-bold mb-2">
                Fazenda Esperança
              </h3>
              <p className="text-white/80 mb-4">
                Nossa fazenda sustentável que gera alimentos para a equipe, 
                doa para a comunidade e gera renda para os projetos missionários.
              </p>
              <Link
                to="/o-que-fazemos#fazenda"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-missionary-cream transition-colors"
              >
                Conheça o projeto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
