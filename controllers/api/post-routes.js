const router = require('express').Router();

const{User, Post, Comment} = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes:[
            'id',
            'title',
            'content',
            'created_at'
        ],
        include:[
            {
                model:User,
                attributes:['username']
            }
        ]
})
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Post.create({
        title:req.body.title,
        content: req.body.content,
        user_id:req.body.user_id
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;