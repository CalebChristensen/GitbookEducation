var express = require('express'); //We import the Express framework and it inside the variable express. This instance becomes our new gateway to using Express methods.
var router = express.Router(); //created a new variable called router. we are using the 'express' variable to access the Router() method.

router.get('/', function (req, res) { //router uses Router(). get allws us to complete an HTTP GET request. We pass two arguments into the .get method.
    res.send('Hey!!! this is a test route!'); // first instance is '/'. the second argument is a callback function. This is sometimes called a "handler function". This function gets called when the app receives a request to the specified route and HTTP method. The app "listens" for requests that match the specified routes and methods, and when it detects a match, it calls the specified callback function.
});//inside our callback function we call res.send(). send() is an express method that can bec called on the res or response object. Our response parameter is just a string.

router.get('/about', function(req, res) { //You can use the router instance that we've created and call the .get method from express to make a HTTP GET request.
    res.send('This is an about route'); // The first paramets is the /about path that we'll be appending to the URL. This will make the url look like this: http://localhost:3000/test/about.
});

router.get('/contact', function(req, res) {
    res.send({user: "Kenn", email: "kenn@beastmode.com"}); //Put into curley brackets to send an object.
});

router.get('/projects', function(req, res) {
    res.send(['Project 1' , 'Project 2']); //put inside square brackets to send array of projects
});

router.get('/mycontacts', function(req, res) {
    res.send([
        {user: "Quincy", email: "kenn@beastmode.com"},  //sending an array and objects so we use Square to wrap it all and curley around each individual contact.
        {user: "aaron", email: "aaron@beastmode.com"} , 
        {user: "Quincy", email: "tom@beastmode.com"}
    ]);
});
module.exports = router; //we export the module for usage outside the file.