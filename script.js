/* ==========================================================================
   KISHORE ANAND S - PORTFOLIO INTERACTIVITY SCRIPT
   Features: Theme Switcher, Role Typewriter, Cert Filter, Modals, Forms
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

  // ================= 2. ROLE TYPEWRITER ANIMATION =================
  const roleTypingElem = document.getElementById('roleTyping');
  if (roleTypingElem) {
    const roles = [
      'Java & Software Developer',
      'Embedded Systems Engineer',
      'IoT Flow Automation Architect',
      'VLSI Chip Design Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeRoles() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        roleTypingElem.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        roleTypingElem.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1600; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 350;
      }

      setTimeout(typeRoles, typingSpeed);
    }

    typeRoles();
  }

  // ================= 3. MOBILE NAVBAR TOGGLE =================
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

  // ================= 4. SCROLL SPY & STICKY HEADER =================
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
      header.classList.toggle('sticky', top > 60);
    }
  });

  // ================= 5. ABOUT READ MORE TOGGLE =================
  const readMoreBtn = document.getElementById('readMoreBtn');
  const moreText = document.getElementById('moreText');

  readMoreBtn?.addEventListener('click', () => {
    const isShowing = moreText.classList.toggle('show');
    readMoreBtn.textContent = isShowing ? 'Read Less' : 'Read More';
  });

  // ================= 6. CERTIFICATION FILTER TABS =================
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card-item');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ================= 7. MODALS DATA & FUNCTIONALITY =================
  const modalData = {
    // Project Modals
    water: {
      title: 'Automated Municipal Water Flow Control Using Flow Sensor',
      category: 'IoT & Hardware Automation',
      description: 'An automated IoT municipal water distribution and conservation platform engineered to eliminate water waste, monitor consumption telemetry in real time, and prevent unauthorized usage.',
      features: [
        'Real-time water flow telemetry using high-precision Hall-effect flow sensors.',
        'Automatic abnormal pressure and leak detection with instant solenoid valve shut-off.',
        'Automated digital usage tracking and real-time billing report generation.',
        'Significantly reduces municipal distribution losses and optimizes water equity.'
      ],
      tags: ['IoT', 'Flow Sensors', 'Embedded Systems', 'Automated Billing']
    },
    bms: {
      title: 'Battery Management System (BMS) for EV Vehicles with Regenerative Charging',
      category: 'EV Hardware & Safety Systems',
      description: 'An advanced Battery Management System tailored for Electric Vehicles to ensure cell safety, accurate state-of-charge calculation, and dynamic regenerative energy recapture.',
      features: [
        'Precise multi-cell voltage, current, temperature, and State-of-Charge (SoC) telemetry.',
        'Integrated regenerative braking kinetic energy recapture circuit for extended range.',
        'Automated protection cut-offs against over-charging, thermal runaway, and deep discharge.',
        'Significantly extends overall vehicle driving efficiency and battery pack lifecycle.'
      ],
      tags: ['Embedded Systems', 'Regenerative Charging', 'EV Technology', 'Cell Monitoring']
    },
    eduai: {
      title: 'EduAI – Smart Learning Assistant',
      category: 'Artificial Intelligence & Web Application',
      description: 'An AI-powered adaptive learning assistant platform designed to accelerate student learning efficiency through personalized study recommendations and dynamic quizzes.',
      features: [
        'Adaptive study pathway recommendation engine tailored to student learning velocity.',
        'Automated concept quiz and flashcard generation directly from study lecture materials.',
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
        'Object-oriented principles, modular architecture, and clean code practices.',
        'Data structures and algorithm optimization (actively solving on LeetCode & HackerRank).',
        'Relational database design and integration using MySQL and complex SQL queries.',
        'Backend server workflows and robust error handling.'
      ],
      tags: ['Core Java', 'OOP', 'Data Structures', 'MySQL', 'Problem Solving']
    },
    embedded: {
      title: 'Embedded System Design Focus',
      category: 'Hardware Engineering (Certified by Maven Silicon)',
      description: 'Specialized embedded systems development covering microcontroller architectures, processor interfacing, and firmware integration.',
      features: [
        'Embedded C programming for microcontrollers and system peripherals.',
        'Hardware description and processor architecture foundations (RISC-V ecosystem).',
        'Sensor integration, analog-to-digital conversion, and actuator control.',
        'Low-power optimization and real-time response mechanisms.'
      ],
      tags: ['Embedded C', 'Maven Silicon', 'RISC-V', 'Microcontrollers', 'Firmware']
    },
    iot: {
      title: 'IoT & Flow Automation Focus',
      category: 'Smart Infrastructure (Certified by Cisco Academy)',
      description: 'Developing responsive hardware-to-cloud IoT architectures that solve real-world municipal and resource conservation problems.',
      features: [
        'Cisco Networking Academy certified IoT and digital transformation knowledge.',
        'Microcontroller interfacing with precision flow and environmental sensors.',
        'Actuator and solenoid valve control circuits for automated municipal intervention.',
        'Usage telemetry and cloud communication protocols.'
      ],
      tags: ['IoT', 'Cisco Academy', 'Flow Automation', 'Smart Cities', 'Sensors']
    },
    bms: {
      title: 'EV BMS & VLSI Design Focus',
      category: 'Advanced Hardware & Semiconductor Engineering',
      description: 'Combining EV battery management safety architectures with digital VLSI chip design verified by Maven Silicon.',
      features: [
        'State-of-Charge (SoC) calculation, temperature regulation, and cell-balancing logic.',
        'Regenerative kinetic energy recapture integration for electric vehicle powertrains.',
        'RTL synthesis, Verilog HDL coding, and digital system verification fundamentals.',
        'Semiconductor fabrication and ASIC chip design flow methodologies.'
      ],
      tags: ['EV BMS', 'VLSI', 'Maven Silicon', 'Verilog', 'Battery Safety']
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

  // ================= 8. CONTACT FORM HANDLING =================
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
      console.warn('Direct API submission encountered issue, opening mail client...', err);
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
