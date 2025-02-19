const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    to: String,
    message: String,
    status: String,
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
