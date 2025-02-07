import api from '@/lib/api';

import { Product } from '@/types/product';

const DELAY_MS = 1000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

interface ProductParams {
  id?: number;
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  feature?: string;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'reviews' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export const productApi = {
  getProducts: async (params: ProductParams = {}) => {
    await delay(DELAY_MS);
    return api.get<ProductsResponse>('/products', { params });
  },

  getProductById: async (id: number) => {
    await delay(DELAY_MS);
    return api.get<Product>(`/products`, { params: { id } });
  },

  createProduct: async (product: Partial<Product>) => {
    await delay(DELAY_MS);
    return api.post<Product>('/products', product);
  },

  updateProduct: async (id: number, product: Partial<Product>) => {
    await delay(DELAY_MS);
    return api.put<Product>(`/products/${id}`, product);
  },

  deleteProduct: async (id: number) => {
    await delay(DELAY_MS);
    return api.delete<void>(`/products/${id}`);
  },
};
