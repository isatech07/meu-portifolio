// script.js - CORRIGIDO (sem alterar a estrutura geral)

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // AOS Init
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out'
  });

  // Typed Effect
  const texts = ["Portfólio Pessoal", "Jornada Profissional", "Conquistas e Ideias"];
  let count = 0;
  let index = 0;
  let currentText = '';
  let letter = '';

  function type() {
    if (count === texts.length) {
      count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('typed-text').textContent = letter;
    if (index === currentText.length) {
      setTimeout(() => {
        erase();
      }, 2000);
    } else {
      setTimeout(type, 100);
    }
  }

  function erase() {
    if (index > 0) {
      letter = currentText.slice(0, --index);
      document.getElementById('typed-text').textContent = letter;
      setTimeout(erase, 50);
    } else {
      count++;
      setTimeout(type, 500);
    }
  }

  setTimeout(type, 1000);

  // Theme Toggle - CORRIGIDO
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      body.classList.remove('dark');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // Load saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  // Skills Animation
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillsSection = document.getElementById('habilidades');

  const animateSkills = () => {
    skillBars.forEach(bar => {
      const percent = bar.getAttribute('data-percent');
      bar.style.width = percent + '%';
    });
  };

  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSkills();
      skillsObserver.unobserve(skillsSection);
    }
  }, { threshold: 0.5 });

  skillsObserver.observe(skillsSection);

  // Particles
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#4f46e5' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#3b82f6', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
      modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  // Modal
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  window.openModal = function(id) {
    const projects = {
      portfolio1: {
        title: 'Projeto Destacado 1',
        desc: 'Detalhes completos sobre o projeto, incluindo objetivos, metodologias usadas e resultados obtidos. Este projeto destacou-se por sua inovação e impacto no setor.',
        img: 'images/portfolio1.jpg',
        link: '#'
      },
      portfolio2: {
        title: 'Projeto Destacado 2',
        desc: 'Exploração profunda de um trabalho colaborativo, com ênfase em desafios superados e lições aprendidas.',
        img: 'images/portfolio2.jpg',
        link: '#'
      },
      portfolio3: {
        title: 'Projeto Destacado 3',
        desc: 'Análise de um projeto recente, demonstrando expertise e adaptação a tendências atuais.',
        img: 'images/portfolio3.jpg',
        link: '#'
      }
    };

    const project = projects[id];
    modalBody.innerHTML = `
      <img src="${project.img}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <a href="${project.link}" target="_blank">Ver Projeto Completo</a>
    `;
    modal.classList.add('show');
  };

  window.closeModal = function() {
    modal.classList.remove('show');
  };

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // EmailJS
  (function(){
    emailjs.init("SEU_USER_ID_AQUI");
  })();

  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');

    emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', this)
      .then(() => {
        status.textContent = 'Mensagem enviada com sucesso!';
        status.style.color = '#10b981';
        this.reset();
      }, (err) => {
        status.textContent = 'Erro ao enviar. Tente novamente.';
        status.style.color = '#ef4444';
      });
  });
});