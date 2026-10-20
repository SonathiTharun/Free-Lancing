import React from 'react';

export default function Footer({ onOpenPortal }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
          <div>
            <div className="nav-brand" style={{ fontSize: '1.25rem', marginBottom: '6px' }}>
              <div className="brand-emblem" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '18px', height: '18px' }}
                >
                  <path d="M12 2v20" />
                  <path d="M5 4c0 4.5 3.2 7.5 7 7.5s7-3 7-7.5" />
                  <circle cx="12" cy="2" r="1.2" fill="currentColor" />
                  <circle cx="5" cy="4" r="1" fill="currentColor" />
                  <circle cx="19" cy="4" r="1" fill="currentColor" />
                </svg>
              </div>
              <span>Trishul Studio</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', maxWidth: '380px' }}>
              Liquid Glass Web Architecture. Dedicated two-engineer studio crafting crystal-clear platforms for schools, hotels, and industry leaders.
            </p>
          </div>

          <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li>
              <button type="button" onClick={() => scrollTo('hero')} style={{ color: 'inherit' }}>
                Home
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo('services')} style={{ color: 'inherit' }}>
                Services
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo('about')} style={{ color: 'inherit' }}>
                About Founders
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo('contact')} style={{ color: 'inherit' }}>
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.8125rem', color: 'var(--text-tertiary)', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            &copy; 2026 Trishul Studio. All rights reserved. Zero solid colored buttons. Pure liquid glass.
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              Bangalore • Hyderabad • Remote Global
            </span>
            <button type="button" className="btn-glass btn-glass-sm" onClick={onOpenPortal}>
              Client Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
