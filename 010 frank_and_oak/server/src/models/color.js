const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
    name:String,
    code:String,
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
});

colorSchema.pre('insertOne', function(){
    this.created_at = new Date();
});

colorSchema.pre('save', function(){
    this.created_at = new Date();
});

const Color = mongoose.model('colors',colorSchema);

module.exports = Color;