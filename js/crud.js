import { fetchData } from './supabase.mjs';

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
        const tableHTML = generateTableHabitaciones(fetchedData);

        // Inserta el HTML de la tabla en mainContent
        mainContent.innerHTML = `
            ${tableHTML}
        `;
        mainContent.style.display = "block";
    }

    // Tabla reservas
    reservasLink.onclick = async function () {
        const { fetchedData, error } = await fetchData('reserva');

        if (error) {
            console.error('Error al obtener los datos:', error);
            return;
        }

        const tableHTML = generateTableReserva(fetchedData);
        mainContent.innerHTML = `
            ${tableHTML}
        `;
        mainContent.style.display = "block";
    }

    historialLink.onclick = function () {
        mainContent.innerHTML = `
            <p>Historial de Clientes</p>
            <hr>
            <!-- Contenido de Historial -->
        `;
        mainContent.style.display = "block";
    }
});

// Función para generar el HTML de la tabla a partir de los datos de los clientes
const generateTableclientes = (clientes) => {
    let table = '<table class="table"><tr><th>Rut</th><th>Nombre</th><th>Apellido</th><th>Fono</th></tr>';
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

const generateTableHabitaciones = (habitacion) => {
    let table = '<table class="table"><tr><th>ID</th><th>Estado</th><th>Cupos</th><th>Camas</th><th>Camas Grandes</th><th>Baños</th><th>Orientación</th></tr>';
    habitacion.forEach(habitacion => {
        table += `<tr>
                    <td>${habitacion.idhabitacion}</td>
                    <td>${habitacion.estado}</td>
                    <td>${habitacion.cupos}</td>
                    <td>${habitacion.camas}</td>
                    <td>${habitacion.camas_grandes}</td>
                    <td>${habitacion.banos}</td>
                    <td>${habitacion.orientacion}</td>
                </tr>`;
    });
    table += '</table>';
    return table;
}

const generateTableReserva = (reserva) => {
    let table = '<table class="table"><tr><th>ID</th><th>Cliente</th><th>Fecha Fin</th><th>Pasajeros</th><th>Costo Total</th><th>Estado</th><th>Detalle</th></tr>';
    reserva.forEach(reserva => {
        table += `<tr>
                    <td>${reserva.codreserva}</td>
                    <td>${reserva.fk_rutcliente}</td>
                    <td>${reserva.fecha_fin}</td>
                    <td>${reserva.pasajeros}</td>
                    <td>${reserva.costo_total}</td>
                    <td>${reserva.estado}</td>
                    <td>${reserva.detalle}</td>
                </tr>`;
    });
    table += '</table>';
    return table;
}