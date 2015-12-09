'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/gameHistory', function () {

  it('should respond with JSON array with created events for game', function (done) {
    var command =     {
      id : "1337",
      gameId : "999",
      comm: "CreateGame",
      userName: "Benni",
      name: "TicGame",
      timeStamp: "2015-12-09T11:32:00"
    };

    var req = request(app);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
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
                "timeStamp": "2015-12-09T11:32:00"
              }]);
            done();
          });
      });
  });
});
