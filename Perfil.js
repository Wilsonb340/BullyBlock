// Código que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la pestaña "informacion" por defecto al cargar la página
    showTab('informacion');
});

// Función para mostrar y ocultar las pestañas
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    for (let tab of tabs) {
        tab.style.display = 'none'; // Ocultar todas las pestañas
    }
    document.getElementById(tabId).style.display = 'block'; // Mostrar la pestaña seleccionada
}

// Función para cambiar la foto de perfil (por ahora muestra un alert)
function changePhoto() {
    alert("Función para cambiar foto activada.");
}

// Función para guardar los cambios realizados en el perfil (por ahora muestra un alert)
function saveChanges() {
    alert("Cambios guardados.");
}

// Función para cambiar la contraseña (por ahora muestra un alert)
function changePassword() {
    alert("Contraseña cambiada.");
}

// Obtener elementos del DOM para el menú lateral
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
