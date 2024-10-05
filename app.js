function ingresarTiempo() {
  let tiempo = 0;
  let seguirIngresandoTiempo = true;

  while (seguirIngresandoTiempo) {
    let actividad = prompt(
      'Esto es un organizador de tiempo para tus actividades diaras, por favor ingrese el nombre de la Actividad que realizarás o escribe "salir" para finalizar.'
    );
    if (actividad === '' || actividad === null) {
      alert('Ingrese un dato válido.');
      continue;
    }
    if (actividad === 'salir') {
      break;
    }
    alert(
      `Ha agregado la actividad "${actividad}" a tu lista de Actividades correctamente.`
    );
    let tiempos = prompt(
      "Ingrese el tiempo en minutos que le dedicarás a realizar dicha Actividad o escriba 'salir' para finalizar."
    );

    if (tiempos === 'salir') {
      break;
    }
    tiempos = parseInt(tiempos);

    if (isNaN(tiempos) || tiempos < 1 || tiempos === '') {
      alert('Tiempo no válido, ingrese nuevamente.');
    }

    if (!isNaN(tiempos)) {
      tiempo = tiempo + tiempos;
    }

    tiempoEnHoras = tiempo / 60;
    console.log(`Con la Actividad "${actividad}" tienes ${tiempoEnHoras} horas acumuladas en tu día.`);

    let respuesta = prompt(
      "¿Quieres seguir agregando Actividades a tu día? escribe 'si' o 'no'."
    );
    if (respuesta === 'si') {
      seguirIngresandoTiempo = true;
    }

    if (respuesta === 'no') {
      seguirIngresandoTiempo = false;
    }

    if (respuesta === '' || respuesta === null) {
      seguirIngresandoTiempo = true;
      alert('Ingrese un dato válido.');
    }
  }
 
  alert(
    `El tiempo que dedicarás a tus Actividades diarias es de: ${tiempoEnHoras} horas.`
  );
}

ingresarTiempo();
