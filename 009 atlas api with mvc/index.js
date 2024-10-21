const express = require('express');
const productRoutes = require('./productRouts');
const path = require('path');
require('./config');

const app = express();

app.use(express.json());


app.use('/product', productRoutes);
app.use('/web-files', express.static('./uploads/products'))
 
app.listen(5000, ()=>{
    console.log('Project is running in port 5000')
})









