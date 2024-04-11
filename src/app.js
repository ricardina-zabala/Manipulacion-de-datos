const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');

app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body


app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
