'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addColumn('tests', 'firstName', Sequelize.STRING) //This tells sequelize what table the new column needs to be entered in to, as well as what the new colun is. We use  Sequelize instead of DataTypers for this action. The down function should always undo the action of the up function so that changes can be undone properly. 
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeColumn('tests', 'firstName') //This simply removes the new column so that database can revert to its previous status.
  }
};
