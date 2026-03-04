import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
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

export function BlogPage() {
  const { id } = useParams();
  const blogPosts = useBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const selectedPost = id ? blogPosts.find(p => p.id === id) : null;

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory);

  const handleShare = (post: typeof blogPosts[0]) => {
    const url = `${window.location.origin}/blog/${post.id}`;
    const text = `Leia: ${post.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  // Single Post View
  if (selectedPost) {
    const categoryColor = categories.find(c => c.value === selectedPost.category)?.color || 'bg-missionary-green';
    
    return (
      <div className="pt-20">
        {/* Header */}
        <section className="bg-missionary-green py-12">
          <div className="container-missionary">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Blog
            </Link>
            <span className={cn("inline-block px-3 py-1 rounded-full text-xs text-white mb-4", categoryColor)}>
              {selectedPost.category}
            </span>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-4">
              {selectedPost.title}
            </h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {selectedPost.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(selectedPost.date), 'dd MMMM yyyy', { locale: pt })}
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-white">
          <div className="container-missionary max-w-3xl">
            <ScrollReveal>
              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="prose prose-lg prose-missionary max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-missionary-brown leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-8 pt-8 border-t border-missionary-beige">
                <button
                  onClick={() => handleShare(selectedPost)}
                  className="flex items-center gap-2 text-missionary-green hover:text-missionary-green-dark transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Compartilhar no WhatsApp
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    );
  }

  // Blog List View
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-missionary-green py-20">
        <div className="container-missionary text-center text-white">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            Diário de Campo
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Acompanhe nosso dia a dia no campo missionário, relatos de vitórias, 
            desafios e experiências com Deus.
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="section-padding bg-missionary-cream">
        <div className="container-missionary">
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
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={cn("px-2 py-1 rounded-full text-xs text-white", categoryColor)}>
                          {post.category}
                        </span>
                        <span className="text-xs text-missionary-brown flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(post.date), 'dd MMM yyyy', { locale: pt })}
                        </span>
                      </div>

                      <h3 className="font-cinzel text-xl font-bold text-missionary-dark mb-2 group-hover:text-missionary-green transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-missionary-brown text-sm line-clamp-3 mb-4 flex-grow">
                        {post.excerpt}
                      </p>

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
                          <ArrowLeft className="w-4 h-4 rotate-180" />
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
        </div>
      </section>
    </div>
  );
}
