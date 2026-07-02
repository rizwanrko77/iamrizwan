/* ==========================================================================
   Rizwan's Portfolio — JavaScript
   Minimal interactivity: menu toggle, collapsible, active nav, scroll fade-in
   ========================================================================== */


async function loadComponents() {
  const navEl = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  
  if (navEl) {
    const res = await fetch('/components/nav.html');
    navEl.innerHTML = await res.text();
  }
  if (footerEl) {
    const res = await fetch('/components/footer.html');
    footerEl.innerHTML = await res.text();
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadComponents();


  /* -----------------------------------------------------------------------
     1. Mobile Hamburger Menu Toggle
     ----------------------------------------------------------------------- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);

      // Swap icon: hamburger ↔ close
      const icon = hamburger.querySelector('svg');
      if (isOpen) {
        icon.innerHTML = '<line x1="6" y1="6" x2="18" y2="18"></line><line x1="6" y1="18" x2="18" y2="6"></line>';
      } else {
        icon.innerHTML = '<line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="14" x2="20" y2="14"></line><line x1="4" y1="20" x2="20" y2="20"></line>';
      }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('svg');
        icon.innerHTML = '<line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="14" x2="20" y2="14"></line><line x1="4" y1="20" x2="20" y2="20"></line>';
      });
    });
  }

  /* -----------------------------------------------------------------------
     2. Active Navigation Link
     ----------------------------------------------------------------------- */
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pathname || 
        (pathname === '/' && href === '/') ||
        (pathname === '/index.html' && href === '/')) {
      link.classList.add(
        link.classList.contains('nav__link') ? 'nav__link--active' : 'nav__mobile-link--active'
      );
    }
  });

  /* -----------------------------------------------------------------------
     3. Collapsible Toggle (Bio page)
     ----------------------------------------------------------------------- */
  document.querySelectorAll('.collapsible__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const collapsible = trigger.closest('.collapsible');
      collapsible.classList.toggle('is-open');
      
      const isOpen = collapsible.classList.contains('is-open');
      trigger.setAttribute('aria-expanded', isOpen);
    });
  });

  /* -----------------------------------------------------------------------
     4. Scroll Fade-In Animation
     ----------------------------------------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }
});
