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
            'SELECT * FROM SEXOS',
            [],
            { keepInStmtCache: false }
        );

        console.log(data.rows)

        let lista = [];

        for (let i = 0; i < data.rows.length; i++) {
            let sexos = {
                id_sex: data.rows[i][0],
                tipo_sex: data.rows[i][1],
                
              
            }
            lista.push(sexos);
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

      const insercion = await connection.execute(
        "INSERT INTO SEXOS VALUES  (seq_sexo.nextval, '" + request.body.tipo_sex + "')"
        
      );

      response.send({ exito: true });
  
    } catch (err) {
      console.error(err);
      response.status(500).send({ exito: false, mensaje: "Error al crear el sexo" });
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
    const id_sex = request.params.id;
    const tipo_sex = request.body.tipo_sex;

    connection = await oracledb.getConnection({
      user: "Ludica_admi",
      password: "12345",
      connectionString: "localhost/xe"
    });
    


    const fechaFormateada = (fecha_act) ? new Date(fecha_act).toISOString().slice(0, 10) : null;

    const result = await connection.execute(
    'UPDATE ACTIVIDADES_LUDICAS SET NOMBRE_ACTIVIDAD = :nombre, FECHA_ACTIVIDAD = TO_DATE(:fecha, \'YYYY-MM-DD\'), LUGAR_ACTIVIDAD = :lugar WHERE ID_ACTIVIDAD = :id',
    { 
        id: id_act,
        nombre: nombre_act,
        fecha: fechaFormateada,
        lugar: lugar_act,
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


router.delete('/:id', async function (request, response) {
  let connection;
  try {
      connection = await oracledb.getConnection({
          user: "Ludica_admi",
          password: "12345",
          connectionString: "localhost/xe"
      });

      const id_act = request.params.id;

      const result = await connection.execute(
          `DELETE FROM ACTIVIDADES_LUDICAS WHERE id_actividad = :id`, [id_act]
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