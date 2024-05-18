var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');
oracledb.autoCommit = true;

//CONEXION A LA BASE DE DATOS A LA TABLA ACTIVIDADES_LUDICAS

router.get('/MOST', async function (request, response) {

    let connection;
    try {

        connection = await oracledb.getConnection({
            user: "Ludica_admi",
            password: "12345",
            connectionString: "localhost/xe"
        });
        const data = await connection.execute(
            'SELECT * FROM ACTIVIDADES_LUDICAS ORDER BY ID_ACTIVIDAD',
            [],
            { keepInStmtCache: false }
        );

        console.log(data.rows)

        let lista = [];

        for (let i = 0; i < data.rows.length; i++) {
            let ACTIVIDADES_LUDICAS = {
                ID_ACTIVIDAD: data.rows[i][0],
                NOMBRE_ACTIVIDAD: data.rows[i][1],
                FECHA_ACTIVIDAD: data.rows[i][2],
                LUGAR_ACTIVIDAD: data.rows[i][3]
            }
            lista.push(ACTIVIDADES_LUDICAS);
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

//METODO CREAR ACTIVIDAD LUDICA

router.post('/crearActividad', async function(request, response) { //cambiar direccion 
  let connection;
  try {

    connection = await oracledb.getConnection({
      user: "Ludica_admi",
      password: "12345",
      connectionString: "localhost/xe",
      stmtCacheSize: 0,
    });
    console.log(datosAct)
     await connection.execute(
      "INSERT INTO ACTIVIDADES_LUDICAS VALUES (seq_actividad.nextval, '" + request.body.NOMBRE_ACTIVIDAD + "', '" + request.body.FECHA_ACTIVIDAD + "', '" + request.body.LUGAR_ACTIVIDAD + "')"
    );

    response.send({ exito: true });

  } catch (err) {
    console.error(err);
    response.status(500).send({ exito: false, mensaje: "Error al crear la actividad" });
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

//METODO ACTALIZAR ACTIVIDAD LUDICA

router.put('/:ID/', async function (request, response) { //cambiar direccion 
  let connection;
  try {
    const ID_ACTIVIDAD = request.body.ID_ACTIVIDAD;
    const NOMBRE_ACTIVIDAD = request.body.NOMBRE_ACTIVIDAD;
    const FECHA_ACTIVIDAD = request.body.FECHA_ACTIVIDAD;
    const LUGAR_ACTIVIDAD = request.body.LUGAR_ACTIVIDAD;



    connection = await oracledb.getConnection({
      user: "Ludica_admi",
      password: "12345",
      connectionString: "localhost/xe"
    });


    const result = await connection.execute(
      'UPDATE ACTIVIDADES_LUDICAS SET ID_ACTIVIDAD = :ID, NOMBRE_ACTIVIDAD = :nombre, FECHA_ACTIVIDAD = :fecha, LUGAR_ACTIVIDAD = :lugar',
      { 
        ID_ACTIVIDAD: ID,
        NOMBRE_ACTIVIDAD: nombre,
        FECHA_ACTIVIDAD: fecha,
        LUGAR_ACTIVIDAD: lugar,
      }
    );
   
    response.send({ exito: true });

  } catch (err) {
    console.error(err);
    response.status(500).send({ exito: false, mensaje: "Error al actualizar actividad" })
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

//METODO ELIMINAR ACTIVIDAD LUDICA

router.delete('/:ID', async function (request, response) { //cambiar direccion 
  let connection;
  try {
      connection = await oracledb.getConnection({
          user: "Ludica_admi",
          password: "12345",
          connectionString: "localhost/xe"
      });

      const ID_ACTIVIDAD = request.params.ID;

      const result = await connection.execute(
          `DELETE FROM ACTIVIDADES_LUDICAS WHERE ID_ACTIVIDAD = :ID`, [ID_ACTIVIDAD]
      );

      response.send({ exito: true, mensaje: "Actividad eliminada correctamente" });

  } catch (err) {
      console.error(err);
      response.status(500).send({ exito: false, mensaje: "Error al eliminar actividad" });
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