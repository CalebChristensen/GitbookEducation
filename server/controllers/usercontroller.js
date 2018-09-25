var express = require('express')
var router = express.Router() //We bring in our necessary imports. Same as the tescontroller, just a User model now.
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var jwt = require('jsonwebtoken');

//Create User Endpoint: Starter
//We start our POST method for a creatuser endpoint
router.post('/createuser', function (req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password; //Inside the method, we have the basics for creating a new user and returning a message in the response.

    User.create({
        username: username,
        passwordhash: pass
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
module.exports = router;