const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const getUsers = require('./controllers/getUsers');
const signIn = require('./controllers/signIn');
const entries = require('./controllers/entries');
const profile = require('./controllers/profile');
const getFace = require('./controllers/getFace');
const Clarifai = require('clarifai');

const face = new Clarifai.App({
  apiKey:'7d3658a13db24729ba7820a7d3ff8e2f'
})




const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-slippery-94327',
    user : 'john127',
    password : 'love0421',
    database : 'smart-brain-data'
  }
});


const app = express();

app.use(cors())
app.use(express.json());

const database = {
  users: [
    {
      id:'123',
      name:'John',
      email:'kangan987@gmail.com',
      password:'bestman',
      entries:0,
      joined: new Date()
    },
    {
      id:'124',
      name:'Chiu',
      email:'Chiu@gmail.com',
      password:'bestwoman',
      entries:0,
      joined: new Date()
    }
  ],
  login: [
    {
      id:'987',
      hash:'',
      email:'john@gmail.com'
    }
  ]
}

app.post('/getbox',getFace.handleGetFace(face))

app.get('/', (req, res) => { 
  // getUsers.handleGetUsers(req, res, db)
  res.send('it is working');
});

app.post('/signin',signIn.handleSignIn(db, bcrypt)
)

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})


app.put('/image', (req, res,) => {
  entries.handleEntries(req, res, db)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db);
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running ${process.env.PORT}`);
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/