var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
    var given, when, then;

    it('should create game',function(){
        given = [];
        when = {
            id: "1337",
            comm: "CreateGame",
            userName: "Benni",
            name: "TicGame",
            timeStamp: "2015.12.09T10:00:00"
        };
        then = [{
            id: "1337",
            event: "GameCreated",
            userName: "Benni",
            name: "TicGame",
            timeStamp: "2015.12.09T10:00:00"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should create game with another user another time',function(){
        given = [];
        when = {
            id: "13375",
            gameId: "0",
            comm: "CreateGame",
            userName: "Benni",
            name: "TicGame",
            timeStamp: "2015.12.09.T10:32:00"
        };
        then = [{
            id: "13375",
            gameId: "0",
            event: "GameCreated",
            userName: "Benni",
            name: "TicGame",
            timeStamp: "2015.12.09.T10:32:00"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
