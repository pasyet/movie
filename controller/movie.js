const {Movie } = require('../models')
const axios= require('axios')

class movieController {
    static getMovies(req, res, next) {
        Movie.findAll()
            .then((data) => {
                res.status(200).json({
                    movie: data
                });
            })
            .catch((error) => {
                next(error)
            });
    }

    static createMovies(req, res, next) {
        const { title, synopsis, trailerUrl, imgUrl, rating, genreId} = req.body
        Movie.create({ title, synopsis, trailerUrl, imgUrl, rating, genreId})
            .then((data) => {
                res.status(201).json({
                    movie: data
                });
            })
            .catch((error) => {
                next(error)
            });
    }

    static getMoviesById(req, res, next) {
        Movie.findByPk(req.params.id)
            .then((data) => {
                if (data === null) throw ({ messages: "MovieNotFound" });
                res.status(200).json({
                    movie: data
                })
            })
            .catch((error) => {
                console.log(error);
                next(error)
            });
    }

    static editMovies(req, res, next) {
        const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId } = req.body
        Movie.update({ title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId },
            {
                where: {
                    id: req.params.id,
                }, 
                returning: true
            })
            .then((data) => {
                console.log(data);
                if (data[0] === 0) {throw ({ messages: "MovieNotFound" })} 
                res.status(200).json(data[1][0]);
            })
            .catch((error) => {
                next(error)
            });
    }

    static deleteMovies(req, res, next) {
        let result = '';
        Movie.findByPk(req.params.id, {
            attributes: ["title"],
            where: { id: req.params.id }
        })
        .then((data) => {
            if (data === null) {
                throw ({ messages: "MovieNotFound" });
            } else {
                result = data.title;
                return Movie.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(() => {
            res.status(200).json({
                messages: `${result} susccess to delete `
            })
        })

        .catch((error) => {
            next(error)
        });
    }

    static async getMoviePopuler (req, res, next) {
        try {
            const response = await axios({
                url: 'https://api.themoviedb.org/3/movie/popular',
                method: 'GET',
                headers: {
                    Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTNlOTA3NTFiOGFjOGM5OWU3ZDJhMWUxNjA1ZDhjNCIsInN1YiI6IjYxZTZlZDkzNDQxYjAzMDA5NWI3YThiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.14OVZwNgMwEI2b4_EOmCtrdXCJepvNA0yLV5H2Vacs4'
                }
            });
            res.status(200).json(response.data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = movieController;