const { strict } = require('assert');
const express = require('express');
const mongoose = require('mongoose');//mongoos schema provide krvata hai
const { StringDecoder } = require('string_decoder');

const url = 'mongodb://localhost:27017/wsb_115_117';//connection string

mongoose.connect(url)
.then(()=>{
    console.log('detabase connected')
})
.catch((error)=>{
    console.log('data connection is failed',error)
})

const userSchema = new mongoose.Schema({//yh ek cunstructor hai jiske aage new  model create hoga

    name:{
        type:String,
        required:true//use agar  name field empty nhi hoga to error aayega our data incert nhi hoga
    },
    age:{
        type:Number,
        required:true
    },
    contact:String,
    status:{
        type:Boolean,//isme hm string kr skte hai agal default me active  hoga to

        default:true//agar use apni taraf se status nhi deta he to default me yh apna status true kr lega 
    }
});// schema define krna

const User = mongoose.model('users',userSchema);

const app = express();//express ko iniciate krna
app.use(express.json());

app.post('/create-user', (req,res)=>{
    console.log(req.body);
    const data = new User(
        {
            name:req.body.name,
            age:req.body.age,
            contact:req.body.contact,
            status:req.body.status
        }
    );

    data.save()
    .then((response)=>{
        res.status(200).json({massage:'success',response});
    })
    .catch((error)=>{
        res.status(200).json({massage:'success',error});
    });
});

app.get('/read-user',(req,res)=>{
    User.find()
    .then((response)=>{
        res.status(200).json({massage:'success',response});
    })
    .catch((error)=>{
        res.status(200).json({massage:'success',error});
    });
});

app.delete('/delete-user/:_id', (req,res)=>{
     console.log(req.params);

     User.deleteOne(req.params)
     .then((response)=>{
        res.status(200).json({massage:'success',response});
    })
    .catch((error)=>{
        res.status(200).json({massage:'success',error});
    });
});

app.put('/update-user/:_id',(req,res)=>{
    User.updateOne(
        req.params,
        {
            $set:req.body
        }
    )
    .then((response)=>{
        res.status(200).json({massage:'success',response});
    })
    .catch((error)=>{
        res.status(200).json({massage:'success',error});
    });
});

app.listen(4800,()=>{//server banana ya fix port dena
    console.log("4800 port is running");
})