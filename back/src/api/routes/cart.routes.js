const express = require('express');
const {
  createCarrito,
  borrarCarrito,
  todoMiCarrito,
  agregarProductoAlCarrito,
  todosLosCarritos,
  quitarProductoDelCarrito,
} = require('../controllers/cart.controller');
const { isAuth, isAuthAdmin } = require('../../middlewares/auth.middleware');

const CartRoutes = express.Router();

CartRoutes.post('/agregar', isAuth, createCarrito);
CartRoutes.delete('/:id', isAuthAdmin, borrarCarrito);
CartRoutes.get('/:id', isAuth, todoMiCarrito);
CartRoutes.post('/:carritoId', isAuth, agregarProductoAlCarrito);
CartRoutes.patch('/:carritoId', isAuth, quitarProductoDelCarrito);

CartRoutes.get('/', todosLosCarritos);

module.exports = CartRoutes;
