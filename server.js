const express = require('express')
var mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
app.use(express.static('../library'))
app.use(bodyParser.urlencoded({extended: false}))

var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//app.set('view engine', 'ejs')
app.get('/', function (req, res) {
    res.sendFile('views/contact.html', { root: __dirname })
});


var connection = mysql.createConnection({
    host       : 'localhost',
    user       : 'root',
    password   : 'plantsvszombies',
    database   : 'mydb'
});

connection.connect(function(err){
    if (err) throw err;

    console.log('Connected..');
})


app.post('/submit', function (req, res) {
    

    var sql = "insert into contact values(null, '"+ req.body.name +"', '"+ req.body.email +"', '"+ req.body.message +"')";
    connection.query(sql, function (err) {
        if (err) throw err
        res.render('contact', { title: 'Data Saved',
        message: 'Data Saved successfully.' })
       
    })
    connection.end();
})

app.listen(port);
console.log("Port: " + port);