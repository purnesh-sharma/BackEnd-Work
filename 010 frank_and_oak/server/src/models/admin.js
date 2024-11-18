const mongoose = require('mongoose');

const adminScheme = new mongoose.Schema({
    name:String,
    facebook:String,
    instagram:String,
    youtube:String,
    twitter:String,
    logo:String,
    description:String,
    favicon:String,
    footer_logo:String,
    password:String,
    email:String,
    thumbnailk:String

});

const Admin = new mongoose.model('admins', adminScheme);

module.exports = Admin;
