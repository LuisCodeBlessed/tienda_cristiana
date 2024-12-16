const express = require('express');
const router = express.Router();
const Client = require('../models/clients');

// Ruta para crear un cliente
router.post('/clients', async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const newClient = new Client({ name, email, address });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para obtener todos los clientes
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
