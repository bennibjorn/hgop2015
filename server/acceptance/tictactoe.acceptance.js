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
     given(user("Benni").createsGame("TicGame").withId("1"))
     .expect("GameCreated").withName("TicGame").withId("1").isOk(done);
   });

   it('Should play one move', function(done) {
       given(user("Benni").createsGame("TicGame2").withId(2))
        .and(user("Benjamin").joinsGame("TicGame2").withId(2))
        .and(user("Benni").makesMove(0,0, "X").withId(2))
        .expect("MoveMade").withName("TicGame2").withId(2).withUser("Benni").isOk(done);
   });

   it('Should play until a player wins', function(done) {
        given(user("Benni").createsGame("TicGame3").withId(3))
        .and(user("Benjamin").joinsGame("TicGame3").withId(3))
        .and(user("Benni").makesMove(0, 0, "X").withId(3))
        .and(user("Benjamin").makesMove(1, 0, "O").withId(3))
        .and(user("Benni").makesMove(0, 1, "X").withId(3))
        .and(user("Benjamin").makesMove(2, 0, "O").withId(3))
        .and(user("Benni").makesMove(0, 2, "X").withId(3))
        .expect("GameWon").withName("TicGame3").withId(3).withUser("Benni").isOk(done);
    });
    /*
        Not working - TODO: fix
    it('Should play until draw', function(done) {
        /*
            x x o
            o x x
            x o o

        given(user("Benni")  .createsGame("TicGame4").withId(4))
        .and(user("Benjamin").joinsGame("TicGame4").withId(4))
        .and(user("Benni")   .makesMove(0, 0, "X").withId(4))
        .and(user("Benjamin").makesMove(0, 2, "O").withId(4))
        .and(user("Benni")   .makesMove(0, 1, "X").withId(4))
        .and(user("Benjamin").makesMove(1, 0, "O").withId(4))
        .and(user("Benni")   .makesMove(1, 1, "X").withId(4))
        .and(user("Benjamin").makesMove(2, 1, "O").withId(4))
        .and(user("Benni")   .makesMove(1, 2, "X").withId(4))
        .and(user("Benjamin").makesMove(2, 2, "O").withId(4))
        .and(user("Benni")   .makesMove(2, 0, "X").withId(4))
        .expect("Draw").withName("TicGame4").withId(4).isOk(done);
    });
    */

});
