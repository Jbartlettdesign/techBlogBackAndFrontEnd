const router = require('express').Router();

const{User, Post, Comment} = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes:[
            'id',
            'user_id',
            'post_id',
            'comment_text',
            'createdAt'
            
            
        ],
    }).then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/', (req, res) => {
    Comment.create({
        user_id:req.session.user_id,
        post_id:req.body.post_id,
        comment_text:req.body.comment_text
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
        //400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error
    })
})
module.exports = router;