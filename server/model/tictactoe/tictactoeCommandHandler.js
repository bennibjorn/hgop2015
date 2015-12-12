'use strict';

var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']],
  };

  const winCondition = (currentTurn) => {
      console.log("checking win condition");
      // vertical/horizontal win check
      let b = gameState.board;
      for (let i = 0; i < 3; i++) {
          let g = 0;
          // horizontal
          if (b[i][g] === currentTurn && b[i][g+1] === currentTurn && b[i][g+2] === currentTurn) {
              return true;
          }
          // vertical
          if (b[g][i] === currentTurn && b[g+1][i] === currentTurn && b[g+2][i] === currentTurn) {
              console.log("checking board[" + g + "][" + b + "]");
              console.log("vertical winning move");
              return true;
          }
      }
      // diagonal
      if ((b[0][0] === currentTurn && b[1][1] === currentTurn && b[2][2] === currentTurn) ||
           b[0][2] === currentTurn && b[1][1] === currentTurn && b[2][0] === currentTurn) {
               return true;
      } else {
          console.log("no game winning move, returning false");
          return false;
      }

  };

  const drawCondition = () => {
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
          otherUserName: gameState.gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function(cmd){
      if(gameState.board[cmd.x][cmd.y]!==''){
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
      }]
      if (winCondition(cmd.side)) {
            e.push([{
              id: cmd.id,
              event: "GameWon",
              userName: cmd.userName,
              name:gameState.gameCreatedEvent.name,
              side:cmd.side,
              timeStamp: cmd.timeStamp
            }])
        } else if (drawCondition()) {
          e.push([{
              id: cmd.id,
              event: "Draw",
              name:gameState.gameCreatedEvent.name,
              timeStamp: cmd.timeStamp
          }])
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
