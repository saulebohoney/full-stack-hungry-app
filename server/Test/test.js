'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const faker = require('faker');

const {TEST_DATABASE_URL} = require('../config');
const {User} = require('../models');
const {closeServer, runServer, app} = require('../server');
chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase().then(result => resolve(result)).catch(err => reject(err));
  });
}

const USER = {
  name: faker.name.firstName(),
  nevers: [faker.lorem.words]
};

function seedUser() {
  const newUser = {
    name: USER.name,
    nevers: USER.nevers
  };
  return User.create(newUser);
}

describe('Testing root endpoint', function() {
  it('should verify you hit root url', function() {
    return chai.request(app).get('/api').then(res => {
      res.should.be.status(200);
    });
  });
});

describe('User API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return Promise.all([seedUser()]);
  });

  afterEach(function() {
    // tear down database so we ensure no state from this test
    // effects any coming after.
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('Get endpoint for restaurants', function() {
    it('should return all restaurants searched for', function() {
      let res;
      return chai.request(app).get('/api/restaurants').then(_res => {
        res = _res;
        res.should.be.status(200);
        res.body.length.should.be.at.least(1);
      });
    });
  });

  it('should add a never to nevers list', function() {
    const updateNever = {
      nevers: ['something']
    };

    return chai.request(app).get('/api/restaurants').then(_res => {
      _res.should.be.status(200);
      _res.body.length.should.be.at.least(1);
      return User.findOne().then(resUser => {
        return chai.request(app).post(`/api/users/${resUser._id}/nevers`).send({
          nevers: [_res.body[0].id]
        });
      }).then(resRest => {
        resRest.should.have.status(201);
        resRest.should.be.a('object');

      })
    })
  });

  // it('should filter out restaurants in nevers list', function(){
  //   let arr = []
  //   let res;
  //   return chai
  //     .request(app)
  //     .get('/api/restaurants')
  //     .then(_res => {
  //       res = _res;
  //       res.should.be.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('array');
  //       res.body.length.should.be.at.least(1);
  //     });
  // });

});
