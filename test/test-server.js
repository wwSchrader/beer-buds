var searchRoute = require('../routes/search.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

var server = require('../app.js');

chai.use(chaiHttp);


describe("Server Test", function() {
    describe("Get Search Results from Yelp", function() {
        it("Get list search results from Yelp GET", function() {
            chai.request(server)
            .get('/api/search')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.have.property('jsonBody');
                res.jsonBody.should.be.json;
                res.jsonBody.should.have.property('businesses');
                res.jsonBody.businesses.should.be.a('array');
                res.jsonBody.businesses[0].should.be.json;
                res.jsonBody.businesses[0].should.have.property('id');
                res.jsonBody.businesses[0].should.have.property('name');
                res.jsonBody.businesses[0].should.have.property('image_url');
                res.jsonBody.businesses[0].should.have.property('url');
                res.jsonBody.businesses[0].should.have.property('ratings');
                res.jsonBody.businesses[0].id.should.be.a('String');
                res.jsonBody.businesses[0].name.should.be.a('String');
                res.jsonBody.businesses[0].image_url.should.be.a('String');
                res.jsonBody.businesses[0].url.should.be.a('String');
                res.jsonBody.businesses[0].ratings.should.be.a('int');
                done();
            })
        })
    });

});