import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import { useFeaturedBeneficiaries, useUrgentProjects } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { ProgressBar } from '@/components/custom/ProgressBar';
import { Countdown } from '@/components/custom/Countdown';
// import { cn } from '@/lib/utils';

export function UrgentProjects() {
  const urgentProjects = useUrgentProjects();
  const featuredBeneficiaries = useFeaturedBeneficiaries();
  
  // Combine urgent projects with featured beneficiaries
  const urgentItems = [...urgentProjects.slice(0, 2), ...featuredBeneficiaries.slice(0, 1)].slice(0, 3);

  return (
    <section id="projetos-urgentes" className="section-padding bg-missionary-cream">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-missionary-urgent/10 rounded-full text-missionary-urgent text-sm font-medium mb-4">
              <AlertTriangle className="w-4 h-4" />
              Atenção Necessária
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              Projetos Urgentes
            </h2>
            <p className="text-missionary-brown max-w-2xl mx-auto">
              Sua ajuda é necessária agora. Estas são as necessidades mais urgentes 
              que precisamos atender no campo missionário.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {urgentItems.map((item, index) => {
            const isProject = 'title' in item;
            const title = isProject ? item.title : `Ajude ${item.name}`;
            const description = isProject ? item.description : item.story.substring(0, 120) + '...';
            const image = isProject ? (item as typeof urgentProjects[0]).image : (item as typeof featuredBeneficiaries[0]).photo;
            const needAmount = item.needAmount;
            const raisedAmount = item.raisedAmount;
            const deadline = item.deadline;
            const link = isProject ? `/doar?projeto=${item.id}` : `/doar?beneficiario=${item.id}`;

            return (
              <ScrollReveal key={item.id} delay={index * 100}>
                <div className="card-urgent h-full flex flex-col">
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge-urgent">
                      <AlertTriangle className="w-3 h-3" />
                      URGENTE
                    </span>
                    {deadline && (
                      <div className="flex items-center gap-1 text-sm text-missionary-brown">
                        <Clock className="w-4 h-4" />
                        <Countdown targetDate={deadline} compact />
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-2">
                    {title}
                  </h3>
                  <p className="text-missionary-brown text-sm mb-4 flex-grow">
                    {description}
                  </p>

                  {/* Progress */}
                  <ProgressBar 
                    current={raisedAmount} 
                    total={needAmount}
                    className="mb-4"
                  />

                  {/* CTA */}
                  <Link
                    to={link}
                    className="btn-accent w-full flex items-center justify-center gap-2"
                  >
                    Ajudar Agora
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* View All Link */}
        <ScrollReveal>
          <div className="text-center">
            <Link
              to="/urgencias"
              className="inline-flex items-center gap-2 text-missionary-green font-medium hover:text-missionary-green-dark transition-colors"
            >
              Ver todos os projetos urgentes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
