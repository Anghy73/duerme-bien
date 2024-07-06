import { fetchData } from "./supabase.mjs"

// Obtener referencias a los elementos del DOM
const modalCliente = document.getElementById("modal-cliente")
const btnAgregarCliente = document.getElementById("btnAgregarCliente")
const modalReserva = document.getElementById("modal-reserva")
const btnAgregarReserva = document.getElementById("btnAgregarReserva")
const spans = document.getElementsByClassName("close") // Asume que hay un span.close para cada modal
const formHabitaciones = document.getElementById('form-habitaciones')
const addHabitaciones = document.getElementById('add-habitaciones')

// Función para abrir un modal específico
const abrirModal = (modal) => {
    modal.style.display = "flex"
}

// Función para cerrar modales
const cerrarModal = (modal) => {
    modal.style.display = "none"
}

// Asignar evento onclick a los botones para abrir los modales
// btnAgregarCliente.onclick = () => {
//     abrirModal(modalCliente)
// }

btnAgregarReserva.onclick = () => {
    abrirModal(modalReserva)
    generateHabitaciones()
}

// Asignar evento onclick a los spans para cerrar los modales
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = () => {
        cerrarModal(modalReserva);
        formHabitaciones.innerHTML=''
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

const closeContent = () => {
    const mainContent = document.getElementById("main-content");
    mainContent.style.display = "none";
}

// Verificar es de julio
const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-valid', 'is-invalid')

    const alertaInput = (mensaje) => {
        // input.classList.remove('is-valid')
        // input.classList.add('is-invalid')
        div.innerHTML = `<span class="badge bg-danger">${mensaje}</span>`
    }

    if (input.value.trim() == '') {
        alertaInput('El campo es obligatorio')
    } else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        // Verificaciones específicas
        if (id == 'run') {
            if (input.value = 0) {
                console.log('Funca')
                alertaInput('Run no válido')
            }
        }
    }
}

const valida = (e) => {
    document.querySelectorAll('required').forEach(item => {
        verificar(item.id)
    })
    // Evita que el formulario se envie
    e.preventDefault()
}


addHabitaciones.addEventListener('click', () => generateHabitaciones())

let numH = 0

const generateHabitaciones = async () => {
    numH += 1

    const { fetchedData, error } = await fetchData('habitacion');
    const hDisponibles = fetchedData.filter(item => item.estado == 'Disponible')

    let options = ''
    hDisponibles.forEach(item => {
        options += `<option value=${item.idhabitacion}>${item.idhabitacion}</option>`
    })

    let group = `
        <div class="group-habitaciones" id=${numH}>
            <label for="habitacion">Habitacion</label>
            <div class="select-content">
                <select name="habitaciones">
                    ${options}
                </select>
            </div>
            <div id="btnDelH" class="del-habitacion" data-id=${numH}>X</div>
        </div>
    `

    formHabitaciones.innerHTML += group

    const btnDelH = document.querySelectorAll('#btnDelH')

    btnDelH.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id')
            const elem = document.getElementById(id)
            elem.style.cssText = 'display: none !important;'
        })
    })
}

