import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio({ onOpenCaseStudy }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Works' },
    { id: 'school', label: 'Schools & Institutes' },
    { id: 'hotel', label: 'Hotels & Resorts' },
    { id: 'business', label: 'B2B Enterprise' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'webapp', label: 'Web Apps & SaaS' },
  ];

  const projects = [
    {
      id: 'vidya',
      category: 'school',
      title: 'Vidya Mandir Excellence Academy',
      tag: 'School Management',
      metric: '99.4% Fee On-Time',
      statVal: '2,400+',
      statLabel: 'Students Digitally Enrolled',
      desc: 'Complete digital campus transformation with admissions pipeline, parent fee portal, automated gradebooks, and instant SMS circulars.',
      tech: ['Student Auth', 'Razorpay UPI', 'CBSE Schema'],
    },
    {
      id: 'aura',
      category: 'hotel',
      title: 'Aura Himalayan Boutique Retreat',
      tag: 'Luxury Hospitality',
      metric: '₹18.4L Saved/yr',
      statVal: '+380%',
      statLabel: 'Direct Bookings Growth',
      desc: 'Zero-commission booking engine with high-res chalet galleries, live room inventory calendar, and automated guest WhatsApp concierge.',
      tech: ['Direct Engine', 'visionOS UI', 'Zero OTA Fees'],
    },
    {
      id: 'stark',
      category: 'business',
      title: 'Stark & Sterling Corporate Advisory',
      tag: 'B2B Wealth & Legal',
      metric: '3.2x Inbound Leads',
      statVal: '0.38s',
      statLabel: 'Global Page Load Speed',
      desc: 'Ultra-clean editorial corporate platform featuring interactive tax calculator, executive case studies, and automated client onboarding.',
      tech: ['Editorial Typography', 'Lead Scorer', '100/100 CWV'],
    },
    {
      id: 'kalyani',
      category: 'ecommerce',
      title: 'Kalyani Silks Heritage Handlooms',
      tag: 'Luxury Handloom D2C',
      metric: '4.2% Conversion',
      statVal: '₹1.4 Cr',
      statLabel: 'Monthly Handloom GMV',
      desc: 'High-density artisan textile catalog with frictionless 1-click UPI checkout, real-time stock allocation, and global currency selector.',
      tech: ['1-Click UPI', 'Live Inventory', '4.2% Conv Rate'],
    },
    {
      id: 'nexus',
      category: 'webapp',
      title: 'NexusFleet Logistics Cloud',
      tag: 'Logistics SaaS App',
      metric: 'Zero Downtime',
      statVal: '600+',
      statLabel: 'Vehicles Tracked Live',
      desc: 'Real-time commercial fleet dispatch console with sub-20ms WebSocket telemetry, fuel burn predictions, and route optimization.',
      tech: ['WebSockets', 'Glass Gauges', 'Sub-20ms'],
    },
    {
      id: 'sanctuary',
      category: 'hotel',
      title: 'Sanctuary Wellness Retreat',
      tag: 'Ayurveda Wellness',
      metric: '98% Satisfaction',
      statVal: '+210%',
      statLabel: 'Treatment Bookings',
      desc: 'Bespoke holistic retreat platform featuring interactive dosha consultation questionnaire, doctor scheduling, and customized stay packages.',
      tech: ['AI Intake', 'Doc Scheduling', 'Global Stripe'],
    },
  ];

  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="section-pad" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <div className="section-header">
          <div className="glass-pill section-tag">
            <span>Client Work &amp; Case Studies</span>
          </div>
          <h2 className="section-title" id="portfolio-heading">
            Proven Performance in Production.
          </h2>
          <p className="section-desc">
            Explore live production platforms built with our signature Liquid Glass design system and tailored data architecture.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`btn-glass btn-glass-sm ${isActive ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  background: isActive ? 'var(--pill-active-bg)' : 'var(--btn-glass-bg)',
                  borderColor: isActive ? 'var(--pill-active-border)' : 'var(--btn-glass-border)',
                  color: isActive ? 'var(--pill-active-text)' : 'var(--btn-text-color)',
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="portfolio-grid">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="glass-panel project-card glass-spotlight"
                whileHover={{ y: -4 }}
              >
                <div
                  style={{
                    height: '210px',
                    position: 'relative',
                    padding: '24px',
                    background: 'var(--glass-nested-bg)',
                    borderBottom: 'var(--glass-nested-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '14px',
                      background: 'var(--btn-glass-bg)',
                      backdropFilter: 'blur(16px)',
                      border: 'var(--btn-glass-border)',
                      boxShadow: 'var(--btn-glass-highlight)',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="glass-pill" style={{ fontSize: '0.6875rem', padding: '2px 8px' }}>
                        {project.tag}
                      </span>
                      <span className="status-dot" style={{ width: '6px', height: '6px' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {project.statVal}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                        {project.statLabel}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {project.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.71875rem',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          background: 'var(--glass-nested-bg)',
                          border: 'var(--glass-nested-border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: 'var(--glass-nested-border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dot)' }}>
                      {project.metric}
                    </span>
                    <button
                      type="button"
                      className="btn-glass btn-glass-sm"
                      onClick={() => onOpenCaseStudy(project.id)}
                    >
                      Case Study
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
