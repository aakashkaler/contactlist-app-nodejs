const express= require('express');
const port=8000;


const path= require('path');

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assest'));
var contactList =  [
   {
      name:"aakash",
      phone:"7888573508"
   },
   {
      name:"aak",
      phone:"784958577"
   },
   {
      name:"abcd",
      phone:"12456878"
   }
]
app.get('/',function(req,res)
{
   //res.send('cool it is running or is it?');
   Contact.find({},function(err,contacts)
   {
      if(err)
      {
         console.log('error in fetching contaact in db');
         return ;
      }
      return res.render('home',{
         title: "contact list",
         contact_list : contacts
      });
   });
  
});

app.post('/create-contact',function(req,res)
{
   //contactList.push ({
    //  name : req.body.name,
     // phone:req.body.phone
  // });
    Contact.create({
           name:req.body.name,
           phone: req.body.phone
    },function(err,newContact)
    {
       if(err)
       {
          console.log('error in creating contact');
          return ;
       }
       console.log('*******',newContact);
       return res.redirect('back');
    });
   
});
app.get('/delete-contact',function(req,res)
{
   // get the id from ul
   let id= req.query.id;
   // find the contact in ul with id and delete
   Contact.findByIdAndDelete(id,function(err,)
   {
      if(err)
      {
         console.log("error in deleting");
         return ;
      }
      return res.redirect('back');
  });
   //let contactindex= contactList.findIndex(contact => contact.phone == phone);
   //if(contactindex!=-1)
   //{
    //  contactList.splice(contactindex,1);
  // }
  
});
app.listen(port, function(err)
{
   if(err){ console.log('Error in running the sever',err);}
   
   console.log('yup! My express server is running on Port:',port);
});