/**
 * TRISHUL STUDIO - LIQUID GLASS APPLICATION ENGINE
 * Inspired by Apple visionOS & macOS Sequoia "Liquid Glass" Aesthetics
 * 
 * Features:
 * - Dual Theme Switcher ("Frosted Pearl" Light & "Cyber Emerald" Dark)
 * - Real-Time Reactive Quotation Calculator with 30% Advance Milestone Logic
 * - Dynamic Bento Preset Shortcuts
 * - Portfolio Filtering & Case Study Modal Engine
 * - Apple Floating Nav Pill Active Scroll Tracking
 * - Client Portal visionOS Simulator Modal
 * - Form Synchronization & Toast System
 */

(function () {
  'use strict';

  // ========================================================================
  // STATE MANAGEMENT
  // ========================================================================
  const state = {
    theme: localStorage.getItem('trishul_theme') || 'light',
    quoteId: generateQuoteId(),
    config: {
      industry: {
        id: 'school',
        name: 'School & Institute Portal',
        price: 48000,
        days: 14
      },
      style: {
        id: 'liquid-glass',
        name: 'Liquid Glass visionOS System',
        price: 12000,
        days: 2
      },
      density: {
        id: 'compact',
        name: 'Compact High-Density (5–8 Pages)',
        price: 0,
        days: 0
      },
      backend: {
        id: 'portal-engine',
        name: 'Custom Portal / Booking Engine',
        price: 28000,
        days: 6
      },
      addons: [
        {
          id: 'ai-bot',
          name: 'Domain-Trained AI Chatbot',
          price: 14500,
          days: 2
        },
        {
          id: 'crm-sync',
          name: 'WhatsApp & Email CRM Automation',
          price: 9500,
          days: 2
        },
        {
          id: 'seo-pack',
          name: 'Technical SEO & Speed Pack',
          price: 8000,
          days: 1
        }
      ]
    }
  };

  // Case Studies Database
  const caseStudies = {
    vidya: {
      title: "Vidya Mandir Excellence Academy",
      category: "School & Institute Management",
      metric: "99.4% Fee Collection On-Time",
      turnaround: "14 Days",
      description: "A prestigious CBSE academy in Bangalore with over 2,400 students transitioned from fragmented manual paperwork and third-party accounting delays to a unified, bespoke Trishul Studio platform. Parents can now pay quarterly dues in seconds via Razorpay UPI, view instant circulars, and track exam report cards with zero friction.",
      highlights: [
        "Automated UPI Reconciliation with instant WhatsApp receipts",
        "Role-based access controls for Teachers, Accounts Staff, and Principals",
        "100% CBSE & State Board data privacy and security compliance",
        "Page load speed of 0.34s even during peak morning admission surges"
      ]
    },
    aura: {
      title: "Aura Himalayan Boutique Retreat",
      category: "Luxury Hotel & Hospitality",
      metric: "+380% Direct Bookings Growth",
      turnaround: "16 Days",
      description: "A 28-chalet luxury eco-resort in Himachal Pradesh was losing over 22% of revenue to third-party OTA commissions (Booking.com & MakeMyTrip). Trishul Studio architected a liquid glass booking engine with immersive 4K suite previews, dynamic seasonal pricing, zero-commission reservations, and automated guest WhatsApp concierge.",
      highlights: [
        "Direct booking engine saving over ₹18,40,000 in OTA commissions annually",
        "Interactive room availability calendar with real-time room lock",
        "Dining and ayurvedic spa reservation add-ons during room checkout",
        "Sub-0.4s mobile performance optimized for travelers on remote 4G networks"
      ]
    },
    stark: {
      title: "Stark & Sterling Corporate Advisory",
      category: "B2B Legal & Wealth Management",
      metric: "3.2x Qualified Inbound Inquiries",
      turnaround: "10 Days",
      description: "An elite cross-border corporate advisory firm required an authoritative digital presence matching their high-net-worth clientele. Designed with Swiss minimalist typography and subtle liquid glass panels, the platform features an interactive M&A valuation calculator that qualifies corporate leads instantly.",
      highlights: [
        "Interactive M&A and corporate restructuring cost estimation tool",
        "Self-hosted privacy-focused analytics adhering to strict EU GDPR guidelines",
        "100/100 Google Lighthouse score across Performance, SEO, and Accessibility",
        "Automated calendar integration booking consultations directly with senior partners"
      ]
    },
    kalyani: {
      title: "Kalyani Silks Heritage Handlooms",
      category: "Luxury Handloom D2C E-Commerce",
      metric: "4.2% Cart Conversion Rate",
      turnaround: "18 Days",
      description: "A fourth-generation Kanchipuram silk handloom house launching their direct-to-consumer digital flagship. Trishul Studio engineered a high-density, tactile silk catalog with 1-click Razorpay UPI checkout, dynamic saree drape previews, and multi-currency international routing.",
      highlights: [
        "Frictionless 1-click UPI and Apple Pay checkout dropping abandonment by 44%",
        "Real-time stock synchronization avoiding overselling on exclusive one-of-a-kind weaves",
        "Automated GST invoice generation dispatched immediately via WhatsApp and Email",
        "High-density image compression with sub-second lazy loading across 800+ items"
      ]
    },
    nexus: {
      title: "NexusFleet Logistics Cloud",
      category: "Enterprise Fleet Telematics Web App",
      metric: "Sub-20ms Telemetry Latency",
      turnaround: "24 Days",
      description: "A multi-state freight and cold-chain logistics provider needed a real-time command dashboard to monitor 600+ temperature-controlled trucks. Built with low-latency WebSockets and visionOS-style translucent telemetry gauges.",
      highlights: [
        "Real-time GPS vehicle tracking and temperature alerts via WebSockets",
        "Dynamic glass gauges indicating fuel burn rate and driver duty hours",
        "Single-click PDF route compliance and billing export for clients",
        "Optimized client-side rendering sustaining 60fps on standard dispatcher screens"
      ]
    },
    sanctuary: {
      title: "Sanctuary Wellness & Ayurvedic Retreat",
      category: "Hospitality & Wellness Clinic",
      metric: "+210% Treatment Consultations",
      turnaround: "14 Days",
      description: "A premier coastal Kerala Ayurvedic retreat offering multi-week panchakarma treatments. Built with a bespoke interactive dosha intake assessment that matches prospective guests to physicians before booking.",
      highlights: [
        "Intelligent multi-step dosha wellness intake questionnaire",
        "Doctor scheduling engine synced with international timezones",
        "Automated pre-arrival diet guidelines sent via WhatsApp bot",
        "Multi-currency deposits via global Stripe and local UPI"
      ]
    }
  };

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================
  function generateQuoteId() {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `TS-2026-${randomDigits}`;
  }

  function formatRupees(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  function showToast(message, icon = '✓') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="status-dot" style="width: 7px; height: 7px;"></span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 320);
    }, 3800);
  }

  // ========================================================================
  // DUAL THEME ENGINE ("Frosted Pearl" & "Cyber Emerald")
  // ========================================================================
  function initTheme() {
    applyTheme(state.theme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        state.theme = nextTheme;
        localStorage.setItem('trishul_theme', nextTheme);
        applyTheme(nextTheme);

        const themeName = nextTheme === 'dark' ? 'Cyber Emerald' : 'Frosted Pearl';
        showToast(`Theme switched to ${themeName}`);
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // ========================================================================
  // CONFIGURATOR & REAL-TIME QUOTATION ENGINE
  // ========================================================================
  function initConfigurator() {
    const configContainer = document.querySelector('.config-container');
    if (!configContainer) return;

    // Attach click listeners to all config pills
    const pills = configContainer.querySelectorAll('.config-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const category = pill.getAttribute('data-category');
        const id = pill.getAttribute('data-id');
        const name = pill.getAttribute('data-name');
        const price = parseInt(pill.getAttribute('data-price'), 10) || 0;
        const days = parseInt(pill.getAttribute('data-days'), 10) || 0;

        if (category === 'addon') {
          // Multi-select toggle
          const isSelected = pill.classList.contains('selected');
          if (isSelected) {
            pill.classList.remove('selected');
            pill.setAttribute('aria-pressed', 'false');
            const check = pill.querySelector('.pill-check');
            if (check) check.textContent = '';
            state.config.addons = state.config.addons.filter(a => a.id !== id);
          } else {
            pill.classList.add('selected');
            pill.setAttribute('aria-pressed', 'true');
            const check = pill.querySelector('.pill-check');
            if (check) check.textContent = '✓';
            state.config.addons.push({ id, name, price, days });
          }
        } else {
          // Single select category
          const siblings = pill.closest('.glass-pill-group').querySelectorAll('.config-pill');
          siblings.forEach(s => {
            s.classList.remove('selected');
            s.setAttribute('aria-checked', 'false');
            const check = s.querySelector('.pill-check');
            if (check) check.textContent = '';
          });

          pill.classList.add('selected');
          pill.setAttribute('aria-checked', 'true');
          const check = pill.querySelector('.pill-check');
          if (check) check.textContent = '✓';

          state.config[category] = { id, name, price, days };
        }

        renderQuotation();
      });
    });

    // Preset shortcuts from Bento Cards
    const presetButtons = document.querySelectorAll('.configure-preset');
    presetButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const industryId = btn.getAttribute('data-industry');
        const targetPill = configContainer.querySelector(`.config-pill[data-category="industry"][data-id="${industryId}"]`);
        if (targetPill) {
          targetPill.click();
          showToast(`Configured for ${targetPill.getAttribute('data-name')}`);
        }
      });
    });

    // Initial render
    renderQuotation();
  }

  function calculateQuoteTotals() {
    let total = 0;
    let minDays = 0;
    let maxDays = 0;

    // Industry Base
    total += state.config.industry.price;
    minDays += state.config.industry.days;

    // Style
    total += state.config.style.price;
    minDays += state.config.style.days;

    // Density
    total += state.config.density.price;
    minDays += state.config.density.days;

    // Backend
    total += state.config.backend.price;
    minDays += state.config.backend.days;

    // Addons
    state.config.addons.forEach(a => {
      total += a.price;
      minDays += a.days;
    });

    maxDays = minDays + 4;
    const advance = Math.round(total * 0.30);
    const balance = total - advance;

    return { total, advance, balance, minDays, maxDays };
  }

  function renderQuotation() {
    const itemsContainer = document.getElementById('quote-items-container');
    const quoteIdEl = document.getElementById('quote-id-display');
    const subtotalEl = document.getElementById('quote-subtotal-display');
    const totalEl = document.getElementById('quote-total-display');
    const advanceEl = document.getElementById('quote-advance-display');
    const timelineEl = document.getElementById('quote-timeline-display');

    if (!itemsContainer) return;

    const { total, advance, minDays, maxDays } = calculateQuoteTotals();

    if (quoteIdEl) quoteIdEl.textContent = `Ref: ${state.quoteId}`;
    if (subtotalEl) subtotalEl.textContent = formatRupees(total);
    if (totalEl) totalEl.textContent = formatRupees(total);
    if (advanceEl) advanceEl.textContent = formatRupees(advance);
    if (timelineEl) timelineEl.textContent = `${minDays} – ${maxDays} Business Days`;

    // Render line items list
    itemsContainer.innerHTML = '';

    // Core Industry
    appendQuoteItem(itemsContainer, state.config.industry.name, state.config.industry.price);
    // Style
    appendQuoteItem(itemsContainer, state.config.style.name, state.config.style.price);
    // Density (if > 0)
    if (state.config.density.price > 0) {
      appendQuoteItem(itemsContainer, state.config.density.name, state.config.density.price);
    }
    // Backend (if > 0)
    if (state.config.backend.price > 0) {
      appendQuoteItem(itemsContainer, state.config.backend.name, state.config.backend.price);
    }
    // Addons
    state.config.addons.forEach(a => {
      appendQuoteItem(itemsContainer, a.name, a.price);
    });
  }

  function appendQuoteItem(container, name, price) {
    const row = document.createElement('div');
    row.className = 'quote-item-row';
    row.innerHTML = `
      <span class="quote-item-name">${name}</span>
      <span class="quote-item-price">${price === 0 ? 'Included' : formatRupees(price)}</span>
    `;
    container.appendChild(row);
  }

  // ========================================================================
  // QUOTE LOCK & COPY ACTIONS
  // ========================================================================
  function initQuoteActions() {
    const lockBtn = document.getElementById('lock-quote-btn');
    const copyBtn = document.getElementById('copy-quote-btn');
    const modal = document.getElementById('quote-lock-modal');
    const closeBtn = document.getElementById('close-quote-modal');
    const whatsappBtn = document.getElementById('confirm-quote-whatsapp');
    const modalCopyBtn = document.getElementById('modal-copy-spec');
    const modalInquiryBtn = document.getElementById('modal-scroll-inquiry');

    if (lockBtn && modal) {
      lockBtn.addEventListener('click', () => {
        openQuoteLockModal();
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyQuoteToClipboard();
      });
    }

    if (modalCopyBtn) {
      modalCopyBtn.addEventListener('click', () => {
        copyQuoteToClipboard();
      });
    }

    if (modalInquiryBtn && modal) {
      modalInquiryBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        syncQuoteToForm();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const { total, advance } = calculateQuoteTotals();
        const msg = encodeURIComponent(
          `Hello Vikramaditya & Arunima,\nI would like to lock Quote ${state.quoteId} for my project with Trishul Studio.\n\n` +
          `• Platform: ${state.config.industry.name}\n` +
          `• Design: ${state.config.style.name}\n` +
          `• Total Estimate: ${formatRupees(total)}\n` +
          `• 30% Advance: ${formatRupees(advance)}\n\n` +
          `Please confirm sprint availability.`
        );
        window.open(`https://wa.me/919845012389?text=${msg}`, '_blank');
      });
    }
  }

  function openQuoteLockModal() {
    const modal = document.getElementById('quote-lock-modal');
    if (!modal) return;

    const { total, advance, minDays, maxDays } = calculateQuoteTotals();

    const refEl = document.getElementById('modal-ref-id');
    const platformEl = document.getElementById('modal-platform-name');
    const styleEl = document.getElementById('modal-style-name');
    const timelineEl = document.getElementById('modal-timeline');
    const totalEl = document.getElementById('modal-total');
    const advanceEl = document.getElementById('modal-advance');

    if (refEl) refEl.textContent = `Ref: ${state.quoteId}`;
    if (platformEl) platformEl.textContent = state.config.industry.name;
    if (styleEl) styleEl.textContent = state.config.style.name;
    if (timelineEl) timelineEl.textContent = `${minDays}–${maxDays} Business Days`;
    if (totalEl) totalEl.textContent = formatRupees(total);
    if (advanceEl) advanceEl.textContent = formatRupees(advance);

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function copyQuoteToClipboard() {
    const { total, advance, balance, minDays, maxDays } = calculateQuoteTotals();

    const lines = [
      `=== TRISHUL STUDIO OFFICIAL SPECIFICATION ===`,
      `Quotation ID: ${state.quoteId}`,
      `Date: ${new Date().toLocaleDateString('en-IN')}`,
      `--------------------------------------------`,
      `1. Core Platform: ${state.config.industry.name} (${formatRupees(state.config.industry.price)})`,
      `2. Design System: ${state.config.style.name} (${formatRupees(state.config.style.price)})`,
      `3. Page Scope: ${state.config.density.name} (${state.config.density.price === 0 ? 'Included' : formatRupees(state.config.density.price)})`,
      `4. Backend Engine: ${state.config.backend.name} (${state.config.backend.price === 0 ? 'Included' : formatRupees(state.config.backend.price)})`,
      `5. Add-ons:`
    ];

    if (state.config.addons.length > 0) {
      state.config.addons.forEach(a => {
        lines.push(`   • ${a.name}: ${formatRupees(a.price)}`);
      });
    } else {
      lines.push(`   • None`);
    }

    lines.push(`--------------------------------------------`);
    lines.push(`Total Project Estimate: ${formatRupees(total)}`);
    lines.push(`30% Advance to Kickstart: ${formatRupees(advance)}`);
    lines.push(`70% Milestone on Launch: ${formatRupees(balance)}`);
    lines.push(`Timeline: ${minDays} - ${maxDays} Business Days`);
    lines.push(`Included: 1 Year High-Speed CDN, Founder Direct Slack/WhatsApp, Git Repo Ownership`);
    lines.push(`Direct Founder Hotline: +91 98450 12389`);
    lines.push(`============================================`);

    const fullText = lines.join('\n');
    navigator.clipboard.writeText(fullText).then(() => {
      showToast('Full quotation specification copied to clipboard!');
    }).catch(() => {
      showToast('Quotation generated (clipboard permissions restricted)');
    });
  }

  // ========================================================================
  // INQUIRY FORM & QUOTE SYNCHRONIZATION
  // ========================================================================
  function initInquiryForm() {
    const syncBtn = document.getElementById('sync-quote-to-form');
    const form = document.getElementById('contact-form');

    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        syncQuoteToForm();
        showToast('Quote specs synced to inquiry message!');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('client-name');
        const orgInput = document.getElementById('client-org');
        const emailInput = document.getElementById('client-email');
        const nameVal = nameInput ? nameInput.value : 'Client';
        const orgVal = orgInput ? orgInput.value : 'Organization';

        showToast(`Blueprint received for ${orgVal}! Our founders will reply within 4 hours.`);
        form.reset();

        // Regenerate quote ID for future estimates
        state.quoteId = generateQuoteId();
        renderQuotation();
      });
    }
  }

  function syncQuoteToForm() {
    const msgTextarea = document.getElementById('client-message');
    const serviceSelect = document.getElementById('client-service');
    const budgetSelect = document.getElementById('client-budget');

    const { total, advance } = calculateQuoteTotals();

    // Map industry to select option
    if (serviceSelect) {
      if (state.config.industry.id === 'school') serviceSelect.value = 'school';
      else if (state.config.industry.id === 'hotel') serviceSelect.value = 'hotel';
      else if (state.config.industry.id === 'business') serviceSelect.value = 'business';
      else if (state.config.industry.id === 'ecommerce') serviceSelect.value = 'ecommerce';
      else if (state.config.industry.id === 'custom') serviceSelect.value = 'webapp';
    }

    // Map budget
    if (budgetSelect) {
      if (total < 75000) budgetSelect.value = 'standard';
      else if (total <= 150000) budgetSelect.value = 'premium';
      else budgetSelect.value = 'enterprise';
    }

    if (msgTextarea) {
      const addonsSummary = state.config.addons.map(a => a.name).join(', ') || 'None';
      msgTextarea.value = 
        `[Sync from Quotation ${state.quoteId}]\n` +
        `• Core Platform: ${state.config.industry.name}\n` +
        `• Aesthetic: ${state.config.style.name}\n` +
        `• Backend Engine: ${state.config.backend.name}\n` +
        `• Smart Add-ons: ${addonsSummary}\n` +
        `• Total Quoted: ${formatRupees(total)} (30% Advance: ${formatRupees(advance)})\n\n` +
        `Hi Vikramaditya & Arunima, we would like to kick off development for our organization. Here are our specific branding and timeline requirements: `;
      msgTextarea.focus();
    }
  }

  // ========================================================================
  // PORTFOLIO FILTERING & CASE STUDY MODAL
  // ========================================================================
  function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            card.style.display = 'none';
          }
        });
      });
    });

    // Case Study Detail Modal Triggers
    const caseBtns = document.querySelectorAll('.view-case-study');
    const modal = document.getElementById('case-study-modal');
    const closeBtn = document.getElementById('close-case-modal');

    caseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        openCaseStudyModal(projectId);
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }

  function openCaseStudyModal(projectId) {
    const data = caseStudies[projectId];
    if (!data) return;

    const modal = document.getElementById('case-study-modal');
    if (!modal) return;

    const catEl = document.getElementById('case-category-pill');
    const metricEl = document.getElementById('case-metric-highlight');
    const titleEl = document.getElementById('modal-case-title');
    const descEl = document.getElementById('case-description');
    const bulletsEl = document.getElementById('case-bullet-points');
    const turnaroundEl = document.getElementById('case-turnaround');

    if (catEl) catEl.textContent = data.category;
    if (metricEl) metricEl.textContent = data.metric;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;
    if (turnaroundEl) turnaroundEl.textContent = data.turnaround;

    if (bulletsEl) {
      bulletsEl.innerHTML = '';
      data.highlights.forEach(h => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'flex-start';
        li.style.gap = '8px';
        li.innerHTML = `
          <span style="color: var(--accent-dot); font-weight: 700;">•</span>
          <span>${h}</span>
        `;
        bulletsEl.appendChild(li);
      });
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  // ========================================================================
  // CLIENT PORTAL MODAL (visionOS SIMULATION)
  // ========================================================================
  function initClientPortal() {
    const openBtn = document.getElementById('open-client-portal');
    const footerBtn = document.getElementById('footer-client-portal');
    const modal = document.getElementById('client-portal-modal');
    const closeBtn = document.getElementById('close-portal-modal');

    const openPortal = () => {
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    };

    if (openBtn) openBtn.addEventListener('click', openPortal);
    if (footerBtn) footerBtn.addEventListener('click', openPortal);

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }

  // ========================================================================
  // ACTIVE NAV SCROLL TRACKING & MOBILE MENU
  // ========================================================================
  function initNavScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');

    window.addEventListener('scroll', () => {
      let currentSection = 'hero';
      const scrollPos = window.scrollY + 160;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });

    // Mobile nav toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('mobile-open');
        if (isOpen) {
          navMenu.classList.remove('mobile-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        } else {
          navMenu.classList.add('mobile-open');
          mobileToggle.setAttribute('aria-expanded', 'true');
        }
      });

      // Close mobile menu when clicking any link
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('mobile-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // ========================================================================
  // INITIALIZATION ON DOM CONTENT LOADED
  // ========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initConfigurator();
    initQuoteActions();
    initInquiryForm();
    initPortfolio();
    initClientPortal();
    initNavScroll();
    
    // Welcome status
    console.log(
      '%c TRISHUL STUDIO %c Liquid Glass Web Architecture Online ',
      'background: rgba(16, 185, 129, 0.2); color: #10B981; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      'background: #0F172A; color: #FFFFFF; padding: 4px 8px; border-radius: 4px;'
    );
  });

})();
