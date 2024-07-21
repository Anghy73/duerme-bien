const validarRegistro = (target) => {
  console.log(target);
  console.log(target.value);

  if (target.id == "fechaFin") {
    const fechaFinE = document.getElementById("fechaFinE");
    const fechaActual = new Date();
    const fechaFin = new Date(target.value);

    if (target.value.trim() === "") {
      fechaFinE.textContent = "La fecha de fin es incorrecta";
      fechaFinE.classList.add("error");
      return;
    }

    if (fechaActual > fechaFin) {
      fechaFinE.textContent = "La fecha de fin es incorrecta";
      fechaFinE.classList.add("error");
    } else {
      fechaFinE.textContent = "";
      fechaFinE.classList.remove("error");
    }
  }

  if (target.id == "pasajeros") {
    const pasajerosE = document.getElementById("pasajerosE");

    if (target.value.trim() === "") {
      pasajerosE.textContent = "No hay pasajeros";
      pasajerosE.classList.add("error");
      return;
    }

    if (target.value >= 6) {
      pasajerosE.textContent = "Cantidad de psajeros erronea";
      pasajerosE.classList.add("error");
    } else {
      pasajerosE.textContent = "";
      pasajerosE.classList.remove("error");
    }
  }

  if (target.id == "costo") {
    const costoE = document.getElementById("costoE");

    if (target.value.trim() === "") {
      costoE.textContent = "No hay valor";
      costoE.classList.add("error");
      return;
    }

    if (target.value >= 1001 || target.value <= 99) {
      costoE.textContent = "El valor es incorrecto";
      costoE.classList.add("error");
    } else {
      costoE.textContent = "";
      costoE.classList.remove("error");
    }
  }

  if (target.id == "habitaciones") {
    const habitacionE = document.getElementById("habitacionE");

    if (target.value.trim() === "") {
      habitacionE.textContent = "No hay habitaciones";
      habitacionE.classList.add("error");
      return;
    } else {
      habitacionE.textContent = "";
      habitacionE.classList.remove("error");
    }
  }

  if (target.id == "runes") {
    const runE = document.getElementById("runE");

    if (target.value.trim() === "") {
      runE.textContent = "No hay clientes";
      runE.classList.add("error");
      return;
    } else {
      runE.textContent = "";
      runE.classList.remove("error");
    }
  }
};

const validarCliente = (target) => {
  if (target.id == "rutC") {
    const rutE = document.getElementById("rutE");
    if (target.value.trim() === '') {
      rutE.textContent = 'Dato incompleto'
      rutE.classList.add('error')
    }
    if (target.value.trim() == '') {
      rutE.textContent = "El run no es válido";
      rutE.classList.add("error");
    } else {
      rutE.textContent = "";
      rutE.classList.remove("error");
    }
  }

  if (target.id == 'nombreC') {
    const nombreE = document.getElementById("nombreE");
    if (target.value.trim() === '') {
      nombreE.textContent = 'Dato incompleto'
      nombreE.classList.add('error')
    } else {
      nombreE.textContent = "";
      nombreE.classList.remove("error");
    }
  }

  if (target.id == 'apellidoC') {
    const apellidoE = document.getElementById("apellidoE");
    if (target.value.trim() === '') {
      apellidoE.textContent = 'Dato incompleto'
      apellidoE.classList.add('error')
    } else {
      apellidoE.textContent = "";
      apellidoE.classList.remove("error");
    }
  }

  if (target.id == 'contactC') {
    const contactE = document.getElementById("contactE");
    if (target.value.trim() === '') {
      contactE.textContent = 'Dato incompleto'
      contactE.classList.add('error')
    } else {
      contactE.textContent = "";
      contactE.classList.remove("error");
    }
  }
};

const validarEmpleado = (target) => {
  if (target.id == "nombreT") {
    const nombreE = document.getElementById("nombreET");
    console.log(nombreE);
    if (target.value.trim() === '') {
      nombreE.textContent = 'Dato incompleto'
      nombreE.classList.add('error')
    } else {
      nombreE.textContent = "";
      nombreE.classList.remove("error");
    }
  }

  if (target.id == 'apellidoT') {
    const apellidoE = document.getElementById("apellidoET");
    if (target.value.trim() === '') {
      apellidoE.textContent = 'Dato incompleto'
      apellidoE.classList.add('error')
    } else {
      apellidoE.textContent = "";
      apellidoE.classList.remove("error");
    }
  }

  if (target.id == 'claveT') {
    const claveE = document.getElementById("claveET");
    if (target.value.trim() === '') {
      claveE.textContent = 'Dato incompleto'
      claveE.classList.add('error')
    } else {
      claveE.textContent = "";
      claveE.classList.remove("error");
    }
  }
};

// const validaRun = (run) => {
//   const Fn = {
//       // Valida el rut con su cadena completa "XXXXXXXX-X"
//       validaRut: function (rutCompleto) {
//           rutCompleto = rutCompleto.replace("‐", "-");
//           if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
//               return false;
//           let tmp = rutCompleto.split('-');
//           let digv = tmp[1];
//           let rut = tmp[0];
//           if (digv == 'K') digv = 'k';

//           return (Fn.dv(rut) == digv);
//       },
//       dv: function (T) {
//           let M = 0, S = 1;
//           for (; T; T = Math.floor(T / 10))
//               S = (S + T % 10 * (9 - M++ % 6)) % 11;
//           return S ? S - 1 : 'k';
//       }
//   }
//   return Fn.validaRut(run)
// }