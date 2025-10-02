const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/productos')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

const Producto = mongoose.model('Producto', new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String
}));
  
// Ruta para la página principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

// Ruta para productos
app.get('/productos', async (req, res) => {
    const productos = await Producto.find();
    res.send(productos);
  });

app.post('/productos', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.send(nuevoProducto);
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});