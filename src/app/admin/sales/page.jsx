'use client';
import React, { useEffect, useState } from "react";
import Head from "next/head";
import "./orders.css";
import { baseUrl } from '@/app/const';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const Sales = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${baseUrl}/order`);
        const data = await res.json();
        if (data.success) {
         const formatted = data.orders.map((order, idx) => ({
  invoice: idx + 1,
  id: order._id,
  time: new Date(order.createdAt).toLocaleString('en-GB', { hour12: true }),
  customer: order.fullName,
  phone:order.phone,
  method: order.paymentMethod === 'cod' ? 'Cash' : 'Card',
  amount: `${order.totalAmount} PKR`,
  status: order.status,
  shipping: order.shippingMethod || "N/A", // <-- Add this
}));

          setOrders(formatted);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (index, newStatus) => {
    const updatedOrders = [...orders];
    const orderToUpdate = updatedOrders[index];

    try {
      const res = await fetch(`${baseUrl}/order/${orderToUpdate.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();

      if (res.ok) {
        updatedOrders[index].status = newStatus;
        setOrders(updatedOrders);
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Error updating status.");
    }
  };

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="table-container">
        <table className="orders-table">
         <thead>
  <tr>
    <th>Sr.No</th>
    <th>Order Time</th>
    <th>Customer Name</th>
    <th>Customer Phone No</th>
    <th>Method</th>
    <th>Amount</th>
    <th>Shipping</th> {/* <-- Add this */}
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

        <tbody>
  {orders.map((order, index) => (
    <tr className="numbers" key={index}>
      <td>{order.invoice}</td>
      <td className="numbers">{order.time}</td>
      <td>{order.customer}</td>
      <td>{order.phone}</td>
      <td><strong>{order.method}</strong></td>
      <td className="numbers">{order.amount}</td>
      <td>{order.shipping}</td> {/* <-- Show shipping method */}
      <td>
        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </td>
      <td>
        <select
          className="action-dropdown"
          value={order.status}
          onChange={(e) => handleStatusChange(index, e.target.value)}
        >
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Cancelled">Cancel</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </>
  );
};

export default Sales;
