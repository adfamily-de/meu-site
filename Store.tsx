import { useState } from 'react';
import { ShoppingBag, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import { useProducts } from '@/context/AppContext';
import { ScrollReveal } from '@/components/custom/ScrollReveal';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CartItem {
  productId: string;
  quantity: number;
}

export function Store() {
  const products = useProducts();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'artesanato', label: 'Artesanato' },
    { value: 'fazenda', label: 'Produtos da Fazenda' },
    { value: 'livros', label: 'Livros' },
    { value: 'vestuario', label: 'Vestuário' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products.filter(p => p.isAvailable)
    : products.filter(p => p.isAvailable && p.category === selectedCategory);

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.productId !== productId);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    const message = `Olá! Gostaria de comprar os seguintes itens:\n\n${cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return `- ${product?.name} (${item.quantity}x) = ${(product?.price || 0) * item.quantity} MZN`;
    }).join('\n')}\n\nTotal: ${getCartTotal()} MZN`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="loja" className="section-padding bg-white">
      <div className="container-missionary">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-missionary-green/10 rounded-full text-missionary-green text-sm font-medium mb-4">
                <ShoppingBag className="w-4 h-4" />
                Loja Solidária
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-missionary-dark">
                Produtos da Missão
              </h2>
            </div>
            
            {/* Cart Button */}
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <button className="relative flex items-center gap-2 px-4 py-2 bg-missionary-green text-white rounded-lg hover:bg-missionary-green-dark transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Carrinho
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-missionary-orange text-white text-xs rounded-full flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-cinzel">Seu Carrinho</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-missionary-brown py-4">
                      Seu carrinho está vazio
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {cart.map((item) => {
                          const product = products.find(p => p.id === item.productId);
                          if (!product) return null;
                          return (
                            <div key={item.productId} className="flex items-center gap-3 bg-missionary-cream rounded-lg p-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-missionary-brown">{product.price} MZN</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => removeFromCart(item.productId)}
                                  className="w-6 h-6 bg-white rounded flex items-center justify-center hover:bg-missionary-beige"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => addToCart(item.productId)}
                                  className="w-6 h-6 bg-white rounded flex items-center justify-center hover:bg-missionary-beige"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="border-t border-missionary-beige pt-4">
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-missionary-green">{getCartTotal()} MZN</span>
                        </div>
                        <button
                          onClick={handleCheckout}
                          className="w-full btn-accent flex items-center justify-center gap-2"
                        >
                          Finalizar pelo WhatsApp
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-missionary-brown mb-8 max-w-2xl">
            100% da renda dos produtos vendidos é destinada aos projetos missionários. 
            Ao comprar, você apoia diretamente o trabalho em Moçambique.
          </p>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === cat.value
                    ? "bg-missionary-green text-white"
                    : "bg-missionary-cream text-missionary-dark hover:bg-missionary-beige"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 100}>
              <div className="bg-missionary-cream rounded-2xl overflow-hidden shadow-missionary hover:shadow-missionary-lg transition-all duration-300 hover:-translate-y-1 group">
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-xs text-missionary-brown uppercase tracking-wide">
                    {categories.find(c => c.value === product.category)?.label}
                  </span>
                  <h3 className="font-cinzel font-bold text-missionary-dark mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-missionary-brown line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-missionary-green">
                      {product.price} {product.currency}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-10 h-10 bg-missionary-green text-white rounded-lg flex items-center justify-center hover:bg-missionary-green-dark transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-missionary-brown">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
