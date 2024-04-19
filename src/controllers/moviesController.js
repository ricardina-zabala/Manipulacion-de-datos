const db = require('../database/models');
const sequelize = db.Sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const dateFormat = function (date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDate() + 1;
    day = day < 10 ? "0" + day : day;
    const newFormat = `${year}-${month}-${day}`;
    return newFormat;
}

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })
    },
    'detail': (req, res) => {
        Genres.findAll()
            .then((genres, actors) => {
                Movies.findByPk(req.params.id, {
                    include: [{
                        association: 'genre'
                    },
                    {
                        association: 'actors'
                    }
                ]
                })
                    .then((movie) => {
                        const formatDate = dateFormat(movie.release_date)
                        res.render('moviesDetail.ejs', { movie, genres, formatDate, actors });
                    });
            });
    },
    'nuevo': (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        Genres.findAll()
            .then(genres => {
                res.render('moviesAdd', {
                    genres
                })
            })
    },
    create: function (req, res) {
        Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        }),

            res.redirect('/movies')
    },
    edit: function (req, res) {
        Genres.findAll()
            .then(genres => {
                Movies.findByPk(req.params.id, {
                    include: [{
                        association: 'genre'
                    }]
                })
                    .then(Movie => {
                        const formatDate = dateFormat(Movie.release_date)
                        res.render('moviesEdit', { Movie, genres, formatDate });
                    })
            })
    },
    update: function (req, res) {
        Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect('/movies');

    },
    borrar: function (req, res) {
        Movies.findByPk(req.params.id)
            .then(Movie => {
                res.render('moviesDelete', { Movie });
            })
    },
    destroy: function (req, res) {
        Movies.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/movies');
    }

}


module.exports = moviesController;