require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Configurar body-parser para manejar solicitudes JSON
app.use(bodyParser.json());

// Configurar Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Reemplaza con tu Account SID de Twilio
const authToken = process.env.TWILIO_AUTH_TOKEN; // Reemplaza con tu Auth Token de Twilio
const client = new twilio(accountSid, authToken);

// Ruta POST para enviar mensajes de WhatsApp
app.post('/send-message', (req, res) => {
    const { to, message } = req.body;

    client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // Número de WhatsApp de Twilio
        to: `whatsapp:${to}`
    })
    .then(() => res.status(200).send({ to, message, status: 'enviado con éxito' })) // Enviar el JSON con el mensaje de éxito
    .catch(error => res.status(500).send(`Error al enviar el mensaje: ${error.message}`));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
