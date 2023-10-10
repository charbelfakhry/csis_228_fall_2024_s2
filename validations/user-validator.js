const { check } = require('express-validator');

const insertUserValidation = [
  check('userName').notEmpty().withMessage('User Name is required'),
  check('userUserName').notEmpty().withMessage('User Username is required'),
  check('userEmail').isEmail().withMessage('Invalid Email Format'),
  check('userPassword').notEmpty().withMessage('User Password is required'),
  check('userPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('userPassword').isStrongPassword().withMessage("You entered a weak pwd"),
  // more validators as needed
];

const updateUserValidation = [
  check('userId').notEmpty().withMessage('User Id is required'),  
  check('userName').notEmpty().withMessage('User Name is required'),
  check('userUserName').notEmpty().withMessage('User Username is required'),
  check('userEmail').isEmail().withMessage('Invalid Email Format'),
  check('userPassword').notEmpty().withMessage('User Password is required'),
  check('userPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('userPassword').isStrongPassword().withMessage("You entered a weak pwd"),
  // more validators as needed
];

module.exports = {
  insertUserValidation,
  updateUserValidation,
};
