'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './dashboard.css';
import Categories from './Categories';
import PopularProducts from './PopularProducts';
import LastOrders from './LastOrders';
import { baseUrl } from '@/app/const';

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/category`);
        const data = await res.json();
        if (data.success) {
          setCategories(
            data.categories.map((cat, i) => ({
              title: cat.categoryName,
              image: `/assets/image${(i % 6) + 3}.png`,
              bg: ['#e6e9fb', '#e1f1dc', '#fff6db', '#dbf8ef', '#e1f1dc', '#fbeaea'][i % 6],
            }))
          );
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products/all`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData?._id) return;

      try {
        const res = await fetch(`${baseUrl}/order/user/${userData._id}`);
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders); // ✅ Pass full order objects
        }
      } catch (err) {
        console.error('Error fetching user orders:', err);
      }
    };
    fetchOrders();
  }, [userData]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-section">
        <Categories categories={categories} />
      </div>

      <div className="dashboard-section">
        <PopularProducts products={products} />
      </div>

      <div className="dashboard-bottom-row">
        <div className="dashboard-half dashboard-last-orders">
          <h2 className="dashboard-title">Last Order</h2>
          <LastOrders orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
