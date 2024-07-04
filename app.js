const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { run, stop } = require('./config/db.js');
const userCtrl = require('./controllers/user.controllers');
const router = require('./routes/food.routes.js');
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

const secretKey = process.env.SECRET_KEY; // Obtener la clave secreta desde variables de entorno


const app = express();
const port = 4000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para loguearse y obtener un token
app.post('/API//v1login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const payload = { username: user.username, role: 'user' };
      const token = jwt.sign(payload, secretKey, { expiresIn: '10m' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// Middleware para verificar el token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // El token debe estar en el formato 'Bearer TOKEN_JWT'

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden si el token no es válido
            }
            req.user = user; // Establecer req.user con los datos del usuario
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized si no se proporciona el token en el encabezado
    }
};

// Ruta protegida
app.get('/API/v1/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Este es un contenido protegido', user: req.user });
});

// Rutas existentes
app.use('/api/v1/food', authenticateJWT, router);
app.post('/API/v1/register', userCtrl.register);

// Conectar con el servidor
run().then(() => {
    const server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    process.on('SIGTERM', () => { stop(server); });
    process.on('SIGINT', () => { stop(server); });

}).catch(console.error);