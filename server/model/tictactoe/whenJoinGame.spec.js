var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

    var given, when, then;

    it('should join game',function(){
        given= [{
            id:"1337",
            event:"GameCreated",
            gameId: "1337",
            userName: "Benni",
            timeStamp: "2015.12.09T10:11:00"
        }];
        when={
            id:"13375",
            comm:"JoinGame",
            gameId: "1337",
            userName : "Slevin",
            name:"TicGame",
            timeStamp: "2015.12.09T10:15:00"
        };
        then=[{
            id:"13375",
            event:"GameJoined",
            gameId: "1337",
            userName: "Slevin",
            timeStamp: "2015.12.09T10:15:00"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should reject joining of a non-existing game',function(){
    given= [];
    when={
        id:"1337",
        comm:"JoinGame",
        userName : "Benni",
        name:"AGame",
        timeStamp: "2015.12.09T10:15:00"
    };
    then=[{
        id:"1337",
        event:"GameDoesNotExist",
        userName: "Benni",
        timeStamp: "2015.12.09T10:15:00"
    }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
