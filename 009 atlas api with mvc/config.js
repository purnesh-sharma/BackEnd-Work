const mongoose = require('mongoose');

const url = 'mongodb+srv://purneshsharma2020:purneshsharma8764208895@purnesh.9qfop.mongodb.net/test_115_117?retryWrites=true&w=majority&appName=Purnesh'

mongoose.connect(url)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));