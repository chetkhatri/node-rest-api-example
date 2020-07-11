'user strict';
var dbConn = require('../config/db.config');

var Student = function(student){
    this.std_id         = student.std_id;
    this.gr_no          = student.gr_no;
    this.first_name     = student.first_name;
    this.middle_name    = student.middle_name;
    this.last_name      = student.last_name;
    this.standard       = student.standard;
    this.city           = student.city;
    this.state          = student.state;
};

Student.create = function (newStudent, result) {    
    dbConn.query("INSERT INTO student set ?", newStudent, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

Student.findById = function (gr_no, result) {
    dbConn.query("Select * from student where gr_no = ? ", gr_no, function (err, res) {  
        console.log(gr_no)           
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });   
};

Student.findAll = function (result) {
    dbConn.query("Select * from student", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('students : ', res);  
            result(null, res);
        }
    });   
};

Student.update = function(gr_no, student, result){
  dbConn.query("UPDATE student SET standard=? WHERE gr_no = ?", [student.standard, gr_no], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Student.delete = function(gr_no, result){
     dbConn.query("DELETE FROM student WHERE gr_no = ?", [gr_no], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Student;