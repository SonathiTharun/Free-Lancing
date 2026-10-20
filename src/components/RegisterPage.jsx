import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Layers,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Sparkles,
  AlertCircle,
  Sun,
  Moon,
  CheckCircle2,
} from 'lucide-react';
import CuteMascotCanvas from './Mascot3D/CuteMascotCanvas';

export default function RegisterPage({
  theme,
  onToggleTheme,
  onBackToStudio,
  onRegisterSuccess,
  onNavigateToLogin,
  onShowToast,
}) {
  const [orgName, setOrgName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('school');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [mascotState, setMascotState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [character, setCharacter] = useState('astro_bot');

  const characterNames = {
    astro_bot: 'Astro Bot',
    kitty: 'Cyber Kitty',
    panda: 'Cyber Panda',
    pup: 'Cyber Pup',
  };

  const currentSpeech = (() => {
    const charName = characterNames[character] || 'Mascot';
    switch (mascotState) {
      case 'typing_org':
      case 'typing_name':
        return {
          emoji: '🙈',
          text:
            character === 'astro_bot'
              ? "Sensors deflected! I'm looking away at the ceiling while you register your Organization & Name!"
              : character === 'panda'
              ? "Looking away at the bamboo trees while you enter your details!"
              : character === 'kitty'
              ? "Distracted by a laser pointer! Giving you privacy while you enter your details!"
              : "Looking away whistling while you enter your Organization details!",
        };
      case 'typing_email':
        return {
          emoji: '📬',
          text: `${charName} recording your primary notification channel for live staging milestones!`,
        };
      case 'typing_password':
        return {
          emoji: '👀',
          text:
            character === 'astro_bot'
              ? "Target lock engaged: Staring intently directly at the screen while you set your master passkey!"
              : `${charName} laser lock: Staring directly at the screen while you create your passkey!`,
        };
      case 'curious':
        return {
          emoji: '🤔',
          text: `Provisioning your dedicated client console & encrypted escrow vault on Trishul servers...`,
        };
      case 'happy':
        return {
          emoji: '🎉',
          text: `Workspace Created! Welcome to the Trishul Studio Client Network!`,
        };
      case 'sad':
        return {
          emoji: '🥺',
          text: `Registration Issue! Please check your credentials and try again.`,
        };
      case 'idle':
      default:
        return {
          emoji:
            character === 'astro_bot'
              ? '🤖'
              : character === 'panda'
              ? '🐼'
              : character === 'pup'
              ? '🐶'
              : '🐱',
          text: `${charName} online. Ready to configure your high-performance project workspace!`,
        };
    }
  })();

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);

    // Basic validation
    if (!orgName.trim() || !fullName.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all required fields to register your workspace.');
      setMascotState('sad');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid official work email address.');
      setMascotState('sad');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Passkey must be at least 6 characters long for cryptographic security.');
      setMascotState('sad');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passkeys do not match. Please verify and re-enter your passkey.');
      setMascotState('sad');
      return;
    }

    setIsSubmitting(true);
    setMascotState('curious');

    // Simulate authentic server provisioning
    setTimeout(() => {
      setMascotState('happy');
      setIsSubmitting(false);
      if (onShowToast) onShowToast(`Workspace for "${orgName}" created successfully!`);
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess({ orgName, fullName, email, serviceType });
        }
      }, 1500);
    }, 1000);
  };

  // 1-Click Fast Demo Registration
  const handleQuickDemoRegister = () => {
    setOrgName('Vidya Mandir Academy');
    setFullName('Dr. Rajesh Sharma');
    setEmail('director@vidyamandir.edu.in');
    setServiceType('school');
    setPassword('TS-SPRINT-2026');
    setConfirmPassword('TS-SPRINT-2026');
    setErrorMessage(null);
    setIsSubmitting(true);
    setMascotState('curious');

    setTimeout(() => {
      setMascotState('happy');
      setIsSubmitting(false);
      if (onShowToast) onShowToast('Demo Workspace Created! Accessing Vidya Mandir Console');
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess({
            orgName: 'Vidya Mandir Academy',
            fullName: 'Dr. Rajesh Sharma',
            email: 'director@vidyamandir.edu.in',
            serviceType: 'school',
          });
        }
      }, 1400);
    }, 900);
  };

  // 1-Click Error Simulator (Triggers Password Mismatch)
  const handleSimulateMismatch = () => {
    setOrgName('Heritage Chalet & Resort');
    setFullName('Vikram Singhania');
    setEmail('stay@heritagechalet.com');
    setServiceType('hotel');
    setPassword('PASSPHRASE-ALPHA');
    setConfirmPassword('PASSPHRASE-BETA');
    setErrorMessage(null);
    setIsSubmitting(true);
    setMascotState('curious');

    setTimeout(() => {
      setMascotState('sad');
      setIsSubmitting(false);
      setErrorMessage('Validation Failed: Confirmation passkey does not match master passkey.');
    }, 800);
  };

  return (
    <div className="login-fullpage-wrapper">
      {/* Top Floating Glass Island Bar */}
      <header className="login-top-bar">
        <button
          type="button"
          className="btn-glass btn-glass-sm login-back-btn"
          onClick={onBackToStudio}
          id="btn-back-to-studio"
        >
          <ArrowLeft size={16} />
          <span>Back to Trishul Studio</span>
        </button>

        <div className="login-brand-tag">
          <div className="brand-emblem" style={{ width: '28px', height: '28px' }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '15px', height: '15px' }}
            >
              <path d="M12 2v20" />
              <path d="M5 4c0 4.5 3.2 7.5 7 7.5s7-3 7-7.5" />
              <circle cx="12" cy="2" r="1.2" fill="currentColor" />
              <circle cx="5" cy="4" r="1" fill="currentColor" />
              <circle cx="19" cy="4" r="1" fill="currentColor" />
            </svg>
          </div>
          <span>Trishul Studio Onboarding</span>
        </div>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'light' ? 'Cyber Emerald' : 'Frosted Pearl'}`}
        >
          {theme === 'light' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </header>

      {/* Main Center Stage */}
      <main className="login-main-stage">
        <motion.div
          className="glass-panel login-stage-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', damping: 25 }}
        >
          {/* Left Column: Interactive 3D Mascot Character Stage */}
          <div className="mascot-stage-column">
            {/* Reactive Floating Thought/Speech Bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${character}-${mascotState}`}
                className="mascot-speech-bubble"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.25, type: 'spring', damping: 20 }}
              >
                <span className="speech-emoji">{currentSpeech.emoji}</span>
                <span className="speech-text">{currentSpeech.text}</span>
              </motion.div>
            </AnimatePresence>

            {/* Three.js 3D WebGL Canvas */}
            <div className="mascot-3d-viewport">
              <CuteMascotCanvas
                mascotState={
                  mascotState === 'typing_org' ||
                  mascotState === 'typing_name' ||
                  mascotState === 'typing_email'
                    ? 'typing_username'
                    : mascotState
                }
                character={character}
                caretPosition={orgName.length + fullName.length}
                theme={theme}
              />
              <div className="mascot-crystal-pedestal" />
            </div>

            {/* Mascot Character Switcher Pill */}
            <div className="mascot-selector-row">
              <button
                type="button"
                className={`mascot-select-chip ${character === 'astro_bot' ? 'active' : ''}`}
                onClick={() => setCharacter('astro_bot')}
                title="Astro Bot (visionOS Cyber Drone)"
              >
                <span>🤖 Astro Bot</span>
              </button>
              <button
                type="button"
                className={`mascot-select-chip ${character === 'kitty' ? 'active' : ''}`}
                onClick={() => setCharacter('kitty')}
                title="Cyber Kitty"
              >
                <span>🐱 Kitty</span>
              </button>
              <button
                type="button"
                className={`mascot-select-chip ${character === 'panda' ? 'active' : ''}`}
                onClick={() => setCharacter('panda')}
                title="Cyber Panda"
              >
                <span>🐼 Panda</span>
              </button>
              <button
                type="button"
                className={`mascot-select-chip ${character === 'pup' ? 'active' : ''}`}
                onClick={() => setCharacter('pup')}
                title="Cyber Pup"
              >
                <span>🐶 Pup</span>
              </button>
            </div>

            {/* Mascot State Hint Pill */}
            <div className="mascot-status-pill">
              <span
                className="status-dot"
                style={{
                  background:
                    mascotState === 'happy'
                      ? '#10B981'
                      : mascotState === 'sad'
                      ? '#EF4444'
                      : mascotState === 'curious'
                      ? '#F59E0B'
                      : mascotState.startsWith('typing')
                      ? '#8B5CF6'
                      : '#0284C7',
                }}
              />
              <span>
                {mascotState === 'idle' && `${characterNames[character]}: Ready to assist your setup`}
                {mascotState === 'typing_org' && `${characterNames[character]}: Looking Away Whistling 🙈`}
                {mascotState === 'typing_name' && `${characterNames[character]}: Giving privacy for credentials 🙈`}
                {mascotState === 'typing_email' && `${characterNames[character]}: Logging notification channel 📬`}
                {mascotState === 'typing_password' && `${characterNames[character]}: Staring Intently at Screen 👀`}
                {mascotState === 'curious' && `${characterNames[character]}: Provisioning Workspace 🤔`}
                {mascotState === 'happy' && `${characterNames[character]}: Workspace Activated! 🎉`}
                {mascotState === 'sad' && `${characterNames[character]}: Sympathetic Pout 🥺`}
              </span>
            </div>
          </div>

          {/* Right Column: VisionOS Crystal Glass Register Form */}
          <div className="login-form-column">
            <div className="login-form-header">
              <div
                className="glass-pill"
                style={{ padding: '4px 12px', fontSize: '0.75rem', marginBottom: '8px' }}
              >
                <span className="status-dot" />
                <span>Protected Client Onboarding</span>
              </div>
              <h1 className="login-form-title">Register Project Workspace</h1>
              <p className="login-form-subtitle">
                Set up your project repository, staging deployment server, and escrow tracker with Trishul Studio.
              </p>
            </div>

            {errorMessage && (
              <motion.div
                className="login-error-banner"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <form onSubmit={handleFormSubmit} className="login-inputs-form">
              {/* Field 1: Organization / Institute Name */}
              <div className="input-group">
                <label className="input-label" htmlFor="register-org">
                  Organization / Institute Name
                </label>
                <div className="input-field-wrap">
                  <Building2 size={16} className="input-icon" />
                  <input
                    id="register-org"
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => {
                      setOrgName(e.target.value);
                      setMascotState('typing_org');
                      setErrorMessage(null);
                    }}
                    onFocus={() => {
                      setMascotState('typing_org');
                      setErrorMessage(null);
                    }}
                    onBlur={() => {
                      if (mascotState === 'typing_org') setMascotState('idle');
                    }}
                    placeholder="e.g. Vidya Mandir Academy or Chalet Hotel"
                    className="glass-input with-icon"
                    autoComplete="organization"
                  />
                </div>
              </div>

              {/* Field 2: Founder / Contact Person Name */}
              <div className="input-group">
                <label className="input-label" htmlFor="register-name">
                  Lead Contact / Founder Name
                </label>
                <div className="input-field-wrap">
                  <User size={16} className="input-icon" />
                  <input
                    id="register-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setMascotState('typing_name');
                      setErrorMessage(null);
                    }}
                    onFocus={() => {
                      setMascotState('typing_name');
                      setErrorMessage(null);
                    }}
                    onBlur={() => {
                      if (mascotState === 'typing_name') setMascotState('idle');
                    }}
                    placeholder="e.g. Rajesh Sharma"
                    className="glass-input with-icon"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Field 3: Work Email */}
              <div className="input-group">
                <label className="input-label" htmlFor="register-email">
                  Official Work Email
                </label>
                <div className="input-field-wrap">
                  <Mail size={16} className="input-icon" />
                  <input
                    id="register-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMascotState('typing_email');
                      setErrorMessage(null);
                    }}
                    onFocus={() => {
                      setMascotState('typing_email');
                      setErrorMessage(null);
                    }}
                    onBlur={() => {
                      if (mascotState === 'typing_email') setMascotState('idle');
                    }}
                    placeholder="name@organization.com"
                    className="glass-input with-icon"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Field 4: Project Domain / Scope */}
              <div className="input-group">
                <label className="input-label" htmlFor="register-service">
                  Project Domain / Engine
                </label>
                <div className="input-field-wrap">
                  <Layers size={16} className="input-icon" />
                  <select
                    id="register-service"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="glass-select with-icon"
                    style={{ width: '100%', paddingLeft: '40px' }}
                  >
                    <option value="school">School &amp; Institute Portal (CBSE/ICSE)</option>
                    <option value="hotel">Hotel &amp; Hospitality Booking Engine</option>
                    <option value="business">B2B Business &amp; Lead Generation Website</option>
                    <option value="ecommerce">E-Commerce Store (1-Click UPI)</option>
                    <option value="custom">Custom Web Application / SaaS MVP</option>
                  </select>
                </div>
              </div>

              {/* Field 5: Security Passkey */}
              <div className="input-group">
                <label className="input-label" htmlFor="register-password">
                  Create Master Security Passkey
                </label>
                <div className="input-field-wrap">
                  <Lock size={16} className="input-icon" />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMascotState('typing_password');
                      setErrorMessage(null);
                    }}
                    onFocus={() => {
                      setMascotState('typing_password');
                      setErrorMessage(null);
                    }}
                    onBlur={() => {
                      if (mascotState === 'typing_password') setMascotState('idle');
                    }}
                    placeholder="Min. 6 alphanumeric characters"
                    className="glass-input with-icon with-eye"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Field 6: Confirm Passkey */}
              <div className="input-group">
                <label className="input-label" htmlFor="register-confirm-password">
                  Confirm Security Passkey
                </label>
                <div className="input-field-wrap">
                  <Lock size={16} className="input-icon" />
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setMascotState('typing_password');
                      setErrorMessage(null);
                    }}
                    onFocus={() => {
                      setMascotState('typing_password');
                      setErrorMessage(null);
                    }}
                    onBlur={() => {
                      if (mascotState === 'typing_password') setMascotState('idle');
                    }}
                    placeholder="Re-enter security passkey"
                    className="glass-input with-icon with-eye"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle-eye"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-glass btn-glass-lg login-submit-btn"
                disabled={isSubmitting}
                id="register-submit-cta"
              >
                {isSubmitting ? (
                  <span>Provisioning Client Workspace...</span>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Create Client Project Workspace</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Testing Sandbox Controls for User */}
            <div className="login-quick-sandbox">
              <div className="quick-sandbox-label">
                <Sparkles size={13} style={{ color: 'var(--accent-dot)' }} />
                <span>Quick Test Sandbox (Interactive Testing)</span>
              </div>
              <div className="quick-sandbox-buttons">
                <button
                  type="button"
                  className="btn-glass btn-glass-sm"
                  onClick={handleQuickDemoRegister}
                  title="Tests: Curious -> Happy celebration & provisions workspace"
                >
                  <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                  <span>⚡ 1-Click Demo Register (Happy)</span>
                </button>
                <button
                  type="button"
                  className="btn-glass btn-glass-sm"
                  onClick={handleSimulateMismatch}
                  title="Tests: Curious -> Sad reaction & password mismatch alert"
                >
                  <AlertCircle size={13} style={{ color: '#EF4444' }} />
                  <span>⚠️ Test Mismatch Error (Sad)</span>
                </button>
              </div>
            </div>

            <div className="login-card-footer" style={{ flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span>Already have a client account?</span>
                <button
                  type="button"
                  className="link-btn"
                  onClick={onNavigateToLogin}
                  id="link-go-to-login"
                >
                  Sign In to Console →
                </button>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: 0.8,
                  fontSize: '0.8125rem',
                }}
              >
                <span>Have an inquiry instead?</span>
                <button
                  type="button"
                  className="link-btn"
                  onClick={onBackToStudio}
                >
                  Talk Directly to Founders
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
