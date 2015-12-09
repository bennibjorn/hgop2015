var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function(){

    var given, when, then;

    beforeEach(function() {
        given = [{
            id: "1337",
            event: "GameCreated",
            name: "TicGame",
            userName: "Benni",
            timeStamp: "2015.12.09T10:15:00"
        }, {
            id: "13375",
            event: "GameJoined",
            userName: "Benni",
            otherUserName: "Slevin",
            timeStamp: "2015.12.09T10:15:01"
        }];
    });

    describe('on new game', function() {
        it('should join game', function() {
            when = {
                id: "13375",
                comm: "MakeMove",
                userName: "Benni",
                name: "TicGame",
                x: 0,
                y: 0,
                side: "X",
                timeStamp: "2015.12.09T10:15:02"
            };
            then = [{
                id: "13375",
                event: "MoveMade",
                userName: "Benni",
                name: "TicGame",
                x: 0,
                y: 0,
                side: "X",
                timeStamp: "2015.12.09T10:15:02"
            }];

            var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

            JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
        })
    })
});
