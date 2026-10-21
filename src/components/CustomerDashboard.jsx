import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Compass,
  FileSpreadsheet,
  FolderKanban,
  CreditCard,
  FolderArchive,
  MessageSquare,
  Building,
  User,
  Sun,
  Moon,
  LogOut,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  Upload,
  Download,
  Phone,
  Monitor,
  Tablet,
  Smartphone,
  ChevronRight,
  Menu,
  X,
  FileText,
  AlertCircle,
  Copy,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

export default function CustomerDashboard({
  theme,
  onToggleTheme,
  userSession,
  onBackToStudio,
  onLogout,
  onShowToast,
  onOpenConsultation,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [devicePreview, setDevicePreview] = useState('desktop');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [revisionNote, setRevisionNote] = useState('');
  const [revisionSubmitted, setRevisionSubmitted] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Persistent Minimized / Collapsed Sidebar State
  const [isMinimized, setIsMinimized] = useState(() => {
    try {
      return localStorage.getItem('trishul_sidebar_minimized') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleToggleMinimize = () => {
    setIsMinimized((prev) => {
      const next = !prev;
      localStorage.setItem('trishul_sidebar_minimized', String(next));
      if (onShowToast) {
        onShowToast(next ? 'Navigation minimized to compact rail' : 'Navigation expanded');
      }
      return next;
    });
  };

  // Fallback / Default active project data
  const orgName = userSession?.orgName || 'Vidya Mandir Academy';
  const contactName = userSession?.fullName || 'Dr. Rajesh Sharma';
  const userIndustry = userSession?.industry || 'school';

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'start-project', label: 'Start a Project', icon: Compass },
    { id: 'quotations', label: 'My Requests & Quotations', icon: FileSpreadsheet },
    { id: 'projects', label: 'My Projects', icon: FolderKanban },
    { id: 'payments', label: 'Payments & Invoices', icon: CreditCard },
    { id: 'files', label: 'Files & Deliverables', icon: FolderArchive },
    { id: 'messages', label: 'Messages & Revisions', icon: MessageSquare },
    { id: 'profile', label: 'Profile & Organization', icon: Building },
  ];

  const handleCopyQuote = () => {
    const quotePayload = {
      quoteId: 'TS-2026-4410',
      client: orgName,
      leadFounder: 'Vikramaditya K. & Arunima Roy',
      platform: 'Custom Institute Platform & Fee Reconciliation Engine',
      totalCost: '₹99,000',
      advanceDeposit: '₹29,700 (30% Paid)',
      escrowBalance: '₹69,300 (70% Pending)',
      status: 'Sprint 03 Active',
    };
    navigator.clipboard.writeText(JSON.stringify(quotePayload, null, 2));
    setCopiedQuote(true);
    if (onShowToast) onShowToast('Quote Specifications copied to clipboard!');
    setTimeout(() => setCopiedQuote(false), 2400);
  };

  const handleSendRevision = (e) => {
    e.preventDefault();
    if (!revisionNote.trim()) return;
    setRevisionSubmitted(true);
    if (onShowToast) onShowToast('Revision logged! Lead Founders notified via Slack/WhatsApp.');
    setTimeout(() => {
      setRevisionNote('');
      setRevisionSubmitted(false);
    }, 2800);
  };

  return (
    <div className="customer-workspace-root" style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
      {/* =========================================================================
          VISIONOS LIQUID GLASS SIDEBAR WITH INLINE MINIMIZE/EXPAND TOGGLE
          ========================================================================= */}
      <aside
        className={`workspace-sidebar ${isMinimized ? 'minimized' : ''} ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: isMinimized ? '78px' : '290px',
          background: 'var(--glass-card-bg)',
          backdropFilter: 'blur(36px)',
          WebkitBackdropFilter: 'blur(36px)',
          borderRight: 'var(--glass-card-border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: isMinimized ? '22px 10px' : '24px 18px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50,
          overflowX: 'hidden',
          transition: 'width 0.28s cubic-bezier(0.16, 1, 0.3, 1), padding 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div>
          {/* Brand Header & Inline Minimize/Expand Toggle Button */}
          {!isMinimized ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', padding: '0 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div className="brand-emblem" style={{ width: '34px', height: '34px', flexShrink: 0 }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '16px', height: '16px' }}
                  >
                    <path d="M12 2v20" />
                    <path d="M5 4c0 4.5 3.2 7.5 7 7.5s7-3 7-7.5" />
                    <circle cx="12" cy="2" r="1.2" fill="currentColor" />
                    <circle cx="5" cy="4" r="1" fill="currentColor" />
                    <circle cx="19" cy="4" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                    TRISHUL STUDIO
                  </div>
                  <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-dot)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                    CUSTOMER WORKSPACE
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {/* Inline Minimize Navigation Button */}
                <button
                  type="button"
                  className="btn-glass btn-glass-sm sidebar-collapse-btn"
                  onClick={handleToggleMinimize}
                  title="Minimize Navigation (Compact Rail)"
                  aria-label="Minimize Navigation"
                  style={{ width: '32px', height: '32px', padding: 0 }}
                >
                  <PanelLeftClose size={15} />
                </button>

                {/* Mobile close button */}
                <button
                  type="button"
                  className="mobile-sidebar-close"
                  onClick={() => setSidebarOpen(false)}
                  style={{ display: 'none', color: 'var(--text-secondary)' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
              <div className="brand-emblem" style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '16px', height: '16px' }}
                >
                  <path d="M12 2v20" />
                  <path d="M5 4c0 4.5 3.2 7.5 7 7.5s7-3 7-7.5" />
                  <circle cx="12" cy="2" r="1.2" fill="currentColor" />
                  <circle cx="5" cy="4" r="1" fill="currentColor" />
                  <circle cx="19" cy="4" r="1" fill="currentColor" />
                </svg>
              </div>

              {/* Inline Expand Navigation Button */}
              <button
                type="button"
                className="btn-glass btn-glass-sm sidebar-collapse-btn"
                onClick={handleToggleMinimize}
                title="Expand Navigation (Show Labels)"
                aria-label="Expand Navigation"
                style={{ width: '36px', height: '36px', padding: 0, color: 'var(--accent-dot)' }}
              >
                <PanelLeftOpen size={16} />
              </button>
            </div>
          )}

          {/* Current Organization Card Pill */}
          {!isMinimized ? (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '16px',
                background: 'var(--glass-nested-bg)',
                border: 'var(--glass-nested-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '22px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                  border: '1px solid rgba(255,255,255,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)',
                  flexShrink: 0,
                }}
              >
                {orgName.charAt(0).toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {orgName}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                  {contactName}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '22px',
              }}
              title={`${orgName} • ${contactName}`}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                  border: '1px solid rgba(255,255,255,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  cursor: 'default',
                }}
              >
                {orgName.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          {/* 8-Item Side Navigation Links */}
          <nav aria-label="Customer Workspace Navigation">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      title={item.label}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMinimized ? 'center' : 'flex-start',
                        gap: isMinimized ? 0 : '12px',
                        padding: isMinimized ? '11px 0' : '10px 14px',
                        borderRadius: '14px',
                        background: isActive ? 'var(--pill-active-bg)' : 'transparent',
                        border: isActive ? 'var(--pill-active-border)' : '1px solid transparent',
                        boxShadow: isActive ? '0 0 16px var(--accent-glow)' : 'none',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.84375rem',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: isMinimized ? 'center' : 'left',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <IconComponent
                        size={18}
                        style={{ color: isActive ? 'var(--accent-dot)' : 'var(--text-tertiary)', flexShrink: 0 }}
                      />
                      {!isMinimized && (
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.label}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        {!isMinimized ? (
          <div style={{ borderTop: 'var(--glass-nested-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn-glass btn-glass-sm"
                onClick={onBackToStudio}
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.75rem' }}
              >
                <span>Studio Home</span>
              </button>

              <button
                type="button"
                className="theme-toggle-btn"
                onClick={onToggleTheme}
                style={{ width: '36px', height: '36px' }}
                title="Switch Theme"
              >
                {theme === 'light' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>

            <button
              type="button"
              className="btn-glass btn-glass-sm"
              onClick={onLogout}
              style={{ width: '100%', padding: '8px 10px', fontSize: '0.75rem', color: 'rgba(239, 68, 68, 0.9)' }}
            >
              <LogOut size={13} />
              <span>Sign Out Workspace</span>
            </button>
          </div>
        ) : (
          <div style={{ borderTop: 'var(--glass-nested-border)', paddingTop: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              className="btn-glass btn-glass-sm"
              onClick={onBackToStudio}
              title="Studio Home"
              style={{ width: '38px', height: '38px', padding: 0 }}
            >
              <Compass size={17} />
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              style={{ width: '38px', height: '38px' }}
              title="Switch Theme"
            >
              {theme === 'light' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              type="button"
              className="btn-glass btn-glass-sm"
              onClick={onLogout}
              title="Sign Out Workspace"
              style={{ width: '38px', height: '38px', padding: 0, color: 'rgba(239, 68, 68, 0.9)' }}
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </aside>

      {/* =========================================================================
          MAIN WORKSPACE CONTENT CANVAS
          ========================================================================= */}
      <main
        style={{
          flex: 1,
          padding: '28px 36px 60px',
          maxWidth: '1280px',
          minWidth: 0,
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Mobile hamburger button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              style={{ display: 'none' }}
              aria-label="Open Sidebar"
            >
              <Menu size={20} />
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="glass-pill" style={{ padding: '3px 10px', fontSize: '0.71875rem' }}>
                  <span className="status-dot" style={{ width: '6px', height: '6px' }} />
                  <span>Sprint 03 Active • Staging Live</span>
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  Ref: TS-2026-4410
                </span>
              </div>
            </div>
          </div>

          {/* Quick Founder Contact & Staging Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="https://wa.me/919845012389?text=Hello%20Vikramaditya%20and%20Arunima%2C%20checking%20in%20from%20our%20Trishul%20Client%20Workspace"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass btn-glass-sm"
              style={{ gap: '6px' }}
            >
              <Phone size={13} style={{ color: 'var(--accent-dot)' }} />
              <span>Founder WhatsApp Hotline</span>
            </a>
          </div>
        </div>

        {/* =======================================================================
            TAB 1: OVERVIEW (EXACT USER SPECIFICATION)
            ======================================================================= */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            {/* HERO WELCOME SECTION MATCHING USER'S EXACT COPY */}
            <div
              className="glass-panel glass-spotlight"
              style={{
                padding: '44px 40px',
                borderRadius: '30px',
                marginBottom: '32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="glass-pill section-tag" style={{ marginBottom: '14px' }}>
                <span>YOUR WORKSPACE</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '10px',
                }}
              >
                Welcome to your studio.
              </h1>

              <p
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '14px',
                }}
              >
                Your ideas, your requirements, your website. Let's bring it to life.
              </p>

              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '18px',
                  background: 'var(--glass-nested-bg)',
                  border: 'var(--glass-nested-border)',
                  maxWidth: '780px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  What would you like to build?
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Choose the approach that works best for you. We'll guide you through the rest.
                </div>
              </div>
            </div>

            {/* THE 4 ACTION / CHOICE CARDS SPECIFIED BY USER */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '36px',
              }}
            >
              {/* Card 1: Let the Studio Decide */}
              <motion.div
                className="glass-panel glass-spotlight"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
                onClick={() => setActiveTab('start-project')}
                style={{
                  padding: '28px 24px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.75)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '16px',
                      background: 'var(--btn-glass-bg)',
                      border: 'var(--btn-glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      color: 'var(--accent-dot)',
                    }}
                  >
                    <Sparkles size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    Let the Studio Decide
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    Tell us your goals. Our team will guide you.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-dot)' }}>
                  <span>Get Guided Recommendation</span>
                  <ChevronRight size={15} />
                </div>
              </motion.div>

              {/* Card 2: Customize My Website */}
              <motion.div
                className="glass-panel glass-spotlight"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
                onClick={() => setActiveTab('start-project')}
                style={{
                  padding: '28px 24px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.75)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '16px',
                      background: 'var(--btn-glass-bg)',
                      border: 'var(--btn-glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      color: 'var(--accent-dot)',
                    }}
                  >
                    <Compass size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    Customize My Website
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    Choose your features, design, and requirements.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-dot)' }}>
                  <span>Open Interactive Configurator</span>
                  <ChevronRight size={15} />
                </div>
              </motion.div>

              {/* Card 3: My Quotations */}
              <motion.div
                className="glass-panel glass-spotlight"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
                onClick={() => setActiveTab('quotations')}
                style={{
                  padding: '28px 24px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.75)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '16px',
                      background: 'var(--btn-glass-bg)',
                      border: 'var(--btn-glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      color: 'var(--accent-dot)',
                    }}
                  >
                    <FileSpreadsheet size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    My Quotations
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    Review estimates and proposals
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-dot)' }}>
                  <span>Review Active Proposals (1)</span>
                  <ChevronRight size={15} />
                </div>
              </motion.div>

              {/* Card 4: My Projects */}
              <motion.div
                className="glass-panel glass-spotlight"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
                onClick={() => setActiveTab('projects')}
                style={{
                  padding: '28px 24px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.75)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '16px',
                      background: 'var(--btn-glass-bg)',
                      border: 'var(--btn-glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      color: 'var(--accent-dot)',
                    }}
                  >
                    <FolderKanban size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    My Projects
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    Track existing projects
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-dot)' }}>
                  <span>Sprint 03 in Progress</span>
                  <ChevronRight size={15} />
                </div>
              </motion.div>
            </div>

            {/* ACTIVE PROJECT & RECENT ACTIVITY SNAPSHOT */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
              {/* Project Snapshot Card */}
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Active Project: {orgName}
                  </h3>
                  <span className="glass-pill" style={{ fontSize: '0.75rem', color: 'var(--accent-dot)' }}>
                    75% Complete
                  </span>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Staging URL:{' '}
                  <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-dot)', background: 'var(--btn-glass-bg)', padding: '2px 8px', borderRadius: '6px' }}>
                    staging.vidyamandir.trishulstudio.com
                  </code>
                </p>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.2)', overflow: 'hidden', marginBottom: '14px' }}>
                  <div style={{ width: '75%', height: '100%', borderRadius: '9999px', background: 'var(--accent-dot)', boxShadow: '0 0 12px var(--accent-dot)' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '20px' }}>
                  <span>Sprint 1: Schema (Done)</span>
                  <span>Sprint 2: Fee Engine (Done)</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Sprint 3: QA (Live)</span>
                  <span>Sprint 4: Launch</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn-glass btn-glass-sm" onClick={() => setActiveTab('projects')}>
                    <span>Open Live Staging Simulator</span>
                    <ExternalLink size={13} />
                  </button>
                  <button type="button" className="btn-glass btn-glass-sm" onClick={() => setActiveTab('payments')}>
                    <span>Check Escrow Ledger</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>
                  Recent Studio Activity
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-dot)', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Sprint 2 Delivered &amp; Verified
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Razorpay UPI automated reconciliation module passed staging tests.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-dot)', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Milestone 1 Advance Confirmed
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Receipt #TS-INV-4410 (₹29,700) archived in Payments.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Sprint 3 Active in Staging
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Lead founders testing multi-device responsiveness and parent auth.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            TAB 2: START A PROJECT (LAUNCHPAD)
            ======================================================================= */}
        {activeTab === 'start-project' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px', marginBottom: '28px' }}>
              <div className="glass-pill section-tag" style={{ marginBottom: '10px' }}>
                <span>Sprint Launchpad</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Start a New Website Project
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '680px', marginBottom: '28px' }}>
                Whether you need a full school portal, luxury resort booking engine, or bespoke web app, select your preferred collaboration mode below.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div
                  style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: 'var(--glass-nested-bg)',
                    border: 'var(--glass-nested-border)',
                  }}
                >
                  <Sparkles size={24} style={{ color: 'var(--accent-dot)', marginBottom: '12px' }} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Option A: Let the Studio Decide
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                    Schedule a 20-minute direct architectural intake call with our lead founders Vikramaditya and Arunima. We will evaluate your requirements and draft a turn-key blueprint with zero guesswork.
                  </p>
                  <a
                    href="https://wa.me/919845012389?text=Hello%20Trishul%20Founders%2C%20we%20want%20to%20schedule%20an%20architectural%20intake%20call%20for%20our%20new%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass btn-glass-sm"
                  >
                    <Phone size={14} />
                    <span>Schedule Founder Consultation</span>
                  </a>
                </div>

                <div
                  style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: 'var(--glass-nested-bg)',
                    border: 'var(--glass-nested-border)',
                  }}
                >
                  <Compass size={24} style={{ color: 'var(--accent-dot)', marginBottom: '12px' }} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Option B: Customize Your Website
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                    Handpick your industry base, design system, backend engines, and smart AI add-ons. Calculate your exact rupee investment with 30% advance deposit terms and instant timeline estimates.
                  </p>
                  <button
                    type="button"
                    className="btn-glass btn-glass-sm"
                    onClick={() => {
                      onBackToStudio();
                      setTimeout(() => {
                        const el = document.getElementById('services');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }}
                  >
                    <span>Browse Studio Presets &amp; Pricing</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            TAB 3: MY REQUESTS & QUOTATIONS
            ======================================================================= */}
        {activeTab === 'quotations' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    My Requests &amp; Quotations
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Itemized scope estimates and locked milestone proposals.
                  </p>
                </div>

                <button type="button" className="btn-glass btn-glass-sm" onClick={handleCopyQuote}>
                  {copiedQuote ? <Check size={14} style={{ color: 'var(--accent-dot)' }} /> : <Copy size={14} />}
                  <span>{copiedQuote ? 'Copied Specs' : 'Copy Quote JSON'}</span>
                </button>
              </div>

              {/* Quotation Item Card */}
              <div
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'var(--glass-nested-bg)',
                  border: 'var(--glass-nested-border)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span className="glass-pill" style={{ fontSize: '0.75rem', color: 'var(--accent-dot)' }}>
                        Status: Locked &amp; In Production
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                        Ref #TS-2026-4410
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Full Campus Transformation Engine ({orgName})
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹99,000
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-dot)', fontWeight: 600 }}>
                      30% Advance (₹29,700) Paid
                    </div>
                  </div>
                </div>

                {/* Scope Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--btn-glass-bg)', border: 'var(--btn-glass-border)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Core Platform</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>School &amp; Institute Portal</div>
                  </div>
                  <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--btn-glass-bg)', border: 'var(--btn-glass-border)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Design Aesthetic</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Liquid Glass visionOS</div>
                  </div>
                  <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--btn-glass-bg)', border: 'var(--btn-glass-border)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Backend Engine</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Razorpay UPI Portal</div>
                  </div>
                  <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--btn-glass-bg)', border: 'var(--btn-glass-border)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Estimated Delivery</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>14–16 Business Days</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn-glass btn-glass-sm" onClick={() => setActiveTab('payments')}>
                    <span>View Financial Milestone Breakdown</span>
                  </button>
                  <button type="button" className="btn-glass btn-glass-sm" onClick={() => setActiveTab('projects')}>
                    <span>Track Live Sprint</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            TAB 4: MY PROJECTS & STAGING SIMULATOR
            ======================================================================= */}
        {activeTab === 'projects' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Project Sprint Roadmap: {orgName}
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Handcrafted production milestones managed directly by lead software founders.
                  </p>
                </div>

                {/* Device switch buttons */}
                <div style={{ display: 'flex', gap: '6px', background: 'var(--glass-nested-bg)', padding: '4px', borderRadius: '14px', border: 'var(--glass-nested-border)' }}>
                  <button
                    type="button"
                    onClick={() => setDevicePreview('desktop')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      background: devicePreview === 'desktop' ? 'var(--pill-active-bg)' : 'transparent',
                      color: devicePreview === 'desktop' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    <Monitor size={14} />
                    <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevicePreview('tablet')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      background: devicePreview === 'tablet' ? 'var(--pill-active-bg)' : 'transparent',
                      color: devicePreview === 'tablet' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    <Tablet size={14} />
                    <span>Tablet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevicePreview('mobile')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      background: devicePreview === 'mobile' ? 'var(--pill-active-bg)' : 'transparent',
                      color: devicePreview === 'mobile' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    <Smartphone size={14} />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Multi-Device Staging Frame Simulator */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '24px',
                  background: 'var(--glass-nested-bg)',
                  border: 'var(--glass-nested-border)',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    https://staging.vidyamandir.trishulstudio.com
                  </div>
                  <span className="glass-pill" style={{ fontSize: '0.6875rem', padding: '2px 8px' }}>
                    60fps Sandbox
                  </span>
                </div>

                <div
                  style={{
                    width: devicePreview === 'desktop' ? '100%' : devicePreview === 'tablet' ? '760px' : '380px',
                    maxWidth: '100%',
                    height: '340px',
                    borderRadius: '18px',
                    background: 'var(--glass-card-bg)',
                    border: 'var(--glass-card-border)',
                    boxShadow: 'var(--glass-card-shadow)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                        {orgName} Digital Campus
                      </span>
                      <span className="glass-pill" style={{ fontSize: '0.6875rem', color: 'var(--accent-dot)' }}>
                        Parent Portal v2.3
                      </span>
                    </div>

                    <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--btn-glass-bg)', border: 'var(--btn-glass-border)', marginBottom: '14px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        Live Razorpay UPI Reconciliation Sandbox
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-dot)' }}>
                        Std X Admissions: 94 Enrolled Today
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    <span>Staging Build: 2026.10-RC3</span>
                    <span>Zero Console Errors (Lighthouse 100/100)</span>
                  </div>
                </div>
              </div>

              {/* 4 Sprint Milestone Roadmap */}
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Sprint Verification Breakdown
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-dot)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                    <CheckCircle2 size={16} />
                    <span>Sprint 1: Architecture</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Wireframes, CBSE schema &amp; database design approved.
                  </div>
                </div>

                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-dot)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                    <CheckCircle2 size={16} />
                    <span>Sprint 2: Fee Engine</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Admissions pipeline &amp; UPI gateway tested in staging.
                  </div>
                </div>

                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--pill-active-bg)', border: '1px solid var(--accent-dot)', boxShadow: '0 0 14px var(--accent-glow)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                    <Clock size={16} style={{ color: 'var(--accent-dot)' }} />
                    <span>Sprint 3: QA (Active)</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Staff portal testing, push circulars, and final client review.
                  </div>
                </div>

                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', opacity: 0.65 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                    <span>Sprint 4: Launch</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    DNS cutover, SSL issuance, and 70% balance release.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            TAB 5: PAYMENTS & INVOICES (30% ADVANCE & 70% ESCROW)
            ======================================================================= */}
        {activeTab === 'payments' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Financial &amp; Escrow Ledger
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Guaranteed milestone model: 30% advance deposit to begin, 70% final balance paid ONLY on production sign-off.
                  </p>
                </div>
              </div>

              {/* Escrow Status Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                {/* Milestone 1: Paid */}
                <div style={{ padding: '24px', borderRadius: '20px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Milestone 1 (30% Advance Deposit)</span>
                    <span className="glass-pill" style={{ color: 'var(--accent-dot)', fontSize: '0.71875rem' }}>
                      PAID ✓
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    ₹29,700
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                    Receipt #TS-INV-4410 • Settled via Bank Wire / UPI
                  </div>
                  <button
                    type="button"
                    className="btn-glass btn-glass-sm"
                    onClick={() => setShowReceiptModal(true)}
                  >
                    <Download size={13} />
                    <span>View &amp; Print Official Receipt</span>
                  </button>
                </div>

                {/* Milestone 2: Escrow Pending */}
                <div style={{ padding: '24px', borderRadius: '20px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Milestone 2 (70% Final Launch Balance)</span>
                    <span className="glass-pill" style={{ fontSize: '0.71875rem' }}>
                      IN ESCROW GUARANTEE
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    ₹69,300
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                    Due on Sprint 4 sign-off prior to production DNS cutover.
                  </div>
                  <button
                    type="button"
                    className="btn-glass btn-glass-sm"
                    onClick={() => {
                      if (onShowToast) onShowToast('Escrow balance locked until your final QA sign-off!');
                    }}
                  >
                    <ShieldCheck size={13} style={{ color: 'var(--accent-dot)' }} />
                    <span>Inspect Escrow Protection Terms</span>
                  </button>
                </div>
              </div>

              {/* Tax Invoice Receipt Modal */}
              <AnimatePresence>
                {showReceiptModal && (
                  <div className="modal-overlay active" onClick={() => setShowReceiptModal(false)}>
                    <motion.div
                      className="modal-glass-container"
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      style={{ maxWidth: '580px', padding: '32px' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                            TAX INVOICE RECEIPT
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-dot)' }}>
                            #TS-INV-4410
                          </div>
                        </div>
                        <button type="button" onClick={() => setShowReceiptModal(false)} style={{ color: 'var(--text-secondary)' }}>
                          <X size={18} />
                        </button>
                      </div>

                      <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', marginBottom: '18px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--text-tertiary)' }}>Issued To:</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{orgName}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--text-tertiary)' }}>Issued By:</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Trishul Studio LLP</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--text-tertiary)' }}>Milestone Item:</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>30% Sprint Reservation Deposit</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', paddingTop: '10px', borderTop: 'var(--glass-nested-border)' }}>
                          <span>Total Amount Paid:</span>
                          <span style={{ color: 'var(--accent-dot)' }}>₹29,700</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-glass btn-glass-lg"
                        style={{ width: '100%' }}
                        onClick={() => {
                          window.print();
                        }}
                      >
                        <Download size={16} />
                        <span>Print Official PDF Receipt</span>
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            TAB 6: FILES & DELIVERABLES (ASSET VAULT)
            ======================================================================= */}
        {activeTab === 'files' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Project Asset &amp; Brand Vault
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Upload vector brand logos, prospectus PDFs, staff spreadsheets, and color palettes.
                  </p>
                </div>

                <label className="btn-glass btn-glass-sm" style={{ cursor: 'pointer' }}>
                  <Upload size={14} />
                  <span>Upload Asset</span>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files?.length > 0) {
                        if (onShowToast) onShowToast(`Uploaded ${e.target.files[0].name} into encrypted studio vault!`);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Uploaded Assets List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '16px 20px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <FileText size={20} style={{ color: 'var(--accent-dot)' }} />
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        vidya_mandir_vector_crest.svg
                      </div>
                      <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)' }}>
                        2.4 MB • High-Res Brand Emblem • Verified by Arunima
                      </div>
                    </div>
                  </div>
                  <span className="glass-pill" style={{ color: 'var(--accent-dot)', fontSize: '0.71875rem' }}>
                    Active in Staging
                  </span>
                </div>

                <div style={{ padding: '16px 20px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <FileSpreadsheet size={20} style={{ color: 'var(--accent-dot)' }} />
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        cbse_fee_structure_2026_27.xlsx
                      </div>
                      <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)' }}>
                        1.1 MB • Tuition &amp; Bus Fee Matrix • Synced with Razorpay Gateway
                      </div>
                    </div>
                  </div>
                  <span className="glass-pill" style={{ color: 'var(--accent-dot)', fontSize: '0.71875rem' }}>
                    Reconciled
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            TAB 7: MESSAGES & REVISIONS (FOUNDER HOTLINE)
            ======================================================================= */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Messages &amp; Direct Founder Channel
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  You communicate directly with senior software architects Vikramaditya and Arunima with zero junior account managers.
                </p>
              </div>

              {/* Founder Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                <div style={{ padding: '20px', borderRadius: '18px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="brand-emblem" style={{ width: '44px', height: '44px', fontWeight: 800 }}>
                    VK
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Vikramaditya K.
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      Lead Systems Architect • Performance &amp; Gateways
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '18px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="brand-emblem" style={{ width: '44px', height: '44px', fontWeight: 800 }}>
                    AR
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Arunima Roy
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      Head of Product Design • Liquid Glass &amp; visionOS UI
                    </div>
                  </div>
                </div>
              </div>

              {/* Revision Submission Form */}
              <form onSubmit={handleSendRevision} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Submit Staging Revision or Requirement Note:
                </label>
                <textarea
                  className="glass-input"
                  rows={4}
                  required
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="Specify any design tweak, fee structure modification, or content change for Sprint 3..."
                  style={{ width: '100%', resize: 'vertical', lineHeight: 1.6 }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <a
                    href="https://wa.me/919845012389?text=Hi%20Vikramaditya%20and%20Arunima%2C%20sending%20a%20priority%20revision%20note%20from%20our%20Trishul%20Workspace."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass btn-glass-sm"
                  >
                    <Phone size={14} style={{ color: 'var(--accent-dot)' }} />
                    <span>Ping Founders on WhatsApp</span>
                  </a>

                  <button type="submit" className="btn-glass btn-glass-lg">
                    <Send size={15} />
                    <span>{revisionSubmitted ? 'Note Dispatched ✓' : 'Dispatch Revision Note'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            TAB 8: PROFILE & ORGANIZATION
            ======================================================================= */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Profile &amp; Organization Details
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Your business metadata configured during onboarding.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Organization Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{orgName}</div>
                </div>

                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Industry Classification</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                    {userIndustry} &amp; Institute
                  </div>
                </div>

                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Primary Contact Leader</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{contactName}</div>
                </div>

                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Contact Hotline / WhatsApp</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {userSession?.phone || '+91 98450 12389'}
                  </div>
                </div>

                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Headquarters / City</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {userSession?.city || 'Bangalore, Karnataka'}
                  </div>
                </div>

                <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--glass-nested-bg)', border: 'var(--glass-nested-border)' }}>
                  <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Existing Website</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-dot)' }}>
                    {userSession?.websiteUrl || 'https://vidyamandir.edu.in'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
