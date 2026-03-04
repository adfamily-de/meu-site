import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, ArrowRight, Clock, Filter } from 'lucide-react';
import { useBeneficiaries, useUrgentProjects } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { ProgressBar } from '@/components/custom/ProgressBar';
import { Countdown } from '@/components/custom/Countdown';
// import { cn } from '@/lib/utils';
import type { Province } from '@/types';

const provinces: { value: Province; label: string }[] = [
  { value: 'all', label: 'Todas Províncias' },
  { value: 'gaza', label: 'Gaza' },
  { value: 'maputo', label: 'Maputo' },
  { value: 'inhambane', label: 'Inhambane' },
  { value: 'sofala', label: 'Sofala' },
  { value: 'manica', label: 'Manica' },
  { value: 'tete', label: 'Tete' },
  { value: 'zambezia', label: 'Zambezia' },
  { value: 'nampula', label: 'Nampula' },
  { value: 'cabo-delgado', label: 'Cabo Delgado' },
  { value: 'niassa', label: 'Niassa' },
];

export function UrgentPage() {
  const beneficiaries = useBeneficiaries();
  const urgentProjects = useUrgentProjects();
  const [selectedProvince, setSelectedProvince] = useState<Province>('all');

  const urgentBeneficiaries = beneficiaries.filter(b => b.status === 'urgent');
  
  const filteredBeneficiaries = selectedProvince === 'all' 
    ? urgentBeneficiaries 
    : urgentBeneficiaries.filter(b => b.location.province === selectedProvince);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-missionary-urgent py-20">
        <div className="container-missionary text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            Atenção Imediata
          </span>
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            Projetos Urgentes
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Estas são as necessidades mais urgentes que precisamos atender agora. 
            Sua ajuda pode fazer a diferença imediata na vida dessas pessoas.
          </p>
        </div>
      </section>

      {/* Urgent Projects from Data */}
      <section className="section-padding bg-missionary-cream">
        <div className="container-missionary">
          <ScrollReveal>
            <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-8">
              Campanhas Urgentes
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {urgentProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100}>
                <div className="card-urgent h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge-urgent">
                      <AlertTriangle className="w-3 h-3" />
                      URGENTE
                    </span>
                    {project.deadline && (
                      <div className="flex items-center gap-1 text-sm text-missionary-brown">
                        <Clock className="w-4 h-4" />
                        <Countdown targetDate={project.deadline} compact />
                      </div>
                    )}
                  </div>

                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-2">
                    {project.title}
                  </h3>
                  <p className="text-missionary-brown text-sm mb-4 flex-grow">
                    {project.description}
                  </p>

                  <ProgressBar 
                    current={project.raisedAmount} 
                    total={project.needAmount}
                    className="mb-4"
                  />

                  <Link
                    to={`/doar?projeto=${project.id}`}
                    className="btn-accent w-full flex items-center justify-center gap-2"
                  >
                    Ajudar Agora
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Beneficiaries */}
      <section className="section-padding bg-white">
        <div className="container-missionary">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h2 className="font-cinzel text-2xl font-bold text-missionary-dark">
                Beneficiários Urgentes
              </h2>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-missionary-brown" />
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value as Province)}
                  className="px-4 py-2 bg-missionary-cream rounded-lg text-sm text-missionary-dark border-none focus:ring-2 focus:ring-missionary-green"
                >
                  {provinces.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeneficiaries.map((beneficiary, index) => (
              <ScrollReveal key={beneficiary.id} delay={index * 100}>
                <div className="bg-white rounded-2xl shadow-missionary hover:shadow-missionary-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={beneficiary.photo}
                      alt={beneficiary.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="badge-urgent">
                        <AlertTriangle className="w-3 h-3" />
                        URGENTE
                      </span>
                    </div>

                    {beneficiary.deadline && (
                      <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-3 py-1">
                        <Countdown targetDate={beneficiary.deadline} compact />
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-sm">
                      <MapPin className="w-4 h-4" />
                      {beneficiary.location.district}, {beneficiary.location.province}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-2">
                      {beneficiary.name}
                    </h3>
                    <p className="text-missionary-brown text-sm line-clamp-3 mb-4">
                      {beneficiary.story}
                    </p>

                    <ProgressBar 
                      current={beneficiary.raisedAmount} 
                      total={beneficiary.needAmount}
                      className="mb-4"
                    />

                    <Link
                      to={`/doar?beneficiario=${beneficiary.id}`}
                      className="btn-urgent w-full flex items-center justify-center gap-2 bg-missionary-urgent text-white py-3 rounded-lg font-medium hover:bg-missionary-urgent/90 transition-colors"
                    >
                      Ajudar Agora
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filteredBeneficiaries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-missionary-brown">
                Nenhum beneficiário urgente encontrado nesta província.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
