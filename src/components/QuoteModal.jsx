import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Phone, Copy, Send } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, config, totals, quoteId, onCopyQuote, onScrollToContact }) {
  if (!isOpen) return null;

  const formatRupees = (val) => '₹' + val.toLocaleString('en-IN');

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Vikramaditya & Arunima,\nI would like to lock Quote ${quoteId} for my project with Trishul Studio.\n\n` +
      `• Platform: ${config.industry.name}\n` +
      `• Design: ${config.style.name}\n` +
      `• Total Estimate: ${formatRupees(totals.total)}\n` +
      `• 30% Advance: ${formatRupees(totals.advance)}\n\n` +
      `Please confirm sprint availability.`
    );
    window.open(`https://wa.me/919845012389?text=${msg}`, '_blank');
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
        >
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <span className="glass-pill">
              <span className="status-dot" style={{ width: '6px', height: '6px' }} />
              <span>Official Scope Estimate</span>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              Ref: {quoteId}
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Lock Your Sprint Quotation
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '22px', lineHeight: 1.55 }}>
            This exact itemized specification is locked for 14 days. Review the financial milestone breakdown below to reserve your development slot with our founders.
          </p>

          <div style={{ padding: '20px', borderRadius: '18px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Core Platform:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{config.industry.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Aesthetic System:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{config.style.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Timeline:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                {totals.minDays}–{totals.maxDays} Business Days
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', paddingTop: '10px', borderTop: 'var(--glass-nested-border)', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Total Project Estimate:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.35rem' }}>
                {formatRupees(totals.total)}
              </span>
            </div>
          </div>

          <div className="advance-callout" style={{ marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                30% Advance Deposit Required
              </div>
              <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)' }}>
                Kickstarts sprint; 70% paid only on final verification
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-dot)' }}>
              {formatRupees(totals.advance)}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button type="button" className="btn-glass btn-glass-lg" onClick={handleWhatsApp} style={{ width: '100%' }}>
              <Phone size={18} />
              <span>Reserve via WhatsApp Direct Hotline</span>
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn-glass btn-glass-sm" onClick={onCopyQuote} style={{ flex: 1 }}>
                <Copy size={14} />
                <span>Copy Quote JSON</span>
              </button>
              <button
                type="button"
                className="btn-glass btn-glass-sm"
                onClick={() => {
                  onClose();
                  onScrollToContact();
                }}
                style={{ flex: 1 }}
              >
                <Send size={14} />
                <span>Fill Inquiry Form</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
