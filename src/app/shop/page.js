// app/shop/page.jsx
'use client';

import { Suspense } from 'react';
import ShopHeader from './ShopHeader/ShopHeader';
import Shop from './shop';
import CategoryCards from './categorycard/CategoryCards';

export default function ShopPage() {
  return (
    <>
      <ShopHeader />
      <CategoryCards/>
      <Suspense fallback={<p>Loading shop...</p>}>
        <Shop />
      </Suspense>
    </>
  );
}
