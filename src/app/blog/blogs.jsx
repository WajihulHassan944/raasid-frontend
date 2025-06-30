import React from 'react';
import './blog.css';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <p className="blog-category">{blog.category}</p>
        <h3 className="blog-title">{blog.title}</h3>
        <div className="blog-meta">
          <span>{blog.date}</span>
          <span>{blog.author}</span>
        </div>
        <p className="blog-preview">{blog.preview}</p>
      </div>
    </div>
  );
};

export default BlogCard;  