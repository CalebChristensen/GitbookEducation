var express = require('express')
var router = express.Router() //We bring in our necessary imports. Same as the tescontroller, just a User model now.
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//Create User Endpoint: Starter
//We start our POST method for a creatuser endpoint
router.post('/createuser', function (req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password; //Inside the method, we have the basics for creating a new user and returning a message in the response.

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user){
            //Create a variable to hold the token. .sign() creates the token. it takes at least 2 parameters: the payload and signature. You can also suppy some specific options or callback. This is the payload, or data we're sending. user.id is the primary key of the user table and is the number assigned to the user when created in the database. This is the signature, which is used to to help encode and decode the token. You can make it anything you want, and we will make this private later. We set an option to make the token expire. Here, we're taking (seconds minutes hours); in other words, 1 day.
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'created', //Along with the user object that gets retunred as JSON, we can send a message in the response.
                sessionToken: token //We pass the value of the token back in our response. The server has now assigned a token to a specific user, and the client will have that token to work with (once we have a client).
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/signin', function(req, res) { //We are sending data so we use router.post instead of router.get
    User.findOne( { where: { username: req.body.user.username } } ).then( //1. findOne() method is a Sequelize method that tries to find something within the database that we tell it to look for. This is called Data Retrieval. 2. where: is an object within Sequelize that tells the database to look for something matching its props. 3. We are looking in the username column in the user table for one thing that matches the value passed from the client. 4. Promise is handled with the .then function.
        function(user) {
        if (user) { //First we check to make sure that a match for the username was found.
            bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches){ //2.We use bcrypt  to decrypt the hash value and compare it to the supplied password. This is a complex task, and we let the highly reputable and revered bcrypt package handle the algorithm for doing that. 3.(req.body.user.password) is how we pull in the password value from the current request when the user signs in. 4. (user.passwordhash) pulls the hashed password value from the database. 5. (function(err, matches)) is us running a callback function that will run on either success or failure of compare. 6. If the hashed password in the database matches the one that has been entered, print to the console that the password values match. Note that the matches variable is a boolean
                if (matches) { //Here we use the callback function from the compare() method. If the username and password are a match, this will be set to true.
                    var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}); //upon success, we will create a session.
                    res.json({ //We return the user object with a success message and sessionToken.
                        user: user,
                        message: "successfully authenticated",
                        sessionToken: token
                    });
                }else { //If the passwords don't match or the username is not correct, we send a response telling the client that authentication did not occur.
                    res.status(502).send({ error: "you failed, yo" });
                }
            });
        }else { //Handle situations where the match fails.
            res.status(500).send({ error: "failed to authenticate" });
        }
    },
        function(err) {
            res.status(501).send({ error: "you failed, yo" });
        }
    );
});
module.exports = router;