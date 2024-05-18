let ID_ACTIVIDADEditar;

function crearActividad () {
    let ID_ACTIVIDAD = document.getElementById("inputIdActividad").value;
    let NOMBRE_ACTIVIDAD = document.getElementById("inputNombreActividad").value;
    let FECHA_ACTIVIDAD = document.getElementById("inputFechaActividad").value;
    let LUGAR_ACTIVIDAD = document.getElementById("inputLugarActividad").value;
    console.log(datosAct)

    // Recolectando los datosAct para enviar al backend.
    let datosAct = {ID_ACTIVIDAD, NOMBRE_ACTIVIDAD, FECHA_ACTIVIDAD, LUGAR_ACTIVIDAD}
    

    if (ID_ACTIVIDAD != "" && NOMBRE_ACTIVIDAD != "" && FECHA_ACTIVIDAD != "" && LUGAR_ACTIVIDAD != "") {
      const llamadaHttp = async function () {
        const respuesta = await fetch("/actvidades/crearActividad", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosAct)
        });
        const respuestaJson = await respuesta.json();
        //console.log(respuestaJson)
        if (respuestaJson.exito) {
            alert("Actividad creada exitosamente!")
            limpiarCamposActividad();
            mostrarActividad();
        } else {
            alert("Hubo un problema creando la actividad.")
        }
      }
      llamadaHttp();
    } else {
      alert("Algún campo está vacío");
    }
}

async function mostrarActividad() {
    const respuesta = await fetch("/actividades/MOST", {
      method: "GET",
    });
    const respuestaJson = await respuesta.json();
  
    if (respuestaJson.exito) {
      if (document.getElementById("contenedorActividad")) {
        document.getElementById("contenedorActividad").remove();
      }
  
      let contenedorActividad = document.createElement("table");
      contenedorActividad.ID = "contenedorActividad";
  
      // Crear encabezado de tabla
      let encabezado = contenedorActividad.createTHead();
      let filaEncabezado = encabezado.insertRow();
      let celdaEncabezadoID_ACTIVIDAD = filaEncabezado.insertCell();
      let celdaEncabezadoNOMBRE_ACTIVIDAD = filaEncabezado.insertCell();
      let celdaEncabezadoFECHA_ACTIVIDAD = filaEncabezado.insertCell();
      let celdaEncabezadoLUGAR_ACTIVIDAD = filaEncabezado.insertCell();
      let celdaEncabezadoAcciones = filaEncabezado.insertCell();

      celdaEncabezadoID_ACTIVIDAD.innerHTML = "ID ACTIVIDAD";
      celdaEncabezadoNOMBRE_ACTIVIDAD.innerHTML = "NOMBRE ACTIVIDAD";
      celdaEncabezadoFECHA_ACTIVIDAD.innerHTML = "FECHA ACTIVIDAD";
      celdaEncabezadoLUGAR_ACTIVIDAD.innerHTML = "LUGAR ACTIVIDAD";
      celdaEncabezadoAcciones.innerHTML = "ACCIONES";
  
      // Agregar filas de usuarios
      for (let i = 0; i < respuestaJson.lista.length; i++) {
        let ACTIVIDADES_LUDICAS = respuestaJson.lista[i];
        let fila = contenedorActividad.insertRow();
        let celdaIdActividad = fila.insertCell();
        let celdaNombreActividad = fila.insertCell();
        let celdaFechaActividad = fila.insertCell();
        let celdaLugarActividad = fila.insertCell();
        let celdaAcciones = fila.insertCell();

        celdaIdActividad.innerText = ACTIVIDADES_LUDICAS.ID_ACTIVIDAD;
        celdaNombreActividad.innerText = ACTIVIDADES_LUDICAS.NOMBRE_ACTIVIDAD;
        celdaFechaActividad.innerText = ACTIVIDADES_LUDICAS.FECHA_ACTIVIDAD;
        celdaLugarActividad.innerText = ACTIVIDADES_LUDICAS.LUGAR_ACTIVIDAD;
      
        // Botón de editar
        let botonEditar = document.createElement("button");
        botonEditar.innerText = "Editar";
        botonEditar.addEventListener("click", function () {
          mostrarFormuEditar(ACTIVIDADES_LUDICAS);
        });
        celdaAcciones.appendChild(botonEditar);
      }
  
      document.getElementById("lista-ACTIVIDADES_LUDICAS").append(contenedorActividad);
    }
  }
  
  mostrarActividad()

  function mostrarFormuEditar(ACTIVIDADES_LUDICAS) {
    
    ID_ACTIVIDADEditar = ACTIVIDADES_LUDICAS.ID_ACTIVIDAD;
    document.getElementById("inputIdActividad").value = ACTIVIDADES_LUDICAS.ID_ACTIVIDAD;
    document.getElementById("inputNombreActividad").value = ACTIVIDADES_LUDICAS.NOMBRE_ACTIVIDAD;
    document.getElementById("inputFechaActividad").value = ACTIVIDADES_LUDICAS.FECHA_ACTIVIDAD;
    document.getElementById("inputLugarActividad").value = ACTIVIDADES_LUDICAS.LUGAR_ACTIVIDAD;
    document.getElementById("formularioEditar").style.display = "block";
  }
  
  async function actualizarActividad() {
    const ID_ACTIVIDAD = ID_ACTIVIDADEditar;
    const NOMBRE_ACTIVIDAD = document.getElementById("inputNombreActividad").value;
    const FECHA_ACTIVIDAD = document.getElementById("inputFechaActividad").value;
    const LUGAR_ACTIVIDAD = document.getElementById("inputLugarActividad").value;
  
    
    const respuesta = await fetch(`/actividades/${ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID_ACTIVIDAD, NOMBRE_ACTIVIDAD, FECHA_ACTIVIDAD, LUGAR_ACTIVIDAD}),
    });
    const respuestaRecibida = await respuesta.json();
    
    if (respuestaRecibida.exito) {
      document.getElementById("formularioEditar").style.display = "none";
      alert("Actividad Modificada con éxito");
      limpiarCamposActividad();
      mostrarActividad();
    } else {
      alert("Hubo un error al editar la Actividad");
    }
  }

botonEliminar.addEventListener("click", function () {
  if (confirm("¿Está seguro de eliminar esta Actividad?")) 
  limpiarCamposActividad();
  {
    eliminarActividad(ID_ACTIVIDADEditar);
  }
});

function eliminarActividad(ID) {
  fetch(`/actividades/${ID}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(data => {
    if (data.exito) {
      alert("Actividad eliminada exitosamente");
      mostrarActividad();
    } else {
      alert(data.mensaje);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Error al eliminar la Actividad");
  });
}

// Botón de Limpiar Campos
botonLimpiar.addEventListener("click", function () {
  if (confirm("¿Está seguro que desea limpiar los campos?")) {
    limpiarCamposActividad();
  }
});

function limpiarCamposActividad(){
  let ID_ACTIVIDAD = document.getElementById("inputIdActividad").value ="";
  let NOMBRE_ACTIVIDAD = document.getElementById("inputNombreActividad").value="";
  let FECHA_ACTIVIDAD = document.getElementById("inputFechaActividad").value="";
  let LUGAR_ACTIVIDAD = document.getElementById("inputLugarActividad").value="";
}

function limpiarCamposActividadLogin(){
  const ID_ACTIVIDAD = document.getElementById("id_actividad").value ="";
  const NOMBRE_ACTIVIDAD = document.getElementById("nombre_actividad").value ="";
  const FECHA_ACTIVIDAD = document.getElementById("fecha_actividad").value ="";
  const LUGAR_ACTIVIDAD = document.getElementById("lugar_actividad").value ="";
}