import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, LogIn, Menu, X } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, onOpenLogin, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Strictly 4 navigation links requested by user
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="nav-wrapper" role="banner">
      <div className="nav-islands-container">
        
        {/* Island 1: Standalone Separated Brand Logo Pill */}
        <a
          href="#hero"
          className="nav-brand-pill"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          aria-label="Trishul Studio Home"
        >
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
              <circle cx="12" cy="2" r="1.2" fill="currentColor" />
              <circle cx="5" cy="4" r="1" fill="currentColor" />
              <circle cx="19" cy="4" r="1" fill="currentColor" />
            </svg>
          </div>
          <span>Trishul Studio</span>
        </a>

        {/* Island 2: Standalone Center Navigation Menu Pill (Only 4 links: Home, Services, About, Contact) */}
        <nav aria-label="Primary Navigation">
          <ul className="nav-menu-pill" role="menubar">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item" role="none">
                  <button
                    type="button"
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    role="menuitem"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="liquidGlassDroplet"
                        className="liquid-glass-droplet"
                        transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.7 }}
                      />
                    )}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Island 3: Standalone Right Actions Pill (Theme Switcher + Pure Glass Login Button) */}
        <div className="nav-actions-pill">
          {/* Dual Theme Switcher (Frosted Pearl / Cyber Emerald) */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle Pearl/Emerald Theme"
            title={`Switch to ${theme === 'light' ? 'Cyber Emerald' : 'Frosted Pearl'}`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {theme === 'light' ? <Sun size={17} /> : <Moon size={17} />}
            </motion.div>
          </button>

          {/* Pure Colourless Liquid Crystal Login Button */}
          <button
            type="button"
            className="btn-glass btn-glass-sm"
            onClick={onOpenLogin}
            aria-label="Client Login"
          >
            <LogIn size={14} />
            <span>Login</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Only shown when hamburger clicked on small screens) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '20px',
              right: '20px',
              borderRadius: '24px',
              background: 'var(--glass-card-bg)',
              backdropFilter: 'blur(40px)',
              border: 'var(--glass-card-border)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: 'var(--glass-card-shadow)',
              pointerEvents: 'auto',
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                style={{ textAlign: 'left', padding: '12px 18px', fontSize: '1rem' }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
