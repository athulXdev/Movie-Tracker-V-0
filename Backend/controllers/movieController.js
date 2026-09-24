const Movie = require('../models/movieModel');
const axios = require('axios');

const API_LIMIT = 20; 
exports.searchMovie = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'No title found'
            });
        }


        
        
        const movies = await Movie.aggregate([
            {
                $match: {
                    title: { $regex: title, $options: 'i' }
                }
            },
            {
                $addFields: {
                    isExact: {
                        $cond: [
                            { $eq: [{ $toLower: '$title' }, title.toLowerCase()] },
                            1,
                            0
                        ]
                    },
                    startsWith: {
                        $cond: [
                            {
                                $regexMatch: {
                                    input: '$title',
                                    regex: `^${title}`,
                                    options: 'i'
                                }
                            },
                            1,
                            0
                        ]
                    }
                }
            },
            {
                $sort: {
                    isExact: -1,
                    startsWith: -1,
                    imdbRating: -1,
                    year: -1
                }
            },
            { $limit: 20 },
            {
                $project: {
                    isExact: 0,
                    startsWith: 0
                }
            }
        ]);

        if (movies.length > 0) {
            return res.status(200).json({
                success: true,
                source: 'Database',
                count: movies.length,
                movies
            });
        }

        
        const response = await axios.get(
            `https://www.omdbapi.com/?s=${title}&apikey=${process.env.OMDB_API_KEY}`
        );
        const data = response.data;

        if (data.Response === 'False') {
            return res.status(404).json({
                success: false,
                message: data.Error
            });
        }

        
        const limitedResults = data.Search.slice(0, API_LIMIT);

        const detailedMovies = await Promise.all(
            limitedResults.map(async (item) => {
                const existing = await Movie.findOne({ imdbID: item.imdbID });
                if (existing) return existing;

                const detailRes = await axios.get(
                    `https://www.omdbapi.com/?i=${item.imdbID}&apikey=${process.env.OMDB_API_KEY}`
                );
                const d = detailRes.data;

                return await Movie.create({
                    imdbID: d.imdbID,
                    title: d.Title,
                    year: d.Year,
                    genre: d.Genre,
                    language: d.Language,
                    runtime: d.Runtime,
                    actors: d.Actors,
                    plot: d.Plot,
                    poster: d.Poster,
                    imdbRating: d.imdbRating !== 'N/A' ? Number(d.imdbRating) : null,
                    type: d.Type
                });
            })
        );

        return res.status(200).json({
            success: true,
            source: 'api',
            count: detailedMovies.length,
            movies: detailedMovies
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: movies.length,
            movies
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        await movie.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};