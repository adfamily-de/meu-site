import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetDate: string;
  className?: string;
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate, className, compact = false }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className={cn('text-missionary-urgent font-semibold', className)}>
        Prazo encerrado
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn('flex items-center gap-1 text-sm', className)}>
        <span className="font-bold text-missionary-urgent">{timeLeft.days}</span>
        <span className="text-missionary-brown">d</span>
        <span className="font-bold text-missionary-urgent">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="text-missionary-brown">h</span>
        <span className="font-bold text-missionary-urgent">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="text-missionary-brown">m</span>
      </div>
    );
  }

  const timeBlocks = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Seg' },
  ];

  return (
    <div className={cn('flex gap-3', className)}>
      {timeBlocks.map((block, index) => (
        <div key={index} className="text-center">
          <div className="w-14 h-14 bg-missionary-urgent/10 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-missionary-urgent">
              {block.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-missionary-brown mt-1 block">{block.label}</span>
        </div>
      ))}
    </div>
  );
}
