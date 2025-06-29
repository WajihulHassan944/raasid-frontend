"use client";
import React from "react";
import { FaShippingFast, FaMoneyBillWave, FaBoxOpen, FaUndo } from "react-icons/fa";
import "./Notifications.css";

const notifications = [
  {
    id: 1,
    title: "Order Shipped",
    message: "Your order #45312 has been shipped.",
    date: "17/06/2025",
    timeAgo: "1 min ago",
    icon: <FaShippingFast />,
  },
  {
    id: 2,
    title: "Payment Received",
    message: "We’ve received your payment for order #45312.",
    date: "17/06/2025",
    timeAgo: "2 mins ago",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 3,
    title: "Item Delivered",
    message: "Order #45312 has been delivered successfully.",
    date: "17/06/2025",
    timeAgo: "10 mins ago",
    icon: <FaBoxOpen />,
  },
  {
    id: 4,
    title: "Return Request",
    message: "Return request initiated for order #45312.",
    date: "17/06/2025",
    timeAgo: "15 mins ago",
    icon: <FaUndo />,
  },
];

const Notifications = () => {
  return (
    <div className="notifications-container">
      {notifications.map((note) => (
        <div className="notification-card" key={note.id}>
          <div className="notification-icon">
            {note.icon}
          </div>
          <div className="notification-content">
            <h4>{note.title}</h4>
            <p>{note.message}</p>
            <div className="notification-meta">
              <span>{note.date}</span>
              <span>• {note.timeAgo}</span>
            </div>
          </div>
          <div className="notification-action">
            <button>Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
