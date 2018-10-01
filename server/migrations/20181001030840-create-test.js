'use strict';
module.exports = { //We export the migration so that Sequelize has access to it.
  up: (queryInterface, Sequelize) => {  //The up function is called when we run the migration.
    return queryInterface.createTable('tests', { //This contains the table we're altering, as well as the changes being made.
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      testdata: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => { // You can undo migrations to return the database to a previous point in time. When you undo (or revert) your changes, teh down function is called.
    return queryInterface.dropTable('tests'); //This is almost always undoing the action from the up function.
  }
};