const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Client = require('../models/clients');

// Ruta para obtener estadísticas
router.get('/stats', async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const clientCount = await Client.countDocuments();
        res.status(200).json({ products: productCount, clients: clientCount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
