import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star } from 'lucide-react';

export default function About({ onContactClick }) {
  return (
    <section className="section-pad" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div
          className="glass-panel glass-spotlight"
          style={{
            padding: '56px 48px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-pill section-tag" style={{ alignSelf: 'flex-start' }}>
              <span>The Trishul Philosophy</span>
            </div>
            <h2
              id="about-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                lineHeight: 1.2,
              }}
            >
              Why A Two-Engineer Studio Beats 40-Person Bloated Agencies.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              At traditional agencies, you speak with junior account reps who pass vague briefs to inexperienced freelancers. Half your budget is swallowed by office overhead and middle management.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              At <strong>Trishul Studio</strong>, every single line of code, design token, and database query is personally handcrafted by our two senior founders. You get direct access, crystal-clear communication, and the bleeding edge of visionOS and macOS Sequoia design craft.
            </p>
            <div>
              <button type="button" className="btn-glass btn-glass-lg" onClick={onContactClick}>
                <MessageSquare size={18} />
                <span>Talk Directly to the Founders</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '20px 24px',
                borderRadius: '20px',
                background: 'var(--glass-nested-bg)',
                border: 'var(--glass-nested-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
              }}
            >
              <div className="brand-emblem" style={{ width: '52px', height: '52px', fontSize: '1.1rem', fontWeight: 800 }}>
                VK
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Vikramaditya K.
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                  Lead Systems Architect &amp; Performance Engineer
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.71875rem', color: 'var(--accent-dot)' }}>
                  12+ Yrs Web Architecture • Sub-second Specialist
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '20px 24px',
                borderRadius: '20px',
                background: 'var(--glass-nested-bg)',
                border: 'var(--glass-nested-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
              }}
            >
              <div className="brand-emblem" style={{ width: '52px', height: '52px', fontSize: '1.1rem', fontWeight: 800 }}>
                AR
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Arunima Roy
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                  Head of Product Design &amp; Liquid Glass Systems
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.71875rem', color: 'var(--accent-dot)' }}>
                  Ex-Senior Apple Ecosystem Designer • visionOS &amp; Sequoia
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '18px 24px',
                borderRadius: '20px',
                background: 'var(--btn-glass-bg)',
                border: 'var(--btn-glass-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ color: 'var(--accent-dot)', fontSize: '1.2rem' }}>★</div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Zero Agency Bloat Guarantee
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Strict maximum of 3 concurrent projects to ensure uncompromising excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
