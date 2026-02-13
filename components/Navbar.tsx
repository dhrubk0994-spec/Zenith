
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-dark/95 backdrop-blur-md py-4 border-b border-gold/20' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.3em] font-light hover:text-gold transition-colors ${
                location.pathname === link.path ? 'text-gold' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/" className="text-2xl font-serif tracking-[0.4em] flex flex-col items-center group">
          <span className="group-hover:text-gold transition-colors">ZENITH</span>
          <div className="h-[1px] w-12 bg-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </Link>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenCart}
            className="relative flex items-center gap-2 group"
          >
            <span className="text-[11px] uppercase tracking-widest font-light text-gray-300 group-hover:text-gold transition-colors">Bag</span>
            <div className="w-5 h-5 flex items-center justify-center border border-gray-500 rounded-full text-[10px] group-hover:border-gold transition-colors">
              {cartCount}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
