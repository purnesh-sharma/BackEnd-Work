const ProductCategory = require("../../models/productCategory");

const createProductCetegory = async (req,res)=>{
    try{
        const data = req.body;

        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }
        
        console.log(data)

        const dataToSave = new ProductCategory(data);
        const rsponse = dataToSave.save();
        res.status(200).json({massage:'success',data:rsponse });
    }
    catch(error){   
        console.log(error);
        res.status(500).json({massage:'internel server error'})
    }
};

const readProductCategory = async (req,res)=>{
    try{
        const data = await ProductCategory.find().populate('parent_category', 'name discription');
        

        res.status(200).json({massage: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({massage:'internel server error'})
    }
}

module.exports = {
    createProductCetegory,
    readProductCategory
}