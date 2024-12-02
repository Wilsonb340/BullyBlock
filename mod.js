// Variable para el contador de solicitudes
let caseIdCounter = 4;  // Empezamos desde 4 ya que hay 4 casos iniciales

// Función para abrir/cerrar la barra lateral
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

// Función para mostrar/ocultar el menú del perfil
function toggleProfileMenu() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Cierra los menús al hacer clic fuera de ellos
window.addEventListener('click', function (e) {
  const sidebar = document.getElementById('sidebar');
  const dropdown = document.getElementById('profileDropdown');
  const modal = document.getElementById('caseModal');
  
  // Cierra la barra lateral si el clic es fuera de ella
  if (!e.target.closest('.menu-btn') && !e.target.closest('.sidebar')) {
    sidebar.classList.remove('open');
  }

  // Cierra el menú de perfil si el clic es fuera de él
  if (!e.target.closest('.profile-icon') && !e.target.closest('#profileDropdown')) {
    dropdown.style.display = 'none';
  }

  // Cierra el modal de detalles si el clic es fuera de él
  if (e.target === modal) {
    closeModal();
  }
});

// Función para mostrar detalles del caso en un modal
function showCaseDetails(caseId) {
  const caseDetailsContainer = document.getElementById('caseDetails');
  let caseDetails = '';
  let statusOptions = `
    <select id="statusSelect" onchange="updateCaseStatus('${caseId}')">
      <option value="Solicitud">Solicitud</option>
      <option value="Pendiente">Pendiente</option>
      <option value="Resuelto">Resuelto</option>
      <option value="Rechazado">Rechazado</option>
    </select>
  `;
  let deleteButton = `<button id="deleteBtn" onclick="deleteCase('${caseId}')">Eliminar Solicitud</button>`;

  // Obtener los datos del caso y mostrar en el modal
  const caseRow = document.querySelector(`tr[data-case-id="${caseId}"]`);
  const status = caseRow.querySelector('td:nth-child(2)').textContent;
  const date = caseRow.querySelector('td:nth-child(3)').textContent;

  caseDetails = `
    <p><strong>Estado:</strong> ${status}</p>
    <p><strong>Descripción:</strong> Este es un caso de ejemplo.</p>
    <p><strong>Fecha:</strong> ${date}</p>
    ${statusOptions}
    ${deleteButton}
  `;

  caseDetailsContainer.innerHTML = caseDetails;
  const modal = document.getElementById('caseModal');
  modal.style.display = 'block';  // Muestra el modal con los detalles
}

// Cerrar el modal de detalles del caso
function closeModal() {
  const modal = document.getElementById('caseModal');
  modal.style.display = 'none';  // Oculta el modal
}

// Mostrar el modal para agregar citas
function addEvent(date) {
  const eventModal = document.getElementById('eventModal');
  document.getElementById('eventDate').value = date; // Asigna la fecha seleccionada
  eventModal.style.display = 'block';
}

// Cerrar el modal para agregar citas
function closeEventModal() {
  const eventModal = document.getElementById('eventModal');
  eventModal.style.display = 'none';
}

// Función para agregar una cita al calendario y a "Mis Casos"
document.getElementById('eventForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const description = document.getElementById('eventDescription').value;
  const contact = document.getElementById('eventContact').value;

  // Aquí solo se agregará el caso a la tabla sin crear el post-it
  addCaseToMyCases(title, date);

  // Limpiar los campos del formulario y cerrar el modal
  document.getElementById('eventForm').reset();
  closeEventModal();
});

// Función para agregar un nuevo caso a la tabla de "Mis Casos"
function addCaseToMyCases(title, date) {
  caseIdCounter++;  // Incrementar el ID del caso

  const tableBody = document.querySelector('.cases-container tbody');
  const newCaseRow = document.createElement('tr');
  
  newCaseRow.setAttribute('data-case-id', caseIdCounter);  // Añadir atributo data-case-id
  
  newCaseRow.innerHTML = `
    <td>#${caseIdCounter.toString().padStart(3, '0')}</td>
    <td>Solicitud</td>
    <td>${date}</td>
    <td><button onclick="showCaseDetails('${caseIdCounter}')">Detalles</button></td>
  `;

  // Agregar el nuevo caso a la tabla
  tableBody.appendChild(newCaseRow);
}

// Crear el calendario y asignar las fechas
function createCalendar() {
  const calendarContainer = document.getElementById('calendar');
  let html = '';

  const daysInMonth = new Date(2024, 11, 0).getDate(); // Número de días en el mes (noviembre 2024)
  for (let i = 1; i <= daysInMonth; i++) {
    html += `<div class="calendar-day" onclick="addEvent('2024-11-${i.toString().padStart(2, '0')}')">${i}</div>`;
  }

  calendarContainer.innerHTML = html;
}

// Llamada inicial para crear el calendario
createCalendar();

// Función para actualizar el estado del caso en la tabla
function updateCaseStatus(caseId) {
  const statusSelect = document.getElementById('statusSelect');
  const status = statusSelect.value;
  
  // Actualiza la columna "Estado" en la fila correspondiente de la tabla
  const caseRow = document.querySelector(`tr[data-case-id="${caseId}"]`);
  const statusCell = caseRow.querySelector('td:nth-child(2)');
  statusCell.textContent = status;
}

// Función para eliminar un caso de la tabla
function deleteCase(caseId) {
  // Elimina la fila correspondiente del caso
  const caseRow = document.querySelector(`tr[data-case-id="${caseId}"]`);
  caseRow.remove();

  // Cierra el modal después de eliminar el caso
  const modal = document.getElementById('caseModal');
  modal.style.display = 'none';
}
