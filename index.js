//dependencies
const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const nocache = require('nocache');

const app = express();

const PORT = 3000;

// Applying middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(nocache());

// controllers
var controller = require('./constroller');

// Views
app.use(express.static('pages'));

// Server Startup
app.listen(PORT, () => {
    console.log('Serve is running on '+PORT);
});

//routes
/*
handle UI routes
 */
app.get('/', controller.getLogin);
app.get('/home', controller.getHome);
app.get('/logout', controller.logOut);

/*
handle service routes
 */
app.post('/home', controller.validateCredentials);
app.post('/posts', controller.submitForm);
app.post('/logout', controller.logOut);

