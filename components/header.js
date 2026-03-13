'use client'
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  
  ShoppingBag, 
  ArrowRight, 
  Search, 
  Menu, 
  X, 
  User,
  Bell
} from 'lucide-react';
function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router=useRouter();
    useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header 
        className={` left-0 right-0 z-50 transition-all duration-300  w-full sticky top-0  bg-[#070817] border-b border-[#1a1d35] px-4 md:px-8 py-4 flex justify-between items-center  ${
          scrolled 
            ? 'bg-slate-950/80 backdrop-blur-xl border-white/10 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl  mx-auto px-6 flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform">
              
              <Image  src='https://res.cloudinary.com/dz6h1ksg1/image/upload/v1772383600/555077461_17907845199244243_6534801052402177053_n_osh5we.jpg'
              width={30}
              height={30} 
              className='rounded-lg'/>
            </div>
            <span className="text-xl font-black tracking-tighter text-white">Trendy Crafts</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search audio gear..."
              className="block w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            <nav className="hidden lg:flex items-center gap-6 mr-4 text-sm font-semibold text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Products</a>
              <a href="#" className="hover:text-white transition-colors">Deals</a>
              <a href="/support" className="hover:text-white transition-colors">Support</a>
            </nav>

            <div className="flex items-center gap-1">
              <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-slate-950"></span>
              </button>
              
              <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative" onClick={()=>router.push(`/cart/1`)}>
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-slate-950">
                  3
                </span>
              </button>

              <a className="hidden sm:flex p-1 hover:bg-white/5 rounded-full border border-transparent hover:border-white/10 transition-all ml-2" href='/dashboard'>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/20">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              </a>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-slate-400 hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden animate-in fade-in slide-in-from-top-4">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-sm focus:outline-none"
              />
            </div>
            <nav className="flex flex-col gap-4 text-lg font-bold">
              <a href="#" className="flex justify-between items-center text-white">Products <ArrowRight className="w-4 h-4" /></a>
              <a href="#" className="flex justify-between items-center text-slate-400">Deals <ArrowRight className="w-4 h-4" /></a>
              <a href="/dashboard" className="flex justify-between items-center text-slate-400">Account <ArrowRight className="w-4 h-4" /></a>
              <a href="/support" className="flex justify-between items-center text-slate-400">Support <ArrowRight className="w-4 h-4" /></a>
            </nav>
          </div>
        )}
      </header>
  )
}

export default Header
