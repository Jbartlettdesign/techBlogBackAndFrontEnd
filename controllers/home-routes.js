const router = require('express').Router();
const { ESRCH } = require('constants');
const session = require('express-session');
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

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
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render('homepage', {posts,
            loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
///////////////////////////////////
router.get('/dashboard', (req, res) => {
Post.findAll({
    where:{
        user_id:req.session.user_id
    },
    attributes:[
    'id',
    'title',
    'content',
    'user_id',
    'created_at'
    ],
    include:{
        model:User,
        attributes:['username']
    }

}).then(dbPostData => {
    const posts = dbPostData.map(post => post.get({plain: true}));
    res.render('dashboard', {posts,
        loggedIn: req.session.loggedIn})
})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
})
/////////////single view post by id next
module.exports = router;