var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');
oracledb.autoCommit = true;

router.get('/', async function (request, response) {

    let connection;
    try {

        connection = await oracledb.getConnection({
            user: "Ludica_admi",
            password: "12345",
            connectionString: "localhost/xe"
        });
        const data = await connection.execute(
            'SELECT * FROM usuarios ORDER BY id_us',
            [],
            { keepInStmtCache: false }
        );

        console.log(data.rows)

        let lista = [];

        for (let i = 0; i < data.rows.length; i++) {
            let usuarios = {
                id_us: data.rows[i][0],
                correo_us: data.rows[i][1],
                nombre_us: data.rows[i][2],
                primer_apellido_us: data.rows[i][3],
                segundo_apellido_us: data.rows[i][4],
                celular_us: data.rows[i][5],
                contrasenna_us: data.rows[i][6],
                tipo_us: data.rows[i][7],
                codigo_sexo: data.rows[i][8]

                
            }
            lista.push(usuarios);
        }

        response.send({ exito: true, lista: lista });

    } catch (err) {
        console.error(err);
        
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

router.post('/crear', async function(request, response) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "Ludica_admi",
      password: "12345",
      connectionString: "localhost/xe",
      stmtCacheSize: 0,
    });
    // Validar que el valor de 'tipo_us' sea 'profesor' o 'estudiante'
    const tipo_us = request.body.tipo_us;    
    let id_tipo_usuario = 0;
    switch (tipo_us){
        case 'admin': id_tipo_usuario=1
        break;
        case 'profesor': id_tipo_usuario=2
        break;        
        case 'estudiante': id_tipo_usuario=3
        break;
        default:
        response.status(400).send({ exito: false, mensaje: "El valor de 'tipo_us' no es válido. Debe ser 'profesor' o 'estudiante'." });
        return ;
      }
      
       // Validar que el valor de 'codigo_sexo' sea 'femenino' o 'masculino'
      const codigo_sexo = request.body.codigo_sexo;    
      let id_codigo_sexo = 0;
      switch (codigo_sexo){
        case 'femenino': id_codigo_sexo=1
        break;        
        case 'masculino': id_codigo_sexo=2
        break;
        default:
        response.status(400).send({ exito: false, mensaje: "El valor de 'codigo_sexo' no es válido. Debe ser 'femenino' o 'masculino'." });
        return ;
   }

   console.log(codigo_sexo);
   
     await connection.execute(
      "INSERT INTO usuarios VALUES (seq_usuario.nextval, '" + request.body.correo_us + "', '" + request.body.nombre_us + "', '" + request.body.primer_apellido_us + "', '" + request.body.segundo_apellido_us + "', '" + request.body.celular_us + "',  '" + request.body.contrasenna_us + "', '"+ id_tipo_usuario + "','"+id_codigo_sexo + "')"
    );

    response.send({ exito: true });

  } catch (err) {
    console.error(err);
    response.status(500).send({ exito: false, mensaje: "Error al crear el usuario" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
})

router.put('/:id/', async function (request, response) {
  let connection;
  try {
    const id_us = request.params.id;
    const correo_us = request.body.correo_us;
    const nombre_us = request.body.nombre_us;
    const primer_apellido_us = request.body.primer_apellido_us;
    const segundo_apellido_us = request.body.segundo_apellido_us;
    const celular_us = request.body.celular_us;
    const contrasenna_us = request.body.contrasenna_us;
    const tipo_us = request.body.tipo_us;
    const codigo_sexo = request.body.codigo_sexo;
    


    connection = await oracledb.getConnection({
      user: "Ludica_admi",
      password: "12345",
      connectionString: "localhost/xe"
    });
     // Validar que el valor de 'tipo_us' sea 'profesor' o 'estudiante'
    //const tipo_us = request.body.tipo_us;    
   let id_tipo_usuario = 0;
    switch (tipo_us){
     case 'admin': id_tipo_usuario=1
     break;
     case 'profesor': id_tipo_usuario=2
     break;        
     case 'estudiante': id_tipo_usuario=3
     break;
     default:
     response.status(400).send({ exito: false, mensaje: "El valor de 'tipo_us' no es válido. Debe ser 'profesor' o 'estudiante'." });
     return ;
   }
   
    // Validar que el valor de 'codigo_sexo' sea 'femenino' o 'masculino'
    //const codigo_sexo = request.body.codigo_sexo;    
    let id_codigo_sexo = 0;
     switch (codigo_sexo){
     case 'femenino': id_codigo_sexo=1
     break;        
     case 'masculino': id_codigo_sexo=2
     break;
     default:
     response.status(400).send({ exito: false, mensaje: "El valor de 'codigo_sexo' no es válido. Debe ser 'femenino' o 'masculino'." });
     return ;
}

    const result = await connection.execute(
      'UPDATE usuarios SET nombre_us = :nombre, correo_us = :correo, primer_apellido_us = :primer_apellido, segundo_apellido_us = :segundo_apellido, celular_us = :celular, contrasenna_us = :contraseña, tipo_us = :tipo_us, codigo_sexo = :codigo_sexo WHERE id_us = :id',
      { 
        id: id_us,
        correo: correo_us,
        nombre: nombre_us,
        primer_apellido: primer_apellido_us,
        segundo_apellido: segundo_apellido_us,
        celular: celular_us,
        contraseña: contrasenna_us,
        tipo_us: id_tipo_usuario,
        codigo_sexo: id_codigo_sexo
      }
    );
   

    response.send({ exito: true });

  } catch (err) {
    console.error(err);
    response.status(500).send({ exito: false, mensaje: "Error al actualizar usuario" })
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});


router.delete('/:id', async function (request, response) {
  let connection;
  try {
      connection = await oracledb.getConnection({
          user: "Ludica_admi",
          password: "12345",
          connectionString: "localhost/xe"
      });

      const id_us = request.params.id;

      const result = await connection.execute(
          `DELETE FROM usuarios WHERE id_us = :id`, [id_us]
      );

      response.send({ exito: true, mensaje: "Usuario eliminado correctamente" });

  } catch (err) {
      console.error(err);
      response.status(500).send({ exito: false, mensaje: "Error al eliminar usuario" });
  } finally {
      if (connection) {
          try {
              await connection.close();
          } catch (err) {
              console.error(err);
          }
      }
  }
});


router.post('/login', async function (request, response) {
  let connection;
  try {
      connection = await oracledb.getConnection({
          user: "Ludica_admi",
          password: "12345",
          connectionString: "localhost/xe"
      });

      const correo_us = request.body.correo_us;
      const contrasenna_us = request.body.contrasenna_us;

      const result = await connection.execute(
          `SELECT * FROM usuarios WHERE correo_us = :correo_us  AND contrasenna_us = :contrasenna_us`, [correo_us, contrasenna_us] 
      );
        //console.log(result.rows[0])
      if (result.rows.length === 0) {        
        response.status(500).send({ exito: false, mensaje: "Error al buscar el usuario" });
      } else {
        response.send({ exito: true, mensaje: "El usuario ha sido encontrado" });
      }

     

  } catch (err) {
      console.error(err);
      response.status(500).send({ exito: false, mensaje: "Error conectando en la base de datos" });
  } finally {
      if (connection) {
          try {
              await connection.close();
          } catch (err) {
              console.error(err);
          }
      }
  }
});

module.exports = router;