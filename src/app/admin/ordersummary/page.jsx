import React, { Suspense } from 'react';
import OrderSummary from './OrderSummary';

export default function Page({ searchParams }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSummary orderId={searchParams.id} />
    </Suspense>
  );
}
