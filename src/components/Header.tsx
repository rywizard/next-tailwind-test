'use client';

import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8'>
        <div className='flex items-center lg:flex-1'>
          <Link
            href='/'
            className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300'
          >
            Smartwatch Store
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className='hidden lg:flex lg:gap-x-8'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='text-sm font-semibold text-gray-700 hover:text-blue-600 relative group'
            >
              {item.name}
              <span className='absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
            </Link>
          ))}
        </div>

        {/* Action buttons */}
        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6'>
          <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <Search className='h-5 w-5' />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <User className='h-5 w-5' />
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-full transition-colors relative'>
            <ShoppingCart className='h-5 w-5' />
            <span className='absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center'>
              0
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className='flex lg:hidden'>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            {mobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className='lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg animate-fadeIn'>
            <div className='p-4 space-y-3'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='block py-2 text-base font-medium text-gray-900 hover:text-blue-600 transition-colors'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className='flex gap-4 pt-4 border-t'>
                <button className='p-2 hover:bg-gray-100 rounded-full'>
                  <Search className='h-5 w-5' />
                </button>
                <button className='p-2 hover:bg-gray-100 rounded-full'>
                  <User className='h-5 w-5' />
                </button>
                <button className='p-2 hover:bg-gray-100 rounded-full relative'>
                  <ShoppingCart className='h-5 w-5' />
                  <span className='absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center'>
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
