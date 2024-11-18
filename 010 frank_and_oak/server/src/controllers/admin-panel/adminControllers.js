const Admin = require("../../models/admin");

const registerAdmin = async ()=>{
    try{
        const ifAdmin = await Admin.find();

        if(ifAdmin.length !== 0) return console.log(ifAdmin[0]);

        const newAdmin = new Admin({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        });

        const data = await newAdmin.save();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
};

const adminLogin = async (req,res)=>{
    try{
        const ifAdmin = await Admin.findOne({email:req.body.email});

        if(!ifAdmin) return res.status(403).json({massage:'invalid email '});

        if(ifAdmin.password !== req.body.password) return res.status(401).json({massage:'invalid password'});

        res.status(200).json({massage:'Admin logged in',ifAdmin});

        const {password, ...data} = ifAdmin._doc; // backend me data destruct krne ke liye ._doc likhna compalsory h
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'internel server error'})
    }
}

module.exports = {
    registerAdmin,
    adminLogin
}