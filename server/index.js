'use strict';

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {User} = require('./models');
const app = express();
app.use(bodyParser.json());

// API endpoints go here!

//Get restaurnts from yelp API
app.get('/api/restaurants', (req, res) => {
  console.log(req.query);
  fetch(`https://api.yelp.com/v3/businesses/search?categories=restaurants&term=${req.query.term}&location=${req.query.location}`, {
    method: 'GET',
    headers:({
      'Authorization': 'Bearer KtlW_oSlueZ8eVkcl39DhwzQPmjKyIGvpJxTCjo9efXzEhLzBuwaTxCZ1gWjV8u5PTo0focL8Y-EzPcVIBfkhxNlUlPT8YFpJAgbRGTfpD89Die9frHRiApgsctjWXYx'
    })
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(yelpRes => {
    let restaurantList = yelpRes.businesses;
    //map through id in list X
    let rand = Math.floor(Math.random() * restaurantList.length);
    return res.json([restaurantList[rand]]);
  });
});

//show all users in database
app.get('/api/users', (req, res) => {
  User
    .find()
    .exec()
    .then(users => {
      res.json({
        users: users.map((users) => users.apiRepr())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

//add user to database
app.post('/api/users', (req, res) => {
  const requiredFields = ['name'];
  for(let i=0; i<requiredFields; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `Missing\`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  User.create({
    name: req.body.name
  })
    .then(users => {
      console.log(users);
      res.status(201).json(users.apiRepr());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

//add restaurant id's of rejected restaurants to the never list
app.post('/api/users/:id/nevers', (req, res) => {
  console.log(req.body.nevers);
  User
    .findByIdAndUpdate(req.params.id, {$push: {['nevers']:req.body.nevers}})
    .exec()
    .then(user => {
      res.status(204).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if(err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
