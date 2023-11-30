const express = require('express');
const { getAllUsersController, insertUserController, updateUserController, authenticateController, addUserForm, viewUserForm } = require('../controllers/userController');
const { getUserById, deleteUser} = require('../services/userService');
const { insertUserValidation, updateUserValidation } = require('../validations/user-validator');
const authenticateToken = require('./middleware');
const router = express.Router();

router.post('/authenticate', authenticateController);

router.get('/users', authenticateToken, getAllUsersController);
router.get('/user', getUserById);
router.post('/user', insertUserValidation, insertUserController);
router.put('/user', updateUserValidation, updateUserController);
router.delete('/user', deleteUser);

router.get('/addUserForm', addUserForm);
router.get('/viewUserForm', viewUserForm);

module.exports = router;