const express = require('express');
const { 
    createProductCetegory, 
    readProductCategory
} = require('../../controllers/controller');
const fileHandle = require('../../middlewares/multer');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/create-category',fileHandle('product-category'),createProductCetegory);
productCategoryRouter.get('/read-categories',readProductCategory);

module.exports = productCategoryRouter;