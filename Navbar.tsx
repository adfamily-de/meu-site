import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Heart, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/context/AppContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Início', href: '/' },
  { 
    name: 'Quem Somos', 
    href: '/quem-somos',
    children: [
      { name: 'Nossa História', href: '/quem-somos#historia' },
      { name: 'Nossa Equipe', href: '/quem-somos#equipe' },
      { name: 'Nossa Fé', href: '/quem-somos#fe' },
    ]
  },
  { 
    name: 'O Que Fazemos', 
    href: '/o-que-fazemos',
    children: [
      { name: 'Evangelismo', href: '/o-que-fazemos#evangelismo' },
      { name: 'Saúde', href: '/o-que-fazemos#saude' },
      { name: 'Educação', href: '/o-que-fazemos#educacao' },
      { name: 'Fazenda', href: '/o-que-fazemos#fazenda' },
    ]
  },
  { name: 'Projetos Urgentes', href: '/urgencias' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contato', href: '/contato' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const settings = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-missionary' 
          : 'bg-transparent'
      )}
    >
      <nav className="container-missionary">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-missionary-green rounded-full flex items-center justify-center">
              <span className="text-white font-cinzel font-bold text-lg">
                {settings.familyName.charAt(0)}
              </span>
            </div>
            <div className={cn(
              'hidden sm:block transition-colors',
              isScrolled ? 'text-missionary-dark' : 'text-white'
            )}>
              <span className="font-cinzel font-semibold text-sm block">Família</span>
              <span className={cn(
                'font-cinzel font-bold text-lg leading-none',
                isScrolled ? 'text-missionary-green' : 'text-white'
              )}>
                {settings.familyName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.children ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        isScrolled 
                          ? 'text-missionary-dark hover:text-missionary-green hover:bg-missionary-cream'
                          : 'text-white/90 hover:text-white hover:bg-white/10',
                        isActive(link.href) && (isScrolled ? 'text-missionary-green' : 'text-white')
                      )}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link 
                          to={child.href}
                          className="cursor-pointer"
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isScrolled 
                      ? 'text-missionary-dark hover:text-missionary-green hover:bg-missionary-cream'
                      : 'text-white/90 hover:text-white hover:bg-white/10',
                    isActive(link.href) && (isScrolled ? 'text-missionary-green bg-missionary-cream' : 'text-white bg-white/10')
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/doar"
              className="btn-accent flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Apoie a Missão
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button 
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isScrolled 
                    ? 'text-missionary-dark hover:bg-missionary-cream'
                    : 'text-white hover:bg-white/10'
                )}
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b border-missionary-beige">
                  <span className="font-cinzel font-bold text-missionary-green">
                    Menu
                  </span>
                </div>
                
                <div className="flex-1 py-6">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <div key={link.name}>
                        <Link
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                            isActive(link.href)
                              ? 'bg-missionary-cream text-missionary-green'
                              : 'text-missionary-dark hover:bg-missionary-cream hover:text-missionary-green'
                          )}
                        >
                          {link.name}
                        </Link>
                        {link.children && (
                          <div className="ml-4 mt-1 space-y-1">
                            {link.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 rounded-lg text-sm text-missionary-brown hover:text-missionary-green hover:bg-missionary-cream"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-4 border-t border-missionary-beige">
                  <Link
                    to="/doar"
                    onClick={() => setIsOpen(false)}
                    className="btn-accent w-full flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Apoie a Missão
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
