import Image from "next/image";
import "./AboutBanner.css"; // Import your custom CSS

export default function AboutBanner() {
  return (
    <section className="about-banner">
      <Image
        src="/assets/bg-image.jpeg"
        alt="About Us"
        fill
        className="about-image"
        priority
      />
      <div className="about-overlay">
        <h1 className="about-title">About Us</h1>
      </div>
    </section>
  );
}
