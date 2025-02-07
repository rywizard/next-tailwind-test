'use client';
import * as React from 'react';

import Features from '@/components/product/Features';
import ProductGrid from '@/components/product/ProductGrid';

export default function HomePage() {
  return (
    <div className='product-page'>
      <ProductGrid />
      <Features />
    </div>
  );
}
