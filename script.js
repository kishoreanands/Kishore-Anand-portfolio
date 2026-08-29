/* ==========================================================================
   KISHORE ANAND S - PORTFOLIO INTERACTIVE SCRIPT
   Features: Particle Canvas, Interactive Cards, Project Modals, Scroll Handling
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Background Particle & Constellation Canvas ---
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(157, 78, 221, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 242, 254, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting circuit lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // --- 2. Dynamic Navbar & Scroll Progress Bar ---
  const navbar = document.querySelector('.navbar');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    // Scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';

    // Navbar Scrolled Glass effect
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 500) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- 3. Mobile Navigation Menu Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // --- 4. IntersectionObserver for Active Nav Link & Skill Bars ---
  const sections = document.querySelectorAll('section[id]');
  const navLinkElems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinkElems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // Skill Bar Progress Animation on Scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-level');
        entry.target.style.width = targetWidth + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // --- 5. Typing Effect in Hero Section ---
  const typingElem = document.getElementById('typing-text');
  if (typingElem) {
    const roles = [
      'Electronics & Communication Undergraduate',
      'Aspiring Java Developer',
      'Web Developer',
      'VLSI & Embedded Systems Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElem.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typingElem.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at top
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // --- 6. Interactive Project Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-wrapper');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- 7. Project Modal Popup Functionality ---
  const modalData = {
    water: {
      title: 'Automated Municipal Water Flow Control Using Flow Sensor',
      category: 'Hardware & IoT / Embedded Systems',
      description: 'Designed an IoT-based municipal water management system using sensors for real-time water monitoring and automated usage tracking.',
      features: [
        'Real-time flow monitoring using high-precision water flow sensors.',
        'Automated abnormal flow & leak detection with instant shut-off capability.',
        'Automated usage tracking and real-time billing generation with detailed reports.',
        'Significantly reduces municipal water wastage through automated valve control.'
      ],
      tech: ['IoT', 'Flow Sensors', 'Embedded Systems', 'Automated Billing']
    },
    bms: {
      title: 'Battery Management System (BMS) for EV Vehicles with Regenerative Charging',
      category: 'Hardware & EV Technology',
      description: 'Developed a Battery Management System aimed at enhancing battery safety, cell monitoring, and energy efficiency in Electric Vehicles.',
      features: [
        'Precise cell voltage, temperature, and current state-of-charge (SoC) monitoring.',
        'Integrated regenerative braking energy harvesting to recharge battery pack dynamically.',
        'Over-charge, over-discharge, and thermal runaway safety cut-off mechanisms.',
        'Extends operational battery life cycle and overall vehicle driving efficiency.'
      ],
      tech: ['Embedded Systems', 'Regenerative Charging', 'EV Technology', 'Cell Monitoring']
    },
    eduai: {
      title: 'EduAI – Smart Learning Assistant',
      category: 'Software & Artificial Intelligence',
      description: 'Developed an AI-powered smart learning platform designed to assist students with personalized study recommendations, automated quiz generation, and progress tracking.',
      features: [
        'Personalized adaptive learning pathways based on individual student performance.',
        'Automated quiz and flashcard generation from study notes.',
        'Interactive query resolution assistant for instant academic doubt clearing.',
        'Real-time analytics dashboard to visualize student learning velocity and progress.'
      ],
      tech: ['AI', 'Machine Learning', 'Web Technologies', 'Adaptive Learning']
    }
  };

  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalTechTags = document.getElementById('modalTechTags');

  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-project');
      const data = modalData[key];

      if (data && modalBackdrop) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDesc.textContent = data.description;

        modalFeatures.innerHTML = '';
        data.features.forEach(feat => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${feat}`;
          modalFeatures.appendChild(li);
        });

        modalTechTags.innerHTML = '';
        data.tech.forEach(t => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = t;
          modalTechTags.appendChild(span);
        });

        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  // --- 7b. Profile Resume Modal Popup Functionality ---
  const profileModal = document.getElementById('profileModal');
  const openProfileBtn = document.getElementById('openProfileModalBtn');
  const closeProfileBtn = document.getElementById('profileModalCloseBtn');
  const closeProfileActionBtn = document.getElementById('closeProfileModalAction');
  const printProfileBtn = document.getElementById('printProfileBtn');

  function openProfileModal() {
    if (profileModal) {
      profileModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeProfileModal() {
    if (profileModal) {
      profileModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  openProfileBtn?.addEventListener('click', openProfileModal);
  closeProfileBtn?.addEventListener('click', closeProfileModal);
  closeProfileActionBtn?.addEventListener('click', closeProfileModal);
  profileModal?.addEventListener('click', (e) => {
    if (e.target === profileModal) closeProfileModal();
  });

  printProfileBtn?.addEventListener('click', () => {
    window.print();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalBackdrop?.classList.contains('open')) closeModal();
      if (profileModal?.classList.contains('open')) closeProfileModal();
    }
  });

  // --- 8. Contact Form Handling (Automated Direct Email Delivery) ---
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Email...`;
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formsubmit.co/ajax/kishoreanand876@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `ProfoLink Message from ${name}: ${subject}`,
          message: message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Sent to Kishore!`;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        if (toast) {
          const toastText = toast.querySelector('span');
          if (toastText) toastText.textContent = 'Message sent directly to Kishore Anand’s email!';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 5000);
        }

        contactForm.reset();
      } else {
        throw new Error('Form submission response not OK');
      }
    } catch (err) {
      console.warn('Direct API submission encountered network issue, activating client mailto fallback...', err);
      submitBtn.innerHTML = `<i class="fa-solid fa-envelope-open-text"></i> Opening Mail Client...`;
      const mailtoUrl = `mailto:kishoreanand876@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;

      if (toast) {
        const toastText = toast.querySelector('span');
        if (toastText) toastText.textContent = 'Opening your email client to complete sending...';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
      }
      contactForm.reset();
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 4000);
    }
  });

  // --- 9. 3D Tilt Effect on Glass Cards ---
  const tiltCards = document.querySelectorAll('.glass-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
});
