// src/components/ProductCard.tsx
'use client';

import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
// Sample product data
const sampleProduct = {
  id: 1,
  name: 'Premium Smartwatch Pro',
  price: 199.99,
  rating: 4.5,
  reviews: 128,
  features: ['Heart Rate', 'Sleep Tracking', 'GPS'],
  image: '/images/product.webp',
};

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  image: string;
}

interface ProductCardProps {
  product?: Product;
}

const ProductCard = ({ product = sampleProduct }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 hover:-translate-y-2'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative overflow-hidden aspect-[3/4]'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className='absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group-hover:scale-110'
        >
          <Heart
            size={20}
            className={`transition-colors duration-300 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        <div
          className={`absolute inset-x-0 bottom-0 p-4 text-white transform transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className='flex flex-wrap gap-2 mb-3'>
            {product.features.map((feature, idx) => (
              <span
                key={idx}
                className='px-3 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full'
              >
                {feature}
              </span>
            ))}
          </div>
          <button className='w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors'>
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      <div className='p-4 space-y-2'>
        <div className='flex justify-between items-start'>
          <h3 className='text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors'>
            {product.name}
          </h3>
          <p className='text-xl font-bold text-blue-600'>${product.price}</p>
        </div>

        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 fill-gray-300'
                }`}
              />
            ))}
            <span className='text-sm text-gray-600 ml-1'>{product.rating}</span>
          </div>
          <span className='text-sm text-gray-500'>
            ({product.reviews} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
