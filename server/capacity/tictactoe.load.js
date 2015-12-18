var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 650 games in 10 seconds.', function (done) {
    var doneCount = 0;
    var gamesToPlay = 650;
    var x = 10;

    this.timeout(x * 1000);

    var QED = function () {
        if (gamesToPlay === ++doneCount) {
            done();
        }
    };

    for (var gameId = 0; gameId < gamesToPlay; gameId++) {
        given(user("Benni").createsGame("TicGame3").withId(gameId))
        .and(user("Benjamin").joinsGame("TicGame3").withId(gameId))
        .and(user("Benni").makesMove(0, 0, "X").withId(gameId))
        .and(user("Benjamin").makesMove(1, 0, "O").withId(gameId))
        .and(user("Benni").makesMove(0, 1, "X").withId(gameId))
        .and(user("Benjamin").makesMove(2, 0, "O").withId(gameId))
        .and(user("Benni").makesMove(0, 2, "X").withId(gameId))
        .expect("GameWon").withName("TicGame3").withId(gameId).withUser("Benni").isOk(QED);
    }
});
