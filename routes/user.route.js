const express = require('express');
const { getAllUsersController, insertUserController } = require('../controllers/userController');
const router = express.Router();

router.get('/users', getAllUsersController);
router.post('/user', insertUserController);
// router.put('/user');
// router.get('/user');
// router.delete('/user');

module.exports = router;