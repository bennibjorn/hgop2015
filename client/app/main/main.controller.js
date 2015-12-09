'use strict';

angular.module('tictactoeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.nickName = '';
    $scope.res = [];
    $scope.gameName = '';
    $scope.gameID = '';
    $scope.gameHistory = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

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

  });
