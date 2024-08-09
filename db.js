const mysql = require('mysql');
const dbConfig = require('./dbconfig');
const connection = mysql.createConnection(dbConfig);

// Función para conectar a la base de datos
function connectToDatabase() {

    console.log('Intentando conexión 2 a la db...')
    const connection = mysql.createConnection(dbConfig);
  
    // Intenta conectar a la base de datos
    connection.connect((err) => {
      if (err) {
        console.error(`Error 1 al conectar a la base de datos ${dbConfig.database} en ${dbConfig.host} puerto: ${dbConfig.port} Descripción: ${err.message}`);
        // No intentes reconectar si ya hay una conexión activa
        if (err.code !== 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE') {
          // Intenta conectar nuevamente después de un breve tiempo (por ejemplo, 5 segundos)
          setTimeout(connectToDatabase, 5000);
        }
        else
        {
            console.error( `Error 3 en la conexión a la base de datos (PROTOCOL_ENQUEUE_HANDSHAKE_TWICE) db: ${dbConfig.database} en ${dbConfig.host} puerto: ${dbConfig.port} Descripción: ${err.message}`);
        }
        return;
      }
      console.log('Conexión exitosa a la base de datos.');
    });
  
    // Manejar errores durante la conexión
    connection.on('error', (err) => {
      console.error(`Error 3 en la conexión a la base de datos ${dbConfig.database} en ${dbConfig.host} puerto: ${dbConfig.port} Descripción: ${err.message}`);
      // Intenta conectar nuevamente después de un breve tiempo (por ejemplo, 5 segundos)
      setTimeout(connectToDatabase, 5000);
    });
  
    // Cerrar la conexión cuando ya no la necesites
    // connection.end();
  }

module.exports = connectToDatabase;