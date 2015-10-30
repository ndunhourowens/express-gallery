module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.User, {foreignKey: 'userId'});
      }
    }
  });

  return Photo;

};