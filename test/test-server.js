const searchRoute = require('../routes/search.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const should = require('chai').should();
const mongoose = require('mongoose');

const server = require('../app.js');
const Bar = require('../models/bar');
const User = require('../models/user');

chai.use(chaiHttp);

describe('Server Test', function() {
  describe('Get Search Results from Yelp', function() {
    it('Get list search results from Yelp GET', function(done) {
      chai.request(server)
      .get('/api/search')
      .end(function(err, res) {
        res.res.body[0].should.be.a('Object');
        res.res.body[0].should.have.property('id');
        res.res.body[0].should.have.property('name');
        res.res.body[0].should.have.property('image_url');
        res.res.body[0].should.have.property('url');
        res.res.body[0].should.have.property('rating');
        res.res.body[0].id.should.be.a('String');
        res.res.body[0].name.should.be.a('String');
        res.res.body[0].image_url.should.be.a('String');
        res.res.body[0].url.should.be.a('String');
        res.res.body[0].rating.should.be.a('number');
        done();
      });
    });
  });

  describe('Test the database', function() {
    beforeEach(function(done) {
    const newBar = new Bar({
        barId: 'Average-Bar',
        usersGoing: ['John Smith', 'Abe Lincoln', 'George Washington'],
      });
      newBar.save(function(err) {
        if (err) {
          console.log(err);
        }
        done();
      });
    });

    afterEach(function(done) {
      Bar.collection.drop();
      done();
    });

    it('Add bar and/or vote to database PUT', function(done) {
      chai.request(server)
      .put('/api/vote/add')
      .send({barId: 'best-bar-in-the-world', usersGoing: 'warren'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('barId');
        res.body.SUCCESS.should.have.property('usersGoing');
        res.body.SUCCESS.barId.should.be.a('String');
        res.body.SUCCESS.usersGoing.should.be.a('Array');
        done();
      });
    });

    it('Decrease vote UPDATE', function(done) {
      chai.request(server)
      .put('/api/vote/decreasevote')
      .send({barId: 'Average-Bar', usersLeaving: 'Abe Lincoln'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('UPDATED');
        res.body.UPDATED.should.be.a('object');
        res.body.UPDATED.should.have.property('barId');
        res.body.UPDATED.should.have.property('usersGoing');
        res.body.UPDATED.usersGoing.should.be.a('Array');
        res.body.UPDATED.usersGoing[0].should.equal('John Smith');
        res.body.UPDATED.usersGoing[1].should.equal('George Washington');
        done();
      });
    });
  });

  describe('Test User Authentication', function() {
    User.collection.drop((err) => {
      if (err) {
        if (err.code !== 26) {
          console.log(err);
        } else {
          // Ignore the ns not found error message
        }
      }
    });

    // Seed database with a user
    beforeEach(function(done) {
      let newUser = new User({
        username: 'firstuser@anywhere.com',
        password: 'ungessablepassword999',
      });

      newUser.save(function(err) {
        done();
      });
    });

    afterEach(function(done) {
      User.collection.drop();
      done();
    });

    it('Add user to database', function(done) {
      chai.request(server)
      .put('/api/users/register')
      .send({
        username: 'useremail@somewhere.com',
        password: 'password123',
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('REGISTERED');
        res.body.REGISTERED.should.be.a('String');
        res.body.REGISTERED.should.equal('COMPLETE');
        done();
      });
    });

    it('Reject user to database since it already exists', function(done) {
      chai.request(server)
      .put('/api/users/register')
      .send({
        username: 'firstuser@anywhere.com',
        password: 'ungessablepassword999',
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('REGISTERED');
        res.body.REGISTERED.should.be.a('String');
        res.body.REGISTERED.should.equal('User is already registered.');
        done();
      });
    });
  });
});
