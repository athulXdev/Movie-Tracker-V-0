const express = require('express');
const { userAutherization, userAuthintication } = require('../middlewares/auth');
const { banUsers } = require('../controllers/adminActionsController');
const router = express.Router()


router.route('/ban-user:id').post(userAuthintication,userAutherization,banUsers);


module.exports = router