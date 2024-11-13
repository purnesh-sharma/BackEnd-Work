const { response } = require("express");
const Color = require("../../models/color");

const createColor = async (req,res)=>{
    try{
        const data = new Color(req.body);
        const response = await data.save();
        res.status(200).json({massage:'succese'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:'Internel Server Error',data:response});
    }
};

module.exports = {
    createColor
}