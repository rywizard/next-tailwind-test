import { useCallback, useState } from 'react';

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
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    feature?: string;
    inStock?: boolean;
    sortBy?: 'price' | 'rating' | 'reviews' | 'name';
    sortOrder?: 'asc' | 'desc';
  }) => Promise<void>;
  createProduct: (product: Partial<Product>) => Promise<Product>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
  getProductById: (id: number) => Promise<{ data: Product }>;
}

export const useProducts = (initialPage = 1): ProductsHook => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = useCallback(async (params = {}) => {
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
  }, []);

  const getProductById = useCallback(async (id: number) => {
    try {
      return await productApi.getProductById(id);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch product:', err);
      throw err;
    }
  }, []);

  const createProduct = useCallback(async (product: Partial<Product>) => {
    try {
      const response = await productApi.createProduct(product);
      return response.data;
    } catch (err) {
      //eslint-disable-next-line
      console.error('Failed to create product:', err);
      throw err;
    }
  }, []);

  const updateProduct = useCallback(
    async (id: number, product: Partial<Product>) => {
      try {
        const response = await productApi.updateProduct(id, product);
        return response.data;
      } catch (err) {
        //eslint-disable-next-line
        console.error('Failed to update product:', err);
        throw err;
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: number) => {
    try {
      await productApi.deleteProduct(id);
    } catch (err) {
      //eslint-disable-next-line
      console.error('Failed to delete product:', err);
      throw err;
    }
  }, []);

  return {
    products,
    loading,
    error,
    total,
    page,
    totalPages,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
