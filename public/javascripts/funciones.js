function crearUsuario () {
  const correo_us = document.getElementById("correo").value;
  const nombre_us = document.getElementById("nombre").value;
  const primer_apellido_us = document.getElementById("primer_apellido").value;
  const segundo_apellido_us = document.getElementById("segundo_apellido").value;
  const celular_us = document.getElementById("celular").value;
  const contrasenna_us = document.getElementById("contrasenna").value;
  const val_contrasenna_us = document.getElementById("val_contrasenna").value;
  const tipo_us = document.getElementById("tipo_us").value;
  const codigo_sexo = document.getElementById("codigo_sexo").value;

  //Validaciones registro
  if (nombre_us.length <3) {
    alert("El nombre debe contener al menos 3 letras");
    return;
  }
  if (celular_us.length <10) {
    alert("El teléfono celular debe contener 10 números");
    return;
  } 
  
  //Validaciones de la contraseña
  if (contrasenna_us.length <8) {
    alert("La contraseña debe tener al menos 8 caracteres");
    return; 
  }
  if (!/[A-Z]/.test(contrasenna_us)) {
    alert("La contraseña debe tener al menos una letra mayúscula");
    return;
  }
  if (!/[\d]/.test(contrasenna_us)) {
    alert("La contraseña debe tener al menos un número");
    return;
  }
  if (!/[\W]/.test(contrasenna_us)) {
    alert("La contraseña debe tener al menos un caracter especial");
    return;
  }
  if (contrasenna_us !== val_contrasenna_us) {
    alert("Las contraseñas no coinciden");
    return;
  };

  //Esto es lo que se introduce en el Json
  const datos = {correo_us, nombre_us, primer_apellido_us, segundo_apellido_us, celular_us, contrasenna_us, val_contrasenna_us, tipo_us,codigo_sexo}
  
  console.log (datos);
  
  if (correo_us != "" && nombre_us != "" && primer_apellido_us != "" && celular_us != "" && contrasenna_us != ""  && tipo_us != ""  && codigo_sexo != "") {
      const llamadaHttp = async function () {
      const respuesta = await fetch("/usuarios/crear", {
        method: 'POST',
        //Un Json siempre tiene un header y un body, por eso se llama req.body  
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
      });
      const respuestaJson = await respuesta.json();
      
      if (respuestaJson.exito) {
          alert("Usuario creado exitosamente!");
          limpiarCamposLogin()
          
      } else {
          alert("Hubo un problema creando el usuario.")
      }
    }
    llamadaHttp();
  } else {
    alert("Elige si es Estudiante o Profesor ");
  }
}


// obtener boton Login
const botonLogin = document.getElementById("botonLogin");
botonLogin.addEventListener("click", function (event){
  event.preventDefault();
  const correo_us = document.getElementById("correoLogin").value;
  const contrasenna_us = document.getElementById("contraseñaLogin").value;
  const datos = {correo_us, contrasenna_us}

  if (correo_us != "" && contrasenna_us != "") {
    if (correo_us === "adminsemillero@gmail.com" && contrasenna_us === "admin123") {
      // Acceso permitido
      alert("Usuario inició sesión como administrador exitosamente!")
      window.location.href = "/admin-us";
    } else {
      const llamadaHttp = async function () {
        const respuesta = await fetch("/usuarios/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
            });
            const respuestaJson = await respuesta.json();

            if (respuestaJson.exito) {
              alert("Usuario inició sesión exitosamente!")
              window.location.href = "/registered";
              limpiarCampos();
              limpiarCamposLogin()
              } else {
                alert("Usuario no existe.")
                }
                }
                llamadaHttp();
                }
                  }
                  });

  /*if (correo_us != "" && contrasenna_us != "") {
    const llamadaHttp = async function () {
      const respuesta = await fetch("/usuarios/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
      });
      const respuestaJson = await respuesta.json();
/*
      if (respuestaJson.exito) {
          alert("Usuario inició sesión exitosamente!")
          window.location.href = "/registered";
      } else {
          alert("Hubo un problema iniciando sesión.")
      }
    }
    llamadaHttp();
  } else {
    alert("Algún campo está vacío");
  }
})*/
/*function limpiarCamposLogin(){
  const correo_us = document.getElementById("correo").value ="";
  const nombre_us = document.getElementById("nombre").value ="";
  const primer_apellido_us = document.getElementById("primer_apellido").value ="";
  const segundo_apellido_us = document.getElementById("segundo_apellido").value ="";
  const celular_us = document.getElementById("celular").value ="";
  const contrasenna_us = document.getElementById("contrasenna").value ="";
  const val_contrasenna_us = document.getElementById("val_contrasenna").value ="";
  const rol_us = document.getElementById("rol_us");
  rol_us.selectedIndex = 0; // Establece la opción predeterminada

} */

function limpiarCamposLogin() {
  document.getElementById("correo").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("primer_apellido").value = "";
  document.getElementById("segundo_apellido").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("contrasenna").value = "";
  document.getElementById("val_contrasenna").value = "";
  
  const tipo_us = document.getElementById("tipo_us");
  tipo_us.value = "Elija"; // Establece el valor a una cadena vacía

  const codigo_sexo = document.getElementById("codigo_sexo");
  codigo_sexo.value = "Elija"; // Establece el valor a una cadena vacía
}
