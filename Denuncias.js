document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  // Función para mostrar el contenido de la pestaña seleccionada
  function showTabContent(tab) {
    const target = tab.getAttribute("data-tab");

    // Ocultar todos los contenidos de las pestañas
    tabContents.forEach(content => {
      content.classList.remove("active");
    });

    // Mostrar el contenido de la pestaña seleccionada
    document.getElementById(target).classList.add("active");

    // Marcar la pestaña como activa
    tabs.forEach(t => {
      t.classList.remove("active");
    });
    tab.classList.add("active");
  }

  // Añadir evento de clic a cada pestaña
  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      showTabContent(tab);
    });
  });

  // Manejar el envío del formulario
  const form = document.getElementById("denuncia-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Aquí puedes agregar la lógica para manejar el envío de la denuncia
    alert("Denuncia enviada correctamente.");
    form.reset(); // Reiniciar el formulario
  });
});