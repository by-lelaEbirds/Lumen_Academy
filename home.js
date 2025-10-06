document.addEventListener("DOMContentLoaded", () => {
  
  // --- PRELOADER ---
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("hidden");
      // A classe .loaded é adicionada pelo global.js, mas garantimos aqui também.
      document.body.classList.add("loaded");
    });
  }

  // --- EFEITO PARALLAX ---
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
  }

  // --- MODAL ---
  const modal = document.getElementById("modal");
  const openModalBtns = document.querySelectorAll("#openModalBtnHero, #openModalBtnCta");
  const closeModalBtn = document.getElementById("closeModalBtn");
  if (modal && openModalBtns.length > 0 && closeModalBtn) {
    const openModal = () => modal.classList.add("visible");
    const closeModal = () => modal.classList.remove("visible");
    
    openModalBtns.forEach(btn => btn.addEventListener("click", openModal));
    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => e.target === modal && closeModal());
    document.addEventListener('keydown', (e) => e.key === "Escape" && modal.classList.contains('visible') && closeModal());
  }

  // --- FORMULÁRIOS E CTAs ---
  const handleFormSubmit = (e, successMessage) => {
    e.preventDefault();
    const form = e.target, note = form.nextElementSibling, originalNoteText = note ? note.textContent : "";
    const btn = form.querySelector('button[type="submit"]'), originalBtnText = btn.textContent;
    btn.disabled = true; btn.textContent = "Enviando...";
    setTimeout(() => {
      form.reset(); btn.disabled = false; btn.textContent = originalBtnText;
      if (note) { note.textContent = successMessage; note.style.color = "var(--gold)"; }
      if (form.id === 'form-lead') {
        const modalToClose = document.getElementById("modal");
        if(modalToClose) {
          setTimeout(() => modalToClose.classList.remove("visible"), 2000);
        }
      }
      setTimeout(() => { if (note) { note.textContent = originalNoteText; note.style.color = ""; } }, 5000);
    }, 1500);
  };
  
  const formAdmissoes = document.getElementById("form-admissoes");
  if (formAdmissoes) {
    formAdmissoes.addEventListener("submit", (e) => handleFormSubmit(e, "Obrigado! Em breve confirmaremos sua visita."));
  }

  const formLead = document.getElementById("form-lead");
  if (formLead) {
    formLead.addEventListener("submit", (e) => handleFormSubmit(e, "E-book enviado! Bem-vindo(a) à Lumen."));
  }

  // --- ACCORDION ---
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
          const content = item.querySelector(".accordion-content");
          item.classList.toggle('active');
          if (item.classList.contains('active')) {
              content.style.maxHeight = content.scrollHeight + "px";
              content.style.padding = "0 24px 18px";
          } else {
              content.style.maxHeight = "0";
              content.style.padding = "0 24px";
          }
      });
    });
  }
  
  // --- ANIMAÇÃO DOS CONTADORES (IntersectionObserver) ---
  const statsSection = document.getElementById("stats");
  if(statsSection) {
    let statsAnimated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          const counters = document.querySelectorAll(".stat-number");
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
              const increment = target / 100;
              if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          });
          statsAnimated = true;
        }
      });
    }, { threshold: 0.7 }); // 70% da seção visível para animar
    observer.observe(statsSection);
  }
});
