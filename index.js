const express = require('express');
const morgan = require('morgan');
const data = require('./wong/data');
const exphbs = require('express-handlebars');

//Initial
const server = express();

server.set('port', 3000);

//settings
server.engine('.hbs', exphbs({extname: '.hbs'}));
server.set('view engine', '.hbs');

//middlewares
server.use(morgan('dev'));

//Routes
server.get('/', (req,res,next) => {
  res.render('home', { products: data})
})

//server
server.listen(server.get('port'), () => {
  console.log('Server running', server.get('port'));
})