import { fetchData } from './supabase.js';

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

const  closeContent = () => {
    const mainContent = document.getElementById("main-content");
    mainContent.style.display = "none";
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

    clientesLink.onclick = async function() {
        // Llama a fetchData para obtener los datos de los clientes
        const { fetchedData, error } = await fetchData('cliente');
        
        if (error) {
            console.error('Error al obtener los datos:', error);
            return;
        }
        
        // Genera el HTML de la tabla con los datos obtenidos
        const tableHTML = generateTableHTML(fetchedData);
        
        // Inserta el HTML de la tabla en mainContent
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Gestión de Clientes</p>
            <hr>
            <!-- Contenido de Clientes -->
            ${tableHTML}
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

// Función para generar el HTML de la tabla a partir de los datos de los clientes
function generateTableHTML(clientes) {
    let table = '<table><tr><th>Rut</th><th>Nombre</th><th>Apellido</th><th>Fono</th></tr>';
    clientes.forEach(cliente => {
        table += `<tr>
                    <td>${cliente.rutcliente}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.fono}</td>
                  </tr>`;
    });
    table += '</table>';
    return table;
}