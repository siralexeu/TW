import Sequelize from 'sequelize'
import createUserEntity from './user.js'
import createSubscriptionEntity from './subscription.js'
import createPostEntity from './post.js'
import createCommentEntity from './comment.js'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logQueryParameters: true
})

const User = createUserEntity(sequelize, Sequelize)
const Subscription = createSubscriptionEntity(sequelize, Sequelize)
const Post = createPostEntity(sequelize, Sequelize)
const Comment = createCommentEntity(sequelize, Sequelize)

Subscription.belongsTo(User, {
  foreignKey: 'subscribedId',
  as: 'subscribed'
})

Subscription.belongsTo(User, {
  foreignKey: 'subscriberId',
  as: 'subscriber'
})

User.hasMany(Subscription, {
  foreignKey: 'subscribedId',
  as: 'subscribers'
})

User.hasMany(Subscription, {
  foreignKey: 'subscriberId',
  as: 'subscriptions'
})

Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts'
})

Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});
Comment.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post'
});
Post.hasMany(Comment, {
  foreignKey: 'postId',
  as: 'comments'
});
User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments'
});

try {
  await sequelize.sync()
} catch (err) {
  console.warn(err)
}

export default {
  sequelize,
  User,
  Subscription,
  Post,
  Comment
}
