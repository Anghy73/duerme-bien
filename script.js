// Obtener referencias a los elementos del DOM
const modalCliente = document.getElementById("modal-cliente")
const btnAgregarCliente = document.getElementById("btnAgregarCliente")
const modalReserva = document.getElementById("modal-reserva")
const btnAgregarReserva = document.getElementById("btnAgregarReserva")
const spans = document.getElementsByClassName("close") // Asume que hay un span.close para cada modal

// Función para abrir un modal específico
const abrirModal = (modal) => {
    modal.style.display = "block"
}

// Función para cerrar modales
const cerrarModal = (modal) => {
    modal.style.display = "none"
}

// Asignar evento onclick a los botones para abrir los modales
btnAgregarCliente.onclick = () => {
    abrirModal(modalCliente)
}

btnAgregarReserva.onclick = () => {
    abrirModal(modalReserva)
}

// Asignar evento onclick a los spans para cerrar los modales
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = () => {
        cerrarModal(modalCliente);
        cerrarModal(modalReserva);
    }
}

// Cerrar modales al hacer clic fuera de ellos
window.onclick = (event) => {
    if (event.target == modalCliente) {
        cerrarModal(modalCliente)
    } else if (event.target == modalReserva) {
        cerrarModal(modalReserva)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const clientesLink = document.getElementById("clientesLink");
    const habitacionesLink = document.getElementById("habitacionesLink");
    const reservasLink = document.getElementById("reservasLink");
    const historialLink = document.getElementById("historialLink");
    const mainContent = document.getElementById("main-content");

    const addCloseButton = () => {
        return '<button class="close-button" onclick="closeContent()">Cerrar</button>';
    }

    clientesLink.onclick = function() {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Gestión de Clientes</p>
            <hr>
            <!-- Contenido de Clientes -->
        `;
        mainContent.style.display = "block"; 
    }

    habitacionesLink.onclick = function() {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Gestión de Habitaciones</p>
            <hr>
            <!-- Contenido de Habitaciones -->
        `;
        mainContent.style.display = "block";
    }

    reservasLink.onclick = function() {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Gestión de Reservas</p>
            <hr>
            <!-- Contenido de Reservas -->
        `;
        mainContent.style.display = "block";
    }

    historialLink.onclick = function() {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Historial de Clientes</p>
            <hr>
            <!-- Contenido de Historial -->
        `;
        mainContent.style.display = "block";
    }
});

const  closeContent = () => {
    const mainContent = document.getElementById("main-content");
    mainContent.style.display = "none";
}