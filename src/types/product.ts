export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  image: string;
  colors: string[];
  inStock: boolean;
  discount: {
    percentage: number;
    validUntil: string;
  } | null;
};
