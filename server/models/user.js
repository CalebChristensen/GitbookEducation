module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', { // A function with a Sequelize object that calls the define method. First parameter that will create a users table in Postgres.
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING //An object with username and passwordhash that will be the columns in the table.
    });
};