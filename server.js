const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
/////allow us to use public folder/css/js
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
////////////////////////////////////
///////////////////////////////////////
//connetcion to sequelize

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Mysecret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db:sequelize
    })
};
app.use(session(sess));
/////////////////////////////////
app.use(routes);
////////////////////////////////
//handlebars
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
///////////////////////////////////////////
//turn on connection to db
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
})