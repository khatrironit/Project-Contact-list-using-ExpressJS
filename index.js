const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middlewares.
app.use(express.urlencoded());          //middleware for parsing form data.
app.use(express.static('assets'));      //middleware to couple static files(css,js etc..) with views.
var contactList = [
    {
        name:'Ronit khatri',
        phone:'9013355625'
    },
    {
        name:'Vinit khatri',
        phone:'9871886405'
    },
    {
        name:'Bhavi khatri',
        phone:'1234567890'
    }
];
app.get('/',function(req,res){
    console.log("reloaded");

    Contact.find({},function(err,contacts){
        if(err){
            console.log("error fetching contacts",err);
            return;
        }
        return res.render('home' , {
            title:"Contact list" ,
            heading:"My Contact List",
            contact_list:contacts
        });

    })

    
});
app.post('/add-contact',function(req,res){
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating new contact",err);
            return;
        }
        console.log(newContact);
        return res.redirect('back');
    })
    // return res.redirect('back');
});

app.get('/delete-contact',function(req,res){
    //console.log(req.query);
    //get the id from the query url
    let id = req.query.id;

    //find the contact in the database using id and delete.
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting contact",err);
            return;
        }
        return res.redirect('back');
    });
})

app.listen(port,function(err){
    if(err){
        console.log("error",err);
        return;
    }
    console.log("server is running on port :",port);
});