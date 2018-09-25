var express = require('express'); //We import the Express framework and it inside the variable express. This instance becomes our new gateway to using Express methods.
var router = express.Router(); //created a new variable called router. we are using the 'express' variable to access the Router() method.
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test') //We import the test model and store it in TestModel.

router.post('/one', function(req, res){//We use the express router object to call the post() method. This corresponds to the type of HTTP request that we are sending. Post is telling the server that the incoming request has data coming with it. You use a POST request when you sign up for an application, send an email, etc.
    res.send("Got a post request.")
});

router.post('/two', function (req, res){
    let testData = "Test data for endpoint two"; //testData is going to have a fixed string that we'll use every time a POST request comes in.

    TestModel // TestModel is used to acess the model that we are using. This will grant us access to the Test model properties and to Sequelize methods.
        .create({ //.create() is a Sequelize method that allows us to create an instance of the Test model and send it off to the DB, as long as the data types match the model.
            testdata: testData //We pass the value of testData down to satisfy the key/value pair for the model. The string that we arending will be the value thats stored.
        }).then(dataFromDatabase => { 
            res.send("Test two went through!")
        }) //testData is the key in the object, and it represents the column being used in the table.
});

router.post('/three', function (req, res) {
    var testData = req.body.testdata.item; //req.body is middleware provided by Express and append two more props to it. This is what we're sending the DB. req is the actual request, and body is where out data is being held. testdata is a propery of body, while item is a porperty of testdata. We wills e this in Postman.
    TestModel
        .create({ //create() is a Sequelize method. It creates a SQL statement that will insert our data into the DB. 
            testdata: testData
        })
        res.send("Test three went through!")
        console.log("Test three went through!")
});
router.post('/four', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
        .create({
            testdata: testData
        })
        .then( //We call the the() method. Then() method retuns a Promise. Hence, the asynchronous function to force the message to wait for the insert statement to finish.
            function message() { //The callback function will print the success message to the console once testData is running.
                res.send("Test 4 went through!");
            }
        );
});

router.post('/five', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
        .create({
            testdata: testData
        })
        .then(
            function message(data) {
                res.send(data); //We have changed the data coming back in the response to the data that was persisted in Postgres. To be clear, after the data is persisted in the Postgres with the .creat() method and in the testdata column, the .thn() method returns a Promise that fires up a callback function holding the data the was just added. IMPORTANT the data variable can be whatever you want it to be.
            }
        );
});

router.post('/six', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel  
        .create({
        testdata: testData
    })
    .then(
        function message(testdata) {
            res.json({ //in our callback, rather than res.send(), we will invoke the .json() method. This will package our response as json.
                testdata: testdata //The same object that was added to the database is now being sent back to the client and stored in a tesdata property.
            });
        }
    );
});

router.post('/seven', function (req, res) {
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata) {
            res.json({
                testdata: testdata
            });
        },
        function createError(err) { //The addition that we made here is an error function. If the create() function returns an error, it will be picked up by the createError() method. That method will then send back a 500 error with a message.
            res.send(500, err.message);
        }   
        );
    });
// //Alternative way of writing post /five
// TestModel.create({testdata: testData}).then(function message(data) { res.send(data);});

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