// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuración del entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definición del esquema de Producto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

// Modelo de Producto
const Product = mongoose.model('Product', productSchema);

// Ruta para obtener productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);  // Devuelve los productos como JSON
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.use(cors({ origin: '*' }));
 