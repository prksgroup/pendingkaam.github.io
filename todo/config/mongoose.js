const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapp');
const dataoftodo = mongoose.connection;
dataoftodo.on('error', console.error.bind(console, 'error occurred during connecting the database!'));
dataoftodo.once('open', function() {
    console.log('DATADABE IS CONNECTED SUCCESSFULLY WITH CONTACT APP');
})
module.exports = dataoftodo;