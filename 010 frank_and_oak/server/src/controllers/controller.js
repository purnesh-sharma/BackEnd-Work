//****Admin Panel *****/

// parent category controller

const { 
     createParentCategory, 
     readParentCategory, 
     updateParentCategoryStatus,
     deletParentCategory,
     multiDeletParentCategory,
     parentCategoryById,
     updateParentCategory, 
     deletedParentCategory,
     restoreParentCategory,
     activeParentCategory
    } = require("./admin-panel/parantCategoryControllers");

//Color Controller

const {
     createColor 
    } = require("./admin-panel/colorControllers");

//Product Category Controller

const { 
    createProductCetegory, 
    readProductCategory 
} = require("./admin-panel/productCategoryController");

//Admin user Controller
const { 
    registerAdmin, 
    adminLogin
} = require("./admin-panel/adminControllers");

module.exports = {
    createParentCategory,
    readParentCategory,
    updateParentCategoryStatus,
    createColor,
    deletParentCategory,
    multiDeletParentCategory,
    parentCategoryById,
    updateParentCategory,
    deletedParentCategory,
    restoreParentCategory,
    activeParentCategory,
    createProductCetegory,
    readProductCategory,
    registerAdmin,
    adminLogin
    
}