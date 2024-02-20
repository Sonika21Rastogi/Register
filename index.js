var con = require('./connection')

var express = require('express');
var app = express();

var bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/register.html');
});

app.post('/', function (req, res) {
    //console.log(req.body);
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Mno = req.body.Mno;


    con.connect(function (err) {
        if (err)
            throw err;
        var sql = `insert into student(Name,Email,Mno)values('${Name}',"${Email}","${Mno}")`;

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.redirect('/student');
            // res.send('Student Register Successful ');
        });
    });
});

app.get('/student', function (req, res) {
    con.connect(function (err) {
        if (err) console.log(err);

        var sql = `select * from student`;
        con.query(sql, function (err, result) {
            if (err) console.log(err);
            // console.log(result);
            res.render(__dirname + "/student", { student: result });
        })
    })
});

app.get('/delete-student', function (req, res) {
    con.connect(function (err) {
        if (err) console.log(err);

        var sql = `delete from student where Id=?`;

        var Id = req.query.Id;
        con.query(sql, [Id], function (err, result) {
            if (err) console.log(err);
            res.redirect('/student');
        })
    })
});


app.get('/Update-student', function (req, res) {
    con.connect(function (err) {
        if (err) console.log(err);

        var sql = `select * from student where Id=?`;

        var Id = req.query.Id;

        con.query(sql, [Id], function (err, result) {
            if (err) console.log(err);
           res.render(__dirname+'/update-student',{student:result});
        })
    })
});

app.post('/update-student',function(req,res){

    var Name = req.body.Name;
    var Email = req.body.Email;
    var Mno = req.body.Mno;
    var Id = req.body.Id;
 

    con.connect(function (err) {
        if (err) console.log(err);

        var sql = "update student set Name=?,Email=? ,Mno=? where Id=?";

        con.query(sql, [Name,Email,Mno,Id], function (err, result) {
            if (err) console.log(err);
            res.redirect('/student');
        })
    })
});

app.listen(8000);
