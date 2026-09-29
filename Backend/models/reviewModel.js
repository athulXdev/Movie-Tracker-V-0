const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true 
    },
    movie : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Movie",
        required : true
    },
    comment : {
        type : String,
        maxlength : 500
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    isPublic : {
        type : Boolean,
        default : true
    },
    
},{
    timestamps : true
})

reviewSchema.index({user:1 , movie : 1} ,{unique:true});


const Review = mongoose.model('Review',reviewSchema)
module.exports = Review;