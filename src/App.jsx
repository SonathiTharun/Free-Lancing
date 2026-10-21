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
import BusinessProfileSetup from './components/BusinessProfileSetup';
import CustomerDashboard from './components/CustomerDashboard';
import ClientPortalModal from './components/ClientPortalModal';
import Toast from './components/Toast';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('trishul_theme') || 'light');
  
  // Persistent Authenticated Customer Session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('trishul_customer_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#login') return 'login';
    if (hash === '#register' || hash === '#signup') return 'register';
    if (hash === '#onboarding') return 'onboarding';
    if (hash === '#dashboard' || hash === '#portal' || hash === '#workspace') return 'dashboard';
    return 'landing';
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedService, setSelectedService] = useState('school');
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize theme with html attribute and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('trishul_theme', theme);
  }, [theme]);

  // URL Hash Sync for Browser History (Supports back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setCurrentView('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#register' || hash === '#signup') {
        setCurrentView('register');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#onboarding') {
        setCurrentView('onboarding');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#dashboard' || hash === '#portal' || hash === '#workspace') {
        setCurrentView('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth, high-precision Active Nav Tracking on Landing page
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

  const handleNavigateToDashboard = () => {
    if (currentUser) {
      if (currentUser.profileCompleted) {
        window.location.hash = '#dashboard';
        setCurrentView('dashboard');
      } else {
        window.location.hash = '#onboarding';
        setCurrentView('onboarding');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleNavigateToLogin();
    }
  };

  // Step 1: Account Created -> Hand off to Step 2: Business Profile Setup
  const handleRegisterSuccess = (data) => {
    const newSession = {
      id: 'usr_' + Date.now(),
      orgName: data.orgName || 'New Organization',
      fullName: data.fullName || 'Client Leader',
      email: data.email || 'client@domain.com',
      industry: data.serviceType || 'school',
      profileCompleted: false,
    };
    setCurrentUser(newSession);
    localStorage.setItem('trishul_customer_session', JSON.stringify(newSession));
    window.location.hash = '#onboarding';
    setCurrentView('onboarding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Step 1 complete: Account created for "${newSession.orgName}"! Complete Business Profile to launch.`);
  };

  // Login handler: Profile complete -> Dashboard directly; Profile incomplete -> Onboarding Step 2
  const handleLoginSuccess = (loginData) => {
    // If login indicates incomplete profile
    if (loginData?.profileCompleted === false) {
      const incompleteSession = {
        id: 'usr_incomplete_' + Date.now(),
        orgName: loginData.orgName || 'Apex Logistics Hub',
        fullName: loginData.fullName || 'Vikram Singhania',
        email: loginData.email || 'vikram@apexlogistics.in',
        industry: loginData.industry || 'business',
        profileCompleted: false,
      };
      setCurrentUser(incompleteSession);
      localStorage.setItem('trishul_customer_session', JSON.stringify(incompleteSession));
      window.location.hash = '#onboarding';
      setCurrentView('onboarding');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Profile Incomplete: Opening Business Profile Setup');
      return;
    }

    // Default existing customer with active projects (Vidya Mandir Academy)
    const existingSession = {
      id: 'usr_vidya_mandir',
      orgName: loginData?.orgName || 'Vidya Mandir Academy',
      fullName: loginData?.fullName || 'Dr. Rajesh Sharma',
      email: loginData?.email || 'director@vidyamandir.edu.in',
      industry: loginData?.industry || 'school',
      description: 'Premier CBSE academy in Bangalore with over 2,400 students.',
      phone: '+91 98450 12389',
      city: 'Bangalore, Karnataka',
      websiteUrl: 'https://vidyamandir.edu.in',
      profileCompleted: true,
      activeProject: 'Vidya Mandir Excellence Academy',
      sprintProgress: 75,
    };

    setCurrentUser(existingSession);
    localStorage.setItem('trishul_customer_session', JSON.stringify(existingSession));
    window.location.hash = '#dashboard';
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Welcome back, ${existingSession.fullName}! Opening Customer Workspace.`);
  };

  // Step 2: Business Profile Setup Complete -> Step 3: Customer Dashboard
  const handleCompleteProfileSetup = (updatedProfile) => {
    const finalSession = {
      ...updatedProfile,
      profileCompleted: true,
    };
    setCurrentUser(finalSession);
    localStorage.setItem('trishul_customer_session', JSON.stringify(finalSession));
    window.location.hash = '#dashboard';
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Step 3: Welcome to your Customer Workspace, ${finalSession.orgName}!`);
  };

  // Sign out customer session
  const handleLogout = () => {
    localStorage.removeItem('trishul_customer_session');
    setCurrentUser(null);
    window.location.hash = '';
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Signed out of Customer Workspace.');
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
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={handleNavigateToRegister}
          onShowToast={showToast}
        />
      ) : currentView === 'register' ? (
        /* Full-Page Dedicated VisionOS Register Page with 3D Cute Mascot */
        <RegisterPage
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onBackToStudio={handleBackToStudio}
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToLogin={handleNavigateToLogin}
          onShowToast={showToast}
        />
      ) : currentView === 'onboarding' ? (
        /* Step 2: Dedicated Business Profile Setup Screen */
        <BusinessProfileSetup
          theme={theme}
          onToggleTheme={handleToggleTheme}
          userSession={currentUser}
          onCompleteSetup={handleCompleteProfileSetup}
          onShowToast={showToast}
        />
      ) : currentView === 'dashboard' ? (
        /* Step 3: Full-Featured VisionOS Customer Workspace Dashboard */
        <CustomerDashboard
          theme={theme}
          onToggleTheme={handleToggleTheme}
          userSession={currentUser}
          onBackToStudio={handleBackToStudio}
          onLogout={handleLogout}
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
            currentUser={currentUser}
            onNavigateToDashboard={handleNavigateToDashboard}
            onLogout={handleLogout}
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
          <Footer onOpenPortal={handleNavigateToDashboard} />
        </>
      )}

      {/* Specular Toast Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}
