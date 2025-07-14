import { Op, fn, col } from 'sequelize';
import models from '../models/index.js'

const getPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      filter = '',
    } = req.query;

    const whereClause = filter
      ? {
          content: {
            [Op.like]: `%${filter}%`,
          },
        }
      : {};

    const orderClause = [];
    if (sortBy === 'content') {
      orderClause.push([fn('length', col('content')), sortOrder.toUpperCase()]);
    } else {
      orderClause.push([sortBy, sortOrder.toUpperCase()]);
    }

    const posts = await models.Post.findAll({
      where: whereClause,
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['username'],
        },
      ],
      order: orderClause,
      limit: parseInt(pageSize, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
    });

    const totalCount = await models.Post.count({ where: whereClause });

    res.status(200).json({ posts, totalCount });
  } catch (err) {
    console.error('Error in getPosts:', err);
    next(err);
  }
};

const createPost = async (req, res, next) => {
    try {
        const { content } = req.body

        if (!content || content.trim() === '' || content.length > 500) {
            return res.status(400).json({ message: 'Post content cannot be empty or exceed 500 characters' })
        }

        const post = await models.Post.create({
            content,
            userId: req.user.id
        })

        res.status(201).json(post)
    } catch (err) {
        next(err)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await models.Post.findOne({ where: { id: req.params.postId, userId: req.user.id } })

        if (!post) {
            return res.status(404).json({ message: 'Post not found or not owned' })
        }

        await post.destroy()

        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (err) {
        next(err)
    }
}

export default {
    getPosts,
    createPost,
    deletePost
}
