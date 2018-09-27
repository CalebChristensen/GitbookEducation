require('dotenv').config();

const express = require('express'); //enables us to use express by saying the variable 'express'.
const app = express(); //automatically runs express when we open the file

const pie = require('./controllers/piecontroller')
const user = require('./controllers/usercontroller')
const sequelize = require('./db') // all root info of sequelize will be in our ./db
const bodyParser = require('body-parser')

sequelize.sync();
//sequelize.sync({ force: true });

app.use(bodyParser.json())

app.use(require('./middleware/headers'))

app.use(express.static(__dirname + '/public')) //dirname is a built in for node server that pinponts the location of your current directory.

app.get('/', (req, res) => res.render('index'))

app.use('/pies', pie)
app.use('/auth', user)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}.`)) //This is a callback function. A function Method (.listen) called inside a function.