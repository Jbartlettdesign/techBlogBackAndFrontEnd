const router = require('express').Router();

const{User, Post, Comment} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({})
    .then(dbUserData => 
        res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.post('/', (req, res) => {
    User.create({
        username:req.body.username,
        password:req.body.password
    }).then(dbUserData => {
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;