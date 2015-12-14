'use strict';

angular.module('tictactoeApp')
  .controller('MainCtrl', function ($scope, $http, $location) {
    $scope.nickName = '';
    $scope.res = [];
    $scope.gameName = '';
    $scope.gameID = '';
    $scope.joinGameId = '';
    $scope.gameHistory = [];

    $scope.getGameHistory = function() {
        $http.get('/api/gameHistory/' + $scope.gameID).success(function(res) {
            $scope.gameHistory = res;
        });
    };

    $scope.createGame = function() {
        var data = {
            id: '1337',
            comm: 'CreateGame',
            userName: $scope.nickName,
            name: $scope.gameName,
            timeStamp: new Date()
        };
        $http.post('/api/createGame', data).success(function(res) {
            $scope.res = res;
            $scope.gameID = res.id;
            $scope.getGameHistory();
        });
    };
    $scope.joinGame = function() {
        var data = {
            id: $scope.joinGameId,
            comm: 'JoinGame',
            userName : 'Slevin',
            name: $scope.gameName,
            timeStamp: new Date()
        };
        $http.post('/api/joinGame', data). success(function(res) {
            console.log(res);
            console.log('joining game');
            $location.path('/' + $scope.joinGameId);
        });
    };

  });
