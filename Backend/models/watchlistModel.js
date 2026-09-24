const mongoose = require('mongoose');

const watchlistSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    status: {
        type: String,
        enum: ['Watching', 'Plan to watch', 'Completed'],
        default: 'Plan to watch'
    }
}, {
    timestamps: true
});

watchlistSchema.index({ user: 1, movie: 1 }, { unique: true });

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
module.exports = Watchlist;