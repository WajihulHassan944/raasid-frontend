// app/productdetails/page.jsx
import { Suspense } from 'react';
import ProductDetails from './details'; // your client component

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<p>Loading product...</p>}>
      <ProductDetails />
    </Suspense>
  );
}
