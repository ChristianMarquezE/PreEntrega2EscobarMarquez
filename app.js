


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


// Función para agregar tareas
function agregarTarea(tareas) {
  const nombreTarea = prompt('¿Cuál es el nombre de la tarea?');
  const fechaVencimiento = new Date(
    prompt(
      '¿Cuál es la fecha de vencimiento? (yyyy-mm-ddThh:mm:ss) (Se debe poner una "T" Entre el horario y la hora'
    )
  );

  tareas.push({ nombre: nombreTarea, vencimiento: fechaVencimiento });
  alert(`Tarea "${nombreTarea}" agregada.`);
}

// Función para mostrar tareas
function mostrarTareas(tareas) {
  const hoy = new Date();
  let mensaje = 'Lista de tareas:\n';

  tareas.forEach((tarea) => {
    const DiasRestantes = (tarea.vencimiento - hoy) / (1000 * 60 * 60 * 24);
    const CeilDiasRestantes = Math.floor(
      (tarea.vencimiento - hoy) / (1000 * 60 * 60 * 24)
    );

    const HorasRestantes = (tarea.vencimiento - hoy) / (1000 * 60 * 60);
    const CeilHorasRestantes = Math.floor(
      (tarea.vencimiento - hoy) / (1000 * 60 * 60)
    );

    const MinutosRestantes = (tarea.vencimiento - hoy) / (1000 * 60);
    const CeilMinutosRestantes = Math.floor(
      (tarea.vencimiento - hoy) / (1000 * 60)
    );

    const SegundosRestantes = (tarea.vencimiento - hoy) / 1000;
    const CeilSegundosRestantes = Math.floor((tarea.vencimiento - hoy) / 1000);

    const AbsSegundosRestantes = Math.floor(
      Math.abs((tarea.vencimiento - hoy) / 1000)
    );
    const AbsMinutosRestantes = Math.floor(
      Math.abs((tarea.vencimiento - hoy) / (1000 * 60))
    );
    const AbsHorasRestantes = Math.floor(
      Math.abs((tarea.vencimiento - hoy) / (1000 * 60 * 60))
    );
    const AbsDiasRestantes = Math.floor(
      Math.abs((tarea.vencimiento - hoy) / (1000 * 60 * 60 * 24))
    );
    if (DiasRestantes > 1) {
      mensaje += `${tarea.nombre} - Vence en ${CeilDiasRestantes} días.\n`;
    } else if (HorasRestantes > 1) {
      mensaje += `${tarea.nombre} - Vence en ${CeilHorasRestantes} horas.\n`;
    } else if (MinutosRestantes > 1) {
      mensaje += `${tarea.nombre} - Vence en ${CeilMinutosRestantes} minutos.\n`;
    } else if (SegundosRestantes > 1) {
      mensaje += `${tarea.nombre} - Vence en ${CeilSegundosRestantes} segundos.\n`;
    } else if (SegundosRestantes < -1 && SegundosRestantes >= -59) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${AbsSegundosRestantes} segundos.\n`;
    } else if (MinutosRestantes < -1 && MinutosRestantes >= -59) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${AbsMinutosRestantes} minutos.\n`;
    } else if (HorasRestantes < -1 && HorasRestantes >= -23) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${AbsHorasRestantes} horas.\n`;
    } else if (DiasRestantes < -1) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${AbsDiasRestantes} días.\n`;
    }
  });

  alert(mensaje || 'No hay tareas.');
}

// Función principal
function gestionarTareas() {
  const tareas = [];
  let opcion;

  do {
    opcion = prompt(
      '¿Qué quieres hacer?\n1. Agregar tarea por fecha y hora \n2. Agregar tarea que realizarás ahora YA \n3. Mostrar tareas \n4.Eliminar Tareas \n5.Salir'
    );
    if (opcion === '1') agregarTarea(tareas);
    if (opcion === '2') ingresarTiempo();
    else if (opcion === '3') mostrarTareas(tareas);
  } while (opcion !== '5');

  alert('Saliendo de la aplicación.');
}


// Iniciar la aplicación
gestionarTareas();
