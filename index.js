var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyparser =require('body-parser');
app.use(bodyparser.json());

var con = mysql.createConnection({
  host: "surveyinstance.c9ziekod0x9i.us-east-2.rds.amazonaws.com",
  user: "PoolAPal",
  password: "PoolAPalia3",
  database : "testfresher"
  
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(3000,()=> console.log('express server is runing'));
//Get an user details
app.get('/user/:id',(req,res)=>{
    con.query('SELECT * FROM testfresher.user Where Userid = ?',[req.params.id],(err,row,fields)=>{
        if (err) throw err;
        res.send(row);
       

    })

});

//Get all user details

app.get('/user',(req,res)=>{
    con.query('SELECT * FROM testfresher.user',(err,row,fields)=>{
        if (err) throw err;
        res.send(row);
       

    })

});
//Delete an user details
app.delete('/user/:id',(req,res)=>{
    con.query('Delete from testfresher.user Where Userid = ?',[req.params.id],(err,row,fields)=>{
        if (err) throw err;
        res.send("deleted successfully");
       

    })

});
//insert a new record into mysql database
app.post('/user', function (req, res) {
    var postData  = req.body;
    con.query('INSERT INTO user SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.send("Added successfully");
    res.end(JSON.stringify(results));
  });
 });
  

 // update record into mysql database
 app.put('/user', function (req, res) {
    con.query('UPDATE `user` SET `username`=?,`email`=?,`password`=? where `Userid`=?', [req.body.username,req.body.email, req.body.password, req.body.Userid], function (error, results, fields) {
    if (error) throw error;
    res.send("updated successfully");
    res.end(JSON.stringify(results));
  });
 });

