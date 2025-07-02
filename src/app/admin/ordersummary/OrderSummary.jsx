'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import './order-summary.css';
import { useSearchParams } from 'next/navigation';
import { baseUrl } from '@/app/const';
import { useRouter } from 'next/navigation';

const OrderSummary = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [showTracking, setShowTracking] = useState(false);
  const [loadingTracking, setLoadingTracking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${baseUrl}/order/${orderId}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
          setCourier(data.courier);
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleTrackToggle = async () => {
    if (!showTracking && order.shippingMethod?.toLowerCase() === 'tcs' && courier?.ppOrderId) {
      setLoadingTracking(true);
      try {
        const trackRes = await fetch(`${baseUrl}/courier/tcs/track/${courier.ppOrderId}`);
        const trackData = await trackRes.json();
        setTracking(trackData);
      } catch (error) {
        console.error('Error fetching tracking info:', error);
      } finally {
        setLoadingTracking(false);
      }
    }
    setShowTracking(prev => !prev);
  };

  if (!order) return <div className="loading-msg">Loading order...</div>;

  return (
    <>
      <Head>
        <title>Order Summary</title>
      </Head>
      <div className="order-wrapper">
        <div className="order-main">
          <h2 className="order-title">Order #{order._id}</h2>
          <p className="order-status">Confirmed on {new Date(order.createdAt).toLocaleDateString()}</p>

          <div className="delivery-box">
            <h3>Expected Delivery: <span>—</span></h3>
            <p>Shipping via {order.shippingMethod}</p>
            <p>Status: <strong>{order.status}</strong></p>
          </div>

          <div className="details-box">
            <h3>Order Details</h3>
            <div className="details-grid">
              <div>
                <p><strong>Name:</strong> {order.fullName}</p>
                <p><strong>Email:</strong> {order.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
              </div>
              <div>
                <p><strong>Address:</strong> {order.address || 'N/A'}, {order.city}</p>
                <p><strong>Shipping Method:</strong> {order.shippingMethod}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>

                {order.shippingMethod?.toLowerCase() === 'tcs' && (
                  <p><strong>Consignment No:</strong> {courier?.ppOrderId || 'N/A'}</p>
                )}

                {order.shippingMethod?.toLowerCase() === 'pak post' && (
                  <p><strong>Pak Post Order ID:</strong> {courier?.ppOrderId || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {showTracking && (
            <div className="tracking-box">
              <h3>TCS Tracking Info</h3>
              {loadingTracking ? (
                <p>Loading tracking details...</p>
              ) : tracking ? (
                <>
                  <p><strong>Consignment No:</strong> {tracking.consignmentNo}</p>
                  <p><strong>Status:</strong> {tracking.status}</p>
                  <p><strong>Shipment Info:</strong> {tracking.shipmentInfo !== null ? JSON.stringify(tracking.shipmentInfo) : 'No shipment info available.'}</p>
                  <p><strong>Delivery Info:</strong> {tracking.deliveryInfo !== null ? JSON.stringify(tracking.deliveryInfo) : 'No delivery info available.'}</p>
                  <p><strong>Checkpoints:</strong> {tracking.checkpoints !== null ? JSON.stringify(tracking.checkpoints) : 'No checkpoints available.'}</p>
                </>
              ) : (
                <p>Unable to fetch tracking data.</p>
              )}
            </div>
          )}
        </div>

        <div className="order-summary">
          <h3>Items Summary</h3>
          {order.products?.map((item, idx) => (
            <div key={idx} className="summary-item">
              <img src={item.productId?.image} alt={item.productId?.name} />
              <div>
                <p className="product-name">{item.productId?.name}</p>
                <p className="product-meta">{item.productId?.category || '—'}</p>
                <p className="product-qty">Qty: {item.quantity}</p>
              </div>
              <p className="product-price">PKR {item.productId?.price}</p>
            </div>
          ))}

          <hr />
          <div className="totals">
            <p><span>Subtotal</span><span>PKR {order.totalAmount}</span></p>

            {courier && (
              <>
                <p><span>Shipping Charges</span><span>PKR {courier.charges}</span></p>
                <p><span>Weight</span><span>{courier.weight} g</span></p>
              </>
            )}

            <p className="total">
              <span>Total</span>
              <span>
                PKR {courier ? order.totalAmount + courier.charges : order.totalAmount}
              </span>
            </p>
          </div>
        </div>
      </div>

      {order.shippingMethod?.toLowerCase() === 'tcs' && (
        <button className="go-orders-btn" onClick={handleTrackToggle} disabled={loadingTracking}>
    {loadingTracking ? (
      <span className="loader"></span>
    ) : (
      showTracking ? 'Hide Tracking Info' : 'Track This Order'
    )}
  </button>
      )}
    </>
  );
};

export default OrderSummary;
