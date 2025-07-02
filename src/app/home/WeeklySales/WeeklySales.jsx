'use client';
import Image from "next/image";

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';



import { IoClose } from 'react-icons/io5';
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
const [popupImage, setPopupImage] = useState(null);

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
                <div className="product-content">
                 <div
  className="image-box-1"
  onClick={() => setPopupImage(product.image)}
>
  {product.image?.startsWith("https://res.cloudinary.com/") && (
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="weekly-img-box zoom-on-hover"
    />
  )}
</div>
 <Link href={`/productdetails?productId=${product._id}`}>
             

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
                  </Link>
                </div>
              

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
{popupImage && (
  <div className="popup-overlay" onClick={() => setPopupImage(null)}>
    <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
      {/* Close Button */}
      <button className="close-btn" onClick={() => setPopupImage(null)}>
        <IoClose size={24} />
      </button>

      <div className="magnify-wrapper">
        <InnerImageZoom
          src={popupImage}
          zoomSrc={popupImage}
          zoomType="hover"
          zoomPreload={true}
          zoomScale={1.8}
          width={500}
          height={500}
          zoomLensStyle={{
            width: '100px',
            height: '100px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            border: '1px solid #ccc',
          }}
          hasSpacer={true}
        />
      </div>
    </div>
  </div>
)}

    </section>
  );
}
