import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Briefcase,
  FileText,
  User,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export default function BusinessProfileSetup({
  theme,
  onToggleTheme,
  userSession,
  onCompleteSetup,
  onShowToast,
}) {
  const [orgName, setOrgName] = useState(userSession?.orgName || '');
  const [industry, setIndustry] = useState(userSession?.industry || 'school');
  const [description, setDescription] = useState(userSession?.description || '');
  const [contactName, setContactName] = useState(userSession?.fullName || '');
  const [phone, setPhone] = useState(userSession?.phone || '');
  const [city, setCity] = useState(userSession?.city || '');
  const [websiteUrl, setWebsiteUrl] = useState(userSession?.websiteUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industryOptions = [
    { id: 'school', label: 'School & Institute', icon: '🎓' },
    { id: 'hotel', label: 'Hotel & Hospitality', icon: '🏨' },
    { id: 'business', label: 'B2B Enterprise', icon: '💼' },
    { id: 'ecommerce', label: 'E-Commerce Retail', icon: '🛍️' },
    { id: 'custom', label: 'Custom SaaS / Web App', icon: '⚡' },
    { id: 'other', label: 'Healthcare & Other', icon: '🏛️' },
  ];

  const handleFillDemo = () => {
    setOrgName('Vidya Mandir Excellence Academy');
    setIndustry('school');
    setDescription(
      'Premier K-12 institution in Bangalore with 2,400+ students. Upgrading our admissions funnel, parent fee reconciliation with Razorpay UPI, and digital student gradebooks.'
    );
    setContactName('Dr. Rajesh Sharma');
    setPhone('+91 98450 12389');
    setCity('Bangalore, Karnataka');
    setWebsiteUrl('https://vidyamandir.edu.in');
    if (onShowToast) onShowToast('Prefilled with Sample Business Profile');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const updatedProfile = {
      ...userSession,
      orgName: orgName.trim() || 'My Organization',
      industry,
      description: description.trim(),
      fullName: contactName.trim() || userSession?.fullName || 'Client Leader',
      phone: phone.trim(),
      city: city.trim(),
      websiteUrl: websiteUrl.trim(),
      profileCompleted: true,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      if (onShowToast) {
        onShowToast(`Business Profile saved for ${updatedProfile.orgName}! Opening Workspace`);
      }
      onCompleteSetup(updatedProfile);
    }, 700);
  };

  return (
    <div className="onboarding-page-wrapper" style={{ minHeight: '100vh', padding: '36px 20px', position: 'relative', zIndex: 10 }}>
      {/* Floating Topbar */}
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div className="nav-brand-pill" style={{ pointerEvents: 'none' }}>
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
            </svg>
          </div>
          <span>Trishul Studio</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="btn-glass btn-glass-sm"
            onClick={handleFillDemo}
            title="Auto-fill sample data for quick preview"
          >
            <Sparkles size={13} style={{ color: 'var(--accent-dot)' }} />
            <span>Fill Sample Profile</span>
          </button>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle Pearl/Emerald Theme"
          >
            {theme === 'light' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>

      {/* Main Glass Card */}
      <motion.div
        className="glass-panel glass-spotlight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '40px 44px',
          borderRadius: '32px',
        }}
      >
        {/* Step Indicator */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              paddingBottom: '20px',
              borderBottom: 'var(--glass-nested-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: 'var(--accent-dot)',
                }}
              >
                <CheckCircle2 size={15} />
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>Step 1: Account Created</span>
            </div>

            <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--accent-dot)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              >
                2
              </span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                Step 2: Business Profile Setup
              </span>
            </div>

            <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', opacity: 0.6 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--btn-glass-bg)',
                  border: 'var(--btn-glass-border)',
                  color: 'var(--text-tertiary)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                3
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>Step 3: Customer Dashboard</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '28px' }}>
          <div className="glass-pill section-tag" style={{ marginBottom: '12px' }}>
            <span>Tailor Your Studio Experience</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.7rem, 3vw, 2.2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '8px',
            }}
          >
            Complete Your Business Profile.
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Tell us about your organization and requirements so your workspace, project sprints, and quotation proposals are configured to your industry with mathematical clarity.
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Org Name */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              <Building2 size={15} style={{ color: 'var(--accent-dot)' }} />
              <span>Organization / Brand Name *</span>
            </label>
            <input
              type="text"
              required
              className="glass-input"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Vidya Mandir Academy, Aura Himalayan Retreat, Stark Corp"
              style={{ width: '100%' }}
            />
          </div>

          {/* Industry Selection */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '10px',
              }}
            >
              <Briefcase size={15} style={{ color: 'var(--accent-dot)' }} />
              <span>Primary Industry / Domain *</span>
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '10px',
              }}
            >
              {industryOptions.map((opt) => {
                const isSelected = industry === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIndustry(opt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '16px',
                      background: isSelected ? 'var(--pill-active-bg)' : 'var(--glass-nested-bg)',
                      border: isSelected ? 'var(--pill-active-border)' : 'var(--glass-nested-border)',
                      boxShadow: isSelected ? '0 0 16px var(--accent-glow)' : 'none',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business Description */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              <FileText size={15} style={{ color: 'var(--accent-dot)' }} />
              <span>Business Description &amp; Website Goals</span>
            </label>
            <textarea
              className="glass-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us what your business does and key requirements for your new platform (e.g. online admissions, direct bookings, high-speed lead generation)..."
              style={{ width: '100%', resize: 'vertical', lineHeight: 1.55 }}
            />
          </div>

          {/* Contact Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                <User size={15} style={{ color: 'var(--accent-dot)' }} />
                <span>Primary Contact Person</span>
              </label>
              <input
                type="text"
                className="glass-input"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Full Name / Executive Title"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                <Phone size={15} style={{ color: 'var(--accent-dot)' }} />
                <span>WhatsApp / Phone Number</span>
              </label>
              <input
                type="tel"
                className="glass-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                <MapPin size={15} style={{ color: 'var(--accent-dot)' }} />
                <span>Location / City</span>
              </label>
              <input
                type="text"
                className="glass-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bangalore, Hyderabad, Mumbai"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                <Globe size={15} style={{ color: 'var(--accent-dot)' }} />
                <span>Current Website URL (Optional)</span>
              </label>
              <input
                type="url"
                className="glass-input"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Guarantee Note */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '16px',
              background: 'var(--glass-nested-bg)',
              border: 'var(--glass-nested-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
            }}
          >
            <ShieldCheck size={18} style={{ color: 'var(--accent-dot)', flexShrink: 0 }} />
            <span>
              Your profile information is used exclusively by our two lead software founders to tailor your project specifications with zero third-party marketing or spam.
            </span>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              marginTop: '10px',
            }}
          >
            <button
              type="button"
              className="btn-glass btn-glass-sm"
              onClick={() => handleSubmit()}
              style={{ opacity: 0.8 }}
            >
              <span>Skip for Now</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-glass btn-glass-lg"
              style={{ padding: '14px 34px' }}
            >
              <span>{isSubmitting ? 'Configuring Workspace...' : 'Launch Customer Dashboard'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
