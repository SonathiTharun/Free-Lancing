import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Send, ShieldCheck, Zap } from 'lucide-react';

export default function Contact({ selectedService = 'school', onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    service: selectedService,
    budget: 'premium',
    message: '',
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onShowToast(`Blueprint received for ${formData.org || 'your project'}! Our founders will reply within 4 hours.`);
    setFormData({
      name: '',
      org: '',
      email: '',
      phone: '',
      service: selectedService || 'school',
      budget: 'premium',
      message: '',
    });
  };

  return (
    <section className="section-pad" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header">
          <div className="glass-pill section-tag">
            <span>Direct Channel</span>
          </div>
          <h2 className="section-title" id="contact-heading">
            Initiate Your Project Blueprint.
          </h2>
          <p className="section-desc">
            Ready to build a platform with crystal clarity? Fill out the inquiry below and our lead founders will review your scope within 4 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '36px', alignItems: 'flex-start' }}>
          {/* Contact Info Left */}
          <div className="glass-panel glass-spotlight" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Direct Founder Line
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We respond to all verified project scopes within 4 business hours. No junior middlemen, no cold sales pitches.
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div className="brand-emblem" style={{ width: '44px', height: '44px' }}>
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                  Direct Studio Email
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  founders@trishulstudio.com
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div className="brand-emblem" style={{ width: '44px', height: '44px' }}>
                <Phone size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                  WhatsApp Founder Hotline
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  +91 98450 12389
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div className="brand-emblem" style={{ width: '44px', height: '44px' }}>
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                  Working Hours
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Mon – Sat • 09:30 – 19:30 IST
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--accent-dot)' }} />
                <span>Trishul Studio Guarantee</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                • <strong>30% Advance</strong> to commence sprint • <strong>70% Balance</strong> only upon final client sign-off on live staging.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--accent-dot)', fontWeight: 600, marginTop: '4px' }}>
                <Zap size={14} />
                <span>14-Day Average Sprint Turnaround</span>
              </div>
            </div>
          </div>

          {/* Contact Form Right */}
          <div className="glass-panel glass-spotlight" style={{ padding: '40px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="glass-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    School / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    placeholder="e.g. St. Xavier's Academy"
                    className="glass-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@domain.com"
                    className="glass-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="glass-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Primary Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="glass-select"
                  >
                    <option value="school">School &amp; Institute Portal</option>
                    <option value="hotel">Hotel &amp; Hospitality Booking</option>
                    <option value="business">B2B Business Website</option>
                    <option value="ecommerce">E-Commerce Store</option>
                    <option value="webapp">Custom Web App / SaaS</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Estimated Budget (INR)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="glass-select"
                  >
                    <option value="standard">₹40,000 – ₹75,000</option>
                    <option value="premium">₹75,000 – ₹1,50,000</option>
                    <option value="enterprise">₹1,50,000 – ₹3,50,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Project Details &amp; Timeline Requirements
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your key objectives, required integrations, and preferred launch timeline..."
                  className="glass-textarea"
                />
              </div>

              <button type="submit" className="btn-glass btn-glass-lg" style={{ width: '100%' }}>
                <Send size={18} />
                <span>Send Project Blueprint to Founders</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
