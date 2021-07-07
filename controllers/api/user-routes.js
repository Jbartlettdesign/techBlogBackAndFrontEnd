const router = require('express').Router();

const session = require('express-session');
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
        req.session.save(() => {
        
            req.session.user_id = dbUserData.dataValues.id;
            req.session.username = dbUserData.dataValues.username;
            req.session.loggedIn = true;
            
            console.log(req.session);
            res.json(dbUserData);
        
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/login', (req, res) => {
    User.findOne({
    where:{
        username: req.body.username
    }
})
.then(dbUserData => {
    if(!dbUserData){
        res.status(400).json({message:'No user with that username!'});
        return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if(!validPassword){
        res.status(400).json({message: 'Incorrect password!'});
        return;
    }
    if(dbUserData){
    req.session.save(()=> {
        req.session.user_id = dbUserData.dataValues.id;
        req.session.username = dbUserData.dataValues.username;
        req.session.loggedIn = true;

        res.json({user: dbUserData, message: 'You are now logged in!'});
        console.log("logged in", dbUserData.dataValues)
        });
    } 
    });
});
router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        console.log('logged in');
        req.session.destroy(() => {
            res.status(204).end();
           
        });
    }
    else{
        //res.status(404).end();
        console.log('not logged in');
    }
});
module.exports = router;