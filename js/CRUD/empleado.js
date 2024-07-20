import { deleteData, fetchData } from '../supabase.mjs'

document.addEventListener("DOMContentLoaded", function () {
    const empleadosLink = document.getElementById("empleadosLink");
    const tableHead = document.getElementById("tableHead");
    const tableBody = document.getElementById("tableBody");
    const mainContent = document.getElementById("main-content");

    empleadosLink.onclick = async function () {
        const { fetchedData, error } = await fetchData('empleados');

        if (error) {
            console.error('Error al obtener los datos:', error);
            return;
        }

        // Genera el HTML de la tabla con los datos obtenidos
        const { head: tableH, body: tableB } = generateTableEmpleados(fetchedData);

        // Inserta el HTML de la tabla en mainContent
        tableHead.innerHTML = tableH;
        tableBody.innerHTML = tableB;

        const btns = tableBody.querySelectorAll('.btn.btnEliminarEmpleado')
        eliminarEmpleado(btns)

        mainContent.style.display = "block";
    }
})

const generateTableEmpleados = (emp) => {
    const head = '<th class="col-1">ID</th><th class="col-1">Nombre</th><th class="col-1">Apellido</th><th class="col-1">Tipo</th><th class="col-1"></th>';
    let body = '';
    emp.forEach(reg => {
        body += `<tr>
                    <td>${reg.rutempleado}</td>
                    <td>${reg.nombre}</td>
                    <td>${reg.apellido}</td>
                    <td>${reg.tipo}</td>
                    <td nowrap row">
                        <button class="btn btn-warning btnEditar" id="${reg.rutempleado}" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg></button>
                        <button class="btn btn-danger btnEliminarEmpleado" id="${reg.rutempleado}" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>
                    </td>
                </tr>`;
    });

    return { head, body };
}

const eliminarEmpleado = (btns) => {
    console.log('si');
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const empleadoID = e.target.getAttribute('id')

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
                    const borradoOk = await deleteData('empleados', { rutempleado: empleadoID });
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Su regostro ha sido eliminado",
                        icon: "success"
                    })

                    // console.log(borradoOk);
                    tableHead.innerHTML = ''
                    tableBody.innerHTML = ''
                    const { fetchedData, error } = await fetchData('empleados');
                    const { head: tableH, body: tableB } = generateTableEmpleados(fetchedData);
                    tableHead.innerHTML = tableH;
                    tableBody.innerHTML = tableB;

                    const btns = tableBody.querySelectorAll('.btn.btnEliminarEmpleado')
                    eliminarEmpleado(btns)
                }
            })
        })
    })
}