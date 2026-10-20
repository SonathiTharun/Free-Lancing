import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onDemoAccess, onNewProjectClick }) {
  const [email, setEmail] = useState('');
  const [passkey, setPasskey] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Allow any credentials or switch to demo client dashboard
    onDemoAccess();
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay active" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="modal-glass-container glass-spotlight"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.28, type: 'spring', damping: 26 }}
          style={{ maxWidth: '480px' }}
        >
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
            <div className="brand-emblem" style={{ width: '56px', height: '56px', marginBottom: '16px' }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '28px', height: '28px' }}
              >
                <path d="M12 2v20" />
                <path d="M5 4c0 4.5 3.2 7.5 7 7.5s7-3 7-7.5" />
                <circle cx="12" cy="2" r="1.2" fill="currentColor" />
                <circle cx="5" cy="4" r="1" fill="currentColor" />
                <circle cx="19" cy="4" r="1" fill="currentColor" />
              </svg>
            </div>
            <span className="glass-pill" style={{ marginBottom: '10px' }}>
              <span className="status-dot" style={{ width: '6px', height: '6px' }} />
              <span>visionOS Client Gateway</span>
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Client Console Login
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Access your real-time staging previews, sprint deliverables, and milestone sign-offs.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Client ID or Registered Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. vidyamandir@domain.com"
                  className="glass-input"
                  style={{ paddingLeft: '40px' }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Sprint Passkey
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="••••••••••••"
                  className="glass-input"
                  style={{ paddingLeft: '40px' }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              </div>
            </div>

            <button type="submit" className="btn-glass btn-glass-lg" style={{ width: '100%', marginTop: '6px' }}>
              <span>Sign In to Project Console</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick 1-Click Demo Access */}
          <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Testing Trishul Studio Platform?
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Experience an active client workspace with staging telemetry and milestone escrows.
            </p>
            <button
              type="button"
              className="btn-glass btn-glass-sm"
              onClick={onDemoAccess}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={14} style={{ color: 'var(--accent-dot)' }} />
              <span>Launch Demo Client Console</span>
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '18px' }}>
            <button
              type="button"
              onClick={() => {
                onClose();
                onNewProjectClick();
              }}
              style={{ fontSize: '0.8125rem', color: 'var(--accent-dot)', fontWeight: 600, cursor: 'pointer' }}
            >
              Need a new platform? Configure your project quote →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
