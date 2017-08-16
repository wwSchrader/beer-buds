var searchRoute = require('../routes/search.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
var should = require('chai').should();

var server = require('../app.js');

chai.use(chaiHttp);


describe("Server Test", function() {
    describe("Get Search Results from Yelp", function() {
        it("Get list search results from Yelp GET", function(done) {
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
            })
        })
    });

});