

const validarRegistro = (target) => {
  if (target.id == "fechaInicio") {
    const fechaInicioE = document.getElementById("fechaInicioE");
    const fechaFin = new Date(document.getElementById("fechaFin").value);
    const fechaInicio = new Date(target.value);

    fechaInicioE.textContent = "";
    fechaInicioE.classList.remove("error")

    if (target.value.trim() === "") {
      fechaInicioE.textContent = "Campo incompleto";
      fechaInicioE.classList.add("error");
      return;
    }

    if (fechaInicio > fechaFin) {
      fechaInicioE.textContent = "No puede ser mayor a fin";
      fechaInicioE.classList.add("error");
    }
  }

  if (target.id == "fechaFin") {
    const fechaFinE = document.getElementById("fechaFinE");
    const fechaInicio = new Date(document.getElementById("fechaInicio").value);
    const fechaFin = new Date(target.value);

    fechaFinE.textContent = "";
    fechaFinE.classList.remove("error")

    if (target.value.trim() === "") {
      fechaFinE.textContent = "Campo incompleto";
      fechaFinE.classList.add("error");
      return;
    }

    if (fechaInicio > fechaFin) {
      fechaFinE.textContent = "No puede ser menor a inicio";
      fechaFinE.classList.add("error");
    }
  }

  if (target.id == "pasajeros") {
    const pasajerosE = document.getElementById("pasajerosE");

    pasajerosE.textContent = "";
    pasajerosE.classList.remove("error");

    if (target.value.trim() === "") {
      pasajerosE.textContent = "No hay pasajeros";
      pasajerosE.classList.add("error");
      return;
    }

    if (target.value >= 6) {
      pasajerosE.textContent = "Cantidad inválida";
      pasajerosE.classList.add("error");
    }
  }

  // if (target.id == "costo") {
  //   const costoE = document.getElementById("costoE");

  //   if (target.value.trim() === "") {
  //     costoE.textContent = "No hay valor";
  //     costoE.classList.add("error");
  //     return;
  //   }

  //   if (target.value >= 1001 || target.value <= 99) {
  //     costoE.textContent = "El valor es incorrecto";
  //     costoE.classList.add("error");
  //   } else {
  //     costoE.textContent = "";
  //     costoE.classList.remove("error");
  //   }
  // }

  if (target.id == "habitaciones") {
    const habitacionE = document.getElementById("habitacionE");

    habitacionE.textContent = "";
    habitacionE.classList.remove("error");

    if (target.value.trim() === "") {
      habitacionE.textContent = "Seleccione habitación";
      habitacionE.classList.add("error");
      return;
    }
  }

  if (target.id == "runes") {
    const runE = document.getElementById("runE");

    runE.textContent = "";
    runE.classList.remove("error");

    if (target.value.trim() === "") {
      runE.textContent = "Seleccione cliente";
      runE.classList.add("error");
      return;
    }
  }
}

const validarCliente = (target) => {
  if (target.id == "rutC") {
    const rutE = document.getElementById("rutE");

    rutE.textContent = "";
    rutE.classList.remove("error");

    if (target.value.trim() === '') {
      rutE.textContent = 'Campo incompleto'
      rutE.classList.add('error')
    }

    if (!validaRun(target.value.trim() == '')) {
      rutE.textContent = "El run no es válido";
      rutE.classList.add("error");
    }
  }

  if (target.id == 'nombreC') {
    const nombreE = document.getElementById("nombreE");

    nombreE.textContent = "";
    nombreE.classList.remove("error");

    if (target.value.trim() === '') {
      nombreE.textContent = 'Campo incompleto'
      nombreE.classList.add('error')
    }
  }

  if (target.id == 'apellidoC') {
    const apellidoE = document.getElementById("apellidoE");

    apellidoE.textContent = "";
    apellidoE.classList.remove("error");

    if (target.value.trim() === '') {
      apellidoE.textContent = 'Campo incompleto'
      apellidoE.classList.add('error')
    }
  }

  if (target.id == 'contactC') {
    const contactE = document.getElementById("contactE");

    contactE.textContent = "";
    contactE.classList.remove("error");

    if (target.value.trim() === '') {
      contactE.textContent = 'Campo incompleto'
      contactE.classList.add('error')
    }

    if (target.value.trim() > 999999999 || target.value.trim() < 10000000) {
      contactE.textContent = 'Telefono inválido'
      contactE.classList.add('error')
    }
  }
};

const validarEmpleado = (target) => {
  if (target.id == "nombreT") {
    const nombreE = document.getElementById("nombreET");

    nombreE.textContent = "";
    nombreE.classList.remove("error");

    if (target.value.trim() === '') {
      nombreE.textContent = 'Campo incompleto'
      nombreE.classList.add('error')
    }
  }

  if (target.id == 'apellidoT') {
    const apellidoE = document.getElementById("apellidoET");

    apellidoE.textContent = "";
    apellidoE.classList.remove("error");

    if (target.value.trim() === '') {
      apellidoE.textContent = 'Campo incompleto'
      apellidoE.classList.add('error')
    }
  }

  if (target.id == 'claveT') {
    const claveE = document.getElementById("claveET");

    claveE.textContent = "";
    claveE.classList.remove("error");

    if (target.value.trim() === '') {
      claveE.textContent = 'Campo incompleto'
      claveE.classList.add('error')
    }
  }
};

const validarHabitacion = (target) => {
  if (target.id == 'estado') {
    const estadoE = document.getElementById("estadoE");

    estadoE.textContent = "";
    estadoE.classList.remove("error");

    if (target.value.trim() === '') {
      estadoE.textContent = 'Campo incompleto'
      estadoE.classList.add('error')
    }
  }

  if (target.id == 'camas') {
    const camasE = document.getElementById("camasE");

    camasE.textContent = "";
    camasE.classList.remove("error");

    if (target.value.trim() === '') {
      camasE.textContent = 'Campo incompleto'
      camasE.classList.add('error')
    }
  }

  if (target.id == 'camasG') {
    const camasGE = document.getElementById("camasGE");

    camasGE.textContent = "";
    camasGE.classList.remove("error");

    if (target.value.trim() === '') {
      camasGE.textContent = 'Campo incompleto'
      camasGE.classList.add('error')
    }
  }
}

const validarReserva = (target) => {
  if (target.id == 'fechaI') {
    const fechaIE = document.getElementById('fechaIE')

    fechaIE.textContent = "";
    fechaIE.classList.remove("error");

    if (target.value == '') {
      fechaIE.textContent = 'Campo incompleto'
      fechaIE.classList.add('error')
    }
  }

  if (target.id == 'fechaF') {
    const fechaFE = document.getElementById('fechaFE')

    fechaFE.textContent = "";
    fechaFE.classList.remove("error");

    if (target.value == '') {
      fechaFE.textContent = 'Campo incompleto'
      fechaFE.classList.add('error')
    }
  }
}

const validarEmpleadoE = (target) => {
  if (target.id == "nombreEM") {
    const nombreME = document.getElementById("nombreME");

    nombreME.textContent = "";
    nombreME.classList.remove("error");

    if (target.value.trim() === '') {
      nombreME.textContent = 'Campo incompleto'
      nombreME.classList.add('error')
    }
  }

  if (target.id == 'apellidoEM') {
    const apellidoME = document.getElementById("apellidoME");

    apellidoME.textContent = "";
    apellidoME.classList.remove("error");

    if (target.value.trim() === '') {
      apellidoME.textContent = 'Campo incompleto'
      apellidoME.classList.add('error')
    }
  }
};

const validaRun = (run) => {
  const Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;
      let tmp = rutCompleto.split('-');
      let digv = tmp[1];
      let rut = tmp[0];
      if (digv == 'K') digv = 'k';

      return (Fn.dv(rut) == digv);
    },
    dv: function (T) {
      let M = 0, S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
      return S ? S - 1 : 'k';
    }
  }
  return Fn.validaRut(run)
}