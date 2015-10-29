module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      // associate: function(models) {
      //   User.belongsTo(models.P);
      // }
    }
  });

  return User;
};