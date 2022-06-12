const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        order: [['created_at', 'DESC']]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }))
            // pass a single post object into the homepage template
            res.render('homepage', { posts })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;