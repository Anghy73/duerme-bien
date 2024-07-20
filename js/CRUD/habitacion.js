import { deleteData, fetchData } from '../supabase.mjs';

// Cargar el contenido de la página
document.addEventListener("DOMContentLoaded", function () {
    const habitacionesLink = document.getElementById("habitacionesLink");
    const tableHead = document.getElementById("tableHead");
    const tableBody = document.getElementById("tableBody");
    const mainContent = document.getElementById("main-content");

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
        const btns = tableBody.querySelectorAll('.btn.btnEliminarHabitacion')
        eliminarHabitacion(btns)
        mainContent.style.display = "block";
    }
})

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
                    </td>
                </tr>`;
    });
    return { head, body };
};

// ---------------------- Eliminar habitación ----------------------
// -----------------ESTO NO SE DEBE PODER HACER---------------------
// ---------------------- Eliminar habitación ----------------------

const eliminarHabitacion = (btns) => {
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const habitacionID = e.target.getAttribute('id');

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
                    const borradoOk = await deleteData('habitacion', { idhabitacion: habitacionID });
                    console.log(borradoOk);

                    if (borradoOk.error) {
                        return alert('No se puede eliminar una habitacion con reservación');
                    }
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Su registro ha sido eliminado",
                        icon: "success"
                    });

                    tableHead.innerHTML = '';
                    tableBody.innerHTML = '';
                    const { fetchedData, error } = await fetchData('habitacion');
                    const { head: tableH, body: tableB } = generateTableHabitaciones(fetchedData);
                    tableHead.innerHTML = tableH;
                    tableBody.innerHTML = tableB;

                    const btns = tableBody.querySelectorAll('.btn.btnEliminarHabitacion');
                    eliminarHabitacion(btns);
                }
            })
        })
    })
}