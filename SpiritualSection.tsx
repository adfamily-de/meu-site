import { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { defaultEGWQuotes } from '@/data/initialData';
import { cn } from '@/lib/utils';

export function SpiritualSection() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentVerse] = useState({
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    reference: "João 3:16"
  });

  const categories = ['missões', 'educacao', 'agricultura', 'saude', 'volta-de-jesus'];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredQuotes = selectedCategory === 'all' 
    ? defaultEGWQuotes 
    : defaultEGWQuotes.filter(q => q.category === selectedCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % filteredQuotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [filteredQuotes.length]);

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % filteredQuotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
  };

  const categoryLabels: Record<string, string> = {
    'all': 'Todas',
    'missões': 'Missões',
    'educacao': 'Educação',
    'agricultura': 'Agricultura',
    'saude': 'Saúde',
    'volta-de-jesus': 'Volta de Jesus'
  };

  return (
    <section className="section-padding bg-missionary-green text-white">
      <div className="container-missionary">
        {/* Daily Verse */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-missionary-gold text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Versículo do Dia
            </span>
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl font-crimson italic leading-relaxed mb-4">
                "{currentVerse.text}"
              </p>
              <cite className="text-missionary-gold not-italic font-medium">
                — {currentVerse.reference}
              </cite>
            </blockquote>
          </div>
        </ScrollReveal>

        {/* EGW Quotes Carousel */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-missionary-gold text-sm font-medium mb-4">
                <Quote className="w-4 h-4" />
                Citações de Ellen G. White
              </span>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentQuoteIndex(0);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      selectedCategory === cat
                        ? "bg-missionary-gold text-missionary-dark"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    )}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Quote Card */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="absolute top-4 left-4 text-6xl font-crimson text-missionary-gold/30 leading-none">
                "
              </div>
              
              <div className="relative z-10 text-center">
                <p className="text-xl md:text-2xl font-crimson italic leading-relaxed mb-6">
                  "{filteredQuotes[currentQuoteIndex]?.quote}"
                </p>
                <cite className="text-missionary-gold not-italic font-medium">
                  — {filteredQuotes[currentQuoteIndex]?.reference}
                </cite>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevQuote}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  {filteredQuotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuoteIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        index === currentQuoteIndex
                          ? "bg-missionary-gold"
                          : "bg-white/30 hover:bg-white/50"
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={nextQuote}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Download Studies */}
        <ScrollReveal>
          <div className="mt-12 text-center">
            <p className="text-white/80 mb-4">
              Quer aprofundar seus estudos bíblicos?
            </p>
            <a
              href="/estudos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Baixar Estudos Bíblicos
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
