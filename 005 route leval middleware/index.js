const express = require('express');
const app = express();

const router1 = express.Router();

const m1 = (req, res, next)=>{
    console.log('middleware 1');

    next();//// next function ko call krna jaruri hai vrna  woh middleware ko chhod dega our aagla  middleware nhi chal paega


}
const m2 = (req, res, next)=>{
    console.log('middleware 2');

    next();
}
const m3 = (req, res, next)=>{
    console.log('middleware 3');

    next();
}
const m4 = (req, res, next)=>{
    console.log('middleware 4');

    next();
}
app.use(m1)
router1.use(m2)

app.get('/read', (req,res)=>{
    res.send('read data')
})
router1.get('/apdate', (req,res)=>{
    res.send('apdate data')
})
router1.get('/delet', (req,res)=>{
    res.send('delet data')
})
app.get('/create', (req,res)=>{
    res.send('create data')
})
app.get('/text', (req,res)=>{
    res.send('text data')
})
app.use(router1)


app.listen(5300, ()=>{
    console.log('Server is running on port 5300');
})

