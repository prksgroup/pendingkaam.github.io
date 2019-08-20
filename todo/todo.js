const express = require('express');
const port = 5000;
const app = express();
const tododata = require('./config/mongoose');
const userschema = require('./model/todoschema');

app.set('view engine', 'ejs');
app.set('views', './view');

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

app.use(express.urlencoded());
app.use(express.static('static'));

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

app.get('/delete-timetable', function(req, res) {
    console.log(req.query);
    let id = req.query.id;
    userschema.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('ERROR WHILE DELETING A CONTACT');
            return;
        }
        res.redirect('/');
    })
})

app.post('/removelist', function(req, res) {
    userschema.findOneAndDelete(req.body.id, function(err) {
        if (err) {
            console.log('errorerror');
            return;
        }
        res.redirect('/');
    })
});


app.listen(port, function(err) {
    if (err) {
        console.log('ERROR-->', err);
    }
    console.log('TO DO APP SERVER IS RUNNING SUCCESSFULLY');
})