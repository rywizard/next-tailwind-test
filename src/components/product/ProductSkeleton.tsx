import { memo } from 'react';

interface ProductSkeletonProps {
  count?: number;
}

const ProductSkeleton = ({ count = 6 }: ProductSkeletonProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='bg-white rounded-xl shadow-lg overflow-hidden group'
        >
          <div className='relative overflow-hidden aspect-[4/4]'>
            <div className='w-full h-full bg-gray-200 animate-pulse' />

            <div className='absolute top-4 right-4 p-2.5 bg-gray-200 animate-pulse rounded-full h-10 w-10' />

            <div className='absolute inset-x-0 bottom-0 p-4'>
              <div className='flex flex-wrap gap-2 mb-3'>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className='h-7 w-20 bg-gray-200 animate-pulse rounded-full'
                  />
                ))}
              </div>
              <div className='h-11 w-full bg-gray-200 animate-pulse rounded-lg' />
            </div>
          </div>

          <div className='p-4 space-y-2'>
            <div className='flex justify-between items-start'>
              <div className='h-7 w-2/3 bg-gray-200 animate-pulse rounded' />
              <div className='h-7 w-20 bg-gray-200 animate-pulse rounded' />
            </div>

            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className='h-4 w-4 bg-gray-200 animate-pulse rounded'
                  />
                ))}
                <div className='h-4 w-8 bg-gray-200 animate-pulse rounded ml-1' />
              </div>
              <div className='h-4 w-20 bg-gray-200 animate-pulse rounded' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ProductSkeleton);
