/**
 * ==========================================================================
 * ISHU TIWARI — LUXURY MAKEUP ARTISTRY PORTFOLIO
 * Client Side Core Script (Vanilla JavaScript)
 * ==========================================================================
 */

'use strict';

// --------------------------------------------------------------------------
// CONFIGURATION CONSTANTS
// --------------------------------------------------------------------------
const INSTAGRAM_URL = "https://instagram.com/Ishhu_tiwari";
const WHATSAPP_NUMBER = "919582867085"; // Client WhatsApp number: +91 95828 67085

// --------------------------------------------------------------------------
// PORTFOLIO DATA FOR LIGHTBOX & GALLERY
// --------------------------------------------------------------------------
const PORTFOLIO_DATA = [
  {
    id: 1,
    category: "bridal",
    categoryLabel: "01 · BRIDAL",
    title: "Timeless Royal Indian Bride",
    image: "assets/images/bridal/bridal_1.jpg",
    description: "Classic high-glam bridal look with flawless skin, subtle sculpted contours, and a statement diamond choker."
  },
  {
    id: 2,
    category: "party",
    categoryLabel: "02 · PARTY GLAM",
    title: "Sculpted Evening Glamour",
    image: "assets/images/party/party_1.jpg",
    description: "Sophisticated cocktail makeup with luminous skin finish, feathered neckline accent, and nude lips."
  },
  {
    id: 3,
    category: "editorial",
    categoryLabel: "03 · EDITORIAL",
    title: "Vivid Sapphire & Emerald Artistry",
    image: "assets/images/editorial/editorial_2.jpg",
    description: "High-fashion editorial composition featuring vibrant blue metallic eye detail, leopard accents, and nose chain accessory."
  },
  {
    id: 4,
    category: "everyday",
    categoryLabel: "04 · EVERYDAY",
    title: "Soft Cut-Crease Shimmer",
    image: "assets/images/everyday/everyday_1.jpg",
    description: "Polished soft glam featuring warm metallic lid shimmer, precise winged liner, and plush nude lips."
  },
  {
    id: 5,
    category: "party",
    categoryLabel: "02 · PARTY GLAM",
    title: "Soft Lilac Shimmer & Winged Accent",
    image: "assets/images/party/party_2.jpg",
    description: "Radiant evening glam look with soft lilac eyeshadow blend, winged liner, and chocolate lip outline."
  },
  {
    id: 6,
    category: "editorial",
    categoryLabel: "03 · EDITORIAL",
    title: "Pink Glow & Bindi Statement",
    image: "assets/images/editorial/editorial_1.jpg",
    description: "Expressive editorial beauty featuring high-contrast iridescence, defined brows, and traditional bindi motif."
  }
];

// --------------------------------------------------------------------------
// INITIALIZATION ON DOM READY
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initPortfolioFilter();
  initLightbox();
  initBeforeAfterSlider();
  initBookingForm();
  initCustomCursor();
  initScrollReveals();
  initInstagramLinks();
});

// --------------------------------------------------------------------------
// 1. STICKY HEADER SCROLL LOGIC
// --------------------------------------------------------------------------
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// --------------------------------------------------------------------------
// 2. MOBILE MENU OVERLAY LOGIC
// --------------------------------------------------------------------------
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navOverlay = document.querySelector('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!toggleBtn || !navOverlay) return;

  const toggleMenu = (show) => {
    const isActive = show !== undefined ? show : !navOverlay.classList.contains('active');
    
    if (isActive) {
      navOverlay.classList.add('active');
      document.body.classList.add('menu-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    } else {
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

// --------------------------------------------------------------------------
// 3. PORTFOLIO CATEGORY FILTERING
// --------------------------------------------------------------------------
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === itemCategory) {
          item.classList.remove('is-hidden');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 4. FULLSCREEN LIGHTBOX MODAL
// --------------------------------------------------------------------------
let currentLightboxIndex = 0;

function initLightbox() {
  const modal = document.querySelector('.lightbox-modal');
  const modalImg = document.querySelector('.lightbox-img');
  const modalCat = document.querySelector('.lightbox-cat');
  const modalTitle = document.querySelector('.lightbox-title');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const portfolioCards = document.querySelectorAll('.portfolio-card-inner');

  if (!modal || !modalImg) return;

  const openLightbox = (index) => {
    currentLightboxIndex = index;
    const data = PORTFOLIO_DATA[currentLightboxIndex];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCat.textContent = data.categoryLabel;
    modalTitle.textContent = data.title;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % PORTFOLIO_DATA.length;
    openLightbox(currentLightboxIndex);
  };

  const showPrev = () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + PORTFOLIO_DATA.length) % PORTFOLIO_DATA.length;
    openLightbox(currentLightboxIndex);
  };

  portfolioCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

// --------------------------------------------------------------------------
// 5. INTERACTIVE BEFORE / AFTER SLIDER
// --------------------------------------------------------------------------
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-container');
  const beforeLayer = document.querySelector('.ba-before');
  const handle = document.querySelector('.ba-handle');

  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;

  const setPosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Events for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// --------------------------------------------------------------------------
// 6. BOOKING FORM & WHATSAPP INTEGRATION
// --------------------------------------------------------------------------
function initBookingForm() {
  const form = document.querySelector('.booking-form');
  const formStatus = document.querySelector('.form-status');
  const whatsappBtn = document.querySelector('.btn-whatsapp');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const eventType = form.querySelector('[name="event_type"]').value;
    const date = form.querySelector('[name="date"]').value;
    const location = form.querySelector('[name="location"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !phone || !eventType || !date) {
      if (formStatus) {
        formStatus.textContent = "Please fill in all required fields (Name, Phone, Event Type, Date).";
        formStatus.style.color = "#E57373";
        formStatus.classList.add('active');
      }
      return;
    }

    // Construct WhatsApp message
    const waText = 
      `*New Makeup Booking Enquiry — Ishu Tiwari*\n\n` +
      `*Name:* ${name}\n` +
      `*WhatsApp:* ${phone}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*Event Type:* ${eventType}\n` +
      `*Event Date:* ${date}\n` +
      `*Location:* ${location || 'Delhi, India'}\n` +
      `*Message:* ${message || 'No additional details.'}`;

    const encodedText = encodeURIComponent(waText);

    if (WHATSAPP_NUMBER === "YOUR_WHATSAPP_NUMBER") {
      if (formStatus) {
        formStatus.innerHTML = 
          `<strong>Enquiry Submitted Successfully!</strong><br>` +
          `Thank you <em>${name}</em>. Your booking request for <strong>${eventType}</strong> on <strong>${date}</strong> has been logged.<br>` +
          `<small style="color: var(--accent-gold); margin-top: 0.5rem; display: block;">` +
          `(Note: WhatsApp automation mode is active. Configure WHATSAPP_NUMBER in script.js to launch WhatsApp automatically).</small>`;
        formStatus.style.color = "var(--text-ivory)";
        formStatus.classList.add('active');
      }
    } else {
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
      window.open(waUrl, '_blank');
      if (formStatus) {
        formStatus.textContent = "Redirecting to WhatsApp to send your enquiry...";
        formStatus.style.color = "var(--accent-gold)";
        formStatus.classList.add('active');
      }
    }

    form.reset();
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (WHATSAPP_NUMBER === "YOUR_WHATSAPP_NUMBER") {
        alert("WhatsApp booking number is in placeholder mode. Set WHATSAPP_NUMBER in script.js to enable direct chat.");
      } else {
        const defaultMsg = encodeURIComponent("Hello Ishu! I would like to inquire about booking a makeup appointment.");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`, '_blank');
      }
    });
  }
}

// --------------------------------------------------------------------------
// 7. INSTAGRAM LINK HELPER
// --------------------------------------------------------------------------
function initInstagramLinks() {
  const instaLinks = document.querySelectorAll('.btn-instagram, a[href="#instagram"]');
  instaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(INSTAGRAM_URL, '_blank');
    });
  });
}

// --------------------------------------------------------------------------
// 8. CUSTOM CURSOR (DESKTOP)
// --------------------------------------------------------------------------
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) return;

  window.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    ring.animate({
      left: `${x}px`,
      top: `${y}px`
    }, { duration: 250, fill: 'forwards' });
  });

  const interactiveElements = document.querySelectorAll('a, button, .portfolio-card-inner, .before-after-container');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('active');
    });
  });
}

// --------------------------------------------------------------------------
// 9. SCROLL REVEALS (INTERSECTION OBSERVER)
// --------------------------------------------------------------------------
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}
