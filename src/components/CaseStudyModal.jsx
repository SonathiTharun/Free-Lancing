import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export default function CaseStudyModal({ projectId, onClose, onQuoteSimilar }) {
  if (!projectId) return null;

  const caseStudies = {
    vidya: {
      title: 'Vidya Mandir Excellence Academy',
      category: 'School & Institute Management',
      metric: '99.4% Fee Collection On-Time',
      turnaround: '14 Days',
      description: 'A prestigious CBSE academy in Bangalore with over 2,400 students transitioned from fragmented manual paperwork and third-party accounting delays to a unified, bespoke Trishul Studio platform. Parents can now pay quarterly dues in seconds via Razorpay UPI, view instant circulars, and track exam report cards with zero friction.',
      highlights: [
        'Automated UPI Reconciliation with instant WhatsApp receipts',
        'Role-based access controls for Teachers, Accounts Staff, and Principals',
        '100% CBSE & State Board data privacy and security compliance',
        'Page load speed of 0.34s even during peak morning admission surges',
      ],
    },
    aura: {
      title: 'Aura Himalayan Boutique Retreat',
      category: 'Luxury Hotel & Hospitality',
      metric: '+380% Direct Bookings Growth',
      turnaround: '16 Days',
      description: 'A 28-chalet luxury eco-resort in Himachal Pradesh was losing over 22% of revenue to third-party OTA commissions (Booking.com & MakeMyTrip). Trishul Studio architected a liquid glass booking engine with immersive 4K suite previews, dynamic seasonal pricing, zero-commission reservations, and automated guest WhatsApp concierge.',
      highlights: [
        'Direct booking engine saving over ₹18,40,000 in OTA commissions annually',
        'Interactive room availability calendar with real-time room lock',
        'Dining and ayurvedic spa reservation add-ons during room checkout',
        'Sub-0.4s mobile performance optimized for travelers on remote 4G networks',
      ],
    },
    stark: {
      title: 'Stark & Sterling Corporate Advisory',
      category: 'B2B Legal & Wealth Management',
      metric: '3.2x Qualified Inbound Inquiries',
      turnaround: '10 Days',
      description: 'An elite cross-border corporate advisory firm required an authoritative digital presence matching their high-net-worth clientele. Designed with Swiss minimalist typography and subtle liquid glass panels, the platform features an interactive M&A valuation calculator that qualifies corporate leads instantly.',
      highlights: [
        'Interactive M&A and corporate restructuring cost estimation tool',
        'Self-hosted privacy-focused analytics adhering to strict EU GDPR guidelines',
        '100/100 Google Lighthouse score across Performance, SEO, and Accessibility',
        'Automated calendar integration booking consultations directly with senior partners',
      ],
    },
    kalyani: {
      title: 'Kalyani Silks Heritage Handlooms',
      category: 'Luxury Handloom D2C E-Commerce',
      metric: '4.2% Cart Conversion Rate',
      turnaround: '18 Days',
      description: 'A fourth-generation Kanchipuram silk handloom house launching their direct-to-consumer digital flagship. Trishul Studio engineered a high-density, tactile silk catalog with 1-click Razorpay UPI checkout, dynamic saree drape previews, and multi-currency international routing.',
      highlights: [
        'Frictionless 1-click UPI and Apple Pay checkout dropping abandonment by 44%',
        'Real-time stock synchronization avoiding overselling on exclusive one-of-a-kind weaves',
        'Automated GST invoice generation dispatched immediately via WhatsApp and Email',
        'High-density image compression with sub-second lazy loading across 800+ items',
      ],
    },
    nexus: {
      title: 'NexusFleet Logistics Cloud',
      category: 'Enterprise Fleet Telematics Web App',
      metric: 'Sub-20ms Telemetry Latency',
      turnaround: '24 Days',
      description: 'A multi-state freight and cold-chain logistics provider needed a real-time command dashboard to monitor 600+ temperature-controlled trucks. Built with low-latency WebSockets and visionOS-style translucent telemetry gauges.',
      highlights: [
        'Real-time GPS vehicle tracking and temperature alerts via WebSockets',
        'Dynamic glass gauges indicating fuel burn rate and driver duty hours',
        'Single-click PDF route compliance and billing export for clients',
        'Optimized client-side rendering sustaining 60fps on standard dispatcher screens',
      ],
    },
    sanctuary: {
      title: 'Sanctuary Wellness & Ayurvedic Retreat',
      category: 'Hospitality & Wellness Clinic',
      metric: '+210% Treatment Consultations',
      turnaround: '14 Days',
      description: 'A premier coastal Kerala Ayurvedic retreat offering multi-week panchakarma treatments. Built with a bespoke interactive dosha intake assessment that matches prospective guests to physicians before booking.',
      highlights: [
        'Intelligent multi-step dosha wellness intake questionnaire',
        'Doctor scheduling engine synced with international timezones',
        'Automated pre-arrival diet guidelines sent via WhatsApp bot',
        'Multi-currency deposits via global Stripe and local UPI',
      ],
    },
  };

  const data = caseStudies[projectId];
  if (!data) return null;

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
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span className="glass-pill">{data.category}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-dot)' }}>
              {data.metric}
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {data.title}
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            {data.description}
          </p>

          <div style={{ padding: '20px', borderRadius: '18px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', marginBottom: '24px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Architecture Highlights:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              {data.highlights.map((h, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: 'var(--accent-dot)', fontWeight: 700 }}>•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
              Turnaround: <strong style={{ color: 'var(--text-primary)' }}>{data.turnaround}</strong>
            </span>
            <button
              type="button"
              className="btn-glass btn-glass-sm"
              onClick={() => {
                onClose();
                onQuoteSimilar();
              }}
            >
              <span>Quote Similar Scope</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
