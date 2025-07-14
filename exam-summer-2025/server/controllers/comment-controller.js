import models from '../models/index.js';

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await models.Comment.findAll({
      where: { postId },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['username']
        }
      ],
      order: [['createdAt', 'ASC']] // Ordine cronologică
    });
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error in getComments:', err);
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    
    if (!content || content.trim() === '' || content.length > 500) {
      return res.status(400).json({ message: 'Invalid comment content' });
    }

    const comment = await models.Comment.create({
      content,
      userId: req.user.id,
      postId
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error('Error in addComment:', err);
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await models.Comment.findOne({
      where: { id: commentId },
      include: [
        {
          model: models.Post,
          as: 'post',
          attributes: ['userId']
        }
      ]
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Securizare: doar autorul comentariului sau autorul postării poate șterge
    if (comment.userId !== req.user.id && comment.post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.destroy();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error in deleteComment:', err);
    next(err);
  }
};

export default {
  getComments,
  addComment,
  deleteComment
};