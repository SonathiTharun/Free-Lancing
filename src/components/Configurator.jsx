import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Copy, Check, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

export default function Configurator({
  config,
  onChangeConfig,
  quoteId,
  totals,
  onLockQuote,
  onCopyQuote,
}) {
  const industries = [
    { id: 'school', name: 'School & Institute Portal', price: 48000, days: 14 },
    { id: 'hotel', name: 'Hotel & Hospitality Booking', price: 54000, days: 16 },
    { id: 'business', name: 'B2B Business Website', price: 38000, days: 10 },
    { id: 'ecommerce', name: 'E-Commerce Store', price: 62000, days: 18 },
    { id: 'custom', name: 'Custom SaaS / Web App', price: 78000, days: 24 },
  ];

  const styles = [
    { id: 'liquid-glass', name: 'Liquid Glass visionOS', price: 12000, days: 2 },
    { id: 'minimal', name: 'Minimalist Editorial', price: 6000, days: 1 },
    { id: 'bold-neo', name: 'Bold Modern Neo', price: 8000, days: 1 },
    { id: 'classic-corp', name: 'Classic Corporate', price: 4000, days: 1 },
  ];

  const densities = [
    { id: 'compact', name: 'Compact High-Density (5–8 Pages)', price: 0, days: 0 },
    { id: 'balanced', name: 'Balanced Modern (9–15 Pages)', price: 14000, days: 4 },
    { id: 'expansive', name: 'Expansive Multi-Portal (16+ Pages)', price: 26000, days: 8 },
  ];

  const backends = [
    { id: 'static', name: 'Static High-Speed CDN', price: 0, days: 0 },
    { id: 'headless', name: 'Dynamic Headless CMS', price: 15000, days: 3 },
    { id: 'portal-engine', name: 'Custom Portal / Booking Engine', price: 28000, days: 6 },
    { id: 'ecom-engine', name: 'Full E-Commerce Engine', price: 34000, days: 7 },
  ];

  const addonsList = [
    { id: 'ai-bot', name: 'Domain-Trained AI Chatbot', price: 14500, days: 2 },
    { id: 'crm-sync', name: 'WhatsApp & Email CRM Automation', price: 9500, days: 2 },
    { id: 'analytics', name: 'Advanced Analytics & Heatmaps', price: 5500, days: 1 },
    { id: 'seo-pack', name: 'Technical SEO & Speed Pack', price: 8000, days: 1 },
    { id: 'multilingual', name: 'Multilingual Localization', price: 7500, days: 2 },
  ];

  const formatRupees = (val) => '₹' + val.toLocaleString('en-IN');

  const handleSingleSelect = (category, item) => {
    onChangeConfig({
      ...config,
      [category]: item,
    });
  };

  const handleAddonToggle = (addon) => {
    const exists = config.addons.some((a) => a.id === addon.id);
    let updated;
    if (exists) {
      updated = config.addons.filter((a) => a.id !== addon.id);
    } else {
      updated = [...config.addons, addon];
    }
    onChangeConfig({
      ...config,
      addons: updated,
    });
  };

  return (
    <section className="section-pad configurator-section" id="configurator" aria-labelledby="configurator-heading">
      <div className="container-wide">
        <div className="section-header">
          <div className="glass-pill section-tag">
            <span>Real-Time Pricing Engine</span>
          </div>
          <h2 className="section-title" id="configurator-heading">
            Design Your Website &amp; Generate Instant Quote.
          </h2>
          <p className="section-desc">
            No sales calls. No hidden surprises. Select your exact specifications below to see real-time line item estimates, verified timeline, and our straightforward 30% advance deposit.
          </p>
        </div>

        <div className="configurator-split">
          {/* LEFT COLUMN: Interactive Step-by-Step Configurator */}
          <div className="glass-panel config-container glass-spotlight">
            {/* Step 1: Industry Type */}
            <div className="step-block">
              <div className="step-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="step-num">01</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Select Industry &amp; Core Platform
                  </h3>
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Single selection</span>
              </div>

              <div className="glass-pill-group">
                {industries.map((item) => {
                  const isSelected = config.industry.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`config-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSingleSelect('industry', item)}
                    >
                      <span className="pill-check">{isSelected ? '✓' : ''}</span>
                      <span>{item.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.85 }}>
                        {formatRupees(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: UI/UX & Style Preference */}
            <div className="step-block">
              <div className="step-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="step-num">02</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    UI/UX &amp; Aesthetic Style
                  </h3>
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Signature design system</span>
              </div>

              <div className="glass-pill-group">
                {styles.map((item) => {
                  const isSelected = config.style.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`config-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSingleSelect('style', item)}
                    >
                      <span className="pill-check">{isSelected ? '✓' : ''}</span>
                      <span>{item.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.85 }}>
                        +{formatRupees(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Typography & Layout Density */}
            <div className="step-block">
              <div className="step-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="step-num">03</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Page Architecture &amp; Density
                  </h3>
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Scope of pages</span>
              </div>

              <div className="glass-pill-group">
                {densities.map((item) => {
                  const isSelected = config.density.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`config-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSingleSelect('density', item)}
                    >
                      <span className="pill-check">{isSelected ? '✓' : ''}</span>
                      <span>{item.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.85 }}>
                        {item.price === 0 ? '+₹0' : `+${formatRupees(item.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Backend & Database Architecture */}
            <div className="step-block">
              <div className="step-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="step-num">04</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Backend, Database &amp; CMS Needs
                  </h3>
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Data engine choice</span>
              </div>

              <div className="glass-pill-group">
                {backends.map((item) => {
                  const isSelected = config.backend.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`config-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSingleSelect('backend', item)}
                    >
                      <span className="pill-check">{isSelected ? '✓' : ''}</span>
                      <span>{item.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.85 }}>
                        {item.price === 0 ? '+₹0' : `+${formatRupees(item.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: AI & Smart Add-ons (Multi-select) */}
            <div className="step-block">
              <div className="step-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="step-num">05</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    AI &amp; Smart Conversion Add-ons
                  </h3>
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Multi-select allowed</span>
              </div>

              <div className="glass-pill-group">
                {addonsList.map((item) => {
                  const isSelected = config.addons.some((a) => a.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`config-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleAddonToggle(item)}
                    >
                      <span className="pill-check">{isSelected ? '✓' : ''}</span>
                      <span>{item.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.85 }}>
                        +{formatRupees(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Sticky Quotation Card */}
          <div className="quote-sticky-wrapper">
            <aside className="glass-panel quote-card glass-spotlight">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: 'var(--glass-nested-border)' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Trishul Studio Quotation
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Ref: {quoteId}
                  </div>
                </div>
                <div className="glass-pill" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-dot)' }}>
                  <span className="status-dot" style={{ width: '6px', height: '6px' }} />
                  <span>Live Estimate</span>
                </div>
              </div>

              {/* Itemized Selections Breakdown with AnimatePresence */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '12px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{config.industry.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {formatRupees(config.industry.price)}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '12px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{config.style.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    +{formatRupees(config.style.price)}
                  </span>
                </div>

                {config.density.price > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '12px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{config.density.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      +{formatRupees(config.density.price)}
                    </span>
                  </div>
                )}

                {config.backend.price > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '12px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{config.backend.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      +{formatRupees(config.backend.price)}
                    </span>
                  </div>
                )}

                {config.addons.map((a) => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '12px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{a.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      +{formatRupees(a.price)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Estimated Timeline */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '14px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Estimated Timeline:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {totals.minDays} – {totals.maxDays} Business Days
                </span>
              </div>

              {/* Total Calculation */}
              <div style={{ padding: '18px', borderRadius: '18px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {formatRupees(totals.total)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Architect Fee:</span>
                  <span style={{ color: 'var(--accent-dot)', fontWeight: 600 }}>Included</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: 'var(--glass-nested-border)', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Total Project Estimate:
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {formatRupees(totals.total)}
                  </span>
                </div>
              </div>

              {/* 30% Advance Callout */}
              <div className="advance-callout">
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    30% Advance to Kickstart
                  </div>
                  <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)' }}>
                    70% balance paid ONLY on final launch
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-dot)' }}>
                  {formatRupees(totals.advance)}
                </div>
              </div>

              {/* Perks Checklist */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: 'var(--accent-dot)' }} />
                  <span>1 Year High-Speed Cloud CDN &amp; SSL included</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: 'var(--accent-dot)' }} />
                  <span>Direct Slack/WhatsApp with Senior Founders</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: 'var(--accent-dot)' }} />
                  <span>Complete Git repository source code handover</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: 'var(--accent-dot)' }} />
                  <span>60-Day post-launch bug-free warranty</span>
                </li>
              </ul>

              {/* Pure Liquid Glass Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-glass btn-glass-lg"
                  onClick={onLockQuote}
                  style={{ width: '100%' }}
                >
                  <Lock size={16} />
                  <span>Lock Quotation &amp; Proceed</span>
                </button>

                <button
                  type="button"
                  className="btn-glass btn-glass-sm"
                  onClick={onCopyQuote}
                  style={{ width: '100%' }}
                >
                  <Copy size={14} />
                  <span>Copy Itemized Quote Spec</span>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
