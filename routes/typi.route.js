const express = require('express');
const { getTypiByUserIdController, insertTypiByUserIdController } = require('../controllers/typi.controller');

const router = express.Router();

router.post('/getTypiCodeByUserId', getTypiByUserIdController);
router.post('/n', insertTypiByUserIdController);

module.exports = router;