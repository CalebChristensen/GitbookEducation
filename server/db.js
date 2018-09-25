const Sequelize = require('sequelize'); //Import the Sequelize package

const sequelize = new Sequelize('workoutlog', 'postgres', 'PostgresWolf1!', { // Create an instance of Sequelize for use in the module with the word sequelize. Then we use the constructor to create a new Sequelize object. Identify the db table to connect to "WORKOUTLOG", the username "postgres" and the password for the local db " LetMeIn1234"
    host: 'localhost', //The host points to the local port for Sequelize. This is 5432
    dialect: 'postgres' //Identify the QL dialect being used. Could be MSSQL, SQLLite, or others.
});

sequelize.authenticate().then( //Use the sequelize variable to access methods. Then we call the Aunthenticate() method. Authenticate requires a promise so (.then)
    function() { //fire a function that shows we are connected
        console.log('Connected to workoutlog postgres database');
    },
    function(err) { //fire an error if there are any errors
        console.log(err);
    }
);

module.exports = sequelize //export the module.