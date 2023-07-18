const express = require('express');
const {
  getAllProducts,
  getOneProduct,
  postOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require('../controllers/product.controller');
const { isAuthAdmin } = require('../../middlewares/auth.middleware');
const { upload } = require('../../middlewares/files.middleware');

const ProductRoutes = express.Router();

ProductRoutes.get('/getAllProducts', getAllProducts);
ProductRoutes.get('/:id', getOneProduct);
ProductRoutes.post('/new', upload.single('image'), postOneProduct);
ProductRoutes.put('/:id', isAuthAdmin, updateOneProduct);
ProductRoutes.delete('/:id', isAuthAdmin, deleteOneProduct);

module.exports = ProductRoutes;
