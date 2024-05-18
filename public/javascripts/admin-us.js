let idUsuarioEditar;

function crearUsuario () {
    let correo_us = document.getElementById("inputCorreo").value;
    let nombre_us = document.getElementById("inputNombre").value;
    let primer_apellido_us = document.getElementById("inputPrimerApellido").value;
    let segundo_apellido_us = document.getElementById("inputSegundoApellido").value;
    let celular_us = document.getElementById("inputCelular").value;
    let contrasenna_us = document.getElementById("inputContrasenna").value;
    let tipo_us = document.getElementById("inputtipo_us").value;
    let codigo_sexo = document.getElementById("inputcodigo_sexo").value;


    // Recolectando los datos para enviar al backend.
    let datos = {correo_us, nombre_us, primer_apellido_us, segundo_apellido_us, celular_us, contrasenna_us, tipo_us, codigo_sexo}
    
    //console.log(correo_us, nombre_us, primer_apellido_us, celular_us, contrasenna_us, tipo_us, codigo_sexo);
    
    if (correo_us != "" && nombre_us != "" && primer_apellido_us != "" && celular_us != "" && contrasenna_us != ""  && tipo_us != ""  && codigo_sexo != "") {
      const llamadaHttp = async function () {
        const respuesta = await fetch("/usuarios/crear", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos)
        });
        const respuestaJson = await respuesta.json();
        //console.log(respuestaJson)
        if (respuestaJson.exito) {
            alert("Usuario creado exitosamente!")
            limpiarCampos();
            mostrarUsuarios();
        } else {
            alert("Hubo un problema creando el usuario.")
        }
      }
      llamadaHttp();
    } else {
      alert("Algún campo está vacío");
    }
}

async function mostrarUsuarios() {
    const respuesta = await fetch("/usuarios/", {
      method: "GET",
    });
    const respuestaJson = await respuesta.json();
  
    if (respuestaJson.exito) {
      if (document.getElementById("contenedorUsuarios")) {
        document.getElementById("contenedorUsuarios").remove();
      }
  
      let contenedorUsuarios = document.createElement("table");
      contenedorUsuarios.id = "contenedorUsuarios";
  
      // Crear encabezado de tabla
      let encabezado = contenedorUsuarios.createTHead();
      let filaEncabezado = encabezado.insertRow();
      let celdaEncabezadoId_us = filaEncabezado.insertCell();
      let celdaEncabezadoCorreo_us = filaEncabezado.insertCell();
      let celdaEncabezadoNombre_us = filaEncabezado.insertCell();
      let celdaEncabezadoPrimer_apellido_us = filaEncabezado.insertCell();
      let celdaEncabezadoSegundo_apellido_us = filaEncabezado.insertCell();
      let celdaEncabezadoCelular_us = filaEncabezado.insertCell();
      //let celdaEncabezadoContrasenna_us = filaEncabezado.insertCell();
      let celdaEncabezadotipo_us = filaEncabezado.insertCell();
      let celdaEncabezadocodigo_sexo = filaEncabezado.insertCell();
      let celdaEncabezadoAcciones = filaEncabezado.insertCell();
      celdaEncabezadoId_us.innerHTML = "ID";
      celdaEncabezadoCorreo_us.innerHTML = "CORREO";
      celdaEncabezadoNombre_us.innerHTML = "NOMBRE";
      celdaEncabezadoPrimer_apellido_us.innerHTML = "PRIMER APELLIDO";
      celdaEncabezadoSegundo_apellido_us.innerHTML = "SEGUNDO APELLIDO";
      celdaEncabezadoCelular_us.innerHTML = "CELULAR";
      //celdaEncabezadoContrasenna_us.innerHTML = "CONTRASEÑA";
      celdaEncabezadotipo_us.innerHTML = "tipo_us";
      celdaEncabezadocodigo_sexo.innerHTML = "codigo_sexo";
      celdaEncabezadoAcciones.innerHTML = "ACCIONES";
  
      // Agregar filas de usuarios
      for (let i = 0; i < respuestaJson.lista.length; i++) {
        let usuarios = respuestaJson.lista[i];
        let fila = contenedorUsuarios.insertRow();
        let celdaID = fila.insertCell();
        let celdaCorreo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaPrimerApellido = fila.insertCell();
        let celdaSegundoApellido = fila.insertCell();
        let celdaCelular = fila.insertCell();
        //let celdaContraseña = fila.insertCell();
        let celdatipo_us= fila.insertCell();
        let celdacodigo_sexo= fila.insertCell();
        let celdaAcciones = fila.insertCell();
        celdaID.innerText = usuarios.id_us;
        celdaCorreo.innerText = usuarios.correo_us;
        celdaNombre.innerText = usuarios.nombre_us;
        celdaPrimerApellido.innerText = usuarios.primer_apellido_us;
        celdaSegundoApellido.innerText = usuarios.segundo_apellido_us;
        celdaCelular.innerText = usuarios.celular_us;
        //celdaContraseña.innerText = usuarios.contrasenna_us;
        celdatipo_us.innerText = usuarios.tipo_us;
        celdacodigo_sexo.innerText = usuarios.codigo_sexo;
      
        // Botón de editar
        let botonEditar = document.createElement("button");
        botonEditar.innerText = "Editar";
        botonEditar.addEventListener("click", function () {
          mostrarFormularioEditar(usuarios);
        });
        celdaAcciones.appendChild(botonEditar);
      }
  
      document.getElementById("lista-usuarios").append(contenedorUsuarios);
    }
  }
  
  mostrarUsuarios()

  function mostrarFormularioEditar(usuarios) {
    let tipo_us = "";
    switch (usuarios.tipo_us){
      case 1 :
      tipo_us = "admin" 
      break;
      case 2 :
        tipo_us = "profesor" 
      break;
      case 3 :
        tipo_us= "estudiante"
      break;
      default:
      break;
    } 
    let codigo_sexo = "";
      switch (usuarios.codigo_sexo){
        case 1 :
          codigo_sexo = "femenino" 
        break;
        case 2 :
          codigo_sexo= "masculino"
        break;
        default:
        break;
      }
    idUsuarioEditar = usuarios.id_us;
    document.getElementById("inputCorreo").value = usuarios.correo_us;
    document.getElementById("inputNombre").value = usuarios.nombre_us;
    document.getElementById("inputPrimerApellido").value = usuarios.primer_apellido_us;
    document.getElementById("inputSegundoApellido").value = usuarios.segundo_apellido_us;
    document.getElementById("inputCelular").value = usuarios.celular_us;
    document.getElementById("inputContrasenna").value = "";
    document.getElementById("inputtipo_us").value = tipo_us;
    document.getElementById("inputcodigo_sexo").value = codigo_sexo;
    document.getElementById("formularioEditar").style.display = "block";
  }
  
  async function actualizarUsuario() {
    const id_us = idUsuarioEditar;
    const correo_us = document.getElementById("inputCorreo").value;
    const nombre_us = document.getElementById("inputNombre").value;
    const primer_apellido_us = document.getElementById("inputPrimerApellido").value;
    const segundo_apellido_us = document.getElementById("inputSegundoApellido").value;
    const celular_us = document.getElementById("inputCelular").value;
    const contrasenna_us = document.getElementById("inputContrasenna").value;
    const tipo_us = document.getElementById("inputtipo_us").value;
    const codigo_sexo = document.getElementById("inputcodigo_sexo").value;
 
    
    
    const respuesta = await fetch(`/usuarios/${id_us}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo_us, nombre_us, primer_apellido_us, segundo_apellido_us, celular_us, contrasenna_us, tipo_us,codigo_sexo}),
    });
    const respuestaRecibida = await respuesta.json();
    
    if (respuestaRecibida.exito) {
      document.getElementById("formularioEditar").style.display = "none";
      alert("Usuario Modificado con éxito");
      limpiarCampos();
      mostrarUsuarios();
    } else {
      alert("Hubo un error al editar el usuario");
    }
  }

botonEliminar.addEventListener("click", function () {
  if (confirm("¿Está seguro de eliminar este usuario?")) 
  limpiarCampos();
  {
    eliminarUsuario(idUsuarioEditar);
  }
});

function eliminarUsuario(id_us) {
  fetch(`/usuarios/${id_us}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(data => {
    if (data.exito) {
      alert("Usuario eliminado exitosamente");
      mostrarUsuarios();
    } else {
      alert(data.mensaje);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Error al eliminar el usuario");
  });
}

// Botón de Limpiar Campos
botonLimpiar.addEventListener("click", function () {
  if (confirm("¿Está seguro que desea limpiar los campos?")) {
    limpiarCampos();
  }
});

function limpiarCampos(){
  let correo_us = document.getElementById("inputCorreo").value ="";
  let nombre_us = document.getElementById("inputNombre").value="";
  let primer_apellido_us = document.getElementById("inputPrimerApellido").value="";
  let segundo_apellido_us = document.getElementById("inputSegundoApellido").value="";
  let celular_us = document.getElementById("inputCelular").value="";
  let contrasenna_us = document.getElementById("inputContrasenna").value="";
  let tipo_us = document.getElementById("inputtipo_us").value="";
  let codigo_sexo = document.getElementById("inputcodigo_sexo").value="";
}

function limpiarCamposLogin(){
  const correo_us = document.getElementById("correo").value ="";
  const nombre_us = document.getElementById("nombre").value ="";
  const primer_apellido_us = document.getElementById("primer_apellido").value ="";
  const segundo_apellido_us = document.getElementById("segundo_apellido").value ="";
  const celular_us = document.getElementById("celular").value ="";
  const contrasenna_us = document.getElementById("contrasenna").value ="";
  const tipo_us = document.getElementById("tipo_us").value ="";
  const codigo_sexo= document.getElementById("codigo_sexo").value ="";
}