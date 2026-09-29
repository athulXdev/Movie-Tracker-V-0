const Review = require('../models/reviewModel');
const Movie = require("../models/movieModel")

exports.addAndUpdateComment = async (req,res)=>{
    try {
        const {movieId , comment , isPublic} = req.body
        const userId = req.user.userId;

        if(!movieId){
            return res.status(400).json({
                success:false,
                message:'No movie found'
            })
        }

        if(!comment || !comment.trim()){
            return res.status(500).json({
                success:false,
                message:'Comment cannot be empty'
            })
        }

        const movieExists = await Movie.findById(movieId)
        
        

        if(!movieExists){
            return res.status(404).json({
                success:false,
                message:"Movie not found"
            })
        }


        const review = await Review.findOneAndUpdate(
            {user:userId, movie:movieId},
            {
                comment:comment.trim(),
                isPublic: isPublic !== undefined ? isPublic : true
            },
            {upsert:true,new:true,setDefaultOnInstert:true,runValidators:true}
        )

        if(!review){
            return res.status(404).json({
                success:false,
                message:'review not found'

            })
        }

        res.status(200).json({
            success:true,
            message:"comment posted",
            review
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

exports.getAllReview = async (req,res)=>{
    try {
        const {movieId} = req.params;
        // console.log(req.params);


    if(!movieId){
        return res.status(404).json({
            success:false,
            message:"movie not found "
        })
    }

    const allReviews = await Review.find({movie:movieId,isPublic:true})
    .populate('user','userName')
    .sort({createdAt:-1})

    if(allReviews.length===0){
        return res.status(404).json({
            success:false,
            message:'No reviews for this movie'
        })
    }


    res.status(200).json({
        success:true,
        TotalReviews:allReviews.length,
        allReviews
    })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getMyReviews = async (req,res)=>{
    try {
        const userId = req.user.userId;

    const myReviews = await Review.find({user:userId})

    if(!myReviews){
        return res.status(404).json({
            success:false,
            message:'no reviews found'
        })
    }

    res.status(200).json({
        success:true,
        totalReviews:myReviews.length,
        myReviews
    })
    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.deleteComment = async (req,res)=>{
    try {
        const {commentId} = req.params;
    const userId = req.user.userId

    if(!commentId){
        return res.status(404).json({
            success:false,
            message:'movie not found'
        })
    }

    const deletedComment = await Review.findOneAndDelete({user:userId,_id:commentId})
    if(!deletedComment){
        return res.status(404).json({
            success:false,
            message:'Comment not found'
        })
    }

    res.status(200).json({
        success:true,
        message:'Comment deleted'
    })

    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message
        })
    }
}