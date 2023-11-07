const express = require('express');
const { getTypiByUserIdController, insertTypiByUserIdController } = require('../controllers/typi.controller');

const router = express.Router();

router.post('/getTypiCodeByUserId', getTypiByUserIdController);
router.post('/insertTypiCodeByUserId', insertTypiByUserIdController);

module.exports = router;