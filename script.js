// Obtener referencias a los elementos del DOM
const modalCliente = document.getElementById("modal-cliente")
const btnAgregarCliente = document.getElementById("btnAgregarCliente")
const modalReserva = document.getElementById("modal-reserva")
const btnAgregarReserva = document.getElementById("btnAgregarReserva")
const spans = document.getElementsByClassName("close") // Asume que hay un span.close para cada modal

// Función para abrir un modal específico
const abrirModal = (modal) => {
    modal.style.display = "block"
}

// Función para cerrar modales
const cerrarModal = (modal) => {
    modal.style.display = "none"
}

// Asignar evento onclick a los botones para abrir los modales
btnAgregarCliente.onclick = () => {
    abrirModal(modalCliente)
}

btnAgregarReserva.onclick = () => {
    abrirModal(modalReserva)
}

// Asignar evento onclick a los spans para cerrar los modales
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = () => {
        cerrarModal(modalCliente);
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