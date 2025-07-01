'use client';
import React, { useState, useEffect, useRef } from 'react';
import './AddProducts.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { baseUrl } from '@/app/const';
import 'react-toastify/dist/ReactToastify.css';
import {toast } from 'react-toastify';



const AddProducts = () => {
  const [products, setProducts] = useState([]);
   const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [nutritions, setNutritions] = useState('');
  const [serving, setServing] = useState('');
  const [packaging, setPackaging] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null); // 🔁 Ref to scroll to form
const [showPopup, setShowPopup] = useState(false);
const [activeDescription, setActiveDescription] = useState("");

const handleReadMore = (description) => {
  setActiveDescription(description);
  setShowPopup(true);
};

const handleClose = () => {
  setShowPopup(false);
  setActiveDescription("");
};
  useEffect(() => {
    fetch(`${baseUrl}/products/all`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => console.error('❌ Failed to fetch products:', err));
  }, []);

  const parseNutritions = (input) => {
    if (!input.trim()) return null;
    const lines = input.split(',');
    const result = {};
    for (let raw of lines) {
      raw = raw.trim();
      const match = raw.match(/^(.+?)\s*\((.+?)\)\s*:\s*(.+)$/);
      if (!match) continue;
      const [_, name, uom, value] = match;
      result[name.trim().toLowerCase()] = {
        UOM: uom.trim(),
        Results: value.trim(),
      };
    }
    return Object.keys(result).length ? result : null;
  };

  const handleSubmit = async () => {
    if (!name || !price || !category || !description) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('packaging', packaging);
    formData.append('serving', serving);
    formData.append(
      'ingredients',
      JSON.stringify(ingredients ? ingredients.split(',').map(i => i.trim()) : [])
    );

    if (image) formData.append('image', image);

    const parsedNutritions = parseNutritions(nutritions);
    if (parsedNutritions) {
      formData.append('nutritions', JSON.stringify(parsedNutritions));
    }

    let url = `${baseUrl}/products/create`;
    let method = 'POST';

    if (editingId) {
      url = `${baseUrl}/products/update/${editingId}`;
      method = 'PUT';
    }

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      const contentType = res.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const rawText = await res.text();
        toast.error('Unexpected server response (not JSON).');
        setIsSubmitting(false);
        return;
      }

      if (res.ok && data.success) {
        const refreshed = await fetch(`${baseUrl}/products/all`).then(res => res.json());
        setProducts(refreshed.products || []);
        resetForm();
      } else {
        toast.error(data.message || 'Failed to save product.');
      }
    } catch (err) {
      toast.error('An error occurred. Check the console for details.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (prod) => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' }); // 🔁 Scroll to form
setShowForm(true)
    setName(prod.name);
    setCategory(prod.category);
    setPrice(prod.price);
    setDescription(prod.description);

    const nutritionStr = prod.nutritions
      ? Object.entries(prod.nutritions)
          .map(([k, v]) => `${k} (${v.UOM}): ${v.Results}`)
          .join(', ')
      : '';

    setNutritions(nutritionStr);
    setServing(prod.serving || '');
    setPackaging(prod.packaging || '');
    setIngredients(Array.isArray(prod.ingredients) ? prod.ingredients.join(', ') : prod.ingredients);
    setImage(null);
    setEditingId(prod._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.filter(prod => prod._id !== id));
      } else {
        toast.error(data.message || 'Delete failed.');
      }
    } catch (err) {
      console.error('❌ Error deleting product:', err);
    }
  };

  const resetForm = () => {
    setName('');
    setCategory('');
    setPrice('');
    setDescription('');
    setNutritions('');
    setServing('');
    setPackaging('');
    setIngredients('');
    setImage(null);
    setEditingId(null);
  };

  return (
    <div className="mp-container">
      <div className='justify-space-between'>
        <h2 className="mp-title">Products</h2>
        <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Product'}
      </button>
      </div>
      <div className="mp-wrapper">
       {showForm && (
        <div className="mp-form" ref={formRef}> {/* 🧷 Attach the ref */}
          <label>Product Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
          <label>Category:</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" />
          <label>Price (Rs):</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          <label>Nutritions:</label>
          <input
            value={nutritions}
            onChange={(e) => setNutritions(e.target.value)}
            placeholder="e.g. calories (mg): 0, sugar (g): 15"
          />
          <small>Format: <i>name (unit): value</i></small>
          <label>Serving Size:</label>
          <input value={serving} onChange={(e) => setServing(e.target.value)} />
          <label>Packaging:</label>
          <input value={packaging} onChange={(e) => setPackaging(e.target.value)} />
          <label>Ingredients:</label>
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={2} placeholder="Comma separated" />
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" width={100} height={100} style={{ marginTop: 10 }} />}
          <button className="mp-btn" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
          </button>
        </div>
       )}
        <div className="mp-table-wrapper">
          <table className="mp-table">
            <thead>
              <tr>
                <th>Sr #</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Nutritions</th>
                <th>Serving</th>
                <th>Packaging</th>
                <th>Ingredients</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="12">No products found</td></tr>
              ) : (
                products.map((prod, idx) => (
                  <tr key={prod._id}>
                    <td className='numbers'>{idx + 1}</td>
                    <td className='numbers'>
                      {prod.image ? <img src={prod.image} width={50} height={50} alt="img" /> : 'No Image'}
                    </td>
                    <td className='numbers'>{prod.name}</td>
                    <td className='numbers'>{prod.category}</td>
                    <td className='numbers'>{prod.price}</td>
                  <td className="numbers">
  {prod.description.length > 40 ? (
    <>
      
  <span className="read-more-dots" onClick={() => handleReadMore(prod.description)}>{prod.description.slice(0, 40)}...</span>
    </>
  ) : (
    prod.description
  )}
</td>

                    <td className="numbers">
  {(() => {
    const nutritionsText = prod.nutritions
      ? Object.entries(prod.nutritions)
          .map(([k, v]) => `${k} (${v.UOM}): ${v.Results}`)
          .join(', ')
      : '';

    if (nutritionsText.length > 40) {
      return (
        <>
          
          <span
            className="read-more-dots"
            onClick={() => handleReadMore(nutritionsText)}
          >
          {nutritionsText.slice(0, 40)}  ...
          </span>
        </>
      );
    } else {
      return nutritionsText;
    }
  })()}
</td>

                    <td className='numbers'>{prod.serving}</td>
                    <td className='numbers'>{prod.packaging}</td>
                   <td className="numbers">
  {(() => {
    const ingredientsText = Array.isArray(prod.ingredients)
      ? prod.ingredients.join(', ')
      : prod.ingredients;

    if (ingredientsText?.length > 40) {
      return (
        <>
          
          <span
            className="read-more-dots"
            onClick={() => handleReadMore(ingredientsText)}
          >
           {ingredientsText.slice(0, 40)} ...
          </span>
        </>
      );
    } else {
      return ingredientsText;
    }
  })()}
</td>

                    <td>
                      <button className="mp-icon-btn" onClick={() => handleEdit(prod)}>
                        <FaEdit />
                      </button>
                    </td>
                    <td>
                      <button className="mp-icon-btn" onClick={() => handleDelete(prod._id)}>
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
      {showPopup && (
  <div className="popup-overlay" onClick={handleClose}>
    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={handleClose}>×</button>
      <h4>Product Description</h4>
      <p>{activeDescription}</p>
    </div>
  </div>
)}

    </div>
    
  );
};

export default AddProducts;
