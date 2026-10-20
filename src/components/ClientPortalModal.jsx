import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ExternalLink, CheckCircle } from 'lucide-react';

export default function ClientPortalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
          style={{ maxWidth: '680px' }}
        >
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close portal dialog">
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="brand-emblem" style={{ width: '28px', height: '28px' }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '14px', height: '14px' }}
                >
                  <path d="M12 2v20" />
                  <path d="M5 4c0 4.5 3.2 7.5 7 7.5s7-3 7-7.5" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-primary)' }}>
                Trishul Client Console
              </span>
            </div>
            <span className="glass-pill" style={{ fontSize: '0.75rem' }}>
              <span className="status-dot" style={{ width: '6px', height: '6px' }} />
              <span>Sprint 03 Active</span>
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Active Project: Vidya Mandir Academy
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Staging URL: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-dot)' }}>staging.vidyamandir.trishulstudio.com</code>
          </p>

          {/* Milestone Progress Bar */}
          <div style={{ padding: '20px', borderRadius: '18px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Overall Sprint Completion:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>75%</span>
            </div>
            <div style={{ width: '100%', height: '8px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.2)', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ width: '75%', height: '100%', borderRadius: '9999px', background: 'var(--accent-dot)', boxShadow: '0 0 10px var(--accent-dot)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              <span>Sprint 1: Architecture (Done)</span>
              <span>Sprint 2: Fee Portal (Done)</span>
              <span>Sprint 3: QA (Live)</span>
            </div>
          </div>

          {/* Payment & Escrow Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Milestone 1 (30% Advance)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-dot)' }}>₹29,700 PAID</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Receipt #TS-INV-4410</div>
            </div>

            <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Milestone 2 (70% Balance)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹69,300 PENDING</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Due on final QA sign-off</div>
            </div>
          </div>

          {/* Action */}
          <button
            type="button"
            className="btn-glass btn-glass-lg"
            style={{ width: '100%' }}
            onClick={() => window.open('https://wa.me/919845012389?text=Hello%20Trishul%20Studio%20Founders', '_blank')}
          >
            <MessageSquare size={18} />
            <span>Open Founder Slack / WhatsApp</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
