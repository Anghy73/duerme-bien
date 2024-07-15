function validarRegistro(target) {
  console.log(target);

  
  if (target.id == 'fechaFin') {
    const fechaFinE = document.getElementById('fechaFinE')
    const fechaActual = new Date();
    const fechaFin = new Date(target.value);

    if (fechaActual > fechaFin) {
      // fechaFinE.textContent = 'La fecha de fin no puede ser el mismo dia o un dia antes de la reservasion'
      fechaFinE.textContent = 'La fecha de fin es incorrecta'
      fechaFinE.classList.add('error')
      // fechaFinE.style.cssText = 'background-Color: #ff000077'
    } else {
      fechaFinE.textContent = ''
      fechaFinE.classList.remove('error')
    }
  }

  if (target.id == 'pasajeros') {
    
  }

  if (target.id == 'costo') {
    
  }
}

// if (id == "run") {
//   if (!validaRun(input.value.trim())) {
//     input.classList.add("is-invalid");
//     div.innerHTML = "<span>El run no es válido</span>";
//   }
// }