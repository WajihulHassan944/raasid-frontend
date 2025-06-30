'use client';
import React, { useEffect, useState } from "react";
import Head from "next/head";
import "./orders.css";
import { baseUrl } from '@/app/const';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  // Fetch orders on mount
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
            phone: order.phone,
            method: order.paymentMethod === 'cod' ? 'Cash' : 'Card',
            amount: `${order.totalAmount} PKR`,
            status: order.status,
            shipping: order.shippingMethod || "N/A",
          }));
          setOrders(formatted);
        } else {
          toast.error("Failed to load orders.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Error fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  // Handle status change
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

    if (res.ok && data.success) {
      updatedOrders[index].status = newStatus;
      setOrders(updatedOrders);
      toast.success("Status updated successfully.");
    } else {
      toast.error(data.message || "Failed to update status.");
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
              <th>Amount</th>
              <th>Shipping</th>
              <th>Status</th>
              <th>Action</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="numbers">{order.invoice}</td>
                <td className="numbers">{order.time}</td>
                <td className="numbers">{order.customer}</td>
                <td className="numbers">{order.phone}</td>
                <td className="numbers">{order.amount}</td>
                <td className="numbers">{order.shipping}</td>
                <td className="numbers">
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
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button
                    className="view-details-btn"
                    onClick={() => router.push(`/admin/ordersummary?id=${order.id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
};

export default Sales;
