/* ==========================================================================
   KISHORE ANAND S - PORTFOLIO INTERACTIVITY SCRIPT
   Style Reference: https://nishwapandiyan.github.io/Portfolio/
   Features: Theme Switcher, Mobile Nav, Scroll Spy, Swiper, Modals & Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. THEME SWITCHER (DARK / LIGHT MODE) =================
  const darkModeIcon = document.getElementById('dark-mode');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (darkModeIcon) {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
    }
  }

  darkModeIcon?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    darkModeIcon.classList.toggle('fa-moon', !isDark);
    darkModeIcon.classList.toggle('fa-sun', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // ================= 2. MOBILE NAVBAR TOGGLE =================
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.querySelector('.navbar');

  menuIcon?.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
  });

  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      menuIcon?.classList.add('fa-bars');
      menuIcon?.classList.remove('fa-xmark');
      navbar?.classList.remove('active');
    });
  });

  // ================= 3. SCROLL SPY & STICKY HEADER =================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const top = window.scrollY;

    sections.forEach(sec => {
      const offset = sec.offsetTop - 160;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`header nav a[href*=${id}]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });

    if (header) {
      header.classList.toggle('sticky', top > 80);
    }
  });

  // ================= 4. ABOUT SECTION READ MORE TOGGLE =================
  const readMoreBtn = document.getElementById('readMoreBtn');
  const moreText = document.getElementById('moreText');

  readMoreBtn?.addEventListener('click', () => {
    const isShowing = moreText.classList.toggle('show');
    readMoreBtn.textContent = isShowing ? 'Read Less' : 'Read More';
  });

  // ================= 5. SWIPER CREDENTIALS SLIDER =================
  if (typeof Swiper !== 'undefined') {
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
        }
      }
    });
  }

  // ================= 6. MODALS LOGIC =================
  const modalData = {
    // Project Modals
    water: {
      title: 'Automated Municipal Water Flow Control Using Flow Sensor',
      category: 'IoT & Hardware Automation',
      description: 'An automated IoT municipal water distribution and conservation platform engineered to eliminate water waste, monitor consumption telemetry, and prevent unauthorized usage.',
      features: [
        'Real-time water flow telemetry using high-precision Hall-effect flow sensors.',
        'Automatic abnormal pressure and leak detection with instant valve shut-off.',
        'Automated digital usage tracking and real-time billing generation.',
        'Significantly reduces municipal distribution losses and optimizes water equity.'
      ],
      tags: ['IoT', 'Flow Sensors', 'Embedded Systems', 'Automated Billing']
    },
    bms: {
      title: 'Battery Management System (BMS) for EV Vehicles with Regenerative Charging',
      category: 'EV Hardware & Safety Systems',
      description: 'An advanced Battery Management System tailored for Electric Vehicles to ensure cell safety, accurate state-of-charge calculation, and dynamic regenerative energy recapture.',
      features: [
        'Precise cell voltage, current, temperature, and State-of-Charge (SoC) telemetry.',
        'Integrated regenerative braking kinetic energy recapture circuit.',
        'Automated protection cut-offs against over-charging, thermal runaway, and deep discharge.',
        'Significantly extends overall vehicle driving range and battery lifecycle.'
      ],
      tags: ['Embedded Systems', 'Regenerative Charging', 'EV Technology', 'Cell Monitoring']
    },
    eduai: {
      title: 'EduAI – Smart Learning Assistant',
      category: 'Artificial Intelligence & Web Application',
      description: 'An AI-powered adaptive learning assistant platform designed to accelerate student learning efficiency through personalized study recommendations and dynamic quizzes.',
      features: [
        'Adaptive study pathway recommendation engine tailored to student learning velocity.',
        'Automated concept quiz and flashcard generation directly from study materials.',
        'Interactive AI academic doubt resolution assistant.',
        'Visual progress tracking dashboard with learning analytics.'
      ],
      tags: ['AI', 'Machine Learning', 'Web Technologies', 'Adaptive Learning']
    },
    // Specialization Modals
    java: {
      title: 'Java & Software Engineering Focus',
      category: 'Core Competency',
      description: 'Focused software engineering practice building scalable, structured applications using modern Java development standards.',
      features: [
        'Object-oriented principles, design patterns, and clean code practices.',
        'Data structures and algorithm optimization (actively practicing on LeetCode & HackerRank).',
        'Relational database design and integration using MySQL.',
        'Backend server workflows and RESTful architecture basics.'
      ],
      tags: ['Core Java', 'OOP', 'Data Structures', 'MySQL', 'Problem Solving']
    },
    vlsi: {
      title: 'VLSI & Chip Design Focus',
      category: 'Hardware Engineering',
      description: 'Specialized digital circuit engineering and semiconductor workflow training certified by Maven Silicon.',
      features: [
        'Digital electronics foundations and combinational/sequential logic design.',
        'Hardware description modeling with Verilog HDL.',
        'RTL synthesis, simulation, and timing verification fundamentals.',
        'Industry semiconductor fabrication and chip design flow knowledge.'
      ],
      tags: ['VLSI', 'Verilog HDL', 'RTL Design', 'Digital Logic', 'Maven Silicon']
    },
    iot: {
      title: 'IoT & Municipal Flow Automation Focus',
      category: 'Embedded & Smart Infrastructure',
      description: 'Developing responsive hardware-to-cloud IoT architectures that solve real municipal and resource conservation problems.',
      features: [
        'Microcontroller interfacing with flow and environmental sensors.',
        'Actuator and solenoid valve control circuits for automated intervention.',
        'Usage data telemetry and cloud analytics integration.',
        'Low-power embedded systems firmware design.'
      ],
      tags: ['IoT', 'Microcontrollers', 'Flow Automation', 'Smart Cities']
    }
  };

  const detailsModal = document.getElementById('detailsModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalTags = document.getElementById('modalTags');

  function openDetailsModal(key) {
    const data = modalData[key];
    if (!data || !detailsModal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDescription.textContent = data.description;

    modalFeatures.innerHTML = '';
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      modalFeatures.appendChild(li);
    });

    modalTags.innerHTML = '';
    data.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      modalTags.appendChild(span);
    });

    detailsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailsModal() {
    detailsModal?.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  document.querySelectorAll('.btn-project-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      openDetailsModal(key);
    });
  });

  document.querySelectorAll('.btn-service-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-modal');
      openDetailsModal(key);
    });
  });

  modalCloseBtn?.addEventListener('click', closeDetailsModal);
  detailsModal?.addEventListener('click', (e) => {
    if (e.target === detailsModal) closeDetailsModal();
  });

  // --- Profile / CV Modal ---
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
      closeDetailsModal();
      closeProfileModal();
    }
  });

  // ================= 7. CONTACT FORM SUBMISSION =================
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('userName')?.value.trim();
    const email = document.getElementById('userEmail')?.value.trim();
    const phone = document.getElementById('userPhone')?.value.trim() || 'N/A';
    const subject = document.getElementById('subject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('message')?.value.trim();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
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
          phone: phone,
          _subject: `Portfolio Message from ${name}: ${subject}`,
          message: message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        showToast('Message sent directly to Kishore Anand’s email!');
        contactForm.reset();
      } else {
        throw new Error('Server returned non-200 status');
      }
    } catch (err) {
      console.warn('Network issue with direct API dispatch, triggering mailto client fallback...', err);
      const mailtoUrl = `mailto:kishoreanand876@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
      showToast('Opening your email client to send message...');
      contactForm.reset();
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });

  function showToast(msg) {
    if (toast) {
      const toastSpan = toast.querySelector('span');
      if (toastSpan) toastSpan.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

});
