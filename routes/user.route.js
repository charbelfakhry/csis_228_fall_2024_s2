const express = require('express');
const { getAllUsersController, insertUserController, updateUserController } = require('../controllers/userController');
const { getUserById, deleteUser } = require('../services/userService');
const { insertUserValidation, updateUserValidation } = require('../validations/user-validator');
const router = express.Router();

router.get('/users', getAllUsersController);
router.get('/user', getUserById);
router.post('/user', insertUserValidation, insertUserController);
router.put('/user', updateUserValidation, updateUserController);
router.delete('/user', deleteUser);

module.exports = router;