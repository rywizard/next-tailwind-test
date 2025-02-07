'use client';

import { useState } from 'react';

import SearchInput from '@/components/product/SearchInput';

import NoProductsFound from './NoProductsFound';
import ProductCard from './ProductCard';

const PRODUCTS_PER_PAGE = 6;

const products = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Smartwatch Pro ${index + 1}`,
  price: 199.99 + index * 10,
  rating: 4 + Math.random() * 1,
  reviews: 100 + Math.floor(Math.random() * 150),
  features: ['Heart Rate', 'Sleep Tracking', 'GPS'],
  image: '/images/product.webp',
}));

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <section className='container mx-auto px-4 py-12'>
      <div className='mb-8'>
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          placeholder='Search for smartwatches...'
        />
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className='mt-8 flex justify-center gap-2'>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        searchQuery && <NoProductsFound searchQuery={searchQuery} />
      )}
    </section>
  );
}
