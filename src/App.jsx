import React, { useState, useEffect } from 'react';
import BackgroundPhotoSlideshow from './components/BackgroundPhotoSlideshow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesBento from './components/ServicesBento';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ClientPortalModal from './components/ClientPortalModal';
import Toast from './components/Toast';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('trishul_theme') || 'light');
  const [currentView, setCurrentView] = useState(() => (window.location.hash === '#login' ? 'login' : 'landing'));
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedService, setSelectedService] = useState('school');
  const [toastMessage, setToastMessage] = useState(null);

  // Client Portal Console Modal
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  // Synchronize theme with html attribute and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('trishul_theme', theme);
  }, [theme]);

  // URL Hash Sync for Browser History (Supports back/forward navigation between #login and studio)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#login') {
        setCurrentView('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth High-Performance IntersectionObserver for 60fps Active Nav Tracking on Landing page
  useEffect(() => {
    if (currentView !== 'landing') return;

    const sectionIds = ['hero', 'services', 'about', 'contact'];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0.25, 0.5],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [currentView]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleToggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    showToast(`Theme switched to ${next === 'dark' ? 'Cyber Emerald' : 'Frosted Pearl'}`);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToLogin = () => {
    window.location.hash = '#login';
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStudio = () => {
    window.location.hash = '';
    setCurrentView('landing');
  };

  const handleSelectPreset = (serviceKey) => {
    setSelectedService(serviceKey);
    const serviceNames = {
      school: 'School & Institute Portal',
      hotel: 'Hotel Booking Engine',
      business: 'B2B Business Website',
      ecommerce: 'E-Commerce Store',
      custom: 'Custom Web Application',
    };
    showToast(`Selected ${serviceNames[serviceKey] || 'service'} for direct inquiry`);
    scrollTo('contact');
  };

  return (
    <div className="site-wrapper">
      {/* Full-Window Background Photo Slideshow (Cycles photos smoothly behind liquid glass) */}
      <BackgroundPhotoSlideshow />

      {currentView === 'login' ? (
        /* Full-Page Dedicated VisionOS Login Page with 3D Cute Mascot */
        <LoginPage
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onBackToStudio={handleBackToStudio}
          onLoginSuccess={() => {
            setIsPortalModalOpen(true);
            showToast('Authenticated into Client Project Console');
          }}
          onShowToast={showToast}
        />
      ) : (
        /* Main 4-Section Narrative Stream (Home, Services, About, Contact) */
        <>
          {/* Floating 3-Island Navbar with Liquid Glass Tab Morphing */}
          <Navbar
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenLogin={handleNavigateToLogin}
            activeSection={activeSection}
          />

          <main id="main-content">
            <Hero
              onExploreServices={() => scrollTo('services')}
              onContactClick={() => scrollTo('contact')}
            />

            <ServicesBento onSelectPreset={handleSelectPreset} />

            <About onContactClick={() => scrollTo('contact')} />

            <Contact
              selectedService={selectedService}
              onShowToast={showToast}
            />
          </main>

          {/* Footer matching 4-item navigation */}
          <Footer onOpenPortal={handleNavigateToLogin} />
        </>
      )}

      {/* Client Portal Console Dashboard Modal */}
      <ClientPortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
      />

      {/* Specular Toast Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}
