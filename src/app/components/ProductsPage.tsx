import Features from '@/components/product/Features';
import ProductGrid from '@/components/product/ProductGrid';

const ProductsPage = () => {
  return (
    <div className='product-page'>
      <ProductGrid />
      <Features />
    </div>
  );
};

export default ProductsPage;
