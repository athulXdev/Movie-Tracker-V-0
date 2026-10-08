const User = require("../models/userModel");


exports.banUsers = async (req,res)=>{
    try {
        const {id} = req.params;
        const {reason} = req.body;

        const user  = await User.findByIdAndUpdate(
            id,
            {
                isBanned : true,
                banReason : reason || 'with immediate action',
                bannedAt  : new Date()
            },
            {new : true}
        ).select('-password')

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'No user Found'
            })
        }

        res.status(200).json({
            success:true,
            message : "User Banned",
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.unBanUser = async(req,res) =>{
    try {
        const {id} = req.params;

        const user = await User.findByIdAndUpdate(
            id,
            {
                isBanned : false,
                banReason:null,
                bannedAt : null
            },
            {new:true}
        ).select('-password')

        if(!user){
            return res.status(404).json({
                success:false,
                message:'No user Found'
            })
        }


        res.status(200).json({
            success:true,
            message:"User unbanned",
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.toggleReviewVisibility = async (req,res)=>{
    try {
        const {id} = req.params;
    const {isPublic} = req.body;
    
    if(typeof isPublic !== 'boolean'){
        return res.status(400).json({
            success:false,
            message:'isPublic must be true or false'
        })
    }

    const review = await findByIdAndUpdate(
        id,
        {
            isPublic
        },
        {new:true}
    )

    if(!review){
        return res.status(404).json({
            success:false,
            message: 'No review found'
        })
    }

    res.status(200).json({
        success:true,
        review
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
