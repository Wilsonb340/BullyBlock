document.getElementById('postForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recargar la página)
  
  var postContent = document.getElementById('postContent').value;

  // Verificar si hay contenido
  if (postContent.trim() === "") {
    alert("Por favor, ingrese contenido para la publicación.");
    return;  // Detener el envío si el contenido está vacío
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../php/ForoAnonimo.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
    if (xhr.status === 200) {
      // Después de guardar, actualiza las publicaciones en la página
      loadPosts();  // Cargar las publicaciones actualizadas
    } else {
      alert("Error al publicar. Inténtalo nuevamente.");
    }
  };

  xhr.send('postContent=' + encodeURIComponent(postContent));
});

// Función para cargar las publicaciones con AJAX
function loadPosts() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../php/Guardarpost.php', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      document.getElementById('posts').innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}

// Cargar las publicaciones cuando se carga la página
window.onload = loadPosts;
