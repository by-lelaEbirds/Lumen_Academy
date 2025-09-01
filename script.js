// Toggle do menu mobile
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// Formulários (simulação)
function handleSubmit(e) {
  e.preventDefault();
  alert("Obrigado! Em breve nossa equipe confirmará sua visita.");
  return false;
}

function handleLead(e) {
  e.preventDefault();
  alert("E‑book enviado para seu e‑mail. Bem‑vindo à newsletter Lumen!");
  closeModal();
  return false;
}

// Modal
function openModal() {
  document.getElementById("modal").style.display = "grid";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// CTA de grupo (simulado)
function joinGroup() {
  alert("Link do grupo enviado para seu e‑mail cadastrado.");
}

// ANIMAÇÃO DE SCROLL (NOVO)
document.addEventListener("DOMContentLoaded", () => {
  const fadeInElements = document.querySelectorAll(".fade-in");

  const observerOptions = {
    root: null, // usa o viewport como área de observação
    rootMargin: "0px",
    threshold: 0.1 // aciona quando 10% do elemento está visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // para a observação após animar
      }
    });
  }, observerOptions);

  fadeInElements.forEach(el => {
    observer.observe(el);
  });
});
