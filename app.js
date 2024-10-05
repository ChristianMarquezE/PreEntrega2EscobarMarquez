function ingresarTiempo() {
  let tiempo = 0;
  let seguirIngresandoTiempo = true;

  while (seguirIngresandoTiempo) {
    let tiempos = prompt("Ingrese tiempo o escriba 'salir'");

    if (tiempos === 'salir') {
      break;
    }
    tiempos = parseInt(tiempos);

    if (isNaN(tiempos) || tiempos < 1 || tiempos === '') {
      alert('Tiempo no válido, ingrese nuevamente');
    }

    if (!isNaN(tiempos)) {
      tiempo = tiempo + tiempos;
    }

    let respuesta = prompt(
      "Quieres seguir agregando tiempo? escribe 'si' o 'no'"
    );
    if (respuesta === 'si') {
      seguirIngresandoTiempo = true;
    }

    if (respuesta === 'no') {
      seguirIngresandoTiempo = false;
    }

    if (respuesta === '' || respuesta === null) {
      seguirIngresandoTiempo = true;
      alert('Ingrese un dato válido');
    }

    if (isNaN(parseInt(respuesta))) {
      console.log('Debes ingresar un dato válido');
    }
  }
  alert('Su tiempo es de: ' + tiempo);
}

ingresarTiempo();
