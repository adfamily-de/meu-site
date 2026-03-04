import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, AlertTriangle, ArrowRight, Heart, Share2 } from 'lucide-react';
import { useBeneficiaries } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { ProgressBar } from '@/components/custom/ProgressBar';
import { cn } from '@/lib/utils';
import type { Province } from '@/types';

const provinces: { value: Province; label: string }[] = [
  { value: 'all', label: 'Todas Províncias' },
  { value: 'maputo', label: 'Maputo' },
  { value: 'gaza', label: 'Gaza' },
  { value: 'inhambane', label: 'Inhambane' },
  { value: 'sofala', label: 'Sofala' },
  { value: 'manica', label: 'Manica' },
  { value: 'tete', label: 'Tete' },
  { value: 'zambezia', label: 'Zambezia' },
  { value: 'nampula', label: 'Nampula' },
  { value: 'cabo-delgado', label: 'Cabo Delgado' },
  { value: 'niassa', label: 'Niassa' },
];

const statuses = [
  { value: 'all', label: 'Todos' },
  { value: 'urgent', label: 'Urgente' },
  { value: 'in_progress', label: 'Em Andamento' },
  { value: 'completed', label: 'Concluído' },
];

export function Beneficiaries() {
  const beneficiaries = useBeneficiaries();
  const [selectedProvince, setSelectedProvince] = useState<Province>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredBeneficiaries = beneficiaries.filter(b => {
    const provinceMatch = selectedProvince === 'all' || b.location.province === selectedProvince;
    const statusMatch = selectedStatus === 'all' || b.status === selectedStatus;
    return provinceMatch && statusMatch;
  });

  const handleShare = (beneficiary: typeof beneficiaries[0]) => {
    const text = `Ajude ${beneficiary.name}! ${beneficiary.story.substring(0, 100)}...`;
    const url = `${window.location.origin}/doar?beneficiario=${beneficiary.id}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  return (
    <section id="beneficiarios" className="section-padding bg-white">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Ajude Quem Precisa
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              Perfis dos Necessitados
            </h2>
            <p className="text-missionary-brown max-w-2xl mx-auto">
              Conheça as famílias e indivíduos que precisam de sua ajuda. 
              Cada contribuição faz a diferença.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-missionary-brown" />
              <span className="text-sm text-missionary-brown">Filtrar:</span>
            </div>
            
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value as Province)}
              className="px-4 py-2 bg-missionary-cream rounded-lg text-sm text-missionary-dark border-none focus:ring-2 focus:ring-missionary-green"
            >
              {provinces.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-missionary-cream rounded-lg text-sm text-missionary-dark border-none focus:ring-2 focus:ring-missionary-green"
            >
              {statuses.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeneficiaries.map((beneficiary, index) => (
            <ScrollReveal key={beneficiary.id} delay={index * 100}>
              <div className="bg-white rounded-2xl shadow-missionary hover:shadow-missionary-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={beneficiary.photo}
                    alt={beneficiary.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {beneficiary.status === 'urgent' && (
                      <span className="badge-urgent">
                        <AlertTriangle className="w-3 h-3" />
                        URGENTE
                      </span>
                    )}
                    {beneficiary.status === 'completed' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-missionary-green text-white text-xs font-semibold">
                        Concluído
                      </span>
                    )}
                    {beneficiary.status === 'in_progress' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-missionary-gold text-missionary-dark text-xs font-semibold">
                        Em Andamento
                      </span>
                    )}
                  </div>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(beneficiary)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-missionary-dark" />
                  </button>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-sm">
                    <MapPin className="w-4 h-4" />
                    {beneficiary.location.district}, {beneficiary.location.province}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-2">
                    {beneficiary.name}
                  </h3>
                  <p className="text-missionary-brown text-sm line-clamp-3 mb-4">
                    {beneficiary.story}
                  </p>

                  {/* Progress */}
                  <ProgressBar 
                    current={beneficiary.raisedAmount} 
                    total={beneficiary.needAmount}
                    className="mb-4"
                  />

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      to={`/doar?beneficiario=${beneficiary.id}`}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-colors",
                        beneficiary.status === 'urgent'
                          ? "bg-missionary-urgent text-white hover:bg-missionary-urgent/90"
                          : "bg-missionary-green text-white hover:bg-missionary-green-dark"
                      )}
                    >
                      Ajudar Agora
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredBeneficiaries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-missionary-brown">
              Nenhum beneficiário encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
