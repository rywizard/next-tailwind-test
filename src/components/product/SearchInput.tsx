'use client';

import { Search, XCircle } from 'lucide-react';
import { memo, useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search for smartwatches...',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='relative w-full max-w-2xl mx-auto'>
      <div
        className={`
        relative rounded-xl border transition-all duration-300
        ${
          isFocused
            ? 'border-blue-600 shadow-lg ring-2 ring-blue-100'
            : 'border-gray-200'
        }
      `}
      >
        <Search
          className={`
          absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300
          ${isFocused ? 'text-blue-600' : 'text-gray-400'}
        `}
        />
        <input
          type='text'
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className='w-full pl-10 pr-12 py-3 rounded-xl focus:outline-none bg-transparent'
        />
        {value && (
          <button
            onClick={onClear}
            aria-label='Clear search'
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full'
          >
            <XCircle className='w-5 h-5' />
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(SearchInput);
