import React from 'react';
import { motion } from 'framer-motion';

export default function Workflow() {
  const steps = [
    {
      num: 'STEP 01',
      title: 'Customize & Scope',
      desc: 'Select your exact business requirements, page architecture, and design aesthetics using our live configurator. Zero vague sales ambiguity.',
      tag: 'Day 1 • Instant Scope',
    },
    {
      num: 'STEP 02',
      title: 'Instant Real-Time Quote',
      desc: 'Receive an itemized breakdown down to the exact rupee, along with a firm calendar delivery date and sprint schedule.',
      tag: 'Fixed Price Lock',
    },
    {
      num: 'STEP 03',
      title: '30% Advance to Kickstart',
      desc: 'Pay 30% to reserve your sprint. We initiate live design systems and staging environment with dedicated private founder channels.',
      tag: '30% Milestone',
    },
    {
      num: 'STEP 04',
      title: 'Launch & Full Sign-Off',
      desc: 'Thorough cross-device QA, load testing, and client sign-off on live staging. You pay the final 70% balance ONLY when 100% satisfied.',
      tag: '70% On Launch',
    },
  ];

  return (
    <section className="section-pad" id="workflow" aria-labelledby="workflow-heading">
      <div className="container">
        <div className="section-header">
          <div className="glass-pill section-tag">
            <span>Guaranteed Milestones</span>
          </div>
          <h2 className="section-title" id="workflow-heading">
            Transparent 4-Step Production Timeline.
          </h2>
          <p className="section-desc">
            We operate with mathematical clarity. No surprise fees, no shifting goalposts, and complete financial peace of mind.
          </p>
        </div>

        <div className="workflow-grid">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="glass-panel workflow-card glass-spotlight"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-dot)' }}>
                {step.num}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {step.desc}
              </p>
              <span
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-start',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.71875rem',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: 'var(--btn-glass-bg)',
                  border: 'var(--btn-glass-border)',
                  color: 'var(--text-secondary)',
                }}
              >
                {step.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
