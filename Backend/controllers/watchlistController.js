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


exports.getAllWatchlist =async (req,res)=>{
    try {

        const userId = req.user.userId;
        
    
    if(!userId){
        return res.status(400).json({
            success: false,
            message:'No user id found'
        })
    }


    const watchlist = await Watchlist.find({user:userId})
    .populate('movie')
    .sort({createdAt : -1})

    console.log('watchlist',watchlist);
    

    res.status(200).json({
        success: true,
        message:'Watchlist fetched',
        total:watchlist.length,
        watchlist
    })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }

}

exports.removeFromWatchlist = async (req,res)=>{
    try {
        
        const {id} = req.params;
        const userId = req.user.userId;


        if(!id){
            return res.status(400).json({
                success:false,
                message: 'no Movie id found'
            })
        }

        const movie = await Watchlist.findOneAndDelete({user:userId,_id:id}
)
        

        if(!movie){
            return res.status(400).json({
                success :false,
                message:'No movie found'
            })
        }
        

        res.status(200).json({
            success:true,
            message:'Movie removed from watchlist'
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}