'use client';
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import "./TopCategories.css";
import { baseUrl } from "@/app/const";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null); // ✅ define scrollRef

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/category`);
      const data = await res.json();

    if (data.success) {
      const sortedCategories = [...data.categories].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const updated = sortedCategories.map((cat, i) => ({
        title: cat.categoryName,
        image: `/assets/image${(i % 6) + 3}.png`,
        link: `/shop?category=${encodeURIComponent(cat.categoryName)}`,
        bg: ["#ffcccc", "#dbf8ef","#e1f1dc", "#e6e9fb", "#dbf8ef", "#e1f1dc", "#fbeaea"][i % 6],
      }));

      setCategories(updated);
    }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  fetchCategories();
}, []);
  // ✅ Add grab-scroll functionality
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDownHandler = (e) => {
      isDown = true;
      el.classList.add("active");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      el.classList.remove("active");
    };

    const mouseUpHandler = () => {
      isDown = false;
      el.classList.remove("active");
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", mouseDownHandler);
    el.addEventListener("mouseleave", mouseLeaveHandler);
    el.addEventListener("mouseup", mouseUpHandler);
    el.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      el.removeEventListener("mousedown", mouseDownHandler);
      el.removeEventListener("mouseleave", mouseLeaveHandler);
      el.removeEventListener("mouseup", mouseUpHandler);
      el.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <section className="categories-section">
      <div className="categories-header">
        <h2>Top Categories</h2>
        <Link href="/shop" className="more-link">
    BROWSE ALL PRODUCTS →
  </Link>
      </div>

      <div className="scroll-container" ref={scrollRef}>
        <div className="scroll-content">
          {categories.map((cat, index) => (
            <div className="category-card" key={index}>
              <div className="category-image" style={{ backgroundColor: cat.bg }}>
                <img src={cat.image} alt={cat.title} />
              </div>
              <h4>{cat.title}</h4>
              <Link href={cat.link} className="shop-link">
                SHOP NOW →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
