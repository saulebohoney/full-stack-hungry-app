'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
//const faker = require('faker');

chai.use(chaiHttp);

const {app} = require('../server');


const {DATABASE_URL} = require('../config');
const {Show} = require('../models');
const {closeServer, runServer} = require('../server');
//const {TEST_DATABASE_URL} = require('../config');


function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}
describe('Show API resource', function () {

    before(function() {
        return runServer();
    });

    beforeEach(function() {
        return seedShowData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });

    describe('access root', function() {
        it('should return 200 and html', function() {
            return chai.request(app)
          .get('/')
          .then(function(res) {
              res.should.have.status(200);
              res.should.be.html;
          });
        });
    });
});

