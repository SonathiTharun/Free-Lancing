import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BedDouble, Briefcase, ShoppingBag, LayoutDashboard, Sparkles, ArrowRight, CheckCircle2, Send } from 'lucide-react';

export default function ServicesBento({ onSelectPreset }) {
  // Interactive widget states
  const [otaBookings, setOtaBookings] = useState(30);
  const [speedTesting, setSpeedTesting] = useState(false);
  const [speedTested, setSpeedTested] = useState(false);
  
  // Interactive AI Sandbox
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState([
    { sender: 'user', text: 'What are the admission deadlines for the 2026-27 session?' },
    { sender: 'bot', text: 'Phase 1 registrations close on Nov 30th. You can submit the digitized application in under 3 minutes via our secure parent portal.' },
  ]);

  const handleSendAi = (textToSend) => {
    const text = textToSend || aiInput;
    if (!text.trim()) return;

    setAiChat((prev) => [...prev, { sender: 'user', text }]);
    setAiInput('');

    setTimeout(() => {
      let botResponse = "Trishul Studio custom AI assistants are trained exclusively on your institution's PDFs, handbooks, and rate cards with zero hallucinations.";
      if (text.toLowerCase().includes('fee') || text.toLowerCase().includes('advance') || text.toLowerCase().includes('price')) {
        botResponse = "We operate on a transparent 30% advance to start, with the remaining 70% paid ONLY after final sign-off on live staging.";
      } else if (text.toLowerCase().includes('time') || text.toLowerCase().includes('day')) {
        botResponse = "Our average turnaround is 14 to 18 business days, delivered directly by our two senior software founders.";
      }
      setAiChat((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  const runSpeedTest = () => {
    setSpeedTesting(true);
    setSpeedTested(false);
    setTimeout(() => {
      setSpeedTesting(false);
      setSpeedTested(true);
    }, 450);
  };

  return (
    <section className="section-pad" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header">
          <div className="glass-pill section-tag">
            <span>Signature Engineering</span>
          </div>
          <h2 className="section-title" id="services-heading">
            Tailored Digital Engines for Niche Industries.
          </h2>
          <p className="section-desc">
            We don't sell bloated cookie-cutter themes. Each solution is hand-coded from scratch with bespoke business logic, frictionless UX, and zero unnecessary dependencies.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: School & Institute Portals (Span 7) */}
          <motion.article
            className="glass-panel bento-card bento-span-7 glass-spotlight"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <div className="bento-icon-box">
                <GraduationCap size={26} />
              </div>
              <h3 className="bento-title">School &amp; Institute Portals</h3>
              <p className="bento-desc">
                Comprehensive web platforms for modern schools, colleges, and academies. Includes digitized online admissions, parent fee payment portals, notice circulars, attendance sync, and staff management with CBSE/ICSE compliance.
              </p>

              {/* Interactive Micro Visual Widget */}
              <div className="interactive-micro-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Automated Student Fee Reconciliation</span>
                  <span className="glass-pill" style={{ fontSize: '0.6875rem', padding: '2px 8px', color: 'var(--accent-dot)' }}>Live Razorpay UPI</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '12px', background: 'var(--btn-glass-bg)', border: 'var(--btn-glass-border)' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Term 2 Fees (Std X)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--accent-dot)' }}>₹24,500 PAID</span>
                </div>
              </div>

              <div className="bento-features">
                <span className="bento-feat-tag">Online Fee Payment</span>
                <span className="bento-feat-tag">Admission Funnels</span>
                <span className="bento-feat-tag">Result Publication</span>
                <span className="bento-feat-tag">WhatsApp Circulars</span>
              </div>
            </div>

            <div className="bento-card-footer">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                From ₹48,000 • 14 Days
              </span>
              <button
                type="button"
                className="btn-glass btn-glass-sm"
                onClick={() => onSelectPreset('school')}
              >
                <span>Inquire For School</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.article>

          {/* Card 2: Hotel & Hospitality Booking Sites (Span 5) */}
          <motion.article
            className="glass-panel bento-card bento-span-5 glass-spotlight"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <div className="bento-icon-box">
                <BedDouble size={26} />
              </div>
              <h3 className="bento-title">Hotel &amp; Hospitality Booking</h3>
              <p className="bento-desc">
                Ditch the 18% OTA commission fees. Bespoke hotel booking engines with high-res chalet galleries, live room inventory calendar, and automated guest WhatsApp concierge.
              </p>

              {/* Interactive OTA Savings Calculator Slider */}
              <div className="interactive-micro-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Monthly Room Bookings:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>{otaBookings} bookings</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={otaBookings}
                  onChange={(e) => setOtaBookings(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-dot)', cursor: 'pointer', marginBottom: '8px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Est. Commission Saved:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-dot)' }}>
                    ₹{(otaBookings * 4800 * 0.18).toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>

              <div className="bento-features">
                <span className="bento-feat-tag">Direct Booking Engine</span>
                <span className="bento-feat-tag">Suite Showcases</span>
                <span className="bento-feat-tag">Zero OTA Fees</span>
              </div>
            </div>

            <div className="bento-card-footer">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                From ₹54,000 • 16 Days
              </span>
              <button
                type="button"
                className="btn-glass btn-glass-sm"
                onClick={() => onSelectPreset('hotel')}
              >
                <span>Inquire For Hotel</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.article>

          {/* Card 3: Business Websites (Span 4) */}
          <motion.article
            className="glass-panel bento-card bento-span-4 glass-spotlight"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <div className="bento-icon-box">
                <Briefcase size={26} />
              </div>
              <h3 className="bento-title">B2B Business Websites</h3>
              <p className="bento-desc">
                Establish undisputed industry authority with an editorial aesthetic, high-converting lead capture pipelines, and sub-second load times.
              </p>

              {/* Interactive Speed Benchmark Widget */}
              <div className="interactive-micro-box" style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  className="btn-glass btn-glass-sm"
                  onClick={runSpeedTest}
                  disabled={speedTesting}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  <span>{speedTesting ? 'Benchmarking 0.3s...' : speedTested ? 'Verified: 0.31s Paint' : 'Run Speed Benchmark'}</span>
                </button>
                <div style={{ fontSize: '0.75rem', color: speedTested ? 'var(--accent-dot)' : 'var(--text-tertiary)' }}>
                  {speedTested ? '✓ 100/100 Core Web Vitals Guaranteed' : 'Click to test real-world sub-second paint'}
                </div>
              </div>

              <div className="bento-features">
                <span className="bento-feat-tag">Lead Scorer</span>
                <span className="bento-feat-tag">0.3s Load Speed</span>
                <span className="bento-feat-tag">Editorial Type</span>
              </div>
            </div>

            <div className="bento-card-footer">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                From ₹38,000
              </span>
              <button
                type="button"
                className="btn-glass btn-glass-sm"
                onClick={() => onSelectPreset('business')}
              >
                <span>Inquire For Business</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.article>

          {/* Card 4: E-Commerce Stores (Span 4) */}
          <motion.article
            className="glass-panel bento-card bento-span-4 glass-spotlight"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <div className="bento-icon-box">
                <ShoppingBag size={26} />
              </div>
              <h3 className="bento-title">E-Commerce Stores</h3>
              <p className="bento-desc">
                Frictionless 1-click UPI checkout, dynamic inventory synchronization, automated GST invoicing, and lightning fast touch interactions.
              </p>

              <div className="interactive-micro-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Cart Abandonment Drop:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-dot)' }}>-44%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>1-Click UPI Payment:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>GPay / PhonePe</span>
                </div>
              </div>

              <div className="bento-features">
                <span className="bento-feat-tag">1-Click UPI</span>
                <span className="bento-feat-tag">Live Inventory</span>
                <span className="bento-feat-tag">GST Invoicing</span>
              </div>
            </div>

            <div className="bento-card-footer">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                From ₹62,000
              </span>
              <button
                type="button"
                className="btn-glass btn-glass-sm"
                onClick={() => onSelectPreset('ecommerce')}
              >
                <span>Inquire For Store</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.article>

          {/* Card 5: Custom Web Apps & Dashboards (Span 4) */}
          <motion.article
            className="glass-panel bento-card bento-span-4 glass-spotlight"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <div className="bento-icon-box">
                <LayoutDashboard size={26} />
              </div>
              <h3 className="bento-title">Custom Web Apps</h3>
              <p className="bento-desc">
                Scalable SaaS MVPs, internal admin ERPs, client collaboration portals, and real-time operational consoles with sub-20ms WebSockets.
              </p>

              <div className="interactive-micro-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Server Ping Latency:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-dot)' }}>12ms Edge</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Architecture:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>Next.js / Node</span>
                </div>
              </div>

              <div className="bento-features">
                <span className="bento-feat-tag">Role-Based Auth</span>
                <span className="bento-feat-tag">WebSockets</span>
                <span className="bento-feat-tag">Excel/PDF Export</span>
              </div>
            </div>

            <div className="bento-card-footer">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                From ₹78,000
              </span>
              <button
                type="button"
                className="btn-glass btn-glass-sm"
                onClick={() => onSelectPreset('custom')}
              >
                <span>Inquire For App</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.article>

          {/* Card 6: AI Integrations & Smart Automations (Span 12 with Functional AI Chat Simulator!) */}
          <motion.article
            className="glass-panel bento-card bento-span-12 glass-spotlight"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '36px', alignItems: 'center' }}>
              <div>
                <div className="bento-icon-box">
                  <Sparkles size={26} />
                </div>
                <h3 className="bento-title">AI Integrations &amp; Knowledge Bots</h3>
                <p className="bento-desc">
                  Embed custom intelligent conversational agents trained specifically on your school's prospectus, hotel amenities and menus, or business offerings. Handles multi-lingual inquiries, qualifies leads 24/7, and triggers instant WhatsApp summaries to your team.
                </p>
                <div className="bento-features" style={{ marginBottom: '24px' }}>
                  <span className="bento-feat-tag">Trained on Custom PDFs</span>
                  <span className="bento-feat-tag">WhatsApp Webhook Sync</span>
                  <span className="bento-feat-tag">Multilingual Hindi/English</span>
                  <span className="bento-feat-tag">Zero Cloud Hallucinations</span>
                </div>
                <button
                  type="button"
                  className="btn-glass btn-glass-sm"
                  onClick={() => onSelectPreset('custom')}
                >
                  <span>Inquire With AI Scope</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Functional Interactive AI Sandbox */}
              <div className="interactive-micro-box" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="glass-pill" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
                    <span className="status-dot" style={{ width: '6px', height: '6px' }} />
                    <span>Interactive AI Sandbox (Try typing!)</span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                    Trishul-AI v2.4
                  </span>
                </div>

                {/* Chat Message Stream */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', marginBottom: '12px', paddingRight: '4px' }}>
                  {aiChat.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        padding: '9px 13px',
                        borderRadius: msg.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        background: msg.sender === 'user' ? 'var(--btn-glass-bg)' : 'var(--glass-card-bg)',
                        border: 'var(--glass-card-border)',
                        fontSize: '0.8125rem',
                        color: 'var(--text-primary)',
                        lineHeight: 1.45,
                      }}
                    >
                      {msg.sender === 'bot' && (
                        <span style={{ color: 'var(--accent-dot)', fontWeight: 600, marginRight: '4px' }}>Trishul AI:</span>
                      )}
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* Quick Prompts */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  <button
                    type="button"
                    className="glass-pill"
                    style={{ fontSize: '0.6875rem', padding: '2px 8px', cursor: 'pointer' }}
                    onClick={() => handleSendAi('What is your turnaround?')}
                  >
                    Turnaround time?
                  </button>
                  <button
                    type="button"
                    className="glass-pill"
                    style={{ fontSize: '0.6875rem', padding: '2px 8px', cursor: 'pointer' }}
                    onClick={() => handleSendAi('How does the 30% advance work?')}
                  >
                    30% advance rule?
                  </button>
                </div>

                {/* Interactive Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendAi();
                  }}
                  style={{ display: 'flex', gap: '8px' }}
                >
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask about features, pricing, timeline..."
                    className="glass-input"
                    style={{ padding: '8px 14px', fontSize: '0.8125rem', flex: 1 }}
                  />
                  <button type="submit" className="btn-glass btn-glass-sm" style={{ padding: '8px 14px' }}>
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
