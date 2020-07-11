'use strict';

const Student = require('../models/student.model');


exports.findAll = function(req, res) {
  Student.findAll(function(err, student) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', student);
    res.send(student);
  });
};


exports.create = function(req, res) {
    const new_student = new Student(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Student.create(new_student, function(err, student) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Student added successfully!",data:student});
        });
    }
};


exports.findById = function(req, res) {
    Student.findById(req.params.gr_no, function(err, student) {
        if (err)
        res.send(err);
        res.json(student);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Student.update(req.params.gr_no, new Student(req.body), function(err, student) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Student successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    Student.delete( req.params.gr_no, function(err, student) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Student successfully deleted' });
  });
};