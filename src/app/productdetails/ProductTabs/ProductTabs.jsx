'use client';
import { useState } from 'react';
import './ProductTabs.css';

export default function ProductTabs({ description }) {
  const TABS = [
    {
      id: 'description',
      label: 'Description',
      heading: 'Description',
      body: description,
    },
  ];

  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((tab) => tab.id === active);

  return (
    <section className="tabs-wrapper">
      <ul className="tabs-nav">
        {TABS.map((tab) => (
          <li
            key={tab.id}
            className={`tab-item ${tab.id === active ? 'active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      <article className="tab-content" role="tabpanel">
        <h2>{current.heading}</h2>
        <p>{current.body}</p>
      </article>
    </section>
  );
}
