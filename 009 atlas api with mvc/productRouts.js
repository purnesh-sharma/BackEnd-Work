const express = require('express');
const upload = require('./multer');
const {createProduct,readProduct, updateProduct, deleteProduct} = require('./productControlar');

const productRoutes = express.Router();

productRoutes.post('/incert-products', upload ('products'),createProduct);
productRoutes.get('/read-products',readProduct);
productRoutes.put('/update-products/:_id', upload('products'),updateProduct);
productRoutes.delete('/delete-products/:_id',deleteProduct)
module.exports = productRoutes;