require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Importar la conexión a MongoDB
const messageRoutes = require('./routes/message.Routes'); // Importar las rutas de mensajes

const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Configurar body-parser para manejar solicitudes JSON
app.use(bodyParser.json());

// Usar las rutas de mensajes
app.use('/api', messageRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
