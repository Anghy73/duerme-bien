
import { fetchData, insertData } from "./supabase.mjs"

// Obtener referencias a los elementos del DOM
const modalCliente = document.getElementById("modal-cliente")
const btnAgregarEmpleado = document.getElementById("btnAgregarEmpleado")
const modalReserva = document.getElementById("modal-reserva")
const modalEmpleado = document.getElementById("modal-empleado")
const btnAgregarReserva = document.getElementById("btnAgregarReserva")
const spans = document.getElementsByClassName("close") // Asume que hay un span.close para cada modal
const formHabitaciones = document.getElementById('form-habitaciones')
const addHabitaciones = document.getElementById('add-habitaciones')
const btnRegistrar = document.getElementById('btnRegistrar')
const btnLimpiar = document.getElementById('btnLimpiar')
const formReserva = document.getElementById('formReserva')
const empladosLink = document.getElementById('empladosLink')
const cerrarSesion = document.getElementById('cerrarSesion')
const formEmpleados = document.getElementById('formEmpleados')
const btnRegistrarEmpleado = document.getElementById('btnRegistrarEmpleado')
const clientesLink = document.getElementById("clientesLink");
const habitacionesLink = document.getElementById("habitacionesLink");
const reservasLink = document.getElementById("reservasLink");
const historialLink = document.getElementById("historialLink");

btnAgregarEmpleado.addEventListener('click', () => {
    abrirModal(modalEmpleado)
})

// Función para abrir un modal específico
const abrirModal = (modal) => {
    modal.style.display = "flex"
}

// Función para cerrar modales
const cerrarModal = (modal) => {
    modal.style.display = "none"
}

btnAgregarReserva.onclick = () => {
    abrirModal(modalReserva)
    generateHabitaciones()
}

// Asignar evento onclick a los spans para cerrar los modales
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = () => {
        cerrarModal(modalReserva);
        cerrarModal(modalEmpleado);
        formHabitaciones.innerHTML=''
        formReserva.reset()
    }
}

// Cerrar modales al hacer clic fuera de ellos
window.onclick = (event) => {
    if (event.target == modalCliente) {
        cerrarModal(modalCliente)
    } else if (event.target == modalReserva) {
        cerrarModal(modalReserva)
        formHabitaciones.innerHTML=''
        formReserva.reset()
    }
}


const tipo = window.localStorage.getItem('tipo')

if (tipo === 'Administrador') {
    btnAgregarEmpleado.style.display = 'flex'
    empladosLink.style.display = 'flex'

    clientesLink.parentElement.style.display = 'none'
    habitacionesLink.parentElement.style.display = 'none'
    reservasLink.parentElement.style.display = 'none'
    historialLink.parentElement.style.display = 'none'
    btnAgregarReserva.style.display = 'none'
} else {
    btnAgregarEmpleado.style.display = 'none'
    empladosLink.style.display = 'none'
}

const path = window.location.pathname

cerrarSesion.addEventListener('click', () => {
    console.log(path);
    if (path === '/duerme-bien/home.html' || path === '/home.html') {
        window.localStorage.setItem('user', '')
        window.location.pathname = '/duerme-bien/'
    }
})


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

btnLimpiar.addEventListener('click', () => {
    formReserva.reset()
})

btnRegistrar.addEventListener('click', async () => {
    const rutcliente = document.getElementById('run').value
    const habitacionesElejidas = []
    const selectHabitaciones = document.getElementsByName('habitaciones')
    selectHabitaciones.forEach(item => {
        habitacionesElejidas.push(item.value)
    })

    const finEstadia = document.getElementById('fechaFin').value
    const pasajeros = document.getElementById('pasajeros').value
    const costoTotal = document.getElementById('costo').value
    const detalle = document.getElementById('detalle')

    const datos = {
        rutcliente,
        habitacionesElejidas,
        finEstadia,
        pasajeros,
        costoTotal,
        detalle
    }

    const { error } = await insertData('reserva', {
        codreserva: 1,
        fecha_fin: finEstadia
    });
    console.log(error);


    console.log({
        rutcliente,
        habitacionesElejidas,
        finEstadia,
        pasajeros,
        costoTotal,
        detalle
    });
})

btnRegistrarEmpleado.addEventListener('click', async () => {
    const idE = document.getElementById('idE').value
    const clave = document.getElementById('clave').value
    const nombreE = document.getElementById('nombreE').value
    const apellidoE = document.getElementById('apellidoE').value
    const tipo = document.getElementById('tipo').value

    const { error } = await insertData('empleados', {
        rutempleado: idE,
        clave,
        nombre: nombreE,
        apellido: apellidoE,
        tipo
    });

    if (error) {
        alert('ha ocurrido un error')
        formEmpleados.reset()
    } else {
        alert('Todo correcto')
        formEmpleados.reset()
    }
})