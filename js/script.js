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
}

// Asignar evento onclick a los spans para cerrar los modales
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = () => {
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


console.log(formHabitaciones);
console.log(addHabitaciones);

let numH = 1
addHabitaciones.addEventListener('click', () => {
    numH += 1

    formHabitaciones.innerHTML += `
        <div class="group-habitaciones">
            <label for="habitacion">Habitacion <span> ${numH}:</span> </label>
            <div class="select-content">
                <select name="habitaciones">
                    <option value="h1" selected>H°1</option>
                    <option value="h2">H°2</option>
                    <option value="h3">H°3</option>
                </select>
            </div>
            <div>X</div>
        </div>
    `
})