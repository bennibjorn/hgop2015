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
    });
    describe('on previous move', function() {
        it('should return IllegalMove on placing move in same place', function() {
            given.push({
                id: "13375",
                event: "MoveMade",
                userName: "Benni",
                name: "TicGame",
                x: 0,
                y: 0,
                side: "X",
                timeStamp: "2015.12.09T11:08:00"
            });

            when = {
                id: "13375",
                comm: "MakeMove",
                userName: "Benni",
                x: 0,
                y: 0,
                side: "X",
                timeStamp: "2015.12.09.T11:10:00"
            };

            then = [{
                id: "13375",
                event: "IllegalMove",
                userName: "Benni",
                name: "TicGame",
                x: 0,
                y: 0,
                side: "X",
                timeStamp: "2015.12.09.T11:10:00"
            }];
        });
    });
    describe('on game ending move', function() {
        it('should return game won on a vertical line', function() {
            given.push({
                id: "13375",
                event: "MoveMade",
                userName: "Benni",
                name: "TicGame",
                x: 0,
                y: 0,
                side: "X",
                timeStamp: "2015.12.09T11:08:00"
            });
            given.push({
                id: "13375",
                event: "MoveMade",
                userName: "Benni",
                name: "TicGame",
                x: 0,
                y: 1,
                side: "X",
                timeStamp: "2015.12.09T11:08:01"
            });
            when = {
                id: "13375",
                comm: "MakeMove",
                userName: "Benni",
                x: 0,
                y: 2,
                side: "X",
                timeStamp: "2015.12.09.T11:10:02"
            };
            then = [{
                id: "13375",
                event: "MoveMade",
                userName: "Benni",
                name: "TicGame",
                x: 0,
                y: 2,
                side: "X",
                timeStamp: "2015.12.09T11:08:02"
            },
            {
                id: "13375",
                event: "GameWon",
                userName: "Benni",
                name: "TicGame",
                side: "X",
                timeStamp: "2015.12.09.T11:10:02"
            }];
        });
    });
});
