const ParentCategory = require("../../models/parentCategory");

const  createParentCategory = async (req,res)=>{
    try{
        console.log(req.body);
        const data = new ParentCategory(req.body);

        const response =  await data.save();

        res.status(200).json({massage:'success',data:response})
    }
    catch(error){
        console.log(error);
        if(error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({massage:'category already exists'})
        res.status(500).json({massage:'internal server error'})
    }
};

const readParentCategory = async (req,res)=>{
    try{
        const data = await ParentCategory.find({deleted_at: null});
        res.status(200).json({massage:'succese',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'internal server error'})
    }
};

const updateParentCategoryStatus = async (req,res)=>{
    try{
        const data =await ParentCategory.updateOne(
            req.params,
            {
                $set:{
                    status:req.body.status
                }
            }
        )
        res.status(200).json({massage:'succese',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'Internal Server Error'});
    }
};

const deletParentCategory = async (req, res)=>{
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set:{
                    deleted_at:Date.now()
                }
            }
        );
        res.status(200).json({massage:'succese',data},);
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'Internel Server Error'})
    }
};

const multiDeletParentCategory = async (req, res)=>{
    try{
        const data = await ParentCategory.updateMany(
            {_id:{$in:req.body.ids}},{
                $set:{
                    deleted_at:Date.now()
                }
            }
        );
        res.status(200).json({massage:'succese',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'Internel Server Error'})
    }
};

const parentCategoryById = async (req,res) =>{
    try{
        const response = await ParentCategory.findOne(req.params)
        res.status(200).json({massage:'success',data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'internel server error'})
    }
};

const updateParentCategory = async (req,res) =>{
    try{
        const response = await ParentCategory.updateOne(
            req.params,
            {
                $set:req.body
            }
        )
        res.status(200).json({massage:'success',data: response});
    }
    catch(error){
        console.log(error);
        if(error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.stats(400).json({massage:'category alredy exist'})
        res.status(500).json({massage:'internel server error'})
    }
};

const deletedParentCategory = async (req,res) =>{
    try{
        const response = await ParentCategory.find({deleted_at:{$ne : null}}); //(ne= not encluide)
        res.status(200).json({massage:'success',data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'internel server error'});
    }
};

const restoreParentCategory = async (req,res) =>{
    try{
        const response = await ParentCategory.updateOne(
            req.params,
            {
                $set:{ 
                    deleted_at :null
                }
            }
        );
        res.status(200).json({massage:'success', data:response});
    }
    catch(error){
        console.log(error);
        res.stats(500).json({massage:'internel server error'});
    }
};

const activeParentCategory = async (req,res) =>{
    try{
        const response = await ParentCategory.find({deleted_at: null , status:true})
        res.status(200).json({massage:'success',data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'internel server error'});
    }
}

module.exports = {
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
}