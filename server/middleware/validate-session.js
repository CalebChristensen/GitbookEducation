var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next()
    }else{
    var sessionToken = req.headers.authorization; //the variable sessionToken is created to hold the token, which is pulled from the authorization header of the request coming in
    console.log(sessionToken) //The token is printed to the console. This is purely for debugging purpses to verify that the token is being sent to the server.
    if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' }); //If no token is present, the 403 Forbidden error is returned as the response. We have several different error handlings responses in the file, so assiging each a different error code or message is a big help in debugging.
    else{ //No user property is ever provided in the request, so only tokens will get checked. This prevents unauthorized use of a token that was assigned to a different user.
        jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => { //The verify method decodes the token with the provided secret, then sends a callback with tw- variables. If successful, decoded will contain the decoded payload; if not, decoded remains undefined.err is null by default.
            if (decoded) {
                User.findOne({where: {id: decoded.id }}).then(user => { //if decoded has a value, the Sequelize findOne method looks for an id in the users table that matches the decoded.id property. This value is then passed into the callback.
                    req.user = user; //The call back set the user value for the request as the id value passed to it then sends the request on to its next destination. This property will be necessary later in adding to the database.
                    next();
                },
                function(){ //If no matching id is found, an error message is thrown.
                    res.status(401).send({error: 'Not authorized' });
                });
            } else { //If no value for decoded, an error message is thrown.
                res.status(400).send({error: 'Not authorized'});
            }
        });
    }
    }
}