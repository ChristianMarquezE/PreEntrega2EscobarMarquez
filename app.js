const tareas = [];
// Función para agregar tareas
function agregarTarea() {
  let nombreTarea;

  // Bucle para asegurar que se ingrese un nombre válido
  do {
    nombreTarea = prompt('¿Cuál es el nombre de la tarea? o escribe "salir"');
    if (nombreTarea === null) {
      gestionarTareas(); // Si el usuario cierra el prompt
      return; // Salir de la función
    }
    if (nombreTarea.trim() === '') {
      alert('Por favor, ingresa un nombre a la tarea.');
    }
  } while (nombreTarea.trim() === '');

  if (nombreTarea.toLowerCase() === 'salir') {
    gestionarTareas();
    return;
  }

  let fechaVencimiento;

  // Bucle para asegurar que se ingrese una fecha válida
  do {
    const fechaInput = prompt(
      '¿Cuál es la fecha de vencimiento? (yyyy-mm-ddThh:mm:ss) o pulse "Cancelar"'
    );
    if (fechaInput === null) {
      gestionarTareas();
      return; // Salir de la función
    }
    fechaVencimiento = new Date(fechaInput);
    if (isNaN(fechaVencimiento.getTime())) {
      alert('Por favor, ingresa una fecha de expiración válida para la tarea.');
    }
  } while (isNaN(fechaVencimiento.getTime()));

  tareas.push({ nombre: nombreTarea, vencimiento: fechaVencimiento });
  alert(`Tarea "${nombreTarea}" agregada.`);
}

function ingresarTiempo() {
  let tiempo = 0;
  let seguirIngresandoTiempo = true;

  while (seguirIngresandoTiempo) {
    let actividad;
    do {
      actividad = prompt(
        'Ingrese el nombre de la Actividad o "salir" para finalizar:'
      );
      if (actividad === null || actividad.trim() === '') {
        alert('Ingrese un dato válido para la Actividad.');
      }
    } while (actividad === null || actividad.trim() === '');

    if (actividad.toLowerCase() === 'salir') {
      break;
    }

    let tiempos;
    do {
      tiempos = prompt(
        "Ingrese el tiempo en minutos para la Actividad o 'salir' para finalizar:"
      );
      if (
        tiempos === null ||
        tiempos.trim() === '' ||
        (tiempos !== 'salir' && (isNaN(tiempos) || tiempos < 1))
      ) {
        alert('Ingrese un dato válido para el tiempo.');
      }
    } while (
      tiempos === null ||
      tiempos.trim() === '' ||
      (tiempos !== 'salir' && (isNaN(tiempos) || tiempos < 1))
    );
    
    if (tiempos.toLowerCase() === 'salir') {
      break;
    }

    tiempos = parseInt(tiempos);
    tiempo += tiempos; // Tiempo válido acumulado
    let tiempoEnHoras = tiempo / 60;

    console.log(
      `Con la Actividad "${actividad}" tienes ${tiempoEnHoras.toFixed(
        2
      )} horas acumuladas en tu día.`
    );
    alert(`Ha agregado la actividad "${actividad}" correctamente.`);

    let respuesta;
    do {
      respuesta = prompt(
        "¿Quieres seguir agregando Actividades? escribe 'si' o 'no'."
      );
      if (respuesta === null || respuesta.trim() === '') {
        alert('Por favor, ingrese "si" o "no".');
      }
    } while (
      respuesta === null ||
      respuesta.trim() === '' ||
      (respuesta.toLowerCase() !== 'si' && respuesta.toLowerCase() !== 'no')
    );

    if (respuesta.toLowerCase() === 'no') {
      seguirIngresandoTiempo = false;
    }
  }

  alert(
    `El tiempo total que dedicarás a tus Actividades diarias es de: ${(
      tiempo / 60
    ).toFixed(2)} horas.`
  );
}
// Función para mostrar tareas
function mostrarTareas() {
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
  if(tareas.length >= 1){
  alert(mensaje);
  }else{
    alert('No hay tareas.');
  }
}

function eliminarTarea(nombre) {
  const indice = tareas.findIndex(
    (tarea) => tarea.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (indice !== -1) {
    tareas.splice(indice, 1);
    alert(`Tarea ${nombre} eliminada con exito`);
    mostrarTareas(tareas);
  } else {
    alert(`Tarea ${nombre} no encontrada`);
  }
}

function encontrarTareasPorVencer(vencimientoMaximo) {
  const hoy = new Date();
  const tareasPorVencer = tareas.filter(
    (tarea) => (tarea.vencimiento - hoy) / (1000 * 60 * 60) <= vencimientoMaximo
  );
  console.log(tareasPorVencer);
  if (tareasPorVencer.length >= 1) {
    let mensaje = `Lista de tareas próximas a vencer dentro de ${vencimientoMaximo} Horas:\n`;
    tareasPorVencer.map((tareas) => (mensaje += `${tareas.nombre}\n`));

    alert(mensaje);
  } else {
    alert(`No hay tareas por vencer dentro de ${vencimientoMaximo} horas`);
  }
}

// Función principal
function gestionarTareas() {
  let opcion;

  do {
    opcion = prompt(
      '¿Qué quieres hacer?\n1. Agregar tarea por fecha y hora \n2. Sumador de tareas que realizarás ahora YA \n3. Mostrar tareas \n4. Eliminar Tareas\n5. Tareas próximas a vencer \n6. Salir'
    );
    if (opcion === '1') agregarTarea(tareas);
    if (opcion === '2') ingresarTiempo();
    else if (opcion === '3') mostrarTareas(tareas);
    else if (opcion === '4') {
      let tarea;

      do {
        tarea = prompt('Ingrese el nombre de la tarea a eliminar o pulse "Cancelar"');

        if (tarea === null) {
          gestionarTareas();
          return;
        } else if (tarea.trim() === '') {
          alert('Por favor ingrese el nombre de una tarea');
          tarea = null;
        }
      } while (tarea === null);
      eliminarTarea(tarea);
    } else if (opcion === '5') {
      let tiempoMaximoTareasPorVencer;

      do {
        tiempoMaximoTareasPorVencer = prompt(
          'Ingrese el tiempo máximo de expiración en HORAS de las tareas pendientes o presiona "Cancelar"'
        );

        // Si el usuario presiona "Cancelar", se vuelve a gestionar tareas
        if (tiempoMaximoTareasPorVencer === null) {
          gestionarTareas(); // Regresar a la función principal
          return; // Salir de la opción actual
        } else if (
          tiempoMaximoTareasPorVencer.trim() === '' ||
          isNaN(tiempoMaximoTareasPorVencer) ||
          Number(tiempoMaximoTareasPorVencer) < 0
        ) {
          alert('Por favor, ingrese un tiempo válido (número positivo).');
          tiempoMaximoTareasPorVencer = null; // Forzar a que se repita el bucle
        }
      } while (tiempoMaximoTareasPorVencer === null);

      encontrarTareasPorVencer(tiempoMaximoTareasPorVencer);
    }
  } while (opcion !== '6');

  alert('Saliendo de la aplicación.');
}
// Iniciar la aplicación
gestionarTareas();
