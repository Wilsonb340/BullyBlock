document.addEventListener("DOMContentLoaded", () => {
    // Botón "Empezar" en la sección Hero
    const startButton = document.querySelector(".button-primary");
    startButton.addEventListener("click", () => {
      alert("¡Bienvenido a Bully-Blocker! Regístrate o inicia sesión para comenzar.");
    });
  
    // Botón "Más información" en la sección Hero
    const moreInfoButton = document.querySelector(".button-outline");
    moreInfoButton.addEventListener("click", () => {
      scrollToSection(".features");
    });
  
    // Enlaces de navegación
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const sectionId = link.getAttribute("href").substring(1);
        scrollToSection(`.${sectionId}`);
      });
    });
  
    // Botones de Sign In y Sign Up
    const signInButton = document.querySelector(".button-outline");
    const signUpButton = document.querySelector(".button-primary");
  
    signInButton.addEventListener("click", () => {
      alert("Redirigiendo a la página de inicio de sesión...");
    });
  
    signUpButton.addEventListener("click", () => {
      alert("Redirigiendo a la página de registro...");
    });
  });
  
  // Función de desplazamiento suave a una sección
  function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  }
  