document.addEventListener("DOMContentLoaded", () => {
  // --- PRELOADER ---
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    preloader.classList.add("hidden");
    document.body.classList.add("loaded");
  });

  // --- MENU MOBILE ---
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  menuBtn?.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuBtn.classList.toggle("open");
    const isExpanded = menu.classList.contains("open");
    menuBtn.setAttribute("aria-expanded", isExpanded);
  });
  
  // Fecha o menu ao clicar em um link
  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if(menu.classList.contains('open')) {
        menu.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute("aria-expanded", false);
      }
    });
  });

  // --- MODAL ---
  const modal = document.getElementById("modal");
  const openModalBtns = document.querySelectorAll("#openModalBtnHero, #openModalBtnCta, #openModalBtnLead");
  const closeModalBtn = document.getElementById("closeModalBtn");

  const openModal = () => modal.classList.add("visible");
  const closeModal = () => modal.classList.remove("visible");

  openModalBtns.forEach(btn => btn.addEventListener("click", openModal));
  closeModalBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(); // Fecha se clicar fora do conteúdo
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && modal.classList.contains('visible')) {
        closeModal();
    }
  });

  // --- FUNÇÕES DE FORMULÁRIO E CTA ---
  const formAdmissoes = document.getElementById("form-admissoes");
  const formLead = document.getElementById("form-lead");
  const joinGroupBtn = document.getElementById("joinGroupBtn");

  const handleFormSubmit = (e, successMessage) => {
    e.preventDefault();
    const form = e.target;
    const note = form.nextElementSibling;
    const originalNoteText = note.textContent;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    setTimeout(() => {
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;

      if (note) {
        note.textContent = successMessage;
        note.style.color = "var(--gold)";
      }
      
      if(form.id === 'form-lead') {
        setTimeout(closeModal, 2000); // Fecha modal após sucesso
      }

      // Restaura a mensagem original após alguns segundos
      setTimeout(() => {
        if (note) {
          note.textContent = originalNoteText;
          note.style.color = "var(--gray-400)";
        }
      }, 5000);

    }, 1500);
  };
  
  const handleJoinGroup = (e) => {
     const button = e.target;
     button.textContent = "Link enviado!";
     button.disabled = true;
     
     setTimeout(() => {
        button.textContent = "Entrar no grupo";
        button.disabled = false;
     }, 3000);
  }

  formAdmissoes?.addEventListener("submit", (e) => handleFormSubmit(e, "Obrigado! Em breve nossa equipe confirmará sua visita."));
  formLead?.addEventListener("submit", (e) => handleFormSubmit(e, "E-book enviado! Bem-vindo(a) à newsletter Lumen."));
  joinGroupBtn?.addEventListener('click', handleJoinGroup);


  // --- ANIMAÇÃO DE SCROLL (IntersectionObserver) ---
  const fadeInElements = document.querySelectorAll(".fade-in");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach((el) => {
    observer.observe(el);
  });
});
