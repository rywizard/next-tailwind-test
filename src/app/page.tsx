'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white shadow-md px-6 py-4'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold text-indigo-600'>TechStore</span>
          <div className='flex items-center space-x-6'>
            <Link
              href='/products'
              className='text-gray-700 hover:text-indigo-600'
            >
              Products
            </Link>
            <ShoppingCart className='w-6 h-6 text-gray-600 cursor-pointer' />
          </div>
        </div>
      </nav>

      <div className='bg-indigo-600 py-12 px-6 text-center'>
        <h1 className='text-4xl font-bold text-white mb-4'>
          Latest Tech Gadgets
        </h1>
        <Link
          href='/products'
          className='inline-block bg-white py-2 px-6 rounded-full text-indigo-600 hover:bg-indigo-50'
        >
          Shop Now
        </Link>
      </div>

      <div className='max-w-5xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[1, 2, 3].map((id) => (
            <div key={id} className='bg-white rounded-lg shadow-md p-4'>
              <Image
                src='/images/product.webp'
                alt='Product'
                width={300}
                height={300}
                className='w-full h-48 object-cover rounded mb-4'
              />
              <h3 className='text-lg font-semibold'>Premium Headphones</h3>
              <p className='text-indigo-600 font-bold mt-2'>$299.99</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
