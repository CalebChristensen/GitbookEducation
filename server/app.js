var express = require('express'); //Here we require the use of express npm package that we installed in our depnedencies.
var app = express(); //We create an instance of express. We're actually firing off a top-level express() function. This allows us to create an Express App.
var test = require('./controllers/testcontroller'); // we import the route object that we just created and store it in a variable called test.
var sequelize = require("./db");

sequelize.sync();
app.use('/test', test) //We call app.use in the first parameter create a base url called /test so our base URL looks like this. http://localhost:3000/test
//For our second parameter for the use() function, we pass in test. This means that all routes created in tescontroller.js file will be sub-routes and look like this             http://localhost:3000/test or http://localhost:3000/test/
app.listen(3000, function() { //use express to start a UNIX socket and listen for connections on the given path. this is identical to Node's http.server.listen()
    console.log('Hey man!!!!') //the given path is localhost:3000
});
app.use('/api/test', function(req, res){ // /api/test is the endpoint, we fire off an Express function res.send. res (short for response) handles packagin up the response obj.
    res.send("This is data from the /api/test endpoint. It's from the server"); //the .send() method does the job of sending off the response.
});