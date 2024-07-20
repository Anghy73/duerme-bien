import { fetchData } from '../supabase.mjs';

// Cargar el contenido de la página
document.addEventListener("DOMContentLoaded", function () {
    const historialLink = document.getElementById("historialLink");
    const tableHead = document.getElementById("tableHead");
    const tableBody = document.getElementById("tableBody");
    const mainContent = document.getElementById("main-content");

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
})

const generateTableHistorial = (hist) => {
    const head = '<th class="col-1">ID</th><th>Cliente</th><th>Habitación</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Pasajeros</th><th>Pago</th><th>Detalles</th>';
    let body = '';
    hist.forEach(reg => {
        body += `<tr>
                    <td>${reg.codreserva}</td>
                    <td>${reg.fk_rutcliente}</td>
                    <td>${reg.fk_idhabitacion}</td>
                    <td>${reg.fecha_inicio}</td>
                    <td>${reg.fecha_fin}</td>
                    <td>${reg.pasajeros}</td>
                    <td>$ ${reg.costo_total}</td>
                    <td>${reg.detalle}</td>
                </tr>`;
    });
    return { head, body };
};