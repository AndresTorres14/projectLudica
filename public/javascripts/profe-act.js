let idActividadEditar;

function crearActividad() {
  let nombre_act = document.getElementById("inputNombre").value;
  let fecha_act = document.getElementById("inputFecha").value;
  let lugar_act = document.getElementById("inputLugar").value;

  // Recolectando los datos para enviar al backend.
  let datos = { nombre_act, fecha_act, lugar_act };
  
  console.log(nombre_act, fecha_act, lugar_act);

  if (nombre_act != "" && fecha_act != "" && lugar_act != "" ) {
      const llamadaHttp = async function () {
          const respuesta = await fetch("/actividades/crear", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(datos)
          });
          const respuestaJson = await respuesta.json();

          if (respuestaJson.exito) {
              alert("Actividad creada exitosamente!");
              limpiarCampos();
              mostarActividad();
          } else {
              alert("Hubo un problema creando la actividad.")
          }
      }
      llamadaHttp();
  } else {
      alert("Algún campo está vacío");
  }
}

async function mostarActividad() {
  const respuesta = await fetch("/actividades/", {
      method: "GET",
  });
  const respuestaJson = await respuesta.json();

  const fechaDesdeServidor = '2024-01-04T05:00:00.000Z';
  const fechaFormateada = new Date(fechaDesdeServidor).toLocaleDateString('es-ES');
  console.log(fechaFormateada);

  if (respuestaJson.exito) {
      if (document.getElementById("contenedorActividad")) {
          document.getElementById("contenedorActividad").remove();
      }

      let contenedorActividad = document.createElement("table");
      contenedorActividad.id = "contenedorActividad";

      // Crear encabezado de tabla
      let encabezado = contenedorActividad.createTHead();
      let filaEncabezado = encabezado.insertRow();
      let celdaEncabezadoId_act = filaEncabezado.insertCell();
      let celdaEncabezadoNombre_act = filaEncabezado.insertCell();
      let celdaEncabezadoFecha_act = filaEncabezado.insertCell();
      let celdaEncabezadoLugar_act = filaEncabezado.insertCell();
      let celdaEncabezadoAcciones = filaEncabezado.insertCell();
      celdaEncabezadoId_act.innerHTML = "ID";
      celdaEncabezadoNombre_act.innerHTML = "NOMBRE";
      celdaEncabezadoFecha_act.innerHTML = "FECHA";
      celdaEncabezadoLugar_act.innerHTML = "LUGAR";
      celdaEncabezadoAcciones.innerHTML = "ACCIONES";

      // Agregar filas de mascotas
      for (let i = 0; i < respuestaJson.lista.length; i++) {
          let actividades = respuestaJson.lista[i];
          let fila = contenedorActividad.insertRow();
          let celdaID = fila.insertCell();
          let celdaNombre = fila.insertCell();
          let celdaFecha = fila.insertCell();
          let celdaLugar = fila.insertCell();
          let celdaAcciones = fila.insertCell();
          celdaID.innerText = actividades.id_act;
          celdaNombre.innerText = actividades.nombre_act;
          celdaFecha.innerText = new Date(actividades.fecha_act).toLocaleDateString('es-ES');
          celdaLugar.innerText = actividades.lugar_act;
          
          
          // Botón de editar
          let botonEditar = document.createElement("button");
          botonEditar.innerText = "Editar";
          botonEditar.addEventListener("click", function () {
              mostrarFormularioEditar(actividades);
          });
          celdaAcciones.appendChild(botonEditar);
      }

      document.getElementById("lista-actividad").append(contenedorActividad);
  }
}

mostarActividad();

function mostrarFormularioEditar(ACTIVIDADES_LUDICAS) {
    idActividadEditar = ACTIVIDADES_LUDICAS.id_act;
    document.getElementById("inputNombre").value = ACTIVIDADES_LUDICAS.nombre_act;

    // Formatear la fecha en formato "yyyy-mm-dd"
    let fechaFormateada = new Date(ACTIVIDADES_LUDICAS.fecha_act).toISOString().split('T')[0];
    document.getElementById("inputFecha").value = fechaFormateada;

    document.getElementById("inputLugar").value = ACTIVIDADES_LUDICAS.lugar_act;
    document.getElementById("formularioEditar").style.display = "block";
}


async function actualizarActividad() {
  const id_act = idActividadEditar;
  const nombre_act = document.getElementById("inputNombre").value;
  const fecha_act = document.getElementById("inputFecha").value;
  const lugar_act = document.getElementById("inputLugar").value;

  const respuesta = await fetch(`/actividades/${id_act}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre_act, fecha_act, lugar_act }),
  });
  const respuestaRecibida = await respuesta.json();

  if (respuestaRecibida.exito) {
      document.getElementById("formularioEditar").style.display = "none";
      mostarActividad();
  } else {
      alert("Hubo un error al editar la actividad");
  }
}

botonEliminar.addEventListener("click", function () {
  if (confirm("¿Está seguro de eliminar esta actividad?")) {
      eliminarActividad(idActividadEditar);
  }
});

function eliminarActividad(id_act) {
  fetch(`/actividades/${id_act}`, {
      method: "DELETE"
  })
  .then(response => response.json())
  .then(data => {
      if (data.exito) {
          alert("Actividad eliminada exitosamente");
          mostarActividad();
      } else {
          alert(data.mensaje);
      }
  })
  .catch(err => {
      console.error(err);
      alert("Error al eliminar la actividad");
  });
}

// Botón de Limpiar Campos
botonLimpiar.addEventListener("click", function () {
  if (confirm("¿Está seguro que desea limpiar los campos?")) {
      limpiarCampos();
  }
});

function limpiarCampos(){
  let nombre_act = document.getElementById("inputNombre").value ="";
  let fecha_act = document.getElementById("inputFecha").value ="";
  let lugar_act = document.getElementById("inputLugar").value ="";
}