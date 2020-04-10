//require mongoose.
const mongoose = require('mongoose');

//connect to database.
mongoose.connect('mongodb://localhost/contact_list_db',{useNewUrlParser:true});

//accuire the connection.
const db = mongoose.connection;

//error.
db.on('error',console.error.bind(console,"error connecting to database"));

//up and running.
db.once('open',function(){
    console.log("database connected successfully");
})