require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config/config.json');

const api = express();
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.disable('x-powered-by');

api.use('/api', require('./routes/api/apiRouter'));
api.use('/oauth', require('./routes/oauth/oauthRouter'));
api.get('/*', (req, res) => {
    res.sendStatus(404);
});

api.listen(config.ports.API, () => {
    console.log(`Api live on port ${config.ports.API}!`);
});


const buildClientComponents = require('./utils/buildClientComponents');
const build = require('./utils/build');
const { MongoClient } = require('mongodb');
const db = new MongoClient(config.mongoUri, console.log('Connected to database!')).db('database').collection('admin');
const app = express();
app.disable('x-powered-by');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.send(build('home', { title: 'Home', oauthUri: process.env.OAUTH_URI })));
app.get('/dashboard', (req, res) => res.send(build('dashboard', { title: 'Dashboard', oauthUri: process.env.OAUTH_URI })));
app.get('/premium', (req, res) => res.send(build('premium', { title: 'Premium', oauthUri: process.env.OAUTH_URI })));
app.get('/*', (req, res) => res.send('<h1>404 - Not found!</h1><script>setTimeout(() => { window.open("/", "_self") }, 3000);</script>'))


app.listen(config.ports.APP, async () => {
    buildClientComponents(config.url);
    await db.findOneAndUpdate({ _id: '00000000-0000-0000-0000-000000000000' }, { '$set': { lastRestart: Date.now() }});
    console.log(`App live on port ${config.ports.APP}!`);
});