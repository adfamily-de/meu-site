import { BookOpen, Users, GraduationCap, BookMarked, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { CountUp } from '@/components/custom/CountUp';
import { Quote } from '@/components/custom/Quote';
import { defaultEducationProject } from '@/data/initialData';

export function EducationProject() {
  const project = defaultEducationProject;

  return (
    <section id="educacao" className="section-padding bg-gradient-to-b from-missionary-green/5 to-missionary-cream">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Projeto Especial
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              {project.name}
            </h2>
            <p className="text-missionary-brown max-w-2xl mx-auto">
              Programa de alfabetização que transforma vidas através da educação 
              e da Palavra de Deus.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-missionary">
              <Users className="w-8 h-8 mx-auto mb-2 text-missionary-green" />
              <div className="text-3xl md:text-4xl font-bold text-missionary-dark font-cinzel">
                <CountUp end={project.students} />
              </div>
              <div className="text-sm text-missionary-brown">Alunos</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-missionary">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-missionary-green" />
              <div className="text-3xl md:text-4xl font-bold text-missionary-dark font-cinzel">
                <CountUp end={project.classes} />
              </div>
              <div className="text-sm text-missionary-brown">Turmas</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-missionary">
              <GraduationCap className="w-8 h-8 mx-auto mb-2 text-missionary-green" />
              <div className="text-3xl md:text-4xl font-bold text-missionary-dark font-cinzel">
                <CountUp end={project.passRate} suffix="%" />
              </div>
              <div className="text-sm text-missionary-brown">Aprovação</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Description */}
          <ScrollReveal direction="left">
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

              <h4 className="font-cinzel text-lg font-bold text-missionary-dark mb-3">
                Materiais Didáticos Necessários
              </h4>
              <ul className="space-y-2 mb-6">
                {project.materials.map((material, index) => (
                  <li key={index} className="flex items-center gap-2 text-missionary-brown">
                    <BookMarked className="w-4 h-4 text-missionary-gold" />
                    {material}
                  </li>
                ))}
              </ul>

              <Link
                to="/doar?projeto=educacao"
                className="btn-primary inline-flex items-center gap-2"
              >
                Apoiar a Educação
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Quote & Gallery */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <Quote 
                quote="A educação é a obra de toda a vida."
                reference="ED, p. 30"
                variant="light"
              />

              {/* Gallery Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-missionary">
                <h4 className="font-cinzel text-lg font-bold text-missionary-dark mb-4">
                  Galeria
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery.slice(0, 4).map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Aula ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Success Stories */}
        <ScrollReveal>
          <div>
            <h3 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6 text-center">
              Histórias de Sucesso
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {project.successStories.map((story, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-missionary">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={story.photo}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-cinzel font-bold text-missionary-dark">
                        {story.name}, {story.age} anos
                      </h4>
                      <div className="mt-3 space-y-2">
                        <div>
                          <span className="text-xs text-missionary-urgent font-medium">Antes:</span>
                          <p className="text-sm text-missionary-brown">{story.beforeStory}</p>
                        </div>
                        <div>
                          <span className="text-xs text-missionary-green font-medium">Depois:</span>
                          <p className="text-sm text-missionary-brown">{story.afterStory}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
