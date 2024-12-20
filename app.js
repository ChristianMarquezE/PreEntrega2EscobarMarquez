const tareas = [];
// Función para agregar tareas
function agregarTarea() {
  let nombreTarea;

  // Bucle para asegurar que se ingrese un nombre válido
  do {
    nombreTarea = prompt('¿Cuál es el nombre de la tarea? o escribe "salir"');
    if (nombreTarea === null) {
      // Si el usuario cierra el prompt
      return; // Salir de la función
    }
    if (nombreTarea.trim() === '') {
      alert('Por favor, ingresa un nombre a la tarea.');
    }
  } while (nombreTarea.trim() === '');

  if (nombreTarea.toLowerCase() === 'salir') {
    return;
  }

  let fechaVencimiento;

  // Bucle para asegurar que se ingrese una fecha válida
  do {
    const fechaInput = prompt(
      '¿Cuál es la fecha de vencimiento? (aaaa-mm-ddThh:mm) o pulse "Cancelar"'
    );
    if (fechaInput === null) {
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
function mostrarTareas() {
  let mensaje = 'Lista de tareas:\n';

  tareas.forEach((tarea) => {
    const fechaVencimiento = formatearFecha(tarea.vencimiento);
    mensaje += `${tarea.nombre} - ${fechaVencimiento}\n`;
  });

  if (tareas.length >= 1) {
    alert(mensaje);
  } else {
    alert('No hay tareas.');
  }
}

function formatearFecha(fecha) {
  const opciones = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
}
// Función para saber en cuánto tiempo vencen mis tareas
function mostrarTareasVencimiento() {
  const hoy = new Date();
  let mensaje = 'Lista de tareas:\n';

  /* =====================================
  =               Bucle                =
  ===================================== */

  tareas.forEach((tarea) => {
    /* =====================================
    =               Variables                =
    ===================================== */

    const DiasRestantes = (tarea.vencimiento - hoy) / (1000 * 60 * 60 * 24);

    const HorasRestantes = (tarea.vencimiento - hoy) / (1000 * 60 * 60);

    const MinutosRestantes = (tarea.vencimiento - hoy) / (1000 * 60);

    const SegundosRestantes = (tarea.vencimiento - hoy) / 1000;
    const CeilSegundosRestantes = Math.floor((tarea.vencimiento - hoy) / 1000);
    const AbsMinutosRestantes = Math.floor(
      Math.abs((tarea.vencimiento - hoy) / (1000 * 60))
    );

    const DiasTruncado = Math.trunc(DiasRestantes);
    const HorasTruncado = Math.trunc(HorasRestantes);
    const MinutosTruncado = Math.trunc(MinutosRestantes);
    const AbsMinutosTruncado = Math.trunc(AbsMinutosRestantes);

    /* =====================================
    =        VENCIMIENTOS PROXIMOS               =
    ===================================== */

    const HorasRestantesdeDia = (DiasRestantes - DiasTruncado) * 24;
    const MinutosRestantesdeDia =
      (HorasRestantesdeDia - Math.trunc(HorasRestantesdeDia)) * 60;
    if (
      DiasRestantes >= 1 &&
      HorasRestantesdeDia >= 1 &&
      MinutosRestantesdeDia < 1
    ) {
      mensaje += `${
        tarea.nombre
      } - Vence en ${DiasTruncado} días y ${Math.trunc(
        HorasRestantesdeDia
      )} horas\n`;
    } else if (
      DiasRestantes >= 1 &&
      MinutosRestantesdeDia >= 1 &&
      HorasRestantesdeDia < 1
    ) {
      mensaje += `${
        tarea.nombre
      } - Vence en ${DiasTruncado} días y ${Math.trunc(
        Math.trunc(MinutosRestantesdeDia)
      )} minutos\n`;
    } else if (
      DiasRestantes >= 1 &&
      MinutosRestantesdeDia < 1 &&
      HorasRestantesdeDia < 1
    ) {
      mensaje += `${tarea.nombre} - Vence en ${DiasTruncado} días\n`;
    } else if (DiasRestantes >= 1) {
      mensaje += `${tarea.nombre} - Vence en ${DiasTruncado} días, ${Math.trunc(
        HorasRestantesdeDia
      )} horas y ${Math.trunc(MinutosRestantesdeDia)} minutos  \n`;
    }

    const MinutosRestantesdeHora = (HorasRestantes - HorasTruncado) * 60;
    const SegundosRestantesdeHora =
      (MinutosRestantesdeHora - Math.trunc(MinutosRestantesdeHora)) * 60;
    if (
      HorasRestantes >= 1 &&
      MinutosRestantesdeHora >= 1 &&
      SegundosRestantesdeHora < 1 &&
      HorasRestantes < 24
    ) {
      mensaje += `${
        tarea.nombre
      } - Vence en ${HorasTruncado} Horas y ${Math.trunc(
        MinutosRestantesdeHora
      )} minutos\n`;
    } else if (
      HorasRestantes >= 1 &&
      SegundosRestantesdeHora >= 1 &&
      MinutosRestantesdeDia < 1 &&
      HorasRestantes < 24
    ) {
      mensaje += `${
        tarea.nombre
      } - Vence en ${HorasTruncado} Horas y ${Math.trunc(
        SegundosRestantesdeHora
      )} segundos\n`;
    } else if (
      HorasRestantes >= 1 &&
      SegundosRestantesdeHora < 1 &&
      MinutosRestantesdeHora < 1 &&
      HorasRestantes < 24
    ) {
      mensaje += `${tarea.nombre} - Vence en ${HorasTruncado} Horas\n`;
    } else if (HorasRestantes >= 1 && HorasRestantes < 24) {
      mensaje += `${
        tarea.nombre
      } - Vence en ${HorasTruncado} horas, ${Math.trunc(
        MinutosRestantesdeHora
      )} minutos y ${Math.trunc(SegundosRestantesdeHora)} segundos\n`;
    }

    const SegundosRestantesdeMinuto = (MinutosRestantes - MinutosTruncado) * 60;
    if (
      MinutosRestantes >= 1 &&
      SegundosRestantesdeHora < 1 &&
      MinutosRestantes < 60 &&
      HorasRestantes < 24
    ) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${MinutosTruncado} Minutos.\n`;
    } else if (
      MinutosRestantes >= 1 &&
      SegundosRestantesdeHora > 1 &&
      MinutosRestantes < 60
    ) {
      mensaje += `${
        tarea.nombre
      } - Vence en ${MinutosTruncado} Minutos y ${Math.trunc(
        SegundosRestantesdeMinuto
      )} segundos \n`;
      //Segundos restantes
    } else if (SegundosRestantes >= 1 && SegundosRestantes < 60) {
      mensaje += `${tarea.nombre} - Vence en ${CeilSegundosRestantes} segundos.\n`;
    }
  });
  if (tareas.length >= 1) {
    alert(mensaje);
  } else {
    alert('No hay tareas.');
  }
}
function mostrarTareasVencidas() {
  const hoy = new Date();
  let mensaje = 'Lista de tareas:\n';

  /* =====================================
  =               Bucle                =
  ===================================== */

  tareas.forEach((tarea) => {
    /* =====================================
    =               Variables                =
    ===================================== */

    const DiasRestantes = (tarea.vencimiento - hoy) / (1000 * 60 * 60 * 24);

    const HorasRestantes = (tarea.vencimiento - hoy) / (1000 * 60 * 60);

    const MinutosRestantes = (tarea.vencimiento - hoy) / (1000 * 60);

    const SegundosRestantes = (tarea.vencimiento - hoy) / 1000;
    const CeilSegundosRestantes = Math.floor((tarea.vencimiento - hoy) / 1000);
    const AbsMinutosRestantes = Math.floor(
      Math.abs((tarea.vencimiento - hoy) / (1000 * 60))
    );

    const DiasTruncado = Math.trunc(DiasRestantes);
    const HorasTruncado = Math.trunc(HorasRestantes);
    const MinutosTruncado = Math.trunc(MinutosRestantes);
    const AbsMinutosTruncado = Math.trunc(AbsMinutosRestantes);

    /* =====================================
    =        VENCIMIENTOS PROXIMOS               =
    ===================================== */

    const HorasRestantesdeDia = (DiasRestantes - DiasTruncado) * 24;
    const MinutosRestantesdeDia =
      (HorasRestantesdeDia - Math.trunc(HorasRestantesdeDia)) * 60;

    const MinutosRestantesdeHora = (HorasRestantes - HorasTruncado) * 60;
    const SegundosRestantesdeHora =
      (MinutosRestantesdeHora - Math.trunc(MinutosRestantesdeHora)) * 60;

    const SegundosRestantesdeMinuto = (MinutosRestantes - MinutosTruncado) * 60;

    /* =====================================
=               EXPIRACIONES VENCIDAS               =
===================================== */

    if (
      DiasRestantes <= -1 &&
      HorasRestantesdeDia <= -1 &&
      MinutosRestantesdeDia > -1
    ) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        DiasTruncado
      )} días y ${Math.abs(Math.trunc(HorasRestantesdeDia))} horas\n`;
    } else if (
      DiasRestantes <= -1 &&
      MinutosRestantesdeDia <= -1 &&
      HorasRestantesdeDia > -1
    ) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        DiasTruncado
      )} días y ${Math.abs(
        Math.trunc(Math.trunc(MinutosRestantesdeDia))
      )} minutos\n`;
    } else if (
      DiasRestantes <= -1 &&
      MinutosRestantesdeDia > -1 &&
      HorasRestantesdeDia > -1
    ) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        DiasTruncado
      )} días\n`;
    } else if (DiasRestantes <= -1) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        DiasTruncado
      )} días, ${Math.abs(Math.trunc(HorasRestantesdeDia))} horas y ${Math.abs(
        Math.trunc(MinutosRestantesdeDia)
      )} minutos  \n`;
    } else if (
      HorasRestantes <= -1 &&
      MinutosRestantesdeHora <= -1 &&
      SegundosRestantesdeHora > -1 &&
      HorasRestantes > -24
    ) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        HorasTruncado
      )} Horas y ${Math.abs(Math.trunc(MinutosRestantesdeHora))} minutos\n`;
    } else if (
      HorasRestantes <= -1 &&
      SegundosRestantesdeHora <= -1 &&
      MinutosRestantesdeDia > -1 &&
      HorasRestantes > -24
    ) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        HorasTruncado
      )} Horas y ${Math.abs(Math.trunc(SegundosRestantesdeHora))} segundos\n`;
    } else if (
      HorasRestantes <= -1 &&
      SegundosRestantesdeHora > -1 &&
      MinutosRestantesdeHora > -1 &&
      HorasRestantes > -24
    ) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        HorasTruncado
      )} Horas\n`;
    } else if (HorasRestantes <= -1 && HorasRestantes > -24) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        HorasTruncado
      )} horas, ${Math.abs(
        Math.trunc(MinutosRestantesdeHora)
      )} minutos y ${Math.abs(Math.trunc(SegundosRestantesdeHora))} segundos\n`;
    } else if (
      MinutosRestantes <= -1 &&
      SegundosRestantesdeHora > -1 &&
      MinutosRestantes > -60 &&
      HorasRestantes > -24
    ) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${AbsMinutosTruncado} Minutos\n`;
    } else if (
      MinutosRestantes <= -1 &&
      SegundosRestantesdeHora < -1 &&
      MinutosRestantes > -60
    ) {
      mensaje += `${
        tarea.nombre
      } - EXPIRO hace ${AbsMinutosTruncado} Minutos y ${Math.abs(
        Math.trunc(SegundosRestantesdeMinuto)
      )} segundos \n`;
    }

    //Segundos expirada
    else if (SegundosRestantes <= -1 && SegundosRestantes > -60) {
      mensaje += `${tarea.nombre} - EXPIRO hace ${Math.abs(
        SegundosRestantes
      )} segundos.\n`;
    }
  });
  if (tareas.length >= 1) {
    alert(mensaje);
  } else {
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
    (tarea) =>
      (tarea.vencimiento - hoy) / (1000 * 60 * 60) <= vencimientoMaximo &&
      (tarea.vencimiento - hoy) / (1000 * 60 * 60) > 0
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
      '¿Qué quieres hacer?\n1. Agregar tarea por fecha y hora \n2. Sumador de tareas que realizarás ahora YA \n3. Mostrar Tareas\n4. ¿En cuánto tiempo vencen mis tareas? \n5. Tareas Vencidas\n6. Eliminar Tareas\n7. Tareas próximas a vencer \n8. Salir'
    );
    if (opcion === '1') agregarTarea(tareas);
    if (opcion === '2') ingresarTiempo();
    else if (opcion === '3') mostrarTareas(tareas);
    else if (opcion === '4') mostrarTareasVencimiento(tareas);
    else if (opcion === '5') mostrarTareasVencidas(tareas);
    else if (opcion === '6') {
      let tarea;

      do {
        tarea = prompt(
          'Ingrese el nombre de la tarea a eliminar o pulse "Cancelar"'
        );

        if (tarea === null) {
          gestionarTareas();
          return;
        } else if (tarea.trim() === '') {
          alert('Por favor ingrese el nombre de una tarea');
          tarea = null;
        }
      } while (tarea === null);
      eliminarTarea(tarea);
    } else if (opcion === '7') {
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
  } while (opcion !== '8');

  alert('Saliendo de la aplicación...');
}
// Iniciar la aplicación
gestionarTareas();
