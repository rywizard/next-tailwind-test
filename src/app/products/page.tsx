// app/products/page.tsx
import type { Metadata } from 'next';

import ProductsPage from '@/app/components/ProductsPage';

export const metadata: Metadata = {
  title: 'Products | Premium Tech Collection',
  description:
    'Browse our premium electronics, featuring high-quality headphones and tech gadgets',
  openGraph: {
    title: 'TechStore Products',
    description: 'Premium Electronics Collection',
    images: ['/images/product.webp'],
  },
};

export default function Page() {
  return <ProductsPage />;
}
