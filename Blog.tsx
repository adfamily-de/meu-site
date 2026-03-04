import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useBlogPosts } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const categories = [
  { value: 'all', label: 'Todas', color: 'bg-missionary-green' },
  { value: 'Evangelismo', label: 'Evangelismo', color: 'bg-blue-500' },
  { value: 'Saúde', label: 'Saúde', color: 'bg-red-500' },
  { value: 'Alfabetização', label: 'Alfabetização', color: 'bg-green-500' },
  { value: 'Fazenda', label: 'Fazenda', color: 'bg-yellow-500' },
  { value: 'Família', label: 'Família', color: 'bg-purple-500' },
  { value: 'Testemunhos', label: 'Testemunhos', color: 'bg-pink-500' },
];

export function Blog() {
  const blogPosts = useBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory);

  return (
    <section id="blog" className="section-padding bg-missionary-cream">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Diário de Campo
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark mb-4">
              Cartas da Missão
            </h2>
            <p className="text-missionary-brown max-w-2xl mx-auto">
              Acompanhe nosso dia a dia no campo missionário, relatos de vitórias, 
              desafios e experiências com Deus.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                  selectedCategory === cat.value
                    ? "bg-missionary-green text-white"
                    : "bg-white text-missionary-dark hover:bg-missionary-beige"
                )}
              >
                {cat.value !== 'all' && (
                  <span className={cn("w-2 h-2 rounded-full", cat.color)} />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => {
            const categoryColor = categories.find(c => c.value === post.category)?.color || 'bg-missionary-green';
            
            return (
              <ScrollReveal key={post.id} delay={index * 100}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-missionary hover:shadow-missionary-lg transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className={cn("px-2 py-1 rounded-full text-xs text-white", categoryColor)}>
                        {post.category}
                      </span>
                      <span className="text-xs text-missionary-brown flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(post.date), 'dd MMM yyyy', { locale: pt })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-2 group-hover:text-missionary-green transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-missionary-brown text-sm line-clamp-3 mb-4 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Author & Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-missionary-beige">
                      <div className="flex items-center gap-2 text-sm text-missionary-brown">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-missionary-green text-sm font-medium hover:text-missionary-green-dark transition-colors flex items-center gap-1"
                      >
                        Ler mais
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-missionary-brown">
              Nenhum post encontrado nesta categoria.
            </p>
          </div>
        )}

        {/* View All */}
        <ScrollReveal>
          <div className="text-center mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-missionary-green font-medium hover:text-missionary-green-dark transition-colors"
            >
              Ver todos os posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
