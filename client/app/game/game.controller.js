'use strict';

angular.module('tictactoeApp')
  .controller('GameCtrl', function ($scope, $http, $stateParams) {
    $scope.nickName = '';
    $scope.gameName = '';
    $scope.gameId = '';
    $scope.board = [['','',''],['','',''],['','','']];

    var getGameHistory = function() {
        $http.get('/api/gameHistory/' + $scope.gameId).success(function(res) {
            $scope.gameHistory = res;
            console.log(res);
        });
    };

    $scope.makeMove = function(bx, by) {
        console.log('x = ' + bx + ', y = ' + by);
    };

    function init() {
        $scope.gameId = $stateParams.gameId;
        console.log($scope.gameId);
        getGameHistory();

    }
    init();

  });
