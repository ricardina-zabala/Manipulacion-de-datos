const { check } = require('express-validator');

const title = check('title')
    .notEmpty().withMessage('El campo title no puede estar vacio').bail()
    .isAlphanumeric('es-ES', { ignore: ' ' }).withMessage('El campo title solo acepta letras').bail()
    .isLength({ min: 3, max: 100 }).withMessage('El campo title debe tener al menos 3 caracteres').bail();

const rating = check('rating')
    .notEmpty().withMessage('El campo rating no puede estar vacio').bail()
    .isNumeric().withMessage('El campo rating solo acepta numeros').bail();

const awards = check('awards')
    .notEmpty().withMessage('El campo awards no puede estar vacio').bail()
    .isNumeric().withMessage('El campo awards solo acepta numeros').bail();

const release_date = check('release_date')
    .notEmpty().withMessage('El campo release date no puede estar vacio').bail();

const length = check('length')
    .notEmpty().withMessage('El campo length no puede estar vacio').bail()
    .isNumeric().withMessage('El campo length solo acepta numeros').bail();

module.exports = [
    title, rating, awards, release_date, length
];
