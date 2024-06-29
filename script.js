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

document.addEventListener("DOMContentLoaded", function() {
    var clientesLink = document.getElementById("clientesLink");
    var habitacionesLink = document.getElementById("habitacionesLink");
    var reservasLink = document.getElementById("reservasLink");
    var historialLink = document.getElementById("historialLink");
    var mainContent = document.getElementById("main-content");

    function closeContent() {
        mainContent.style.display = "none";
    }

    function addCloseButton() {
        return '<button class="close-button" onclick="closeContent()">Cerrar</button>';
    }

    clientesLink.onclick = function() {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Agregar Clientes</p>
            <hr>
            <form>
                <label for="run">RUN:</label>
                <input type="text" id="run" name="run" required><br><br>
                
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required><br><br>
                
                <label for="numHuespedes">Número de Huéspedes:</label>
                <input type="number" id="numHuespedes" name="numHuespedes" required><br><br>
                
                <label for="habitaciones">Habitaciones:</label>
                <input type="text" id="habitaciones" name="habitaciones" required><br><br>
                
                <label for="valorTotal">Valor Total:</label>
                <input type="number" id="valorTotal" name="valorTotal" required><br><br>
                
                <button type="submit">Crear</button>
                <button type="reset">Limpiar</button>
            </form>
        `;
        mainContent.style.display = "block"; 
    }

    habitacionesLink.onclick = function() {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Gestión de Habitaciones</p>
            <hr>
            <!-- Contenido de Habitaciones -->
        `;
        mainContent.style.display = "block";
    }

    reservasLink.onclick = function() {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Gestión de Reservas</p>
            <hr>
            <!-- Contenido de Reservas -->
        `;
        mainContent.style.display = "block";
    }

    historialLink.onclick = function() {
        mainContent.innerHTML = `
            ${addCloseButton()}
            <p>Historial de Clientes</p>
            <hr>
            <!-- Contenido de Historial -->
        `;
        mainContent.style.display = "block";
    }
});

function closeContent() {
    var mainContent = document.getElementById("main-content");
    mainContent.style.display = "none";
}