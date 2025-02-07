'use client';

import { useEffect, useState } from 'react';

import { useProducts } from '@/hooks/useProducts';

import ProductSkeleton from '@/components/product/ProductSkeleton';
import SearchInput from '@/components/product/SearchInput';

import NoProductsFound from './NoProductsFound';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { products, loading, error, fetchProducts, page, totalPages } =
    useProducts();

  useEffect(() => {
    const initFetch = async () => {
      await fetchProducts({
        page: 1,
        limit: 6,
        ...(searchQuery && { search: searchQuery }),
      });
      setIsInitialLoading(false);
    };

    initFetch();
  }, [searchQuery, fetchProducts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handlePageChange = (newPage: number) => {
    fetchProducts({
      page: newPage,
      limit: 6,
      ...(searchQuery && { search: searchQuery }),
    });
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

      {loading || isInitialLoading ? (
        <>
          <ProductSkeleton />
          {totalPages > 1 && (
            <div className='mt-8 flex justify-center gap-2'>
              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className='px-4 py-2 rounded bg-gray-200 w-10 h-10 animate-pulse'
                />
              ))}
            </div>
          )}
        </>
      ) : products.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className='mt-8 flex justify-center gap-2'>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${
                    page === index + 1
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
      {error && <div>Error: {error}</div>}
    </section>
  );
}
