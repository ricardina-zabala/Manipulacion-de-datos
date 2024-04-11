const express = require('express');
const router = express.Router();
const {list, nuevo, recomended, detail, add, create, edit, update, borrar, destroy} = require('../controllers/moviesController');
const { moviesValidation } = require('../middleware/validations');

router.get('/movies', list);
router.get('/movies/new', nuevo);
router.get('/movies/recommended', recomended);
router.get('/movies/detail/:id', detail);


//Rutas exigidas para la creación del CRUD
router.get('/movies/add', add);
router.post('/movies/add', moviesValidation, create);
router.get('/movies/edit/:id', edit);
router.put('/movies/edit/:id', moviesValidation, update);
router.get('/movies/delete/:id', borrar);
router.delete('/movies/delete/:id', destroy);

module.exports = router;