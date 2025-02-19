const twilio = require('twilio');
const Message = require('../models/Message'); // Importar el modelo de mensaje

// Configurar Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Usar variable de entorno para Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Usar variable de entorno para Auth Token
const client = new twilio(accountSid, authToken);

const sendMessage = (req, res) => {
    const { to, message } = req.body;

    client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER, // Número de WhatsApp de Twilio desde variable de entorno
        to: `whatsapp:${to}`
    })
    .then(() => {
        const newMessage = new Message({ to, message, status: 'enviado con éxito' });
        return newMessage.save();
    })
    .then(savedMessage => res.status(200).send(savedMessage))
    .catch(error => res.status(500).send(`Error al enviar el mensaje: ${error.message}`));
};

module.exports = { sendMessage };
