import React from 'react';
import BlogCard from './blogs'; // ✅ correct import
import './blog.css';

const blogPosts = [
  {
    title: "Season of Fresh Fruits and Vegetables Market",
    image: "/assets/blogs/three.jpg",
    category: "Grocery",
    date: "May 12, 2025",
    author: "Raasid Team",
    preview: "Explore the seasonal benefits of fresh produce sourced from trusted farms, ensuring taste and nutrition in every bite.",
  },
  {
    title: "Pulses and Other Grain Items Demand is High",
    image: "/assets/blogs/one.jpg",
    category: "Shopping",
    date: "May 10, 2025",
    author: "Raasid Team",
    preview: "Find out why Raasid’s premium-quality lentils and grains are a top choice for health-conscious customers across Pakistan.",
  },
  {
    title: "Consume Healthy Foods for Better Nutrition",
    image: "/assets/blogs/two.jpg",
    category: "Grocery",
    date: "May 8, 2025",
    author: "Raasid Team",
    preview: "Raasid's ready-to-eat meals and juices are carefully crafted to deliver both flavor and essential nutrients.",
  },
  {
    title: "We Offer You the Non-acidic Veggies and Fruits",
    image: "/assets/blogs/four.jpg",
    category: "Shopping",
    date: "May 5, 2025",
    author: "Raasid Team",
    preview: "Our selection of low-acid produce helps maintain digestive health while delivering full-bodied natural flavors.",
  },
];

const Blogs = () => {
  return (
    <div className="blogs-wrapper">
      <h1 className="blogs-title">Latest Blogs</h1>
      <div className="blogs-list">
        {blogPosts.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
