"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./Banner.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // ← React Icons

const Banner = () => {
  const sliderRef = useRef(null);
  const [sliderInstanceRef, setSliderInstanceRef] = useState(null);

  const [ref, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
      },
      renderMode: "performance",
      dragSpeed: 0.7, // smoother feel when dragging
      animation: {
        duration: 1000, // milliseconds (1s) for smoother transition
        easing: (t) => t, // linear easing
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }

        slider.on("created", () => {
          sliderRef.current = slider;
          setSliderInstanceRef(slider);
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="banner-wrapper">
      <div ref={ref} className="keen-slider">
        {/* Slide 1 */}
        <div className="keen-slider__slide">
          <div className="banner banner-one">
            <div className="banner-content">
              <p className="discount-text">RAASID PROMISE</p>
              <h1 className="banner-heading">
                Authentic Taste, <br />
                Natural Ingredients <br />
                Crafted for You
              </h1>
              <p className="banner-subtext">
                Enjoy premium ready-to-eat meals, juices, spices & more – delivered nationwide.
              </p>
              <Link href={{ pathname: "/shop", query: { category: "Ready to Eat Meals" } }}>
                <button className="shop-btn font-weight-100">SHOP NOW →</button>
              </Link>
            </div>
            <div className="banner-image">
               <img
                src="/assets/home/banner/banner-one-img.png"
                alt="Raasid Food Product Display"
              />
          
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="keen-slider__slide">
          <div className="banner banner-two">
            <div className="banner-content">
              <p className="discount-text">RAASID PROMISE</p>
              <h1 className="banner-heading">
                Authentic Taste, <br />
                Natural Ingredients <br />
                Crafted for You
              </h1>
              <p className="banner-subtext">
                Enjoy premium ready-to-eat meals, juices, spices & more – delivered nationwide.
              </p>
              <Link href={{ pathname: "/shop", query: { category: "MREs" } }}>
                <button className="shop-btn font-weight-100">SHOP NOW →</button>
              </Link>
            </div>
            <div className="banner-image">
              <img
                src="/assets/home/banner/banner-two-img.png"
                alt="Raasid Food Product Display"
              />
            </div>
          </div>
        </div>



        
        <div className="keen-slider__slide">
          <div className="banner banner-three">
            <div className="banner-content">
              <p className="discount-text">RAASID PROMISE</p>
              <h1 className="banner-heading">
                Authentic Taste, <br />
                Natural Ingredients <br />
                Crafted for You
              </h1>
              <p className="banner-subtext">
                Enjoy premium ready-to-eat meals, juices, spices & more – delivered nationwide.
              </p>
              <Link  href={{ pathname: "/shop", query: { category: "Granola Bars" } }}>
                <button className="shop-btn font-weight-100">SHOP NOW →</button>
              </Link>
            </div>
            <div className="banner-image">
               <img
                src="/assets/home/banner/banner-three-img.png"
                alt="Raasid Food Product Display"
                style={{marginRight:'10%'}}
              />
            </div>
          </div>
        </div>


{/*         <div className="keen-slider__slide">
          <div className="banner banner-four">
            <div className="banner-content">
              <p className="discount-text">RAASID PROMISE</p>
              <h1 className="banner-heading">
                Authentic Taste, <br />
                Natural Ingredients <br />
                Crafted for You
              </h1>
              <p className="banner-subtext">
                Enjoy premium ready-to-eat meals, juices, spices & more – delivered nationwide.
              </p>
              <Link href="/shop">
                <button className="shop-btn font-weight-100">SHOP NOW →</button>
              </Link>
            </div>
            <div className="banner-image">
               <img
                src="/assets/home/banner/banner-one-img.png"
                alt="Raasid Food Product Display"
              />
            </div>
          </div>
        </div> */}
      </div>

      {/* Navigation Arrows */}
      <button
        className="nav-arrow left"
        onClick={() => sliderInstanceRef?.prev()}
      >
        <FiChevronLeft size={28} />
      </button>
      <button
        className="nav-arrow right"
        onClick={() => sliderInstanceRef?.next()}
      >
        <FiChevronRight size={28} />
      </button>
    </div>
  );
};

export default Banner;
