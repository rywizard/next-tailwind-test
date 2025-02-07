import { useState } from 'react';

import { productApi } from '@/api/product';

import { Product } from '@/types/product';

interface ProductsHook {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  fetchProducts: (params?: {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    feature?: string;
  }) => Promise<void>;
  createProduct: (
    product: Omit<Product, 'id' | 'rating' | 'reviews'>
  ) => Promise<Product>;
}

export const useProducts = (initialPage = 1): ProductsHook => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async (
    params: {
      page?: number;
      limit?: number;
      minPrice?: number;
      maxPrice?: number;
      feature?: string;
    } = {}
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productApi.getProducts(params);

      setProducts(response.data.products);
      setTotal(response.data.total);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch products');
      // eslint-disable-next-line
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (
    product: Omit<Product, 'id' | 'rating' | 'reviews'>
  ) => {
    try {
      const response = await productApi.createProduct(product);
      return response.data;
    } catch (err) {
      // eslint-disable-next-line
      console.error('Failed to create product', err);
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    total,
    page,
    totalPages,
    fetchProducts,
    createProduct,
  };
};
