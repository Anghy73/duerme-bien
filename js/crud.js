import { fetchData } from './supabase.js';

// Cargar el contenido de la página
document.addEventListener("DOMContentLoaded", function () {
    const clientesLink = document.getElementById("clientesLink");
    const habitacionesLink = document.getElementById("habitacionesLink");
    const reservasLink = document.getElementById("reservasLink");
    const historialLink = document.getElementById("historialLink");
    const mainContent = document.getElementById("main-content");

    // Tabla clientes
    clientesLink.onclick = async function () {
        // Llama a fetchData para obtener los datos de los clientes
        const { fetchedData, error } = await fetchData('cliente');

        if (error) {
            console.error('Error al obtener los datos:', error);
            return;
        }

        // Genera el HTML de la tabla con los datos obtenidos
        const tableHTML = generateTableclientes(fetchedData);

        // Inserta el HTML de la tabla en mainContent
        mainContent.innerHTML = `
            ${tableHTML}
        `;
        mainContent.style.display = "block";
    }

    // Tabla habitaciones
    habitacionesLink.onclick = async function () {
        // Llama a fetchData para obtener los datos de los clientes
        const { fetchedData, error } = await fetchData('habitacion');

        if (error) {
            console.error('Error al obtener los datos:', error);
            return;
        }

        // Genera el HTML de la tabla con los datos obtenidos
        const tableHTML = generateTableHabitacion(fetchedData);

        // Inserta el HTML de la tabla en mainContent
        mainContent.innerHTML = `
            ${tableHTML}
        `;
        mainContent.style.display = "block";
    }

    // Tabla reservas
    reservasLink.onclick = function () {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Gestión de Reservas</p>
            <hr>
            <!-- Contenido de Reservas -->
        `;
        mainContent.style.display = "block";
    }

    historialLink.onclick = function () {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Historial de Clientes</p>
            <hr>
            <!-- Contenido de Historial -->
        `;
        mainContent.style.display = "block";
    }
});

const closeContent = () => {
    const mainContent = document.getElementById("main-content");
    mainContent.style.display = "none";
}

// Función para generar el HTML de la tabla a partir de los datos de los clientes
const generateTableclientes = (clientes) => {
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

const generateTablehabitaciones = (clientes) => {
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