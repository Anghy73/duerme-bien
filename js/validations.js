function validarRegistro(target) {
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
      // fechaFinE.textContent = 'La fecha de fin no puede ser el mismo dia o un dia antes de la reservasion'
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
      habitacionE.textContent = "No hay clientes";
      habitacionE.classList.add("error");
      return;
    } else {
      habitacionE.textContent = "";
      habitacionE.classList.remove("error");
    }
  }
}

// if (id == "run") {
//   if (!validaRun(input.value.trim())) {
//     input.classList.add("is-invalid");
//     div.innerHTML = "<span>El run no es válido</span>";
//   }
// }
