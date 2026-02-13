
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-40 scale-105"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50"></div>
      
      <div className="relative z-10 text-center px-6">
        <div className="mb-8 overflow-hidden">
           <span className="block text-gold text-[12px] uppercase tracking-[0.6em] mb-4 animate-[fadeInUp_1s_ease-out]">EST. MMXXIV</span>
           <h1 className="text-6xl md:text-8xl font-serif tracking-[0.2em] font-light mb-6 animate-[fadeInUp_1.5s_ease-out]">ZENITH</h1>
           <p className="text-lg md:text-xl font-light italic text-gray-400 tracking-widest animate-[fadeInUp_2s_ease-out]">
            Reach the Peak of Elegance
           </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-12 opacity-0 animate-[fadeIn_3s_ease-out_forwards]">
          <button className="px-12 py-4 bg-transparent border border-gold text-gold text-xs uppercase tracking-[0.3em] hover:bg-gold hover:text-dark transition-all duration-500">
            Shop Collection
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
