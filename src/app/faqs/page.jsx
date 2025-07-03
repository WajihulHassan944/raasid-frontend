'use client';
import React, { useState } from 'react';
import './faqs.css';

const faqs = [
  {
    category: 'Products & Quality',
    items: [
      {
        question: 'What products does Raasid offer?',
        answer:
          'Raasid provides a wide range of premium ready-to-eat meals, refreshing juices, natural fruit preserves, spices, mineral water, and wholesome granola bars—all crafted to deliver authentic taste and simplify mealtime.',
      },
      {
        question: 'Are Raasid’s products preservative-free?',
        answer:
          'Yes! With a commitment to natural and authentic flavors, our food is free from artificial preservatives and undergoes high-quality hygiene processes.',
      },
      {
        question: 'Where are Raasid products sourced from and manufactured?',
        answer:
          'Our offerings are crafted at the state-of-the-art PANA Force Food Processing Center, adhering to strict quality and halal standards. They’re often sampled by Pakistan Armed Forces’ inspection units before release.',
      },
      {
        question: 'Are Raasid’s products halal-certified?',
        answer:
          'Yes — every product is halal-compliant, hygienically packed, and crafted with natural ingredients to maintain authentic taste.',
      },
      {
        question: 'Do you have any quality assurances?',
        answer:
          'Yes! We offer a money-back guarantee, adhere to secure payments, and ensure hygiene via periodic inspections. Our products reflect our promise of excellence and authentic taste.',
      },
    ],
  },
  {
    category: 'Ordering & Delivery',
    items: [
      {
        question: 'How can I purchase Raasid products?',
        answer:
          'You can conveniently shop directly through our website’s Shop section and enjoy secure payment options, free shipping on orders over Rs. 2,000, and a 2-day delivery guarantee.',
      },
      {
        question: 'Do you offer nationwide delivery?',
        answer:
          'Absolutely! We deliver all across Pakistan. Plus, orders exceeding Rs. 2,000 qualify for free shipping.',
      },
    ],
  },
  {
    category: 'Shelf Life & Ingredients',
    items: [
      {
        question: 'What is the shelf life of your ready-to-eat meals and juices?',
        answer:
          'We process and package our products without preservatives, maintaining freshness through modern packaging and strict quality controls. Specific shelf-life details are available on each product page.',
      },
    ],
  },
  {
    category: 'Contact & Support',
    items: [
      {
        question: 'How can I get in touch for quality concerns or bulk orders?',
        answer:
          'Reach out via:\na. Phone: +92 311 111 888 37\nb. Email: info@raasid.com\nWe’re happy to assist with any queries, feedback, or large-scale order needs.',
      },
      {
        question: 'Can I visit your facility or take a 360° tour?',
        answer:
          'Yes! Our website features a 360° tour of our facility. Feel free to contact us to schedule a visit or guided session.',
      },
    ],
  },
];

export default function FaqPage() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggle = (question) => {
    setOpenQuestion((prev) => (prev === question ? null : question));
  };

  return (
    <section className="faq-container">
      <h1 className="faq-heading">Frequently Asked Questions</h1>
      {faqs.map((section) => (
        <div key={section.category}>
          <h2 className="faq-category">{section.category}</h2>
          {section.items.map((faq) => (
            <div className="faq-box" key={faq.question}>
              <div className="faq-question" onClick={() => toggle(faq.question)}>
                <span>{faq.question}</span>
                <span className="faq-icon">{openQuestion === faq.question ? '✕' : '+'}</span>
              </div>
              {openQuestion === faq.question && (
               <div className="faq-answer">
  {faq.answer.split('\n').map((line, index) => (
    <p key={index}>{line}</p>
  ))}
</div>

              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
