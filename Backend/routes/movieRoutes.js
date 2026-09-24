const express = require('express');
const router = express.Router();
const {deleteMovie,getAllMovies,searchMovie} = require('../controllers/movieController');
const { addToWatchlist } = require('../controllers/watchlistController');
const { userAuthintication } = require('../middlewares/auth');

router.route('/search-movies').post( searchMovie);
router.route('/delete-movie/:id').delete(deleteMovie);
router.route('/get-all-movies').get(getAllMovies);
router.route('/add-to-watchlist').post(userAuthintication,addToWatchlist)


module.exports = router;