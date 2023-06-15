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
// get 
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


// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
