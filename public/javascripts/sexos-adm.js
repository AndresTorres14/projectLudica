let idSexoEditar;

function crearActividad() {
  let id_sex = document.getElementById("inputId").value;
  let tipo_sex = document.getElementById("inputTipo").value;
  

  // Recolectando los datos para enviar al backend.
  let datos = { id_sex, tipo_sex };
  
  console.log(id_sex, tipo_sex );

  if (id_sex != "" && tipo_sex != ""  ) {
      const llamadaHttp = async function () {
          const respuesta = await fetch("/sexos/crear", {
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
             mostrarSexo();
          } else {
              alert("Hubo un problema creando la actividad.")
          }
      }
      llamadaHttp();
  } else {
      alert("Algún campo está vacío");
  }
}

async function mostrarSexo() {
  const respuesta = await fetch("/sexos/", {
      method: "GET",
  });
  const respuestaJson = await respuesta.json();

  
  if (respuestaJson.exito) {
      if (document.getElementById("contenedorSexo")) {
          document.getElementById("contenedorSexo").remove();
      }

      let contenedorSexo = document.createElement("table");
      contenedorSexo.id = "contenedorSexo";

      // Crear encabezado de tabla
      let encabezado = contenedorSexo.createTHead();
      let filaEncabezado = encabezado.insertRow();
      let celdaEncabezadoId_sex = filaEncabezado.insertCell();
      let celdaEncabezadoTipo_sex = filaEncabezado.insertCell();
      let celdaEncabezadoAcciones = filaEncabezado.insertCell();
      celdaEncabezadoId_sex.innerHTML = "ID";
      celdaEncabezadoTipo_sex.innerHTML = "NOMBRE";
      celdaEncabezadoAcciones.innerHTML = "ACCIONES";

      // Agregar filas de mascotas
      for (let i = 0; i < respuestaJson.lista.length; i++) {
          let sexos = respuestaJson.lista[i];
          let fila = contenedorSexo.insertRow();
          let celdaID = fila.insertCell();
          let celdaTipo = fila.insertCell();
          let celdaAcciones = fila.insertCell();
          celdaID.innerText = sexos.id_sex;
          celdaTipo.innerText = sexos.tipo_sex;
          
          
          // Botón de editar
          let botonEditar = document.createElement("button");
          botonEditar.innerText = "Editar";
          botonEditar.addEventListener("click", function () {
              mostrarFormularioEditar(sexos);
          });
          celdaAcciones.appendChild(botonEditar);
      }

      document.getElementById("lista-sexo").append(contenedorSexo);
  }
}

mostarSexo();

function mostrarFormularioEditar(sexos) {
    idSexoEditar = sexos.id_sex;
    document.getElementById("inputTipo").value = sexos.tipo_sex;

   
    document.getElementById("formularioEditar").style.display = "block";
}


async function actualizarActividad() {
  const id_act = idSexoEditar;
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
     mostrarSexo();
  } else {
      alert("Hubo un error al editar la actividad");
  }
}

botonEliminar.addEventListener("click", function () {
  if (confirm("¿Está seguro de eliminar esta actividad?")) {
      eliminarActividad(idSexoEditar);
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
         mostrarSexo();
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