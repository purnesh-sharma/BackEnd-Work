const express = require('express');

const fs = require('fs');

const path = require('path');

const filepath = path.join(__dirname,'public');

const app = express();
app.use(express.static(filepath))//// kisi bhi file ko load krvane ke liye ye line complesory h jese CSS file ke liye bhi.. image ke liye ek static rout banana  hai jisse hum image ko public folder se access kar sakte hai 

app.get('/home', (req,res)=>{
    res.sendFile(`${filepath}/home.html`);
})

app.get('/about', (req,res)=>{
    res.sendFile(`${filepath}/about.html`);
})

app.get('/contact', (req,res)=>{
    res.sendFile(`${filepath}/contact.html`);
})

app.get('*', (req,res)=>{
    res.sendFile(`${filepath}/404.html`)
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})