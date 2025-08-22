'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const links = [
  { href: '/', label: 'হোম' },
  { href: '/about', label: 'পরিচয়' },
  { href: '/manifesto', label: 'মেনিফেস্টো' },
  { href: '/events', label: 'ইভেন্ট' },
  { href: '/peoples-voice', label: 'জনতার কথা' },
  { href: '/press', label: 'প্রেস' }
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-4'}`}>
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-bold text-xl text-gray-700 flex items-center"
        >
          <div className="border-1 p-1 rounded-lg mr-2 flex items-center justify-center w-10 h-10">
            <Image
              src="https://i.ibb.co/wNB2wTHZ/dhan.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          মোহাম্মদ আলী আসগর লবী
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors relative group"
            >
              {l.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* CTA Button */}
          <Link 
            href="/contact" 
            className="ml-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow hover:shadow-md"
          >
            যোগাযোগ
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center relative">
            <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-transform duration-300 ${open ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-700 rounded mt-1 transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-700 rounded mt-1 transition-transform duration-300 ${open ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100 shadow-lg' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col">
          {links.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className="py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link 
            href="/contact" 
            className="mt-2 py-3 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setOpen(false)}
          >
            যোগাযোগ
          </Link>
        </div>
      </div>
    </header>
  );
}