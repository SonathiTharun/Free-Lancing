import React, { useState, useEffect } from 'react';
import BackgroundPhotoSlideshow from './components/BackgroundPhotoSlideshow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesBento from './components/ServicesBento';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ClientPortalModal from './components/ClientPortalModal';
import Toast from './components/Toast';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('trishul_theme') || 'light');
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#login') return 'login';
    if (hash === '#register' || hash === '#signup') return 'register';
    return 'landing';
  });
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

  // URL Hash Sync for Browser History (Supports back/forward navigation between #login, #register, and studio)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setCurrentView('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#register' || hash === '#signup') {
        setCurrentView('register');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth, high-precision Active Nav Tracking on Landing page (Handles tall sections like Services)
  useEffect(() => {
    if (currentView !== 'landing') return;

    const sectionIds = ['hero', 'services', 'about', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      // Bottom of page check
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    setActiveSection(id);
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

  const handleNavigateToRegister = () => {
    window.location.hash = '#register';
    setCurrentView('register');
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
          onNavigateToRegister={handleNavigateToRegister}
          onShowToast={showToast}
        />
      ) : currentView === 'register' ? (
        /* Full-Page Dedicated VisionOS Register Page with 3D Cute Mascot */
        <RegisterPage
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onBackToStudio={handleBackToStudio}
          onRegisterSuccess={(data) => {
            setIsPortalModalOpen(true);
            showToast(`Workspace for "${data.orgName}" created! Opening Console`);
          }}
          onNavigateToLogin={handleNavigateToLogin}
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
            onOpenRegister={handleNavigateToRegister}
            activeSection={activeSection}
            onSelectSection={(id) => setActiveSection(id)}
          />

          <main id="main-content">
            <Hero
              onOpenRegister={handleNavigateToRegister}
              onOpenLogin={handleNavigateToLogin}
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
