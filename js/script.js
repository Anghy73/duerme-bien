import { fetchData, insertData, updateData } from "./supabase.mjs";

// Obtener referencias a los elementos del DOM
const modalCliente = document.getElementById("modal-cliente");
// const btnAgregarEmpleado = document.getElementById("btnAgregarEmpleado");
const btnAgregarEmpleado = document.getElementById("btnAgregarEmpleado");
const modalReserva = document.getElementById("modal-reserva");
const modalEmpleado = document.getElementById("modal-empleado");
const btnAgregarReserva = document.getElementById("btnAgregarReserva");
const btnAgregarCliente = document.getElementById("btnAgregarCliente");
const spans = document.getElementsByClassName("close"); // Asume que hay un span.close para cada modal
const habitacionesD = document.getElementById("habitacionesD");
const runD = document.getElementById("runD");
// const addHabitaciones = document.getElementById("add-habitaciones");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnLimpiarET = document.getElementById("btnLimpiarET");
const btnLimpiarC = document.getElementById("btnLimpiarC");
const btnLimpiarR = document.getElementById("btnLimpiarR");
const formReserva = document.getElementById("formReserva");
const empleadosLink = document.getElementById("empleadosLink");
const cerrarSesion = document.getElementById("cerrarSesion");
const formEmpleados = document.getElementById("formEmpleados");
// const btnRegistrarEmpleado = document.getElementById("btnRegistrarEmpleado");
const clientesLink = document.getElementById("clientesLink");
const habitacionesLink = document.getElementById("habitacionesLink");
const reservasLink = document.getElementById("reservasLink");
const historialLink = document.getElementById("historialLink");
const formCliente = document.getElementById("formCliente");
const btnRegistrarCliente = document.getElementById('btnRegistrarCliente')

const date = new Date();

const generateID = () => {
  const time = Date.now().toString()
  return parseInt(time.substring(time.length, 9))
}

btnAgregarEmpleado.addEventListener("click", () => {
  abrirModal(modalEmpleado);
});

btnAgregarCliente.addEventListener("click", () => {
  abrirModal(modalCliente);
});

// Función para abrir un modal específico
const abrirModal = (modal) => {
  modal.style.display = "flex";
};

// Función para cerrar modales
const cerrarModal = (modal) => {
  modal.style.display = "none";
};

btnAgregarReserva.onclick = () => {
  abrirModal(modalReserva);
  generateselects();
};

// Asignar evento onclick a los spans para cerrar los modales
for (let i = 0; i < spans.length; i++) {
  spans[i].onclick = () => {
    cerrarModal(modalReserva);
    cerrarModal(modalEmpleado);
    cerrarModal(modalCliente);
    habitacionesD.innerHTML = "";
    runD.innerHTML = "";
    limpiar()
    formReserva.reset();
    formEmpleados.reset();
    formCliente.reset();
  };
}

// Cerrar modales al hacer clic fuera de ellos
window.onclick = (event) => {
  if (event.target == modalCliente) {
    cerrarModal(modalCliente);
    limpiar()
    formCliente.reset();
  } else if (event.target == modalReserva) {
    cerrarModal(modalReserva);
    habitacionesD.innerHTML = "";
    runD.innerHTML = "";
    limpiar()
    formReserva.reset();
  } else if (event.target == modalEmpleado) {
    cerrarModal(modalEmpleado);
    limpiar()
    formEmpleados.reset();
  } 
};

const tipo = window.localStorage.getItem("tipo");

if (tipo === "Administrador") {
  console.log(' si admin');
  // btnRegistrarEmpleado.style.display = "flex";
  btnAgregarEmpleado.style.display = "flex";
  empleadosLink.style.display = "flex";

  clientesLink.parentElement.style.display = "none";
  habitacionesLink.parentElement.style.display = "none";
  reservasLink.parentElement.style.display = "none";
  historialLink.parentElement.style.display = "none";
  btnAgregarReserva.style.display = "none";
  btnAgregarCliente.style.display = 'none'
} else {
  btnAgregarEmpleado.style.display = "none";
  empleadosLink.style.display = "none";
}

const path = window.location.pathname;

cerrarSesion.addEventListener("click", () => {
  console.log(path);
  if (path === "/duerme-bien/home.html" || path === "/home.html") {
    window.localStorage.setItem("user", "");
    window.location.pathname = "/duerme-bien/";
  }
});

// Verificar es de julio
const verificar = (id) => {
  const input = document.getElementById(id);
  const div = document.getElementById("e-" + id);
  input.classList.remove("is-valid", "is-invalid");

  const alertaInput = (mensaje) => {
    // input.classList.remove('is-valid')
    // input.classList.add('is-invalid')
    div.innerHTML = `<span class="badge bg-danger">${mensaje}</span>`;
  };

  if (input.value.trim() == "") {
    alertaInput("El campo es obligatorio");
  } else {
    input.classList.add("is-valid");
    div.innerHTML = "";
    // Verificaciones específicas
    if (id == "run") {
      if ((input.value = 0)) {
        console.log("Funca");
        alertaInput("Run no válido");
      }
    }
  }
};

const valida = (e) => {
  document.querySelectorAll("required").forEach((item) => {
    verificar(item.id);
  });
  // Evita que el formulario se envie
  e.preventDefault();
};

// addHabitaciones.addEventListener('click', () => )

// let numH = 0

const generateselects = async () => {
  const fetchedDataH = await fetchData("habitacion");
  const hDisponibles = fetchedDataH.fetchedData.filter(
    (item) => item.estado == "Disponible"
  );
  const fetchedDataC = await fetchData("cliente");

  let optionsH = "";
  hDisponibles.forEach((item) => {
    optionsH += `<option value=${item.idhabitacion}>${item.idhabitacion}</option>`;
  });

  let optionsR = "";
  fetchedDataC.fetchedData.forEach((item) => {
    optionsR += `<option value=${item.rutcliente}>${item.rutcliente}</option>`;
  });

  let groupH = `
        <div class="select-content">
            <select id="habitaciones" name="" onblur="validarRegistro(event.target)">
                ${optionsH}
            </select>
        </div>
    `;

  let groupR = `
        <div class="select-content">
            <select id="runes" name="" onblur="validarRegistro(event.target)">
                ${optionsR}
            </select>
        </div>
    `;

  habitacionesD.innerHTML += groupH;
  runD.innerHTML += groupR;
};

btnLimpiarET.addEventListener("click", limpiar);
btnLimpiarC.addEventListener("click", limpiar);
btnLimpiarR.addEventListener("click", limpiar);

function limpiar() {
  const errores = document.querySelectorAll(".error");
  console.log('hola');
  console.log(errores);
  errores.forEach((err) => {
    err.textContent = "";
    err.classList.remove("error");
  });
  formReserva.reset();
  formCliente.reset();
  formEmpleados.reset();
}

btnRegistrar.addEventListener("click", async () => {
  const rutcliente = document.getElementById("runes").value;
  const habitacion = document.getElementById("habitaciones").value;
  const finEstadia = document.getElementById("fechaFin")
  const pasajeros = document.getElementById("pasajeros").value;
  const costoTotal = document.getElementById("costo").value;
  const detalle = document.getElementById("detalle").value;

  // console.log(date);
  const actualFecha = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`
  console.log(finEstadia.value);
  console.log(actualFecha);

  const datos = {
    fk_rutcliente: rutcliente,
    fk_idhabitacion: habitacion,
    fecha_fin: finEstadia.value,
    pasajeros,
    costo_total: costoTotal,
    detalle,
    fecha_inicio: actualFecha
  };
  const time = Date.now().toString();
  const cod = parseInt(time.substring(time.length, 9));

  
  if (
    pasajeros.trim() === "" ||
    costoTotal.trim() === "" ||
    rutcliente === "" ||
    finEstadia === "" ||
    habitacion === ''
  ) {
    return alert("faltan datos por completar");
  } else {
    const fetchedDataH = await fetchData("habitacion");
    const habitacionSelect = await fetchedDataH.fetchedData.filter(
      (item) => item.idhabitacion === habitacion
    );
    const cupos = habitacionSelect[0].cupos;

    if (pasajeros <= cupos) {
      if (costoTotal.length <= 4) {

        if (validarErroresFormulario().length >= 1) {
          return alert('hay un campo incorrecto')
        } else {
          console.log("aprobado");
          await insertData("reserva", {
            codreserva: cod,
            ...datos,
          });
  
          const { data, error } = await updateData(
            "habitacion",
            { estado: "Ocupada" },
            { idhabitacion: habitacion }
          );
  
          limpiar()
          formReserva.reset();
        }
      } else {
        return alert(`El Costo Total esta mal`);
      }
    } else {
      return alert(`la cantidad de pasajeros disponible es de ${cupos}`);
    }
  }

  console.log({
    rutcliente,
    habitacion,
    finEstadia,
    pasajeros,
    costoTotal,
    detalle,
  });
});

// Empleado

btnRegistrarEmpleado.addEventListener("click", async () => {
  const idE = generateID();
  const nombreT = document.getElementById("nombreT").value;
  const apellidoT = document.getElementById("apellidoT").value;
  const claveT = document.getElementById("claveT").value;
  const tipoT = document.getElementById("tipoT").value;

  const datos = {
    rutempleado: idE,
    clave: claveT,
    nombre: nombreT,
    apellido: apellidoT,
    tipo: tipoT,
  }
  console.log(datos);

  if (
    nombreT.trim() === "" ||
    apellidoT.trim() === "" ||
    claveT.trim() === "" ||
    tipoT.trim() === ""
  ) {
    return alert("faltan datos por completar");
  } else {
    const { error } = await insertData("empleados", {
      ...datos
    });
  }
});


function validarErroresFormulario() {
  const errores = document.querySelectorAll(".error");
  console.log(errores);
  return errores
}


// Cliente

btnRegistrarCliente.addEventListener('click', async (e) => {
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
    rutE.trim() === "" ||
    nombreE.trim() === "" ||
    apellidoE.trim() === "" ||
    contactE.trim() === ""
  ) {
    return alert("faltan datos por completar");
  } else {
    const fetchedDataC = await fetchData("cliente");
    const rutExistente = await fetchedDataC.fetchedData.filter(
      (item) => item.rutcliente === parseInt(rutE)
    );

    if (rutExistente.length === 0) {
      if (contactE.trim().length <= 10 && contactE.trim().length >= 8) {

        if (validarErroresFormulario().length >= 1) {
          return alert('hay un campo incorrecto')
        } else {
          console.log("aprobado");
          await insertData("cliente", {
            ...datos,
          });
  
          limpiar()
          formReserva.reset();
        }
      } else {
        return alert(`El número de contacto esta mal`);
      }
    } else {
      return alert(`El rut ya existe`);
    }
  }

  console.log({
    rutE,
    nombreE,
    apellidoE,
    contactE
  });
})


// validar rut