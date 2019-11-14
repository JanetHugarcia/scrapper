const express = require('express');
const morgan = require('morgan');
const dataWong = require('./wong/data');
const exphbs = require('express-handlebars');
const path = require('path');

//Initial
const server = express();
const publicPath = path.join(__dirname, '/views');
console.log(publicPath);
server.set('port', 3000);

//settings
server.engine('.hbs', exphbs({extname: '.hbs'}));
server.set('view engine', '.hbs');

//middlewares
server.use(morgan('dev'));
server.use('/', express.static(publicPath));


//Routes
server.get('/wong', (req,res,next) => {
  res.render('home', { products: dataWong })
})

//server
server.listen(server.get('port'), () => {
  console.log('Server running', server.get('port'));
})