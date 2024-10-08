const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Configurar la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'front_end',
  password: 'Maxi#2016',
  port: 5432,
});

// Middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta para manejar el registro
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = {
    text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    values: [name, email, hashedPassword],
  };

  try {
    await pool.query(query);
    res.send('Usuario registrado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar el usuario');
  }
});

// Ruta para manejar el login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };

  try {
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.send('Inicio de sesión exitoso');
      } else {
        res.send('Contraseña incorrecta');
      }
    } else {
      res.send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});