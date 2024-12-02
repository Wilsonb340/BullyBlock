document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Función para mostrar la pestaña correspondiente
    function showTab(tabId) {
        tabContents.forEach(tab => {
            if (tab.id === tabId) {
                tab.classList.remove('hidden');
            } else {
                tab.classList.add('hidden');
            }
        });
    }

    // Validación de los campos requeridos
    function validateFields() {
        let isValid = true;
        const activeTab = document.querySelector('.tab-button.active');
        const tabId = activeTab.getAttribute('data-tab');
        const currentTab = document.getElementById(tabId);
        const requiredFields = currentTab.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error'); // Agrega clase de error para marcar campos vacíos
            } else {
                field.classList.remove('error');
            }
        });

        return isValid;
    }

    // Cambiar de pestaña solo si los campos obligatorios son llenados
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (validateFields()) {
                const tabId = button.getAttribute('data-tab');
                document.querySelector('.tab-button.active').classList.remove('active');
                button.classList.add('active');
                showTab(tabId);
            } else {
                alert('Por favor, completa todos los campos obligatorios.');
            }
        });
    });

    // Al enviar el formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar que el formulario se envíe antes de la validación
        
        if (validateFields()) {
            // Si los campos son válidos, puedes enviar el formulario con AJAX
            const formData = new FormData(form);
            fetch('../php/Citas.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Cita registrada correctamente.');
                } else {
                    alert(data.message);
                }
            })
            .catch(error => alert('Hubo un error al registrar la cita.'));
        } else {
            alert('Por favor, completa todos los campos obligatorios.');
        }
    });
});
