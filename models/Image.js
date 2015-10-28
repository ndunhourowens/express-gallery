module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task);
      }
    }
  });

  return User;
};