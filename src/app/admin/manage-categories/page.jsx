'use client';
import React, { useState, useEffect } from 'react';
import './ManageCategories.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { baseUrl } from '@/app/const';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [name, setName] = useState('');
  const [subcategories, setSubcategories] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/category`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async () => {
    const subCatsArray = subcategories.split(',').map(s => s.trim());

    if (!name) return;

    const body = JSON.stringify({
      categoryName: name,
    });

    try {
      if (editingId) {
        const res = await fetch(`${baseUrl}/category/update/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        const result = await res.json();
        if (result.success) {
          fetchCategories();
          resetForm();
        }
      } else {
        const res = await fetch(`${baseUrl}/category/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        const result = await res.json();
        if (result.success) {
          fetchCategories();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (cat) => {
    setName(cat.categoryName);
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/category/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setSubcategories('');
    setEditingId(null);
  };

  return (
    <div className="manage-categories">
      <h2>Categories</h2>

      <div className="content-wrapper">
        {/* Left Form */}
        <div className="form-section">
          <label>Category Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" />
          <button className="add-btn" onClick={handleSubmit}>
            {editingId ? 'Update Category' : 'Add Category'}
          </button>
        </div>

        {/* Right Table */}
        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Sr #</th>
                <th>Category Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: 'gray' }}>
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((cat, idx) => (
                  <tr key={cat._id}>
                    <td className="numbers">{idx + 1}</td>
                    <td className="clickable" onClick={() => setPopupData(cat)}>
                      {cat.categoryName}
                    </td>
                    <td>
                      <button className="icon-button" onClick={() => handleEdit(cat)}>
                        <FaEdit />
                      </button>
                    </td>
                    <td>
                      <button className="icon-button" onClick={() => handleDelete(cat._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup for subcategories (if needed) */}
      {popupData && (
        <div className="subcategory-popup">
          <div className="popup-content">
            <h4>Category Info</h4>
            <p>Name: {popupData.categoryName}</p>
            <button onClick={() => setPopupData(null)} className="add-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
