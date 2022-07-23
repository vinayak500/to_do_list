const express = require('express');
const port = 8000;
const db = require('./config/mongoose');
const task = require('./models/task');
const app = express();
const path = require('path')

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));



app.get('/', function(req,res)
{
      return res.render('home' ,{});
});


app.post('/create-task' , function(req,res){


    console.log(req.body);
      task.create({
        description: req.body.description ,
        category: req.body.category
      } , function(err , newTask){
        if(err)
        {
            console.log('error in creating a task!');
            return;
        }
        console.log(newTask);
        return res.redirect('/');
      });
});




app.get('/delete-task' , function(req,res){
 
});



app.listen( port , function(err)
{
    if(err)
    {
        console.log("error" , err);
        return;
    }
      console.log("server is running in port " + port);
});