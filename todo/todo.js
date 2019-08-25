//importing express to use the all functionality of express
const express = require('express');
const port = 8000;
const app = express();
//importing mongoose and user schema as exported from config and model folder
const tododata = require('./config/mongoose');
const userschema = require('./model/todoschema');


//setting up view engine 
app.set('view engine', 'ejs');
app.set('views', './view');

//searching in usersschema and pass that data into home.ejs view file

app.get('/', function(req, res) {
    userschema.find({}, function(err, todotimetable) {
        if (err) {
            console.log('ERROR OCCURRED IN FETCHING DATABASE');
            return;
        } else {
            res.render('home', {
                title: 'TODO WEB APP',
                todo: todotimetable
            });
        }
    })

})

//to use the css and javascript files use express function static

app.use(express.urlencoded());
app.use(express.static('static'));

//Controller to add task 

app.post('/timetable', function(req, res) {
    userschema.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err, newtimetable) {
        if (err) {
            console.log('ERROR OCCURRED DURING CREATING THE SCHEMA');
        }
        console.log('******************', newtimetable);
        res.redirect('back');
    })

})

//Controller to remove task as marked by the user
app.post('/removelist', function(req, res) {
    console.log(req.body.task);
    let id = req.body.task;
    userschema.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('errorerror');
            return;
        }
        res.redirect('/');
    })
});

//creting server on port number 8000
app.listen(port, function(err) {
    if (err) {
        console.log('ERROR-->', err);
    }
    console.log('TO DO APP SERVER IS RUNNING SUCCESSFULLY');
})
