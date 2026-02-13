
import React, { useState } from 'react';
import { CartItem } from '../types';
import { initiatePayment } from '../services/paymentService';
import { syncOrderToPOD } from '../services/podService';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove, onClear }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    
    initiatePayment(total, items, async (paymentResponse) => {
      try {
        console.log("Payment Successful:", paymentResponse);
        // Sync with POD services after payment success
        await syncOrderToPOD(paymentResponse, items);
        alert("Order successful. Zenith is preparing your selection.");
        onClear();
        onClose();
      } catch (err) {
        console.error("POD Sync Error:", err);
      } finally {
        setIsProcessing(false);
      }
    });
    
    // In case user closes modal without paying
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-dark border-l border-gold/20 z-[101] transition-transform duration-500 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-gold/10 flex justify-between items-center">
            <h2 className="text-xl font-serif tracking-[0.2em]">YOUR BAG</h2>
            <button onClick={onClose} className="text-xs uppercase tracking-widest hover:text-gold transition-colors">Close</button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 italic font-light">
                <p>Your sanctuary is empty.</p>
                <p className="text-[10px] uppercase tracking-widest mt-4">Discover the collection</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 items-start group">
                  <div className="w-24 h-32 bg-gray-900 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xs uppercase tracking-[0.1em] font-light">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">{item.selectedSize} / {item.quantity} QTY</p>
                    <p className="text-sm text-gold mt-2 font-serif">${item.price}</p>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-[10px] text-red-800/60 uppercase tracking-widest hover:text-red-500 transition-colors pt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-8 bg-navy/50 border-t border-gold/20 space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase tracking-[0.4em] font-light text-gray-400">Total Estimate</span>
              <span className="text-2xl font-serif text-gold">${total}</span>
            </div>
            <p className="text-[10px] text-gray-500 italic text-center">Fulfillment via Zenith Global Network.</p>
            <button 
              onClick={handleCheckout}
              disabled={items.length === 0 || isProcessing}
              className="w-full py-4 bg-gold text-dark text-xs uppercase tracking-[0.4em] font-medium hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "SECURE CONNECTION..." : "PAY WITH RAZORPAY"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
