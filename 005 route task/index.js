const express = require('express');
const app = express();

const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();
const router4 = express.Router();

const m1 = (req, res, next)=>{
    console.log('Middleware 1');
    next();
}
const m2 = (req, res, next)=>{
    console.log('Middleware 2');
    next();
}
const m3 = (req, res, next)=>{
    console.log('Middleware 3');
    next();
}
const m4 = (req, res, next)=>{
    console.log('Middleware 4');
    next();
}
// app.use(m1)
router1.use(m1);
router2.use(m2);
router3.use(m3);
router4.use(m4);

router1.get('/rout1', (req,res)=>{
    res.send('rout1')
})
router1.get('/rout2', (req,res)=>{
    res.send('rout2')
})
router1.get('/rout3', (req,res)=>{
    res.send('rout3')
})
router1.get('/rout4', (req,res)=>{
    res.send('rout4')
})
router1.get('/rout5', (req,res)=>{
    res.send('rout5')
})

router2.get('/rout6', (req,res)=>{
    res.send('rout6')
})
router2.get('/rout7', (req,res)=>{
    res.send('rout7')
})
router2.get('/rout8', (req,res)=>{
    res.send('rout8')
})
router2.get('/rout9', (req,res)=>{
    res.send('rout9')
})
router2.get('/rout10', (req,res)=>{
    res.send('rout10')
})
router3.get('/rout11', (req,res)=>{
    res.send('rout11')
})
router3.get('/rout12', (req,res)=>{
    res.send('rout12')
})
router3.get('/rout13', (req,res)=>{
    res.send('rout13')
})
router3.get('/rout14', (req,res)=>{
    res.send('rout14')
})
router3.get('/rout15', (req,res)=>{
    res.send('rout15')
})
router3.get('/rout16', (req,res)=>{
    res.send('rout16')
})
router3.get('/rout17', (req,res)=>{
    res.send('rout17')
})
router3.get('/rout18', (req,res)=>{
    res.send('rout18')
})
router3.get('/rout19', (req,res)=>{
    res.send('rout19')
})
router3.get('/rout20', (req,res)=>{
    res.send('rout20')
})

app.use(router1)
router1.use(router2);
router2.use(router3)
app.listen(4000,()=>{
    console.log('open to 4000 ')
})