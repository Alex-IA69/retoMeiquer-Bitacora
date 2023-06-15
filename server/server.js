// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Crear la aplicación Express
const app = express();

// Permitir solicitudes CORS desde cualquier origen
app.use(cors());

// Parsear el body de las solicitudes POST
app.use(express.json());

// Crear conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'benja',
  password: '12345',
  database: 'bitacora'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Definir la ruta para obtener los asistentes
app.get('/api/asistentes', (req, res) => {
  const sql = 'SELECT * FROM asistentes';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Definir la ruta para crear un asistente
app.post('/api/asistentes', (req, res) => {
  const { nombre, tipo } = req.body;
  const sql = 'INSERT INTO asistentes SET ?';
  const asistente = { nombre, tipo };
  db.query(sql, asistente, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Definir la ruta para crear asistentes relacionados con un registro
app.post('/api/registros', (req, res) => {
  const registro = req.body;

  const sql = 'INSERT INTO registros SET ?';
  db.query(sql, registro, (err, result) => {
    if (err) {
      console.error('Error al guardar el registro:', err);
      res.status(500).send('Error al guardar el registro');
    } else {
      console.log('Registro guardado exitosamente');
      const registroId = result.insertId;
      res.status(200).json({ id: registroId });
    }
  });
});

app.get('/api/registros/:registroId', (req, res) => {
  const registroId = req.params.registroId;

  const sql = 'SELECT * FROM registros WHERE id = ?';
  db.query(sql, registroId, (err, result) => {
    if (err) {
      console.error('Error al obtener el registro:', err);
      res.status(500).send('Error al obtener el registro');
    } else {
      const registro = result[0];
      res.status(200).json(registro);
    }
  });
});

app.get('/api/comportamientos', (req, res) => {
  const sql = 'SELECT * FROM comportamientos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result.map((row) => row.comportamiento));
  });
});

app.get('/api/aperturas', (req, res) => {
  const sql = 'SELECT * FROM aperturas';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result.map((row) => row.apertura));
  });
});

app.get('/api/registros/:registroId/asistentes', (req, res) => {
  const registroId = req.params.registroId;

  const sql = 'SELECT * FROM asistentes WHERE registro_id = ?';
  db.query(sql, registroId, (err, result) => {
    if (err) {
      console.error('Error al obtener los asistentes:', err);
      res.status(500).send('Error al obtener los asistentes');
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/api/registros/:registroId/asistentes', (req, res) => {
  const registroId = req.params.registroId;
  const asistentes = req.body;

  // Mapear los asistentes para agregar el registroId
  const asistentesConRegistroId = asistentes.map((asistente) => ({
    ...asistente,
    registro_id: registroId,
  }));

  const sql = 'INSERT INTO asistentes SET ?';
  db.query(sql, asistentesConRegistroId, (err, result) => {
    if (err) {
      console.error('Error al registrar los asistentes:', err);
      res.status(500).send('Error al registrar los asistentes');
    } else {
      console.log('Asistentes registrados exitosamente');
      res.status(200).send(result);
    }
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
