import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Users, Lock, ExternalLink } from 'lucide-react';

export default function Hero({ onExploreServices, onContactClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 8,
      y: (x / rect.width) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      <div className="container">
        {/* Floating Glass Badge */}
        <motion.div
          className="hero-badge-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-pill" id="hero-badge">
            <span className="status-dot" aria-hidden="true" />
            <span>Custom Web Development for Schools, Hotels &amp; Growing Businesses</span>
          </div>
        </motion.div>

        {/* Large Headline */}
        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Websites Crafted With Crystal Clarity.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="hero-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Radically transparent pricing. Handcrafted high-performance UI/UX. Delivered with speed and mathematical precision by a dedicated two-engineer studio with zero agency bloat.
        </motion.p>

        {/* Pure Colourless Liquid Glass Button CTAs */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            type="button"
            className="btn-glass btn-glass-lg"
            onClick={onExploreServices}
            id="hero-cta-services"
          >
            <Sparkles size={18} />
            <span>Explore Signature Services</span>
          </button>

          <button
            type="button"
            className="btn-glass btn-glass-lg"
            onClick={onContactClick}
            id="hero-cta-contact"
          >
            <span>Start Project Blueprint</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Trust Stats Pill Row */}
        <motion.div
          className="hero-trust-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="trust-item">
            <Zap size={15} style={{ color: 'var(--accent-dot)' }} />
            <span>14-Day Average Delivery</span>
          </div>
          <div className="trust-item">
            <ShieldCheck size={15} style={{ color: 'var(--accent-dot)' }} />
            <span>30% Advance • 70% On Launch</span>
          </div>
          <div className="trust-item">
            <Sparkles size={15} style={{ color: 'var(--accent-dot)' }} />
            <span>100/100 Lighthouse Speed</span>
          </div>
          <div className="trust-item">
            <Users size={15} style={{ color: 'var(--accent-dot)' }} />
            <span>Direct Access to Lead Engineers</span>
          </div>
        </motion.div>

        {/* VisionOS Specular Preview Canvas (Layered Frosted Glass) */}
        <motion.div
          className="hero-canvas-wrap"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring', damping: 25 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="hero-preview-window glass-spotlight">
            {/* Glass Titlebar */}
            <div className="preview-titlebar">
              <div className="window-dots" aria-hidden="true">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <div className="preview-address-pill">
                <Lock size={12} />
                <span>trishulstudio.com/vision-engine/v2.4</span>
              </div>
              <div className="glass-pill" style={{ padding: '3px 10px', fontSize: '0.6875rem' }}>
                <span className="status-dot" style={{ width: '6px', height: '6px' }} />
                <span>Active 60fps Glass Engine</span>
              </div>
            </div>

            {/* Preview Body with Specular Grid & Metrics */}
            <div className="preview-body">
              <div className="preview-hero-mock">
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: 'var(--btn-glass-bg)',
                    border: 'var(--btn-glass-border)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-secondary)',
                    marginBottom: '12px',
                  }}
                >
                  Architecture Blueprint
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: 'var(--text-primary)',
                  }}
                >
                  High-Conversion Native Platform
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '18px',
                    lineHeight: 1.55,
                  }}
                >
                  Zero framework baggage. Sub-second paint time. Custom interactive booking engines and institute administration consoles tailored for conversion.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" className="btn-glass btn-glass-sm" onClick={onContactClick}>
                    <span>Schedule Consultation</span>
                    <ExternalLink size={12} />
                  </button>
                  <span
                    className="btn-glass btn-glass-sm"
                    style={{ opacity: 0.8, pointerEvents: 'none' }}
                  >
                    Zero Bloat Guarantee
                  </span>
                </div>
              </div>

              <div className="preview-metrics-mock">
                <div className="metric-card-mock">
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      Core Web Vitals LCP
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      0.32s
                    </div>
                  </div>
                  <span
                    className="glass-pill"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      color: 'var(--accent-dot)',
                      padding: '3px 8px',
                    }}
                  >
                    Ultra-Fast
                  </span>
                </div>

                <div className="metric-card-mock">
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      Direct Booking Uplift
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      +340%
                    </div>
                  </div>
                  <span
                    className="glass-pill"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      color: 'var(--accent-dot)',
                      padding: '3px 8px',
                    }}
                  >
                    Verified ROI
                  </span>
                </div>

                <div className="metric-card-mock">
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      Studio Availability
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      2 Sprints Open
                    </div>
                  </div>
                  <span
                    className="glass-pill"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      color: 'var(--accent-dot)',
                      padding: '3px 8px',
                    }}
                  >
                    Q4 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
