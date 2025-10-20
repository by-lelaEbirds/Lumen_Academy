document.addEventListener("DOMContentLoaded", () => {
  
  // --- PRELOADER ---
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("hidden");
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

  // --- FORMULÁRIOS E CTAs ---
  // Apenas a função para o formulário de Admissões permanece
  const handleFormSubmit = (e, successMessage) => {
    e.preventDefault();
    const form = e.target, note = form.nextElementSibling, originalNoteText = note ? note.textContent : "";
    const btn = form.querySelector('button[type="submit"]'), originalBtnText = btn.textContent;
    btn.disabled = true; btn.textContent = "Enviando...";
    setTimeout(() => {
      form.reset(); btn.disabled = false; btn.textContent = originalBtnText;
      if (note) { note.textContent = successMessage; note.style.color = "var(--gold)"; }
      setTimeout(() => { if (note) { note.textContent = originalNoteText; note.style.color = ""; } }, 5000);
    }, 1500);
  };
  
  const formAdmissoes = document.getElementById("form-admissoes");
  if (formAdmissoes) {
    formAdmissoes.addEventListener("submit", (e) => handleFormSubmit(e, "Obrigado! Em breve confirmaremos sua visita."));
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
  
  // --- ANIMAÇÃO DOS CONTADORES ---
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
    }, { threshold: 0.7 });
    observer.observe(statsSection);
  }
});
