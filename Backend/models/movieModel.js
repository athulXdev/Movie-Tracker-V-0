const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    imdbID : {
        type : String,
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true,
    },

    year        : String,
    genre       : String,
    language    : String,
    runtime     : String,
    actors      : String,
    plot        : String,
    poster      : String,
    imdbRating  : Number,
    type        : String,

    cachedAt : {
        type : Date,
        default : Date.now
    }
},{
    timestamps : true
})

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;