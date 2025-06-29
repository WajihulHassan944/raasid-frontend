'use client';
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/redux/features/cartSlice";
import "./sales.css";
import { baseUrl } from "@/app/const";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function WeekySales() {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products/all`);
        const data = await res.json();
        if (data.success) {
          const readyMeals = data.products.filter(
            (product) => product.category === "Ready to Eat Meals"
          );
          setProducts(readyMeals);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const slider = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDown = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    router.push('/cart');
    toast.success("Your product is added to cart successfuly");
  };

  return (
    <section className="weekly-wrapper">
      <div className="weekly-header">
        <Link href="/shop?category=Ready%20to%20Eat%20Meals" className="weekly-title clickable-title">
          Ready to Eat Meals
        </Link>
        <Link href="/shop?category=Ready%20to%20Eat%20Meals" className="view-more">
          MORE PRODUCTS →
        </Link>
      </div>

      <div className="scroll-container" ref={scrollRef}>
        <div className="scroll-content">
          {products.map((product, idx) => (
            <div key={product._id || idx} className="product-card-0">
              <Link href={`/productdetails?productId=${product._id}`}>
                <div className="product-content">
                  <div className="image-box-1">
                    {product.image?.startsWith("https://res.cloudinary.com/") && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="weekly-img-box"
                      />
                    )}
                  </div>
                  <p className="weekly-name">{product.name}</p>
                  <p
                    className="weekly-name numbers"
                    style={{ fontWeight: '600', fontSize: '14px' }}
                  >
                    {product.packaging}
                  </p>

                  {product.price === 0 ? (
                    <div className="out-of-stock-label">Out of Stock</div>
                  ) : (
                    <div className="product-pricing">
                      <span className="weekly-price numbers">{product.price} PKR</span>
                    </div>
                  )}
                </div>
              </Link>

              {product.price !== 0 && (
                <div className="cart-btn">
                  <button className="add-cart" onClick={() => handleAddToCart(product)}>
                    ADD TO CART
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
