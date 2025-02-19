const express = require('express');
const { sendMessage } = require('../controllers/messageController'); // Importar el controlador de mensajes

const router = express.Router();

// Ruta POST para enviar mensajes de WhatsApp
router.post('/send-message', sendMessage);

module.exports = router;
