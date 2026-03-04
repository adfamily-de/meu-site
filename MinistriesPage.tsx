import { useState } from 'react';
import { Church, Heart, BookOpen, Wheat, HandHeart, Baby } from 'lucide-react';
import { defaultMinistries, defaultEducationProject, defaultFarmProject } from '@/data/initialData';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { CountUp } from '@/components/custom/CountUp';
import { ProgressBar } from '@/components/custom/ProgressBar';
import { Quote } from '@/components/custom/Quote';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Church,
  Heart,
  BookOpen,
  Wheat,
  HandHeart,
  Baby,
};

export function MinistriesPage() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'Todos os Ministérios' },
    { id: 'evangelismo', label: 'Evangelismo' },
    { id: 'saude', label: 'Saúde' },
    { id: 'educacao', label: 'Educação' },
    { id: 'fazenda', label: 'Fazenda' },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-missionary-green py-20">
        <div className="container-missionary text-center text-white">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            O Que Fazemos
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Conheça os ministérios através dos quais servimos a Deus e às comunidades em Moçambique
          </p>
        </div>
      </section>

      {/* Ministries Overview */}
      <section className="section-padding bg-white">
        <div className="container-missionary">
          {/* Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-missionary-green text-white"
                      : "bg-missionary-cream text-missionary-dark hover:bg-missionary-beige"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Ministries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultMinistries.map((ministry, index) => {
              const Icon = iconMap[ministry.icon] || Church;
              
              return (
                <ScrollReveal key={ministry.id} delay={index * 100}>
                  <div id={ministry.id} className="group bg-missionary-cream rounded-2xl p-6 hover:bg-missionary-green transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-missionary-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                      <Icon className="w-7 h-7 text-missionary-green group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-cinzel text-xl font-bold text-missionary-dark group-hover:text-white mb-2 transition-colors">
                      {ministry.title}
                    </h3>
                    <p className="text-missionary-brown group-hover:text-white/80 transition-colors mb-4">
                      {ministry.description}
                    </p>
                    {ministry.quote && (
                      <blockquote className="border-l-2 border-missionary-gold pl-3 mb-4">
                        <p className="text-xs text-missionary-brown group-hover:text-white/70 italic font-crimson transition-colors">
                          "{ministry.quote}"
                        </p>
                        <cite className="text-xs text-missionary-gold group-hover:text-missionary-gold transition-colors not-italic">
                          — {ministry.quoteAuthor}
                        </cite>
                      </blockquote>
                    )}
                    {ministry.stats && (
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-missionary-beige group-hover:border-white/20">
                        {ministry.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-lg font-bold text-missionary-green group-hover:text-white font-cinzel transition-colors">
                              {stat.value}
                            </div>
                            <div className="text-xs text-missionary-brown group-hover:text-white/70 transition-colors">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="educacao" className="section-padding bg-gradient-to-b from-missionary-green/5 to-missionary-cream">
        <div className="container-missionary">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
                Projeto Especial
              </span>
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-missionary-dark">
                {defaultEducationProject.name}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center shadow-missionary">
                  <div className="text-3xl font-bold text-missionary-green font-cinzel">
                    <CountUp end={defaultEducationProject.students} />
                  </div>
                  <div className="text-sm text-missionary-brown">Alunos</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-missionary">
                  <div className="text-3xl font-bold text-missionary-green font-cinzel">
                    <CountUp end={defaultEducationProject.classes} />
                  </div>
                  <div className="text-sm text-missionary-brown">Turmas</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-missionary">
                  <div className="text-3xl font-bold text-missionary-green font-cinzel">
                    <CountUp end={defaultEducationProject.passRate} suffix="%" />
                  </div>
                  <div className="text-sm text-missionary-brown">Aprovação</div>
                </div>
              </div>

              <div className="prose prose-missionary max-w-none mb-6">
                {defaultEducationProject.description.split('\n\n').slice(0, 2).map((paragraph, index) => (
                  <p key={index} className="text-missionary-brown leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Link
                to="/doar?projeto=educacao"
                className="btn-primary inline-flex items-center gap-2"
              >
                Apoiar a Educação
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <Quote 
                quote="A educação é a obra de toda a vida."
                reference="ED, p. 30"
                variant="light"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Farm Section */}
      <section id="fazenda" className="section-padding bg-white">
        <div className="container-missionary">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-missionary-orange/10 rounded-full text-missionary-orange text-sm font-medium mb-4">
                Projeto Especial
              </span>
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-missionary-dark">
                {defaultFarmProject.name}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <Quote 
                quote="Deveríamos considerar a obra de cultivar a terra como um ramo da educação."
                reference="ED, p. 219"
                variant="light"
              />
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-missionary-cream rounded-2xl p-6">
                <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-4">
                  Arrecadação para Investimentos
                </h3>
                <ProgressBar 
                  current={defaultFarmProject.raisedAmount} 
                  total={defaultFarmProject.goalAmount}
                  size="lg"
                />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-missionary-green font-cinzel">
                      {defaultFarmProject.impact.teamFeeding}
                    </div>
                    <div className="text-xs text-missionary-brown">Alimentação Equipe</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-missionary-green font-cinzel">
                      {defaultFarmProject.impact.farmersTrained}
                    </div>
                    <div className="text-xs text-missionary-brown">Agricultores Treinados</div>
                  </div>
                </div>
                <Link
                  to="/doar?projeto=fazenda"
                  className="btn-accent w-full flex items-center justify-center gap-2 mt-6"
                >
                  Investir na Fazenda
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
