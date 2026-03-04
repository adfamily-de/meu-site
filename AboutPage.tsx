import { useSettings, useVisibleMissionaries } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { Quote } from '@/components/custom/Quote';
import { defaultEGWQuotes } from '@/data/initialData';
import { MapPin, Calendar, Users, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AboutPage() {
  const settings = useSettings();
  const missionaries = useVisibleMissionaries();
  const missionStartYear = new Date(settings.missionStartDate).getFullYear();
  const yearsOfMission = new Date().getFullYear() - missionStartYear;

  const mainFamily = missionaries.find(m => m.type === 'main');
  const applicatorFamilies = missionaries.filter(m => m.type === 'applicator');
  const localMissionaries = missionaries.filter(m => m.type === 'local');

  const faithQuote = defaultEGWQuotes.find(q => q.category === 'missões') || defaultEGWQuotes[0];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-missionary-green py-20">
        <div className="container-missionary text-center text-white">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            Quem Somos
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Conheça nossa história de chamado e a equipe que serve em Moçambique
          </p>
        </div>
      </section>

      {/* Mission Story */}
      <section id="historia" className="section-padding bg-white">
        <div className="container-missionary">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="/images/missionaries/joao-maria.jpg"
                    alt="Família Missionária"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-missionary-green text-white p-6 rounded-xl shadow-missionary-lg">
                  <div className="text-4xl font-bold font-cinzel">{yearsOfMission}+</div>
                  <div className="text-sm text-white/80">Anos em Missão</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <span className="inline-block px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
                  Nossa História
                </span>
                <h2 className="font-cinzel text-3xl font-bold text-missionary-dark mb-4">
                  Nosso Chamado Missionário
                </h2>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-missionary-brown">
                    <MapPin className="w-4 h-4 text-missionary-green" />
                    <span className="text-sm">{settings.currentField.district}, {settings.currentField.province}</span>
                  </div>
                  <div className="flex items-center gap-2 text-missionary-brown">
                    <Calendar className="w-4 h-4 text-missionary-green" />
                    <span className="text-sm">Desde {missionStartYear}</span>
                  </div>
                </div>

                <div className="prose prose-missionary max-w-none">
                  {settings.missionStory.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-missionary-brown leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Family */}
      {mainFamily && (
        <section className="section-padding bg-missionary-cream">
          <div className="container-missionary">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
                  Família Principal
                </span>
                <h2 className="font-cinzel text-3xl font-bold text-missionary-dark">
                  {mainFamily.name}
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 shadow-missionary">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-square rounded-xl overflow-hidden max-w-md mx-auto">
                    <img
                      src={mainFamily.photo}
                      alt={mainFamily.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-missionary-green" />
                      <span className="text-missionary-brown">Família Missionária</span>
                    </div>
                    <p className="text-missionary-brown leading-relaxed mb-6">
                      {mainFamily.bio}
                    </p>

                    {mainFamily.familyMembers && (
                      <div className="mb-6">
                        <h4 className="font-cinzel font-bold text-missionary-dark mb-3">
                          Membros da Família
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {mainFamily.familyMembers.map((member, index) => (
                            <div key={index} className="bg-missionary-cream rounded-lg p-3">
                              <div className="font-medium text-missionary-dark">{member.name}</div>
                              <div className="text-sm text-missionary-brown">{member.relationship}</div>
                              {member.role && (
                                <div className="text-xs text-missionary-green">{member.role}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {mainFamily.contact?.email && (
                        <a
                          href={`mailto:${mainFamily.contact.email}`}
                          className="flex items-center gap-2 px-4 py-2 bg-missionary-cream rounded-lg text-sm text-missionary-dark hover:bg-missionary-beige transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      )}
                      {mainFamily.contact?.phone && (
                        <a
                          href={`tel:${mainFamily.contact.phone}`}
                          className="flex items-center gap-2 px-4 py-2 bg-missionary-cream rounded-lg text-sm text-missionary-dark hover:bg-missionary-beige transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Telefone
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Applicator Families */}
      {applicatorFamilies.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-missionary">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-missionary-orange/10 rounded-full text-missionary-orange text-sm font-medium mb-4">
                  Famílias Aplicadoras
                </span>
                <h2 className="font-cinzel text-3xl font-bold text-missionary-dark">
                  Missionários Associados
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicatorFamilies.map((family, index) => (
                <ScrollReveal key={family.id} delay={index * 100}>
                  <div className="bg-missionary-cream rounded-2xl overflow-hidden shadow-missionary hover:shadow-missionary-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-square">
                      <img
                        src={family.photo}
                        alt={family.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-1">
                        {family.name}
                      </h3>
                      <p className="text-sm text-missionary-green mb-2">{family.specialty}</p>
                      <p className="text-sm text-missionary-brown mb-3">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {family.field}
                      </p>
                      <p className="text-sm text-missionary-brown line-clamp-3">
                        {family.bio}
                      </p>
                      <div className="mt-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                          family.status === 'active' && "bg-missionary-green/10 text-missionary-green",
                          family.status === 'vacation' && "bg-missionary-gold/10 text-missionary-orange",
                          family.status === 'returned' && "bg-gray-100 text-gray-600",
                          family.status === 'transition' && "bg-blue-100 text-blue-600"
                        )}>
                          {family.status === 'active' && 'Ativo'}
                          {family.status === 'vacation' && 'De Férias'}
                          {family.status === 'returned' && 'Retornou ao Brasil'}
                          {family.status === 'transition' && 'Em Transição'}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local Missionaries */}
      {localMissionaries.length > 0 && (
        <section className="section-padding bg-missionary-cream">
          <div className="container-missionary">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
                  Missionários Locais
                </span>
                <h2 className="font-cinzel text-3xl font-bold text-missionary-dark">
                  Braço Local da Missão
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              {localMissionaries.map((missionary, index) => (
                <ScrollReveal key={missionary.id} delay={index * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-missionary flex gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={missionary.photo}
                        alt={missionary.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-cinzel text-lg font-bold text-missionary-dark mb-1">
                        {missionary.name}
                      </h3>
                      <p className="text-sm text-missionary-green mb-2">{missionary.specialty}</p>
                      <p className="text-sm text-missionary-brown mb-3">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {missionary.field}
                      </p>
                      {missionary.testimony && (
                        <blockquote className="text-sm text-missionary-brown italic border-l-2 border-missionary-gold pl-3">
                          "{missionary.testimony.substring(0, 100)}..."
                        </blockquote>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Faith Section */}
      <section id="fe" className="section-padding bg-white">
        <div className="container-missionary">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
                  Nossa Fé
                </span>
                <h2 className="font-cinzel text-3xl font-bold text-missionary-dark mb-4">
                  Adventistas do Sétimo Dia
                </h2>
                <p className="text-missionary-brown leading-relaxed mb-4">
                  Somos membros da Igreja Adventista do Sétimo Dia, movidos pela mensagem 
                  dos três anjos de Apocalipse 14. Nossa missão é preparar pessoas para 
                  a volta iminente de Jesus Cristo.
                </p>
                <p className="text-missionary-brown leading-relaxed mb-4">
                  Baseamos nosso trabalho nos escritos de Ellen G. White, especialmente 
                  em sua ênfase na obra médico-missionária, educação rural e o cumprimento 
                  da mensagem dos três anjos.
                </p>
                <p className="text-missionary-brown leading-relaxed">
                  Acreditamos que todo ser humano é amado por Deus e merece ouvir sobre 
                  Seu plano de salvação. É por isso que trabalhamos incansavelmente para 
                  levar esperança às comunidades mais necessitadas de Moçambique.
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
    </div>
  );
}
