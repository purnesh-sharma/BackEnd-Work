const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads')
    }, // jha pr file upload krni hai 
    filename: (req,file,cb) => {
        console.log(path.extname(file.originalname));
        cb(null,Date.now() + Math.floor(Math.random() * 999999) + path.extname(file.originalname));// mili second me rendom number genret krke dega
    }
});

///If there is no file input in the form, यदि फॉर्म में कोई फ़ाइल इनपुट नहीं है|
// const upload = multer()
// app.post('/upload-file',upload.none(), (req,res)=>{
//     console.log(req.body)
//     res.send('hello upload file')
// })

// if form contains single file input with single file
// const upload = multer({storage : storage }).single('thumbnail');

// const upload = multer({storage : storage }).single('thumbnail');

// app.post('/upload-file',upload, (req,res)=>{
//     const data = req.body;

//     // single file ho tb ye kam krega
//     if(req.file){
//         data.thumbnail = req.file.filename
//     }

//     console.log(data);
//     res.send('hello upload file')
// })

// if form contains single file input with multifle files
// const upload = multer({storage : storage }).array('images',10);

// app.post('/upload-file',upload, (req,res)=>{
//     const data = req.body;

//     // single file ho tb ye kam krega
//     // if(req.file){
//     //     data.thumbnail = req.file.filename
//     // }

//     //multiple files
//     if(req.files.length !==0){
//         data.images = req.files.map((file)=> file.filename)
//     }

//     console.log(data);
//     res.send('hello upload file')
// })

// if form contains multifle file inputs
const upload = multer({storage : storage }).fields([
    {name:'thumbnail',maxCount:1},
    {name:'images', maxCount:10}
]);
app.post('/upload-file',upload, (req,res)=>{
    const data = req.body;

    // if from contains multiple file input
    if(req.files){
        if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename

        if(req.files.images) data.images = req.files.images.map((file)=>file.filename)
    }

    console.log(data);
    res.send('hello upload file')
})

app.listen(5200, ()=>{
    console.log('run to 5200 port')
})