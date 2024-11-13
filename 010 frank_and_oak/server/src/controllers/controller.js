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
    activeParentCategory
}