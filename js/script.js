
import { fetchData, insertData, updateData } from "./supabase.mjs"

// Obtener referencias a los elementos del DOM
const modalCliente = document.getElementById("modal-cliente")
const btnAgregarEmpleado = document.getElementById("btnAgregarEmpleado")
const modalReserva = document.getElementById("modal-reserva")
const modalEmpleado = document.getElementById("modal-empleado")
const btnAgregarReserva = document.getElementById("btnAgregarReserva")
const spans = document.getElementsByClassName("close") // Asume que hay un span.close para cada modal
const habitacionesD = document.getElementById('habitacionesD')
const runD = document.getElementById('runD')
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
const date = new Date();

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
    generateselects()
}

// Asignar evento onclick a los spans para cerrar los modales
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = () => {
        cerrarModal(modalReserva);
        cerrarModal(modalEmpleado);
        habitacionesD.innerHTML=''
        runD.innerHTML=''
        formReserva.reset()
    }
}

// Cerrar modales al hacer clic fuera de ellos
window.onclick = (event) => {
    if (event.target == modalCliente) {
        cerrarModal(modalCliente)
    } else if (event.target == modalReserva) {
        cerrarModal(modalReserva)
        habitacionesD.innerHTML=''
        runD.innerHTML=''
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


// addHabitaciones.addEventListener('click', () => )

// let numH = 0

const generateselects = async () => {
    const fetchedDataH = await fetchData('habitacion');
    const hDisponibles = fetchedDataH.fetchedData.filter(item => item.estado == 'Disponible')
    const fetchedDataC = await fetchData('cliente');

    let optionsH = ''
    hDisponibles.forEach(item => {
        optionsH += `<option value=${item.idhabitacion}>${item.idhabitacion}</option>`
    })

    let optionsR = ''
    fetchedDataC.fetchedData.forEach(item => {
        optionsR += `<option value=${item.rutcliente}>${item.rutcliente}</option>`
    })

    let groupH = `
        <div class="select-content">
            <select id="habitaciones" name="">
                ${optionsH}
            </select>
        </div>
    `

    let groupR = `
        <div class="select-content">
            <select id="runes" name="">
                ${optionsR}
            </select>
        </div>
    `

    habitacionesD.innerHTML += groupH
    runD.innerHTML += groupR
}

btnLimpiar.addEventListener('click', () => {
    formReserva.reset()
})

btnRegistrar.addEventListener('click', async () => {
    const rutcliente = document.getElementById('runes').value
    const habitacion = document.getElementById('habitaciones').value
    const finEstadia = document.getElementById('fechaFin').value
    const pasajeros = document.getElementById('pasajeros').value
    const costoTotal = document.getElementById('costo').value
    const detalle = document.getElementById('detalle').value

    const datos = {
        fk_rutcliente: rutcliente,
        fk_idhabitacion: habitacion,
        fecha_fin: finEstadia,
        pasajeros,
        costo_total: costoTotal,
        detalle
    }
    const time = Date.now().toString()
    const cod = parseInt(time.substring(time.length, 9))
    // || habitacion === ''

    if (pasajeros.trim() === '' || costoTotal.trim() === '' || detalle.trim() === '' || rutcliente === '' || finEstadia === '') {
        
        return alert('faltan datos por completar')
    } else {
        const fetchedDataH = await fetchData('habitacion');
        // console.log(fetchedDataH.fetchedData)
        const habitacionSelect = await fetchedDataH.fetchedData.filter(item => item.idhabitacion === habitacion)
        // console.log(habitacionSelect);
        const cupos = habitacionSelect[0].cupos

        if (pasajeros <= cupos) {
            if (costoTotal.length <= 4) {
                console.log('aprobado');
                await insertData('reserva', {
                    codreserva: cod,
                    ...datos
                });
    
                const { data, error } = await updateData('habitacion', { estado: 'Ocupada' }, {'idhabitacion': habitacion})
                formReserva.reset()
            } else {
                return alert(`El Costo Total esta mal`)
            }
        } else {
            return alert(`la cantidad de pasajeros disponible es de ${cupos}`)
        }
    }

    console.log({
        rutcliente,
        habitacion,
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