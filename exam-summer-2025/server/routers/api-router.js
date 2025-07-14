import express from 'express'
import controllers from '../controllers/index.js'
import middleware from '../middleware/index.js'

const apiRouter = express.Router()

apiRouter.use(middleware.auth)

apiRouter.get('/users', controllers.user.suggestUser)

apiRouter.get('/subscriptions', controllers.subscription.getSubscriptions)
apiRouter.post('/subscriptions', controllers.subscription.subscribe)
apiRouter.delete('/subscriptions/:subscriptionId', controllers.subscription.unsubscribe)

apiRouter.get('/posts', controllers.post.getPosts)
apiRouter.post('/posts', controllers.post.createPost)
apiRouter.delete('/posts/:postId', controllers.post.deletePost)

apiRouter.get('/posts/:postId/comments', controllers.comment.getComments);
apiRouter.post('/posts/:postId/comments', controllers.comment.addComment);
apiRouter.delete('/comments/:commentId', controllers.comment.deleteComment);

export default apiRouter
