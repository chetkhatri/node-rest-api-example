const {check, validationResult} = require('express-validator');

exports.validateStudent = [
  check('std_id')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Student ID can not be empty!')
    .bail()
    .isLength({max: 2})
    .withMessage('Maximum 3 digits required!')
    .bail(),
  check('gr_no')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('GR Number can not be empty!')
    .bail()
    .isLength({max: 4})
    .withMessage('Maximum 4 digits required!')
    .bail(),
  check('first_name').trim().escape().not().isEmpty().withMessage('First Name can not be empty!')
    .bail().isAlpha().isLength({ min: 4, max: 15 }).withMessage('Minimum 4 Characters and Maximum 15 Characters are needed!').bail(),
  check('middle_name').trim().escape().not().isEmpty().withMessage('Middle Name can not be empty!')
    .bail().isAlpha().isLength({ min: 4, max: 15 }).bail(),
  check('last_name').trim().escape().not().isEmpty().withMessage('Last Name can not be empty!')
    .bail().isAlpha().isLength({ min: 4, max: 15 }).bail(),
  check('standard').trim().escape().not().isEmpty().withMessage('Standard can not be empty!').bail()
  .isNumeric().isLength({max:1}).withMessage('Standard can not be more than a single digit!').bail(),
 check('city').trim().escape().not().isEmpty().withMessage('City can not be empty!').bail()
 .isAlpha().withMessage('City must be alphabatic!').bail().isLength({min: 4, max: 15}).bail().withMessage('City length must be in 4-15 characters'),
 check('state').trim().escape().not().isEmpty().withMessage('State can not be empty!').bail()
 .isAlpha().withMessage('State must be alphabatic!').bail().isLength({min: 4, max: 15}).withMessage('State length must be in 4-15 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

exports.validateStandard = [
  check('standard').trim().escape().not().isEmpty().withMessage('Standard can not be empty!').bail()
  .isNumeric().bail()
  .withMessage('Standard can be digit only!').bail()
  .isLength({max:1}).withMessage('Standard can be single digit only!').bail(),
];

