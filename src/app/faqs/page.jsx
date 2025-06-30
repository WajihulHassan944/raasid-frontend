'use client';
import React, { useState } from 'react';
import './faqs.css';

const faqs = [
  {
    category: 'Ordering & Products',
    items: [
      {
        question: 'What types of products does Raasid offer?',
        answer:
          'Raasid offers ready-to-eat meals, premium spices, juices, and other nutritious food products made with authentic ingredients.',
      },
      {
        question: 'How do I place an order?',
        answer:
          'You can place an order directly on our website by selecting the products, adding them to your cart, and completing the checkout process.',
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer:
          'Please contact us immediately if you need to modify or cancel an order. Changes can only be made before the order is dispatched.',
      },
      {
        question: 'Are your products Halal certified?',
        answer:
          'Yes, all Raasid products are Halal and meet international food safety standards including ISO certifications.',
      },
    ],
  },
  {
    category: 'Delivery',
    items: [
      {
        question: 'Do you deliver across Pakistan?',
        answer: 'Yes! We deliver to over 70 cities across Pakistan.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Delivery typically takes 2–5 working days depending on your location.',
      },
      {
        question: 'Can I track my order?',
        answer: 'Yes, you’ll receive an order confirmation and tracking details via SMS or email.',
      },
    ],
  },
  {
    category: 'Payments',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Cash on Delivery (COD), bank transfers, and digital payment methods via our integrated payment partners.',
      },
      {
        question: 'Is online payment safe?',
        answer: 'Absolutely. We use secure and encrypted payment gateways to ensure your information is protected.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'Perishable items cannot be returned unless they are defective or delivered in error. Contact us within 24 hours of delivery for assistance.',
      },
      {
        question: 'How do I request a refund or replacement?',
        answer: 'Email us at info@raasid.com or call +92-311-1188837 with your order number and issue. We’ll review and respond promptly.',
      },
    ],
  },
  {
    category: 'Product Details',
    items: [
      {
        question: 'Where can I find nutritional and weight information?',
        answer: 'Each product page includes nutritional facts and net weight. If anything is unclear, feel free to reach out to our support team.',
      },
      {
        question: 'Are your meals ready to eat?',
        answer: 'Yes. Our meals are fully cooked and only require minimal heating (if needed) before consumption.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    items: [
      {
        question: 'Is my personal information safe with you?',
        answer: 'Yes, we follow a strict privacy policy and never sell your information. Data is encrypted and stored securely.',
      },
    ],
  },
  {
    category: 'Business & Wholesale',
    items: [
      {
        question: 'Do you offer bulk or wholesale pricing?',
        answer: 'Yes, we provide B2B and wholesale options. Please contact us at info@raasid.com for inquiries.',
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
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
