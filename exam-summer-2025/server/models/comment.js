export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    content: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    }
  });

  // Asocieri
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Comment.belongsTo(models.Post, { as: 'post', foreignKey: 'postId' });
  };

  return Comment;
};