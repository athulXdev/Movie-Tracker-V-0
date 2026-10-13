const express = require('express')
const router = express.Router();
const { userRegister, userLogin, userLogout, getAllUsers, getCurrentUser } = require('../controllers/userController');
const { userAuthintication } = require('../middlewares/auth');

router.route('/user-register').post(userRegister);
router.route('/user-login').post(userLogin);
router.route('/user-logout').post(userLogout);
router.route('/get-all-users').post(getAllUsers);
router.route('/get-current-user').get(userAuthintication,getCurrentUser)



module.exports = router;