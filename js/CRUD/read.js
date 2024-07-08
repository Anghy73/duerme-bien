// Consulta de datos de la base de datos y generación de tablas
import { fetchData } from '../supabase.mjs';

// Cargar el contenido de la página
document.addEventListener("DOMContentLoaded", function () {
    const clientesLink = document.getElementById("clientesLink");
    const habitacionesLink = document.getElementById("habitacionesLink");
    const reservasLink = document.getElementById("reservasLink");
    const historialLink = document.getElementById("historialLink");
    const tableHead = document.getElementById("tableHead");
    const tableBody = document.getElementById("tableBody");
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
        const { head: tableH, body: tableB } = generateTableclientes(fetchedData);

        // Inserta el HTML de la tabla en mainContent
        tableHead.innerHTML = tableH;
        tableBody.innerHTML = tableB;
        mainContent.style.display = "block";
    }

    // Tabla habitaciones
    habitacionesLink.onclick = async function () {
        // Llama a fetchData para obtener los datos de las habitaciones
        const { fetchedData, error } = await fetchData('habitacion');

        if (error) {
            console.error('Error al obtener los datos:', error);
            return;
        }

        // Genera el HTML de la tabla con los datos obtenidos
        const { head: tableH, body: tableB } = generateTableHabitaciones(fetchedData);

        // Inserta el HTML de la tabla en mainContent
        tableHead.innerHTML = tableH;
        tableBody.innerHTML = tableB;
        mainContent.style.display = "block";
    }

    // Tabla reservas
    reservasLink.onclick = async function () {
        const { fetchedData, error } = await fetchData('reserva');

        if (error) {
            console.error('Error al obtener los datos:', error);
            return;
        }

        // Genera el HTML de la tabla con los datos obtenidos
        const { head: tableH, body: tableB } = generateTableReserva(fetchedData);

        // Inserta el HTML de la tabla en mainContent
        tableHead.innerHTML = tableH;
        tableBody.innerHTML = tableB;
        mainContent.style.display = "block";
    }

    // Tabla historial
    historialLink.onclick = async function () {
        const { fetchedData, error } = await fetchData('reserva');

        if (error) {
            console.error('Error al obtener los datos:', error);
            return;
        }

        // Genera el HTML de la tabla con los datos obtenidos
        const { head: tableH, body: tableB } = generateTableHistorial(fetchedData);

        // Inserta el HTML de la tabla en mainContent
        tableHead.innerHTML = tableH;
        tableBody.innerHTML = tableB;
        mainContent.style.display = "block";
    }
});

// Generar tabla clientes
const generateTableclientes = (clientes) => {
    const head = '<th class="col-1">Rut</th><th>Nombre</th><th>Apellido</th><th>Fono</th><th class="col-1"></th>'
    let body = '';
    clientes.forEach(reg => {
        body += `<tr>
                    <td>${reg.rutcliente}</td>
                    <td>${reg.nombre}</td>
                    <td>${reg.apellido}</td>
                    <td>${reg.fono}</td>
                    <td nowrap row">
                        <button class="btn btn-warning btnEditar" id="${reg.rutcliente}" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
            </svg></button>
                        <button class="btn btn-danger btnEliminar" id="${reg.rutcliente}" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg></button>
                    </td>
                </tr>`;
    });
    return { head, body };
}

// Generar tabla habitaciones
const generateTableHabitaciones = (habitaciones) => {
    const head = '<th class="col-1">ID</th><th>Estado</th><th class="col-1">Cupos</th><th class="col-1">Camas Individuales</th><th class="col-1">Camas Grandes</th><th class="col-1">Baños</th><th>Orientación</th><th class="col-1"></th>';
    let body = '';
    habitaciones.forEach(reg => {
        body += `<tr>
                    <td>${reg.idhabitacion}</td>
                    <td>${reg.estado}</td>
                    <td>${reg.cupos}</td>
                    <td>${reg.camas}</td>
                    <td>${reg.camas_grandes}</td>
                    <td>${reg.banos}</td>
                    <td>${reg.orientacion}</td>
                    <td nowrap row">
                        <button class="btn btn-warning btnEditar" id="${reg.idhabitacion}" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg></button>
                        <button class="btn btn-danger btnEliminar" id="${reg.idhabitacion}" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>
                    </td>
                </tr>`;
    });
    return { head, body };
};

// Generar tabla reservas
const generateTableReserva = (reservas) => {
    const head = '<th class="col-1">Cliente</th><th class="col-1">Habitación</th><th>Fecha Fin</th><th class="col-1">Pasajeros</th><th>Pago</th><th>Detalle</th><th class="col-1"></th>';
    let body = '';
    reservas.forEach(reg => {
        body += `<tr>
                    <td>${reg.fk_rutcliente}</td>
                    <td>${reg.fk_idhabitacion}</td>
                    <td>${reg.fecha_fin}</td>
                    <td>${reg.pasajeros}</td>
                    <td>$ ${reg.costo_total}</td>
                    <td>${reg.detalle}</td>
                    <td nowrap row">
                        <button class="btn btn-warning btnEditar" id="${reg.codreserva}" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg></button>
                        <button class="btn btn-danger btnEliminar" id="${reg.codreserva}" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>
                    </td>
                </tr>`;
    });
    return { head, body };
};

// Generar tabla historial
// Es la tabla de reservas, pero mostrando todos los registros
const generateTableHistorial = (hist) => {
    const head = '<th class="col-1">ID</th><th class="col-1">Encargado</th><th>Cliente</th><th>Habitación</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Pasajeros</th><th>Pago</th><th>Detalles</th><th class="col-1"></th>';
    let body = '';
    hist.forEach(reg => {
        body += `<tr>
                    <td>${reg.codreserva}</td>
                    <td>${reg.fk_rutempleado}</td>
                    <td>${reg.fk_rutcliente}</td>
                    <td>${reg.fk_idhabitacion}</td>
                    <td>${reg.fecha_reserva}</td>
                    <td>${reg.fecha_fin}</td>
                    <td>${reg.pasajeros}</td>
                    <td>$ ${reg.costo_total}</td>
                    <td>${reg.detalle}</td>
                    <td nowrap row">
                        <button class="btn btn-warning btnEditar" id="${reg.codreserva}" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg></button>
                        <button class="btn btn-danger btnEliminar" id="${reg.codreserva}" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>
                    </td>
                </tr>`;
    });
    return { head, body };
};