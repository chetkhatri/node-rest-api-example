'use strict';

const Student = require('../models/student.model');
const handler = require('../auth/handlers')
const jwt = handler.jwt
const jwtKey = handler.PUBLIC_KEY
const jwtExpirySeconds = handler.jwtExpirySeconds

const authentication = function(req, res){
    const token = req.cookies.token

    if (!token) {
      // return res.status(401).end()
      return 401
    }
  
    var payload
    try {
      payload = jwt.verify(token, jwtKey, { algorithms: ['RS256'] })
      return 200
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // return res.status(401).end()
        return 401
      }
      // return res.status(400).end()
      return 400
    }
}

exports.findAll = function(req, res) {
  const auth = authentication(req, res)
  if(auth == 401) {
    res.status(401).json("Authentication failed!")
  } 
  else if(auth == 400) {
    res.status(401).json("Bad Request, Authentication failed!")
  }
  else {
    Student.findAll(function(err, student) {
        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', student);
        res.send(student);
      });
  }
};


exports.create = function(req, res) {
   
  const auth = authentication(req, res)
  if(auth == 401) {
    res.status(401).json("Authentication failed!")
  } 
  else if(auth == 400) {
    res.status(401).json("Bad Request, Authentication failed!")
  }
  else {
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
  }

};


exports.findById = function(req, res) {

  const auth = authentication(req, res)
  if(auth == 401) {
    res.status(401).json("Authentication failed!")
  } 
  else if(auth == 400) {
    res.status(401).json("Bad Request, Authentication failed!")
  }
  else {
    Student.findById(req.params.grNumber, function(err, student) {
        if (err)
        res.send(err);
        res.json(student);
    });
  }
   
};


exports.update = function(req, res) {
    const auth = authentication(req, res)
  if(auth == 401) {
    res.status(401).json("Authentication failed!")
  } 
  else if(auth == 400) {
    res.status(401).json("Bad Request, Authentication failed!")
  }
  else {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Student.update(req.params.grNumber, new Student(req.body), function(err, student) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Student successfully updated' });
        });
    }
  }
};


exports.delete = function(req, res) {
    const auth = authentication(req, res)
  if(auth == 401) {
    res.status(401).json("Authentication failed!")
  } 
  else if(auth == 400) {
    res.status(401).json("Bad Request, Authentication failed!")
  }
  else {
    Student.delete( req.params.grNumber, function(err, student) {
        if (err)
        res.send(err);
        res.json({ error:false, message: 'Student successfully deleted' });
      });
  }
    
};