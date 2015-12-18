var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;
var async = require('async');

function apiCommands(_cmd) {
    switch (_cmd) {
        case "CreateGame":
        return "createGame";
        case "JoinGame":
        return "joinGame";
        case "MakeMove":
        return "placeMove";
    }
}

function given(userApi) {
    var events = {
        "GameCreated": {
            id: "1234",
            event: "GameCreated",
            gameId: "999",
            userName: "Benni",
            name: "TicGame",
            timeStamp: "2015.12.09T10:15:01"
        },
        "GameJoined": {
            id: "1234",
            event: "GameJoined",
            gameId: "999",
            userName: "Benni",
            timeStamp: "2015.12.09T10:15:01"
        },
        "MoveMade": {
            id: "1234",
            event: "MoveMade",
            gameId: "999",
            userName: "Benni",
            name: "TicGame",
            x: 0,
            y: 0,
            side: "X",
            timeStamp: "2015.12.09T10:15:01"
        },
        "GameWon": {
            id: "1234",
            event: "GameWon",
            gameId: "999",
            userName: "Benni",
            name: "TicGame",
            side: "X",
            timeStamp: "2015.12.09T10:15:01"
        },
        "Draw": {
            id: "1234",
            event: "Draw",
            gameId: "999",
            name: "TicGame",
            timeStamp: "2015.12.09T10:15:01"
        }
    };

    var commands = [userApi._command];
    var expected = [];
    var expectApi = {
        withName: function (gameName) {
            expected[expected.length - 1].name = gameName;
            return expectApi;
        },
        withId: function(_gameId) {
            expected[expected.length - 1].gameId = _gameId;
            return expectApi;
        },
        withUser: function(user) {
            expected[expected.length - 1].userName = user;
            return expectApi;
        },
        expect: function (eventName) {
            expected.push(events[eventName]);
            return expectApi;
        },
        and: function(cmd) {
            commands.push(cmd._command);
            return expectApi;
        },
        isOk: function(done){
            async.eachSeries(commands, function(_cmd, callback) {
                request(acceptanceUrl)
                .post("/api/" + apiCommands(_cmd.comm))
                .type('json')
                .send(_cmd)
                .end(function(err, res) {
                    if (err) return done(err);
                    callback();
                });
            }, function(err) {
                request(acceptanceUrl)
                .get('/api/gameHistory/' + commands[0].gameId)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    should(res.body[res.body.length - 1]).match(expected[expected.length - 1]);
                    done();
                });
            });
        }
        };

        return expectApi;
    }

    function user(_userName) {
        var userApi = {
            _command: undefined,
            createsGame: function (gameName) {
                userApi._command = {
                    id: "1234",
                    gameId: "1",
                    comm: "CreateGame",
                    userName: _userName,
                    name: gameName,
                    timeStamp: "2015.12.09T10:15:01"
                };
                return userApi;
            },
            withId : function(gameId){
                userApi._command.gameId = gameId;
                return userApi;
            },
            joinsGame: function(gameName) {
                userApi._command = {
                    id: "1234",
                    gameId: "1",
                    comm: "JoinGame",
                    userName: _userName,
                    name: gameName,
                    timeStamp: "2015.12.09T10:15:01"
                };
                return userApi;
            },
            makesMove: function(_x, _y, _side) {
                userApi._command = {
                    id : "1234",
                    gameId : "1",
                    comm: "MakeMove",
                    userName: _userName,
                    x: _x,
                    y: _y,
                    side: _side,
                    timeStamp: "2015.12.09T10:15:01"
                }
                return userApi;
            }
        };
        return userApi
    }

    module.exports.user = user;
    module.exports.given = given;
