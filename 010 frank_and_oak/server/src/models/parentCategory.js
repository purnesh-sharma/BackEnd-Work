const mongoose = require('mongoose');

const parentCategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    discription:String,
    status:{
        type:Boolean,
        default:true
    },
    
    created_at:{
        type:Date,
        default:null
    },
    deleted_at:Date,
    updated_at:{
        type:Date,
        default:Date.now
    }
})

//Schema middaleware use krne ke liye pre function hote hai 
parentCategorySchema.pre('insertOne', function(){
    this.created_at = new Date();
});

parentCategorySchema.pre('save', function(){
    this.created_at = new Date();
});

// modal banana & modal ka name hamesha capital rakhna chiye
const  ParentCategory = mongoose.model('ParentCategory', parentCategorySchema);

module.exports = ParentCategory;

