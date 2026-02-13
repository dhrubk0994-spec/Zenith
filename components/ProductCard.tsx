
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col h-full animate-in fade-in duration-1000">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900 border border-gold/5 group-hover:border-gold/30 transition-all duration-700">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <button 
            onClick={onAddToCart}
            className="w-full py-4 bg-white text-dark text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-gold transition-colors duration-300 shadow-2xl"
          >
            Add to Bag
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center text-center space-y-2">
        <span className="text-[9px] uppercase tracking-[0.5em] text-gold font-light">{product.category}</span>
        <h3 className="text-xs uppercase tracking-[0.2em] font-light text-gray-200 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-serif text-gray-400">${product.price}</p>
      </div>

      <div className="mt-4 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {product.colors.map(color => (
          <div 
            key={color}
            className="w-2 h-2 rounded-full border border-gold/40"
            title={color}
            style={{ backgroundColor: color.includes('Black') ? '#000' : color.includes('Navy') ? '#0a1a3a' : '#ddd' }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
