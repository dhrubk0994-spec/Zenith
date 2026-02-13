
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import ShoppingAssistant from './components/ShoppingAssistant';
import { fetchCollection } from './services/podService';
import { CartItem, Product } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStore = async () => {
      setIsLoading(true);
      const data = await fetchCollection();
      setProducts(data);
      setIsLoading(false);
    };
    loadStore();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: 'M' }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const CollectionsPage = () => (
    <div className="min-h-screen">
      <Hero />
      <section id="shop" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-gold text-[10px] uppercase tracking-[0.4em]">The Core Collection</span>
            <h2 className="text-4xl font-serif font-light tracking-widest uppercase">Atelier Selection</h2>
          </div>
          <div className="flex gap-8 text-[11px] uppercase tracking-widest font-light text-gray-500">
            <button className="text-gold border-b border-gold pb-1">All Items</button>
            <button className="hover:text-gold transition-colors">Gelato Line</button>
            <button className="hover:text-gold transition-colors">Printful Series</button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border border-gold/20 border-t-gold rounded-full animate-spin"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold animate-pulse">Consulting Atelier...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => addToCart(product)} 
              />
            ))}
          </div>
        )}
      </section>

      <section className="bg-navy/30 py-32 border-y border-gold/10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h3 className="text-3xl font-serif italic font-light tracking-wide text-gray-300">
            "True elegance is not about being noticed, it's about being remembered."
          </h3>
          <div className="w-16 h-[1px] bg-gold mx-auto"></div>
          <p className="text-xs uppercase tracking-[0.5em] text-gold font-light">Heritage & Modern Craft</p>
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-40 pb-20 max-w-4xl mx-auto px-6 animate-in fade-in duration-1000">
      <h1 className="text-5xl font-serif tracking-[0.2em] mb-12 text-center uppercase">The Zenith Ethos</h1>
      <div className="aspect-[21/9] bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale mb-16 border border-gold/10"></div>
      <div className="space-y-8 text-lg font-light leading-relaxed text-gray-300 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-gold">
        <p>
          Zenith Atelier represents the convergence of high-fashion philosophy and modern on-demand efficiency. By leveraging the world's finest fulfillment networks (Gelato & Printful), we eliminate waste while maintaining the uncompromising standards of Parisian couture.
        </p>
        <p>
          Every order is unique. Every thread is essential. We don't just print; we architect.
        </p>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CollectionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<AboutPage />} />
          </Routes>
        </main>

        <footer className="border-t border-gold/10 py-20 bg-dark">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-[11px] uppercase tracking-[0.4em] text-gold mb-8">Newsletter</h4>
              <div className="flex border-b border-gold/20 py-2 max-w-xs mx-auto md:mx-0">
                <input placeholder="EMAIL ADDRESS" className="bg-transparent text-[10px] flex-1 focus:outline-none" />
                <button className="text-gold text-[10px] tracking-widest">JOIN</button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-serif tracking-[0.3em] mb-4">ZENITH</span>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500">Peak of Elegance</p>
            </div>
            <div className="text-center md:text-right space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.4em] text-gold mb-8">Navigation</h4>
              <div className="flex flex-col gap-3 text-[10px] uppercase tracking-widest text-gray-400 font-light">
                <a href="#" className="hover:text-gold transition-colors">Privacy</a>
                <a href="#" className="hover:text-gold transition-colors">Fulfillment Policy</a>
              </div>
            </div>
          </div>
        </footer>

        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cart} 
          onRemove={removeFromCart} 
          onClear={clearCart}
        />

        <ShoppingAssistant cartItems={cart} />
      </div>
    </Router>
  );
};

export default App;
