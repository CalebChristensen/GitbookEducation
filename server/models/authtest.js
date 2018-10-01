module.exports = function(sequelize, DataTypes) {
    return sequelize.define('authtestdata', {
        authtestdata: DataTypes.STRING, //Notice we will be providing two properties: authtestdata and owner. Think of authtestdata as a string like testData.
        owner : DataTypes.INTEGER //the owner is a number, a foreign key, that will point to a specific user on the users table.
    });
};