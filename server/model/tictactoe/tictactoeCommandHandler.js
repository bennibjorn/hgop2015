var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']],
  };

  const winCondition = function(currentTurn, x, y) {
      var b = gameState.board;
      b[x][y] = currentTurn;
      for (var i = 0; i < 3; i++) {
          if (b[i][0] === currentTurn && b[i][1] === currentTurn && b[i][2] === currentTurn) {
              return true;
          }
          if (b[0][i] === currentTurn && b[1][i] === currentTurn && b[2][i] === currentTurn) {
              return true;
          }
      }
      // diagonal
      if ((b[0][0] === currentTurn && b[1][1] === currentTurn && b[2][2] === currentTurn) ||
          (b[0][2] === currentTurn && b[1][1] === currentTurn && b[2][0] === currentTurn)) {
               return true;
      } else {
          // no winning move
          return false;
      }

  };

  const drawCondition = function() {
      for (var i = 0; i < 3; i++) {
          for (var u = 0; u < 3; u++) {
              if (gameState.board[i][u] === '') {
                  return false;
              }
          }
      }
      return true;
  };

  var eventHandlers={
    'MoveMade': function(event){
        gameState.board[event.x][event.y] = event.side;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          userName: cmd.userName,
          name: cmd.name,
          timeStamp: cmd.timeStamp,
        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function(cmd){
      if(gameState.board[cmd.x][cmd.y]!=='' ||
         (events[events.length-1].event === "MoveMade" &&
          events[events.length-1].side !== cmd.side)){
        return [{
          id: cmd.id,
          event: "IllegalMove",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }
      var e = [{
          id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
      }];
      if (winCondition(cmd.side, cmd.x, cmd.y)) {
            e.push({
              id: cmd.id,
              event: "GameWon",
              userName: cmd.userName,
              name:gameState.gameCreatedEvent.name,
              side:cmd.side,
              timeStamp: cmd.timeStamp
          });
        } else if (drawCondition()) {
          e.push({
              id: cmd.id,
              event: "Draw",
              name:gameState.gameCreatedEvent.name,
              timeStamp: cmd.timeStamp
          })
        }

        return e;
    }
  };

  return {
    executeCommand: function (cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};
