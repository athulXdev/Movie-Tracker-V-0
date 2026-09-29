const express = require('express');
const { addComment, addAndUpdateComment, getAllReview, getMyReviews, deleteComment } = require('../controllers/reviewController');
const { userAuthintication } = require('../middlewares/auth');
const router = express.Router();



router.route('/add-comment').post(userAuthintication,addAndUpdateComment);
router.route('/get-all-reviews:movieId').get(userAuthintication,getAllReview);
router.route('/my-reviews').get(userAuthintication,getMyReviews)
router.route('/delete-comment:commentId').delete(userAuthintication,deleteComment)


module.exports = router;