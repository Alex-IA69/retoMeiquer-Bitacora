const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// CONEXION BASE DE DATOS
const db = mysql.createConnection({
  host: 'localhost',
  user: 'testuser',
  password: 'passw0rdnT.!',
  database: 'bitacora'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// DEFINICION DE APIS
// -------- GENERAL
// get por campo
app.get('/:table/:field?', (req, res) => {
  const {table, field} = req.params;

  let query = `SELECT ${field || '*'} FROM ${table}`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando siguiente query: ', err);
      // Query mal redactado / tabla no existe
      res.status(500).json({ error: 'Error ejecutando query' }); 
      return;
    }

    if (results.length === 0) {
      // Tabla existe, no tiene datos
      res.status(200).json({ message: 'No hay datos en la tabla o campo' }); 
      return;
    }

    if (results.length > 0) { 
      // Tabla existe, tiene datos
      res.json(results);
      return;
    }

    res.status(404).json({ error: 'No se encontro la tabla o campo' });
  });
});

// get por idSesion
// no aplica para participantes
app.get('/:table/id/:id', (req, res) => {
  const { table, id } = req.params;

  const query = `SELECT * FROM ${table} WHERE idSesion = ?`;
  const values = [id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    if (results.length === 0) {
      res.status(200).json({ message: 'No data found' });
      return;
    }

    res.json(results);
  });
});

// -------- PARTICIPANTES
// post
app.post('/participantes', (req, res) => {
  const participantes = req.body;

  const query = `INSERT IGNORE INTO participantes (nombre, tipo) VALUES ?`;
  const values = participantes.map(participante => [participante.nombre, participante.tipo]);

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error al guardar los participantes:', err);
      res.status(500).send('Error al guardar los participantes');
      return;
    }

    const insertedCount = result.affectedRows;
    if (insertedCount === 0) {
      res.status(200).json({ message: 'No se insertaron nuevos participantes' });
    } else {
      res.status(201).json({ message: `Se insertaron ${insertedCount} participantes` });
    }
  });
});

// -------- SESIONES
// post
app.post('/sesiones', (req, res) => {
  const {
    cantParticipantes,
    nombreAct,
    nombreEspacio,
    fecha,
    notas,
    materialNecesario,
    internet,
    mobiliarioAdecuado,
    luzElectrica,
    banos
  } = req.body;

  const query = `INSERT INTO sesiones (cantParticipantes, nombreAct, nombreEspacio, fecha, notas, materialNecesario, internet, mobiliarioAdecuado, luzElectrica, banos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    cantParticipantes,
    nombreAct,
    nombreEspacio,
    fecha,
    notas,
    materialNecesario,
    internet,
    mobiliarioAdecuado,
    luzElectrica,
    banos
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al guardar el registro:', err);
      res.status(500).send('Error al guardar el registro');
      return;
    }

    const registroId = result.insertId;
    res.status(201).json({ message: 'Registro creado, id: ' + registroId });
  });
});

// delete
app.delete('/sesiones/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM sesiones WHERE idSesion = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Sesion no encontrada' });
      return;
    }
    
    res.status(200).json({ message: 'Sesion eliminada exitosamente' });
  });
});

// patch
app.patch('/sesiones/:id', (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  // Generate the SET clause dynamically based on the updatedFields
  const setClause = Object.keys(updatedFields)
    .map(field => `${field} = ?`)
    .join(', ');

  // Extract the field values from the updatedFields object
  const fieldValues = Object.values(updatedFields);

  const query = `UPDATE sesiones SET ${setClause} WHERE idSesion = ?`;

  // Add the id parameter value to the fieldValues array
  fieldValues.push(id);

  db.query(query, fieldValues, (err, result) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Sesion no encontrada' });
      return;
    }

    res.status(200).json({ message: 'Sesion actualizada exitosamente' });
  });
});

// -------- PUENTE
app.post('/sesiones_participantes', (req, res) => {
  const { idSesion, idParticipante } = req.body;

  const query = 'INSERT INTO Sesiones_Participantes (idSesion, idParticipante) VALUES (?, ?)';

  db.query(query, [idSesion, idParticipante], (err, result) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    res.status(201).json({ message: 'Sesiones_Participantes record created successfully' });
  });
});

// -------- RUBROS
app.post('/cognitivo', (req, res) => {
  const { idSesion, pensOrdenAlto, pensMinRequerido, pensNoRelacionado, pensDesconocidos } = req.body;

  const query = `INSERT INTO Cognitivo (idSesion, pensOrdenAlto, pensMinRequerido, pensNoRelacionado, pensDesconocidos) VALUES (?, ?, ?, ?, ?)`;
  const values = [idSesion, pensOrdenAlto, pensMinRequerido, pensNoRelacionado, pensDesconocidos];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    const registroId = result.insertId;
    res.status(201).json({ message: 'Registro creado, id: ' + registroId });
  });
});

app.post('/interacciones', (req, res) => {
  const { idSesion, conCompaneros, conImplementadores, disenadoresContenido } = req.body;

  const query = `INSERT INTO Interacciones (idSesion, conCompaneros, conImplementadores, disenadoresContenido) VALUES (?, ?, ?, ?)`;
  const values = [idSesion, conCompaneros, conImplementadores, disenadoresContenido];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    const registroId = result.insertId;
    res.status(201).json({ message: 'Registro creado, id: ' + registroId });
  });
});

app.post('/niveldeinteres', (req, res) => {
  const { idSesion, pensandoProcesoAprendizaje, solucionadorProblemas, ideas, usoHerramientas, procedimiento, recordarCiertaInfo } = req.body;

  const query = `INSERT INTO NivelDeInteres (idSesion, pensandoProcesoAprendizaje, solucionadorProblemas, ideas, usoHerramientas, procedimiento, recordarCiertaInfo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [idSesion, pensandoProcesoAprendizaje, solucionadorProblemas, ideas, usoHerramientas, procedimiento, recordarCiertaInfo];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    const registroId = result.insertId;
    res.status(201).json({ message: 'Registro creado, id: ' + registroId });
  });
});

app.post('/comportamiento', (req, res) => {
  const { idSesion, proactivo, atento, indiferente, desinteresado, disruptivo } = req.body;

  const query = `INSERT INTO Comportamiento (idSesion, proactivo, atento, indiferente, desinteresado, disruptivo) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [idSesion, proactivo, atento, indiferente, desinteresado, disruptivo];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    const registroId = result.insertId;
    res.status(201).json({ message: 'Registro creado, id: ' + registroId });
  });
});

app.post('/emocional', (req, res) => {
  const { idSesion, emocionado_inspirado, positivo_dispuesto, atento_participativo, frustrado_preocupado, molesto_triste } = req.body;

  const query = `INSERT INTO Emocional (idSesion, emocionado_inspirado, positivo_dispuesto, atento_participativo, frustrado_preocupado, molesto_triste) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [idSesion, emocionado_inspirado, positivo_dispuesto, atento_participativo, frustrado_preocupado, molesto_triste];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    const registroId = result.insertId;
    res.status(201).json({ message: 'Registro creado, id: ' + registroId });
  });
});

app.post('/apertura', (req, res) => {
  const { idSesion, opinionesExternas, interesEnLosDemas, escuchar } = req.body;

  const query = `INSERT INTO Apertura (idSesion, opinionesExternas, interesEnLosDemas, escuchar) VALUES (?, ?, ?, ?)`;
  const values = [idSesion, opinionesExternas, interesEnLosDemas, escuchar];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    const registroId = result.insertId;
    res.status(201).json({ message: 'Registro creado, id: ' + registroId });
  });
});

app.post('/involucramiento', (req, res) => {
  const { idSesion, involucradoYPropone, involucrado, cooperativo, indiferente, desinteresado } = req.body;

  const query = `INSERT INTO Involucramiento (idSesion, involucradoYPropone, involucrado, cooperativo, indiferente, desinteresado) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [idSesion, involucradoYPropone, involucrado, cooperativo, indiferente, desinteresado];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    const registroId = result.insertId;
    res.status(201).json({ message: 'Registro creado, id: ' + registroId });
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
