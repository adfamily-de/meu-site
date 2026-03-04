import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ 
  current, 
  total, 
  className,
  showLabel = true,
  size = 'md'
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const percentage = Math.min(Math.round((current / total) * 100), 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(percentage), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage]);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-missionary-brown">
            {current.toLocaleString()} MZN
          </span>
          <span className="font-semibold text-missionary-green">
            {percentage}%
          </span>
        </div>
      )}
      <div className={cn('bg-missionary-beige rounded-full overflow-hidden', sizeClasses[size])}>
        <div 
          className="h-full rounded-full bg-gradient-to-r from-missionary-green to-missionary-gold transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-right text-xs text-missionary-brown mt-1">
          Meta: {total.toLocaleString()} MZN
        </div>
      )}
    </div>
  );
}
