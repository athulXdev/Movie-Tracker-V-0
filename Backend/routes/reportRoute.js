const express = require('express')
const { reportUser, getAllReports, updateReportStatus } = require('../controllers/reportController');
const { userAuthintication } = require('../middlewares/auth');
const router = express.Router()



router.route('/report-user').post(userAuthintication, reportUser);
router.route('/get=all=reports').get(userAuthintication, getAllReports)
router.route('/update-report').put(userAuthintication,updateReportStatus)


module.exports = router;