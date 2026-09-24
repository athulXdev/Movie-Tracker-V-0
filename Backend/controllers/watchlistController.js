const Watchlist = require('../models/watchlistModel');

exports.addToWatchlist = async (req,res)=>{
   try {
     const {movieId, status} = req.body;
    const userId = req.user.userId;

    // console.log('userid-------->',req.user.userId);
    
    
    if(!movieId || !status){
        return res.status(400).json({
            status :false,
            Message:'No movie id or status found'
        })
    }

    const savedMovieStatus = await Watchlist.findOneAndUpdate(
        {user:userId , movie: movieId},
        {status:status},
        {upsert:true, new : true , setDefaultOnInsert:true}
    );

    console.log(savedMovieStatus);
    

    res.status(200).json({
        status: true,
        message: 'Movie added to watchlist',
        savedMovieStatus
    })
   } catch (error) {
        res.status(500).json({
            status:true,
            message:error.message
        })
   }
};

