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
    task.find({} , function(err , tasks){
        if(err){
            console.log('error in fetching data from db!');
            return;
        }

        return res.render('home' ,{
            title:"TO DO LIST",
            task_list:  tasks
        });
    });  
});


app.post('/create-task' , function(req,res){


    // console.log(req.body);
    // console.log(req.body.date);
      task.create({
        description: req.body.description ,
        category: req.body.category ,
        date: req.body.date
      } , function(err , newTask){
        if(err) {
            console.log('error in creating a task!');
            return;
        }
        // console.log(newTask);
        return res.redirect('/');
      });
});




app.get('/delete-task' , function(req,res){
    let id = req.query.id;

    task.findByIdAndDelete(id , function(err){
       if(err) {
        console.log('error in deleting an object from database!');
        return;
       }

       console.log('deleted');
       return res.redirect('back');
    });
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