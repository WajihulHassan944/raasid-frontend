'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/features/cartSlice';
import './shop.css';
import { baseUrl } from '@/app/const';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Shop = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const category = searchParams?.get('category') || '';

  const itemsPerPage = 12;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('name-asc'); // default alphabetical sort

useEffect(() => {
  setCurrentPage(1);
}, [sortOption]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = category ? `?category=${encodeURIComponent(category)}` : '';
        const fullUrl = `${baseUrl}/products/all${query}`;
        const res = await fetch(fullUrl);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    setCurrentPage(1); // Reset to first page on category change
    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    router.push('/cart');
    toast.success("Your product is added to cart");
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
const sortedProducts = [...products];

// Apply primary sorting
if (sortOption === 'price-low-high') {
  sortedProducts.sort((a, b) => a.price - b.price);
} else if (sortOption === 'price-high-low') {
  sortedProducts.sort((a, b) => b.price - a.price);
} else if (sortOption === 'name-asc') {
  sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
} else if (sortOption === 'name-desc') {
  sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
}

// Move out-of-stock products to the end
sortedProducts.sort((a, b) => {
  const aOut = a.price === 0;
  const bOut = b.price === 0;
  return aOut - bOut;
});

  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Head>
        <title>{category ? `${category} | Shop` : 'Shop'}</title>
        <link rel="stylesheet" href="/css/shop.css" />
      </Head>

      <div className="shop-container-one">
        <div className="shop-toolbar">
          <div className="results-count">
            Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, products.length)} of {products.length} results
          </div>

          <div className="sort-dropdown">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="name-asc">Name: A to Z</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {category && (
          <h2 className="category-heading">
            Showing results for: <strong>{category}</strong>
          </h2>
        )}

        <div className="product-grid">
          {currentProducts.map((product, index) => (
            <div key={product._id || index} className="product-card-3">
              <Link href={`/productdetails?productId=${product._id}`}>
                <img src={product.image} alt={product.name} />
                <h3 className="numbers">{product.name}</h3>
                <h3 className="numbers" style={{ fontWeight: '600', fontSize: '14px' }}>
                  {product.packaging}
                </h3>
              </Link>

              {product.price === 0 ? (
                <center><div className="out-of-stock-products">Out of Stock</div></center>
              ) : (
                <>
                  <div className="product-price">
                    <span className="numbers">{product.price} PKR</span>
                  </div>
                  <button className="add-to-cart-one" onClick={() => handleAddToCart(product)}>
                    ADD TO CART
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

{totalPages > 1 && (
  <div className="pagination">
    {startIndex > 0 && (
      <button
        className="page-btn arrow-btn"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        ‹
      </button>
    )}

    {[...Array(totalPages)].map((_, index) => {
      const pageStart = index * itemsPerPage;
      const hasItems = sortedProducts.slice(pageStart, pageStart + itemsPerPage).length > 0;

      return hasItems ? (
        <button
          key={index}
          className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ) : null;
    })}

    {startIndex + itemsPerPage < sortedProducts.length && (
      <button
        className="page-btn arrow-btn"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        ›
      </button>
    )}
  </div>
)}

      </div>
    </>
  );
};

export default Shop;
