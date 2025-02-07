import { Search } from 'lucide-react';
import { memo } from 'react';

interface NoProductsFoundProps {
  searchQuery: string;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ searchQuery }) => (
  <div className='flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in zoom-in-95 duration-700 ease-out'>
    <div className='w-24 h-24 mb-6 text-gray-300 bg-gray-100 rounded-full flex items-center justify-center shadow-md animate-pulse-slow'>
      <Search className='w-12 h-12 text-gray-400' />
    </div>
    <h3 className='text-2xl font-bold text-gray-900 mb-3 tracking-tight'>
      No Products Found
    </h3>
    <p className='text-base text-gray-600 mb-4 max-w-md'>
      We couldn't find any products matching{' '}
      <span className='font-semibold text-gray-800'>"{searchQuery}"</span>
    </p>
    <div className='bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 animate-in slide-in-from-bottom-2 duration-500'>
      Try checking your spelling or using different keywords
    </div>
  </div>
);

export default memo(NoProductsFound);
