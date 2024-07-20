import { deleteData, fetchData } from '../supabase.mjs';

// Cargar el contenido de la página
document.addEventListener("DOMContentLoaded", function () {
    const reservasLink = document.getElementById("reservasLink");
    const tableHead = document.getElementById("tableHead");
    const tableBody = document.getElementById("tableBody");
    const mainContent = document.getElementById("main-content");

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

        const btns = tableBody.querySelectorAll('.btn.btnEliminarReserva')
        eliminarReserva(btns)

        mainContent.style.display = "block";
    }
})

const generateTableReserva = (reservas) => {
    const head = '<th class="col-1">Cliente</th><th class="col-1">Habitación</th><th>Fecha Inicio</th><th>Fecha Fin</th><th class="col-1">Pasajeros</th><th>Pago</th><th>Detalle</th><th class="col-1"></th>';
    let body = '';
    reservas.forEach(reg => {
        body += `<tr>
                    <td>${reg.fk_rutcliente}</td>
                    <td>${reg.fk_idhabitacion}</td>
                    <td>${reg.fecha_inicio}</td>
                    <td>${reg.fecha_fin}</td>
                    <td>${reg.pasajeros}</td>
                    <td>$ ${reg.costo_total}</td>
                    <td>${reg.detalle}</td>
                    <td nowrap row">
                        <button class="btn btn-warning btnEditar" id="${reg.codreserva}" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg></button>
                        <button class="btn btn-danger btnEliminarReserva" id="${reg.codreserva}" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>
                    </td>
                </tr>`;
    });
    return { head, body };
}

const eliminarReserva = (btns) => {
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const reservaID = e.target.getAttribute('id');

            Swal.fire({
                title: "¿Estás seguro de eliminar el registro?",
                text: "No podrás revertir los cambios",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Eliminar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteData('reserva', { codreserva: reservaID });
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Su registro ha sido eliminado",
                        icon: "success"
                    });

                    tableHead.innerHTML = '';
                    tableBody.innerHTML = '';
                    const { fetchedData } = await fetchData('reserva');
                    const { head: tableH, body: tableB } = generateTableReserva(fetchedData);
                    tableHead.innerHTML = tableH;
                    tableBody.innerHTML = tableB;

                    const btns = tableBody.querySelectorAll('.btn.btnEliminarReserva');
                    eliminarReserva(btns);
                }
            })
        })
    })
}

