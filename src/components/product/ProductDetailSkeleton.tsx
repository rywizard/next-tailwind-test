import { memo } from 'react';

const ProductDetailSkeleton = () => (
  <section className='container mx-auto px-4 py-12'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div className='relative'>
        <div className='w-full aspect-square bg-gray-200 animate-pulse rounded-xl' />
        <div className='absolute top-4 right-4 h-10 w-10 bg-gray-200 animate-pulse rounded-full' />
      </div>

      <div className='space-y-6'>
        <div className='h-6 w-32 bg-gray-200 animate-pulse rounded' />

        <div className='space-y-2'>
          <div className='h-10 w-3/4 bg-gray-200 animate-pulse rounded' />
          <div className='h-8 w-24 bg-gray-200 animate-pulse rounded' />
        </div>

        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='h-5 w-5 bg-gray-200 animate-pulse rounded'
              />
            ))}
            <div className='h-5 w-8 bg-gray-200 animate-pulse rounded ml-2' />
          </div>
          <div className='h-5 w-20 bg-gray-200 animate-pulse rounded' />
        </div>

        <div className='space-y-4'>
          <div className='h-8 w-24 bg-gray-200 animate-pulse rounded' />
          <div className='flex flex-wrap gap-2'>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className='h-8 w-24 bg-gray-200 animate-pulse rounded-full'
              />
            ))}
          </div>
        </div>

        <div className='h-12 w-full bg-gray-200 animate-pulse rounded-lg' />
      </div>
    </div>
  </section>
);

export default memo(ProductDetailSkeleton);
