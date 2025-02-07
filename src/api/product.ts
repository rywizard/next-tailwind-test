import api from '@/lib/api';

import { Product } from '@/types/product';

export const productApi = {
  getProducts: (params = {}) =>
    api.get<{
      products: Product[];
      total: number;
      page: number;
      totalPages: number;
    }>('/products', { params }),

  getProductById: (id: number) => api.get<Product>(`/products/${id}`),

  createProduct: (product: Partial<Product>) =>
    api.post<Product>('/products', product),

  updateProduct: (id: number, product: Partial<Product>) =>
    api.put<Product>(`/products/${id}`, product),

  deleteProduct: (id: number) => api.delete<void>(`/products/${id}`),
};
