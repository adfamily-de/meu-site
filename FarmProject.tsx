import { Wheat, Carrot, Apple, Beef, Recycle, Sun, ArrowRight, Users, Heart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { ProgressBar } from '@/components/custom/ProgressBar';
import { Quote } from '@/components/custom/Quote';
import { defaultFarmProject } from '@/data/initialData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Carrot,
  Apple,
  Beef,
  Wheat,
  Recycle,
  Sun,
};

export function FarmProject() {
  const project = defaultFarmProject;

  return (
    <section id="fazenda" className="section-padding bg-missionary-cream">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-missionary-orange/10 rounded-full text-missionary-orange text-sm font-medium mb-4">
              <Wheat className="w-4 h-4" />
              Projeto Especial
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              {project.name}
            </h2>
            <p className="text-missionary-brown max-w-2xl mx-auto">
              Sustentabilidade da missão através da agricultura orgânica e 
              criação de animais.
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Bar */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl p-6 shadow-missionary mb-12 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-missionary-brown">Arrecadação para Investimentos</span>
              <span className="font-bold text-missionary-green">
                {Math.round((project.raisedAmount / project.goalAmount) * 100)}%
              </span>
            </div>
            <ProgressBar 
              current={project.raisedAmount} 
              total={project.goalAmount}
              size="lg"
            />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-missionary-green font-medium">
                {project.raisedAmount.toLocaleString()} MZN
              </span>
              <span className="text-missionary-brown">
                Meta: {project.goalAmount.toLocaleString()} MZN
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Gallery */}
          <ScrollReveal direction="left">
            <div className="grid grid-cols-2 gap-4">
              {project.gallery.map((image, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "rounded-xl overflow-hidden shadow-missionary",
                    index === 0 ? "col-span-2 aspect-video" : "aspect-square"
                  )}
                >
                  <img
                    src={image}
                    alt={`Fazenda ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-missionary-dark mb-4">
                Sobre o Projeto
              </h3>
              <div className="prose prose-missionary max-w-none mb-6">
                {project.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-missionary-brown leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Quote 
                quote="Deveríamos considerar a obra de cultivar a terra como um ramo da educação."
                reference="ED, p. 219"
                variant="light"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Areas Grid */}
        <ScrollReveal>
          <div className="mb-12">
            <h3 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6 text-center">
              Áreas da Fazenda
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.areas.map((area) => {
                const Icon = iconMap[area.icon] || Wheat;
                
                return (
                  <div 
                    key={area.id}
                    className="bg-white rounded-xl p-5 shadow-missionary hover:shadow-missionary-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-missionary-orange/10 rounded-lg flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-missionary-orange" />
                    </div>
                    <h4 className="font-cinzel font-bold text-missionary-dark mb-1">
                      {area.name}
                    </h4>
                    <p className="text-sm text-missionary-brown">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Impact & Needs */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Impact */}
          <ScrollReveal direction="left">
            <div className="bg-missionary-green rounded-2xl p-6 text-white">
              <h3 className="font-cinzel text-xl font-bold mb-4">
                Impacto da Fazenda
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <Users className="w-6 h-6 text-missionary-gold mb-2" />
                  <div className="text-2xl font-bold font-cinzel">{project.impact.teamFeeding}</div>
                  <div className="text-sm text-white/80">Alimentação da Equipe</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Heart className="w-6 h-6 text-missionary-gold mb-2" />
                  <div className="text-2xl font-bold font-cinzel">{project.impact.communityDonation}</div>
                  <div className="text-sm text-white/80">Doação Comunidade</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <TrendingUp className="w-6 h-6 text-missionary-gold mb-2" />
                  <div className="text-2xl font-bold font-cinzel">{project.impact.projectIncome}</div>
                  <div className="text-sm text-white/80">Renda Projetos</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Wheat className="w-6 h-6 text-missionary-gold mb-2" />
                  <div className="text-2xl font-bold font-cinzel">{project.impact.farmersTrained}</div>
                  <div className="text-sm text-white/80">Agricultores Treinados</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Needs */}
          <ScrollReveal direction="right">
            <div className="bg-white rounded-2xl p-6 shadow-missionary">
              <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-4">
                Necessidades Atuais
              </h3>
              <ul className="space-y-3 mb-6">
                {project.needs.map((need, index) => (
                  <li key={index} className="flex items-center gap-3 text-missionary-brown">
                    <div className="w-2 h-2 bg-missionary-orange rounded-full" />
                    {need}
                  </li>
                ))}
              </ul>
              <Link
                to="/doar?projeto=fazenda"
                className="btn-accent w-full flex items-center justify-center gap-2"
              >
                Investir na Fazenda
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
