const router = require('express').Router();
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
});
router.get('/new-post', (req, res) => {
    res.render('new-post');
})
////////////////////////////////////////////
router.get('/post/edit/:id', (req, res) => {
    Post.findOne({
        where:{
            id:req.params.id
        },
        attributes:[
            'id',
            'title',
            'content',
            'created_at'
        ],
        include:[
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        const post = dbPostData.get({plain:true});
        res.render('edit-post',
        {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//////////////////////////////////////////
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where:{
            id:req.params.id
        },
        attributes:[
            'id',
            'title',
            'content',
            'created_at'
        ],
        include:[
            {
                model:Comment,
                attributes:['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
                include:{
                    model:User,
                    attributes:['username']
                }
            },
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        const post = dbPostData.get({plain:true});
        res.render('single-post',
        {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;