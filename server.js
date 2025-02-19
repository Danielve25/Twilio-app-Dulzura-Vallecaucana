require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const mongoose = require('mongoose'); // Importar mongoose
const Message = require('./models/Message'); // Importar el modelo de mensaje

const app = express();
const port = process.env.PORT || 3000;

// Configurar body-parser para manejar solicitudes JSON
app.use(bodyParser.json());

// Configurar Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Usar variable de entorno para Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Usar variable de entorno para Auth Token
const client = new twilio(accountSid, authToken);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// Ruta POST para enviar mensajes de WhatsApp
app.post('/send-message', (req, res) => {
    const { to, message } = req.body;

    client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // Número de WhatsApp de Twilio
        to: `whatsapp:${to}`
    })
    .then(() => {
        const newMessage = new Message({ to, message, status: 'enviado con éxito' });
        return newMessage.save();
    })
    .then(savedMessage => res.status(200).send(savedMessage))
    .catch(error => res.status(500).send(`Error al enviar el mensaje: ${error.message}`));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
