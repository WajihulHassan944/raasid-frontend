'use client';

import React, { useEffect, useState } from 'react';
import './addadmin.css';
import { baseUrl } from '@/app/const';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [editId, setEditId] = useState(null);

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${baseUrl}/users/subadmins`);
      const data = await res.json();
      if (data.success) {
        setAdmins(data.subadmins); // adjust key based on actual response
      }
    } catch (err) {
      console.error('Error fetching subadmins:', err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields.');
      return;
    }

    if (editId) {
      // 🔁 Update admin
      try {
        const res = await fetch(`${baseUrl}/users/update/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          toast.success('Subadmin updated successfully');
          fetchAdmins();
          setEditId(null);
          setFormData({ email: '', password: '' });
        }
      } catch (err) {
        console.error('Update error:', err);
      }
    } else {
      // ➕ Add new admin
      try {
        const res = await fetch(`${baseUrl}/users/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, role: 'subadmin' }),
        });
        const data = await res.json();
        if (data.success) {
          toast.success('Subadmin added');
          fetchAdmins();
          setFormData({ email: '', password: '' });
        } else {
          toast.error(data.message || 'Failed to add admin');
        }
      } catch (err) {
        console.error('Signup error:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;

    try {
      const res = await fetch(`${baseUrl}/users/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        alert('Admin deleted');
        fetchAdmins();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (admin) => {
    setFormData({ email: admin.email, password: '' }); // Leave password blank for security
    setEditId(admin._id);
  };

  return (
    <div className="admin-wrapper">
      <h1>Admin Management</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />
        <button type="submit">{editId ? 'Update Admin' : 'Add Admin'}</button>
      </form>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>{admin.email}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(admin)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(admin._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>
                  No admins added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
