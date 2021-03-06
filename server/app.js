require('dotenv').config(); //With this we can make items in an .env file available to our whole application.

var express = require('express'); //Here we require the use of express npm package that we installed in our depnedencies.
var app = express(); //We create an instance of express. We're actually firing off a top-level express() function. This allows us to create an Express App.
var test = require('./controllers/testcontroller'); // we import the route object that we just created and store it in a variable called test.
var authTest = require('./controllers/authtestcontroller') //We imported the authtestcontroller file for access to the endpoints.

var user = require('./controllers/usercontroller');
var sequelize = require("./db");
var bodyParser = require('body-parser'); //we pull in the body-parser library and store it in the bodyparser variable.

sequelize.sync();

app.use(bodyParser.json()); //this statment MUST go above any routes. Any routes above this statement will not be able to use the bodyparser library.

app.use(require('./middleware/headers')); //This activates our header in the app.js. Keep in mind that this in order, so the file will be read sequentially, which means taht the headers must come befroe the routes are declared.

app.use('/test', test) //We call app.use in the first parameter create a base url called /test so our base URL looks like this. http://localhost:3000/test
//For our second parameter for the use() function, we pass in test. This means that all routes created in tescontroller.js file will be sub-routes and look like this             http://localhost:3000/test or http://localhost:3000/test/

app.use('/api/user', user); //We set up a route to the endpoints for the API/USER route.
//Alternative way to write out your routes.
// app.use('/api/user', require('./controllers/usercontrollers'));

app.use(require('./middleware/validate-session')); //We imported the validate-session middleware, which will check to see if the incoming request has a token.
app.use('/authtest', authTest);// Anything beneath the validate-session will require a token to access, thus becoming protected. Anyting above it will not require a token, remaining unprotected. Therefore, the test and user routes are not protected , while the authtest route is protected.

app.listen(3000, function() { //use express to start a UNIX socket and listen for connections on the given path. this is identical to Node's http.server.listen()
    console.log('Hey man!!!!') //the given path is localhost:3000
});
app.use('/api/test', function(req, res){ // /api/test is the endpoint, we fire off an Express function res.send. res (short for response) handles packagin up the response obj.
    res.send("This is data from the /api/test endpoint. It's from the server"); //the .send() method does the job of sending off the response.
});