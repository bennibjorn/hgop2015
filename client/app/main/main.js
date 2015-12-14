'use strict';

angular.module('tictactoeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('game', {
          url: '/:gameId',
          templateUrl: 'app/game/game.html',
          controller: 'GameCtrl'
      });
  });
