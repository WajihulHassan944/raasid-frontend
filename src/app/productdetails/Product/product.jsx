'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/app/redux/features/cartSlice'; // adjust if path is different
import './product.css';

export default function ProductPage({ product }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    const productWithQty = { ...product, quantity: qty };
    dispatch(addToCart(productWithQty));
    router.push('/cart');
  };

  return (
    <main className="product">
      <section className="product__imgBlock">
        <div className="image-wrapper">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 80vw, 40vw"
            style={{ objectFit: 'contain' }}
          />
          <FiSearch className="product__zoomIcon" />
        </div>
      </section>

      <section className="product__details">
        <h3 className="product__title">{product.name}</h3>
        <p className="product__price numbers">{product.price.toFixed(2)} PKR</p>

        <div className="product__buyRow">
          <input
            type="number"
            min="1"
            value={qty}
            onChange={e => setQty(+e.target.value)}
            className="product__qty"
          />
          <button className="product__btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <p className="product__meta">
          <span>Category:</span> {product.category}
        </p>
      </section>
    </main>
  );
}
