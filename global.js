document.addEventListener("DOMContentLoaded", () => {
  // --- CARREGAMENTO DO CORPO DA PÁGINA ---
  // Adiciona a classe para mostrar o corpo, já que o preloader não está aqui.
  document.body.classList.add("loaded");

  // --- MENU MOBILE ---
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("open");
      menuBtn.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", menu.classList.contains("open"));
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('open')) {
          menu.classList.remove('open');
          menuBtn.classList.remove('open');
          menuBtn.setAttribute("aria-expanded", false);
        }
      });
    });
  }

  // --- ANIMAÇÕES DE SCROLL FADE-IN (IntersectionObserver) ---
  const fadeInElements = document.querySelectorAll(".fade-in");
  if (fadeInElements.length > 0) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeInElements.forEach((el) => observer.observe(el));
  }
});
