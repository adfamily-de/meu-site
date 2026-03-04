import { cn } from '@/lib/utils';

interface QuoteProps {
  quote: string;
  reference: string;
  className?: string;
  variant?: 'light' | 'dark' | 'green';
}

export function Quote({ 
  quote, 
  reference, 
  className,
  variant = 'light' 
}: QuoteProps) {
  const variantClasses = {
    light: 'bg-missionary-cream text-missionary-dark',
    dark: 'bg-missionary-dark text-white',
    green: 'bg-missionary-green text-white'
  };

  return (
    <blockquote 
      className={cn(
        'relative p-8 rounded-2xl',
        variantClasses[variant],
        className
      )}
    >
      <div className="absolute top-4 left-4 text-6xl font-crimson opacity-20 leading-none">
        "
      </div>
      <p className="relative z-10 font-crimson text-xl italic leading-relaxed pl-4">
        {quote}
      </p>
      <footer className="mt-4 text-right">
        <cite className={cn(
          'text-sm not-italic font-medium',
          variant === 'light' ? 'text-missionary-brown' : 'text-missionary-gold'
        )}>
          — {reference}
        </cite>
      </footer>
    </blockquote>
  );
}
