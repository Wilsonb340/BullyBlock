// Función para mostrar el calendario
function displayCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let calendarHTML = "<table class='calendar-table'><tr>";
    for (let i = 0; i < 7; i++) {
        calendarHTML += `<th>${["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][i]}</th>`;
    }
    calendarHTML += "</tr><tr>";

    for (let i = 0; i < firstDay; i++) {
        calendarHTML += "<td></td>";
    }

    for (let date = 1; date <= lastDate; date++) {
        if ((firstDay + date - 1) % 7 === 0) {
            calendarHTML += "</tr><tr>";
        }
        calendarHTML += `<td>${date}</td>`;
    }

    calendarHTML += "</tr></table>";
    calendarContainer.innerHTML = calendarHTML;
}

// Función de menú hamburguesa
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    menu.classList.toggle('show');
}
