// app/page.tsx
import type { Metadata } from 'next';

import HomePage from '@/app/components/HomePage';

export const metadata: Metadata = {
  title: 'TechStore | Premium Electronics',
  description: 'Discover amazing deals on premium electronics at TechStore',
  openGraph: {
    title: 'TechStore',
    description: 'Premium Electronics Store',
    images: ['/images/product.webp'],
  },
};

export default function Page() {
  return <HomePage />;
}
