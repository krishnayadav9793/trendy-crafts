"use client"
import React, { useState ,useEffect} from 'react';
import { Star, ShieldCheck, Heart, ShoppingBag, ArrowRight, Share2, Info } from 'lucide-react';

const ItemBox = ({item}) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState('obsidian');

  const product = {
    name: item.name,
    category: "Premium Audio",
    price: item.price,
    image: item.url,
    description: "Immersive spatial audio with adaptive noise cancellation.",
    
  };

  return (
    <div className="min-h-fit  flex items-center justify-center rounded-md font-sans">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Product Card Container - Compact Max Width */}
      <div className="relative group max-w-[320px] w-full">
        {/* Glow Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-b from-white/20 via-purple-500/30 to-blue-500/30 rounded-[2rem] blur-sm opacity-40 group-hover:opacity-100 transition duration-500"></div>
        
        {/* Main Body */}
        <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[1.8rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-1.5">
          
          {/* Top Actions Overlay - Condensed */}
          <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
            <div className="bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[9px] text-white font-bold tracking-widest uppercase">Pro</span>
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
                isLiked 
                  ? 'bg-pink-500 border-pink-400 text-white' 
                  : 'bg-black/40 border-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Image Section - Reduced Height from h-64 to h-48 */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            
            {/* Price Badge - Compact */}
            <div className="absolute bottom-3 left-5 bg-white text-slate-900 px-3 py-1 rounded-full font-black text-xs shadow-lg">
              {product.price}
            </div>
          </div>

          {/* Content Area - Reduced Padding */}
          <div className="p-5 pt-1">
            {/* Title Section */}
            <div className="mb-3">
              <p className="text-purple-400 text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">
                {product.category}
              </p>
              <h2 className="text-xl font-bold text-white tracking-tight leading-tight truncate">
                {product.name}
              </h2>
              {/* Rating - Inlined for space */}
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4 ,5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-3 h-3 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`}
                    />
                  ))}
                </div>
                <span className="text-white/30 text-[9px] font-medium">4.9</span>
              </div>
            </div>

            {/* Description - Shorter */}
            <p className="text-slate-400 text-[11px] leading-relaxed mb-4 line-clamp-1">
              {product.description}
            </p>

            {/* Product Configuration - Tighter */}
            <div className="flex items-center justify-between mb-5">
              
              <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest">
                In Stock
              </div>
            </div>

            {/* CTA Section - Slimmer Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 text-white text-xs font-bold py-2.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn">
                <ShoppingBag className="w-3.5 h-3.5" />
                Buy Now
              </button>
              <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ItemBox;