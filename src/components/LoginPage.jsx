import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Lock, Eye, EyeOff, LogIn, Sparkles, AlertCircle, Sun, Moon, CheckCircle2 } from 'lucide-react';
import CuteMascotCanvas from './Mascot3D/CuteMascotCanvas';

export default function LoginPage({
  theme,
  onToggleTheme,
  onBackToStudio,
  onLoginSuccess,
  onNavigateToRegister,
  onShowToast,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      case 'typing_username':
        return {
          emoji: '🙈',
          text:
            character === 'astro_bot'
              ? "Sensors deflected! I'm looking away at the ceiling while you type your Username!"
              : character === 'panda'
              ? "Looking away at the bamboo trees while you enter your Username!"
              : character === 'kitty'
              ? "Distracted by a butterfly! Looking away while you enter your Username!"
              : "Looking away whistling while you enter your Username!",
        };
      case 'typing_password':
        return {
          emoji: '👀',
          text:
            character === 'astro_bot'
              ? "Target lock engaged: Staring intently directly at the screen!"
              : `${charName} laser lock: Staring directly at the screen while you enter your passkey!`,
        };
      case 'curious':
        return {
          emoji: '🤔',
          text: `Verifying your sprint passkey with Trishul servers...`,
        };
      case 'happy':
        return {
          emoji: '🎉',
          text: `Access Granted! Welcome to Trishul Client Console!`,
        };
      case 'sad':
        return {
          emoji: '🥺',
          text: `Authentication Failed! Please check your passkey and try again.`,
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
          text: `${charName} online. Smoothly tracking your cursor coordinates in real-time!`,
        };
    }
  })();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setMascotState('typing_username');
    setErrorMessage(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setMascotState('typing_password');
    setErrorMessage(null);
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);
    setMascotState('curious');

    // Simulate authentic server verification
    setTimeout(() => {
      // Demo accounts or non-empty matching check
      const isDemo =
        (username.toLowerCase().includes('vidya') || username.toLowerCase().includes('demo') || username.toLowerCase().includes('client')) &&
        (password === 'TS-SPRINT-2026' || password === 'demo' || password === 'trishul');

      const isValid = isDemo || (username.trim().length >= 3 && password.trim().length >= 4 && password !== 'wrong');

      if (isValid) {
        setMascotState('happy');
        setIsSubmitting(false);
        if (onShowToast) onShowToast('Authentication Verified! Welcome to Trishul Console');
        setTimeout(() => {
          onLoginSuccess({
            username,
            orgName: username.includes('vidya') ? 'Vidya Mandir Academy' : username,
            profileCompleted: !username.includes('incomplete'),
          });
        }, 1400);
      } else {
        setMascotState('sad');
        setIsSubmitting(false);
        setErrorMessage('Authentication Failed: Invalid Client ID or Sprint Security Passkey.');
      }
    }, 900);
  };

  // 1-Click Fast Demo Login (Returning Client with Active Projects)
  const handleQuickDemoSuccess = () => {
    setUsername('vidya-mandir-demo');
    setPassword('TS-SPRINT-2026');
    setErrorMessage(null);
    setIsSubmitting(true);
    setMascotState('curious');

    setTimeout(() => {
      setMascotState('happy');
      setIsSubmitting(false);
      if (onShowToast) onShowToast('Returning Client Verified! Opening Workspace directly');
      setTimeout(() => {
        onLoginSuccess({
          username: 'vidya-mandir-demo',
          orgName: 'Vidya Mandir Academy',
          fullName: 'Dr. Rajesh Sharma',
          email: 'director@vidyamandir.edu.in',
          industry: 'school',
          profileCompleted: true,
          activeProject: 'Vidya Mandir Excellence Academy',
        });
      }, 1400);
    }, 900);
  };

  // 1-Click Incomplete Profile Demo Login (Opens Business Profile Setup)
  const handleIncompleteDemoLogin = () => {
    setUsername('new-client-incomplete');
    setPassword('TS-NEW-2026');
    setErrorMessage(null);
    setIsSubmitting(true);
    setMascotState('curious');

    setTimeout(() => {
      setMascotState('happy');
      setIsSubmitting(false);
      if (onShowToast) onShowToast('Incomplete Profile Detected! Opening Business Profile Setup');
      setTimeout(() => {
        onLoginSuccess({
          username: 'new-client-incomplete',
          orgName: 'Apex Logistics Hub',
          fullName: 'Vikram Singhania',
          email: 'vikram@apexlogistics.in',
          industry: 'business',
          profileCompleted: false,
        });
      }, 1400);
    }, 900);
  };

  // 1-Click Error Simulator (Triggers Curious -> Sad Reaction)
  const handleSimulateError = () => {
    setUsername('unregistered-user');
    setPassword('wrong-passkey');
    setErrorMessage(null);
    setIsSubmitting(true);
    setMascotState('curious');

    setTimeout(() => {
      setMascotState('sad');
      setIsSubmitting(false);
      setErrorMessage('Authentication Failed: Sprint security passkey does not match active records.');
    }, 900);
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
          <span>Trishul Studio Console</span>
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
                mascotState={mascotState}
                character={character}
                caretPosition={username.length}
                theme={theme}
              />
              <div className="mascot-crystal-pedestal" />
            </div>

            {/* Mascot Character Switcher Pill (Astro Bot Recommended) */}
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
              <span className="status-dot" style={{
                background:
                  mascotState === 'happy' ? '#10B981' :
                  mascotState === 'sad' ? '#EF4444' :
                  mascotState === 'curious' ? '#F59E0B' :
                  mascotState === 'typing_username' ? '#8B5CF6' : '#0284C7'
              }} />
              <span>
                {mascotState === 'idle' && `${characterNames[character]}: Tracking Cursor Coordinates`}
                {mascotState === 'typing_username' && `${characterNames[character]}: Looking Away Whistling 🙈`}
                {mascotState === 'typing_password' && `${characterNames[character]}: Staring Intently at Screen 👀`}
                {mascotState === 'curious' && `${characterNames[character]}: Awaiting Verification 🤔`}
                {mascotState === 'happy' && `${characterNames[character]}: Celebratory Joy! 🎉`}
                {mascotState === 'sad' && `${characterNames[character]}: Sympathetic Pout 🥺`}
              </span>
            </div>
          </div>

          {/* Right Column: VisionOS Crystal Glass Login Form */}
          <div className="login-form-column">
            <div className="login-form-header">
              <div className="glass-pill" style={{ padding: '4px 12px', fontSize: '0.75rem', marginBottom: '8px' }}>
                <span className="status-dot" />
                <span>Protected Client Gateway</span>
              </div>
              <h1 className="login-form-title">Client Project Console</h1>
              <p className="login-form-subtitle">
                Access your real-time development staging, milestone approvals, and 70% launch escrow tracker.
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
              {/* Field 1: Client ID / Email */}
              <div className="input-group">
                <label className="input-label" htmlFor="login-username">
                  Client ID or Work Email
                </label>
                <div className="input-field-wrap">
                  <User size={16} className="input-icon" />
                  <input
                    id="login-username"
                    type="text"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                    onFocus={() => {
                      setMascotState('typing_username');
                      setErrorMessage(null);
                    }}
                    onBlur={() => {
                      if (mascotState === 'typing_username') setMascotState('idle');
                    }}
                    placeholder="e.g. vidya-mandir or name@domain.com"
                    className="glass-input with-icon"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Field 2: Sprint Passkey */}
              <div className="input-group">
                <label className="input-label" htmlFor="login-password">
                  Sprint Security Passkey
                </label>
                <div className="input-field-wrap">
                  <Lock size={16} className="input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={() => {
                      setMascotState('typing_password');
                      setErrorMessage(null);
                    }}
                    onBlur={() => {
                      if (mascotState === 'typing_password') setMascotState('idle');
                    }}
                    placeholder="Enter passkey (e.g. TS-SPRINT-2026)"
                    className="glass-input with-icon with-eye"
                    autoComplete="current-password"
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

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-glass btn-glass-lg login-submit-btn"
                disabled={isSubmitting}
                id="login-submit-cta"
              >
                {isSubmitting ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In to Project Console</span>
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
                  onClick={handleQuickDemoSuccess}
                  title="Returning Client: Opens Customer Dashboard directly with active projects"
                >
                  <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                  <span>⚡ Returning Client Login</span>
                </button>
                <button
                  type="button"
                  className="btn-glass btn-glass-sm"
                  onClick={handleIncompleteDemoLogin}
                  title="Incomplete Profile: Opens Step 2 Business Profile Setup"
                >
                  <Sparkles size={13} style={{ color: 'var(--accent-dot)' }} />
                  <span>⚡ Incomplete Profile Login</span>
                </button>
                <button
                  type="button"
                  className="btn-glass btn-glass-sm"
                  onClick={handleSimulateError}
                  title="Tests: Curious -> Sad reaction & error alert"
                >
                  <AlertCircle size={13} style={{ color: '#EF4444' }} />
                  <span>⚠️ Test Invalid Key</span>
                </button>
              </div>
            </div>

            <div className="login-card-footer" style={{ flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span>Don't have a project console account?</span>
                <button
                  type="button"
                  className="link-btn"
                  onClick={onNavigateToRegister}
                  id="link-go-to-register"
                >
                  Register Workspace →
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
                <span>Have a new project inquiry instead?</span>
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
