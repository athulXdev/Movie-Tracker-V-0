const express = require('express')
const router = express.Router();
const { userRegister, userLogin, userLogout, getAllUsers } = require('../controllers/userController');
const { userAuthintication } = require('../middlewares/auth');

router.route('/user-register').post(userRegister);
router.route('/user-login').get(userLogin);
router.route('/user-logout').get(userLogout);
router.route('/get-all-users').get(getAllUsers);




module.exports = router;