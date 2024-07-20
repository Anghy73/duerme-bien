import { deleteData, fetchData, updateData } from '../supabase.mjs';

document.addEventListener("DOMContentLoaded", function () {
    const clientesLink = document.getElementById("clientesLink");
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

        const btnsE = tableBody.querySelectorAll('.btn.btnEditarCliente')
        editarCliente(btnsE)

        const btnsD = tableBody.querySelectorAll('.btn.btnEliminarCliente')
        eliminarCliente(btnsD)

        mainContent.style.display = "block";
    }
})

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
                        <button class="btn btn-warning btnEditarCliente" id="${reg.rutcliente}" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
            </svg></button>
                        <button class="btn btn-danger btnEliminarCliente" id="${reg.rutcliente}" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg></button>
                    </td>
                </tr>`;
    });
    return { head, body };
}


const editarCliente = (btns) => {
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const modalCliente = document.getElementById('modal-cliente')
            modalCliente.querySelector('h3').textContent = 'Actualizar Cliente'
            document.getElementById('btnRegistrarCliente').style.display = 'none'
            const btnActualizarCliente = document.getElementById('btnActualizarCliente')
            btnActualizarCliente.style.display = 'block'
            
            const datos = await fetchData('cliente', {
                rutcliente: e.target.id
            })

            const rutE = document.getElementById("rutC");
            const nombreE = document.getElementById("nombreC");
            const apellidoE = document.getElementById("apellidoC");
            const contactE = document.getElementById("contactC");
            const fono = datos.fetchedData[0].fono
            const fonoFormat = fono.split(' ')[2]

            rutE.value = datos.fetchedData[0].rutcliente
            nombreE.value = datos.fetchedData[0].nombre
            apellidoE.value = datos.fetchedData[0].apellido
            contactE.value = parseInt(fonoFormat)

            
            
            modalCliente.style.display = 'flex'

            btnActualizarCliente.addEventListener('click', async () => {
                const rutE = document.getElementById("rutC").value;
                const nombreE = document.getElementById("nombreC").value;
                const apellidoE = document.getElementById("apellidoC").value;
                const contactE = document.getElementById("contactC").value;

                const datos = {
                    rutcliente: rutE,
                    nombre: nombreE,
                    apellido: apellidoE,
                    fono: `+56 9 ${contactE}`
                }

                if (
                    nombreE.trim() === "" ||
                    apellidoE.trim() === "" ||
                    contactE.trim() === ""
                ) {
                    return alert("faltan datos por completar");
                } else {
                    if (contactE.trim().length === 8) {
                        if (validarErroresFormulario().length >= 1) {
                            return alert('hay un campo incorrecto')
                        }

                        const { data, error } = await updateData(
                            "cliente",
                            {
                                ...datos
                            },
                            { rutcliente: parseInt(rutE)}
                        );

                        limpiar()
                    } else {
                        return alert(`El número de contacto esta mal`);
                    }
                }
            })
        })
    })
}


// Eliminar cliente
const eliminarCliente = (btns) => {
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const clienteID = e.target.getAttribute('id');

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
                    const borradoOk = await deleteData('cliente', { rutcliente: clienteID });
                    console.log(borradoOk);

                    if (borradoOk.error) {
                        return alert('No se puede eliminar a un cliente con reservación');
                    }
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Su registro ha sido eliminado",
                        icon: "success"
                    });

                    tableHead.innerHTML = '';
                    tableBody.innerHTML = '';
                    const { fetchedData } = await fetchData('cliente');
                    const { head: tableH, body: tableB } = generateTableclientes(fetchedData);
                    tableHead.innerHTML = tableH;
                    tableBody.innerHTML = tableB;

                    const btns = tableBody.querySelectorAll('.btn.btnEliminarCliente');
                    eliminarCliente(btns);
                }
            })
        })
    })
}