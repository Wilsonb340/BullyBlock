// Obtener elementos del DOM
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

// Añadir evento de clic al botón del menú
menuButton.addEventListener("click", (event) => {
    // Evitar que el clic en el botón cierre el menú inmediatamente
    event.stopPropagation();
    // Alternar la clase 'active' en el contenedor del menú
    menu.classList.toggle("active");
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", (event) => {
    // Verificar si el clic no fue dentro del menú ni en el botón del menú
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove("active");
    }
});
