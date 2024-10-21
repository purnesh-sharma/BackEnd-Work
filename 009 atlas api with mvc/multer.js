const multer = require('multer');
const path = require('path');

const storage =(folderName)=> multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,`./uploads/${folderName}`)
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null, Date.now() + Math.floor(Math.random()*99999999) + path.extname(file.originalname));
    }
});

const upload=(folderName)=> multer({storage: storage(folderName)}).fields([
    {
        name:'thumbnail',
        maxCount:1
    },
    {
        name:'images',
        maxCount:10
    }
]);

module.exports = upload;