const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now} ${req.method} ${req.url}`);
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Page!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorCode: '440',
    errorMessage: 'Bad Request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
