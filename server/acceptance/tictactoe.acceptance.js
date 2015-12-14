'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
      id: "1337",
      gameId: "999",
      comm: "CreateGame",
      userName: "Benni",
      name: "TicGame",
      timeStamp: "2015-12-12T18:14:50"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1337",
                "gameId": "999",
                "event": "GameCreated",
                "userName": "Benni",
                "name": "TicGame",
                "timeStamp": "2015-12-12T18:14:50"
              }]);
            done();
          });
      });
  });


   it('Should execute fluid API test', function (done) {
     given(user("Benni").createsGame("TicGame"))
     .expect("GameCreated").withName("TicGame").isOk(done);
   });

});
