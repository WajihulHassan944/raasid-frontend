'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import './order-summary.css';
import { useSearchParams } from 'next/navigation';
import { baseUrl } from '@/app/const';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';

const OrderSummary = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [showTracking, setShowTracking] = useState(false);
  const [loadingTracking, setLoadingTracking] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const router = useRouter();
const receiptRef = useRef();
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

const handleDownloadReceipt = () => {
  setDownloading(true);

  Promise.all([
    import('html2canvas'),
    import('jspdf')
  ])
    .then(([html2canvas, jsPDFModule]) => {
      const jsPDF = jsPDFModule.default;

      const receiptHTML = `
        <div style="
          font-family: 'Segoe UI', sans-serif;
          font-size: 20px;
          color: #111;
          padding: 1.5rem;
          width: 600px;
          line-height: 1.5;
          background: white;
        ">
          <div>
            <h4 style="margin-top:50px;">From,</h4>
           <div style="margin-left:30px;">
            <p><strong>PANA FORCE FOOD PROCESSING CENTRE C/O ASC NOWSHERA CANTT <br />KPK</strong></p>
            <p>Contact: <strong>03465669181</strong></p></div>
          </div>

          <div style="margin-top: 2rem;">
            <h4>To,</h4>
           <div style="margin-left:30px;">
            <p><strong>${order.fullName}</strong></p>
            <p><strong>${order.address}</strong></p>
            <p><strong>${order.city}</strong></p>
            <p><strong>${order.phone}</strong></p>
            <p><strong>${order.email}</strong></p></div>
          </div>

         
        </div>
      `;

      const container = document.createElement('div');
      container.innerHTML = receiptHTML;
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      setTimeout(() => {
        html2canvas.default(container, { scale: 2 }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');

          const pageWidth = pdf.internal.pageSize.getWidth();
          const imgWidth = pageWidth - 20;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
          pdf.save(`Receipt-${order._id}.pdf`);

          document.body.removeChild(container);
          setDownloading(false);
        }).catch(() => {
          document.body.removeChild(container);
          setDownloading(false);
        });
      }, 100);
    })
    .catch(() => setDownloading(false));
};


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

<div className="order-receipt" ref={receiptRef}>
  <h3>Receipt</h3>
  <div className="receipt-from-to">
    <div className="receipt-from">
      <h4 style={{marginTop:'50px'}}>From,</h4>
      <p><strong>PANA FORCE FOOD PROCESSING CENTRE C/O ASC NOWSHERA CANTT <br />KPK</strong></p>
      <p>Contact: <strong>03465669181</strong></p>
    </div>

    <div className="receipt-to" style={{ marginTop: '2rem' }}>
      <h4>To,</h4>
      <p><strong>{order.fullName}</strong></p>
      <p><strong>{order.address}</strong></p>
      <p><strong>{order.city}</strong></p>
      <p><strong>{order.phone}</strong></p>
      <p><strong>{order.email}</strong></p>
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
          
            {courier && (
              <>
                <p><span>Shipping Charges</span><span>PKR {courier.charges}</span></p>
                <p><span>Weight</span><span>{courier.weight} g</span></p>
              </>
            )}

            <p className="total">
              <span>Total</span>
              <span>
                PKR {order.totalAmount}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className='flexed'>
        {order.shippingMethod?.toLowerCase() === 'tcs' && (
        <button onClick={handleTrackToggle} className="go-orders-btn" disabled={loadingTracking}>
    {loadingTracking ? (
      <span className="loader"></span>
    ) : (
      showTracking ? 'Hide Tracking Info' : 'Track This Order'
    )}
  </button>
      )}
     
     
      <button
  onClick={handleDownloadReceipt}
  className="go-orders-btn"
  style={{  display: 'flex', alignItems: 'center', gap: '0.5rem' }}
  disabled={downloading}
>
  {downloading ? (
    <>
      Downloading...
      <span className="spinner" />
    </>
  ) : (
    'Download Receipt'
  )}
</button>

      </div>

    </>
  );
};

export default OrderSummary;
