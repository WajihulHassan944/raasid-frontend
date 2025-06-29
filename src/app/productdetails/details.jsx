'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopHeader from './ShopHeader/ShopHeader';
import ProductPage from './Product/product';
import ProductTabs from './ProductTabs/ProductTabs';
import NutritionDetails from './NutritionFacts/NutritionDetails';
import { baseUrl } from '@/app/const';

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${baseUrl}/products/${productId}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setLoading(false);
      setError('No product ID provided');
    }
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ShopHeader />
      <ProductPage product={product} />
      <ProductTabs description={product.description} />
      <NutritionDetails product={product} />
    </>
  );
}
