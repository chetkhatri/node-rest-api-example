const express = require('express')
const cors = require('cors');

const router = express.Router()
const studentController = require('../controllers/student.controller');

const {validateStudent} = require('../validation/validator.js')
const { signIn, welcome, refresh } = require('../auth/handlers')

const corsOptions = {
    origin: 'http://localhost:5345/',
    credentials: true,
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


router.post('/signin', cors(corsOptions), signIn)
router.get('/welcome', cors(corsOptions), welcome)
router.post('/refresh', cors(corsOptions), refresh)

// Retrieve all Students
router.get('/', cors(corsOptions), studentController.findAll);

// Create a new student
router.post('/', cors(corsOptions), validateStudent, studentController.create);

// Retrieve a single student with GR_Number
router.get('/:grNumber', cors(corsOptions), studentController.findById);

// Update a student with GR_Number
router.put('/:grNumber', cors(corsOptions), studentController.update);

// Delete a student with GR_Number
router.delete('/:grNumber', cors(corsOptions), studentController.delete);

module.exports = router