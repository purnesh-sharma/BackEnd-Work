const express = require('express');
const multer = require('multer');

const { 
    createParentCategory ,
    readParentCategory,
    updateParentCategoryStatus,
    deletParentCategory,
    multiDeletParentCategory,
    parentCategoryById,
    updateParentCategory,
    deletedParentCategory,
    restoreParentCategory,
    activeParentCategory
} = require('../../controllers/controller');

const parentCategoryRouter = express.Router(); 

parentCategoryRouter.use(multer().none());

parentCategoryRouter.post('/create-category',createParentCategory);
parentCategoryRouter.get('/read-category',readParentCategory);
parentCategoryRouter.put('/updata-status/:_id',updateParentCategoryStatus);
parentCategoryRouter.put('/delete-category/:_id',deletParentCategory);
parentCategoryRouter.put('/delete-multiple-categorys', multiDeletParentCategory);
parentCategoryRouter.get('/read-category/_id',parentCategoryById),
parentCategoryRouter.put('/update-category/:_id',updateParentCategory),
parentCategoryRouter.get('/deleted-categorys',deletedParentCategory),
parentCategoryRouter.put('/restore-category/:_id',restoreParentCategory),
parentCategoryRouter.get('/active-categories', activeParentCategory)

module.exports = parentCategoryRouter;