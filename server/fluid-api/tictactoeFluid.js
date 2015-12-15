var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(userApi) {
  var _expectedEvents=[{
    "id": "1234",
    "gameId": userApi._command.gameId,
    "event": "EventName",
    "userName": userApi._command.userName,
    "name": userApi._command.gameId,
    "timeStamp": "2015-12-15T11:29:29"
  }];
  var _currentEvent = 0;
  var expectApi = {
    withName: function (gameName) {
      _expectedEvents[_currentEvent].name = gameName;
      return expectApi;
    },
    expect: function (eventName) {
      _expectedEvents[_currentEvent].event = eventName;
      return expectApi;
    },
    isOk: function (done) {
      var req = request(acceptanceUrl);
      req
        .post('/api/createGame')
        .type('json')
        .send(userApi._command)
        .end(function (err, res) {
          if (err) return done(err);
          request(acceptanceUrl)
            .get('/api/gameHistory/' + userApi._command.gameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body).eql(
                _expectedEvents);
              done();
            });
        });
      return expectApi;
    },
  };

  return expectApi;
}

function user(_userName) {
  var userApi = {
    _command: undefined,
    createsGame: function (gameId) {
      userApi._command = {
        id: "1234",
        gameId: gameId,
        comm: "CreateGame",
        userName: _userName,
        name: gameId,
        timeStamp: "2015-12-15T11:29:29"
      };
      return userApi;
    },
    withId : function(gameId){
      userApi._command.gameId = gameId;
      return userApi;
    },
    joinsGame: function(gameId) {
        userApi._command = {
          id: "1234",
          gameId: gameId,
          comm: "JoinGame",
          userName: _userName,
          name: gameId,
          timeStamp: "2015-12-15T11:29:29"
        };
        return userApi;
    },
    makesMove: function(_x, _y, _side) {
        userApi.command = {
            id : "123",
            gameId : "1",
            comm: "MakeMove",
            userName: _userName,
            x: _x,
            y: _y,
            side: _side,
            timeStamp: "2015-12-15T11:29:29"
        }
        return userApi;
    }
  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
