'use client';

import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useProducts } from '@/hooks/useProducts';

import ProductDetailSkeleton from '@/components/product/ProductDetailSkeleton';

import { Product } from '@/types/product';

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const router = useRouter();
  const { getProductById } = useProducts();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(Number(params.id));
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, getProductById]);

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <section className='container mx-auto px-4 py-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='relative'>
          {/*eslint-disable-next-line*/}
          <img
            src={product.image}
            alt={product.name}
            className='w-full rounded-xl shadow-lg'
          />
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className='absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300'
          >
            <Heart
              size={24}
              className={`transition-colors duration-300 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        <div className='space-y-6'>
          <button
            onClick={() => router.back()}
            className='text-blue-600 hover:text-blue-700'
          >
            ← Back to products
          </button>

          <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              {product.name}
            </h1>
            <p className='text-2xl font-bold text-blue-600'>${product.price}</p>
          </div>

          <div className='flex items-center gap-2'>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 fill-gray-300'
                  }`}
                />
              ))}
              <span className='ml-2 text-gray-600'>{product.rating}</span>
            </div>
            <span className='text-gray-500'>({product.reviews} reviews)</span>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-gray-800'>Features</h2>
            <div className='flex flex-wrap gap-2'>
              {/*eslint-disable-next-line*/}
              {product.features.map((feature: any, idx: any) => (
                <span
                  key={idx}
                  className='px-3 py-1 bg-gray-100 rounded-full text-gray-700'
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <button className='w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors'>
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
