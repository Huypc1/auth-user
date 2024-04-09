const router = require('express').Router();
const authController = require('../controllers/authController')
router.post('/register',authController.addUser)
router.post('/login',authController.getUser)
router.get('/profile',authController.getProfile)
module.exports = router;