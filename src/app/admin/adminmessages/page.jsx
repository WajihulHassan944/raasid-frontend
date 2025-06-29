'use client';
import React, { useEffect, useState } from 'react';
import './AdminMessages.css';
import { baseUrl } from '@/app/const';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  // Fetch inquiries
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${baseUrl}/inquiry/inquiries`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.inquiries || []);
        } else {
          setError('Failed to load inquiries');
        }
      } catch (err) {
        setError('Something went wrong');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleView = (msg) => setSelectedMessage(msg);
  const handleCloseView = () => setSelectedMessage(null);

  const handleReply = (msg) => setReplyTo(msg);
  const handleCloseReply = () => {
    setReplyTo(null);
    setReplyMessage('');
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return toast.error("Reply message cannot be empty.");
    setSending(true);

    try {
      const res = await fetch(`${baseUrl}/inquiry/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: replyTo.email,
          name: replyTo.name,
          replyMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.error(`Reply sent to ${replyTo.name}`);
        handleCloseReply();
      } else {
        toast.error(`Failed to send reply: ${data.message}`);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error("An error occurred while sending the reply.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-table-wrapper">
        <h2>Admin Inquiries</h2>
        {loading ? (
          <p>Loading inquiries...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : messages.length === 0 ? (
          <p>No inquiries found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg._id || index}>
                  <td>{index + 1}</td>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message.slice(0, 40)}...</td>
                  <td className='buttons-action'>
                    <button className="action-btn view-btn" onClick={() => handleView(msg)}>View</button>
                    <button className="action-btn reply-btn" onClick={() => handleReply(msg)}>Reply</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View Popup */}
      {selectedMessage && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={handleCloseView}>×</button>
            <h3>{selectedMessage.name}</h3>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Phone:</strong> {selectedMessage.phone}</p>
            <p className="full-msg">{selectedMessage.message}</p>
          </div>
        </div>
      )}

      {/* Reply Popup */}
      {replyTo && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={handleCloseReply}>×</button>
            <h3>Reply to: {replyTo.name}</h3>
            <p><strong>Email:</strong> {replyTo.email}</p>
            <textarea
              className="reply-textarea"
              rows="4"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
            />
            <button className="send-btn" onClick={handleSendReply} disabled={sending}>
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
