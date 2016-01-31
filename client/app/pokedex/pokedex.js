'use strict';

angular.module('angularfull2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pokedex', {
        url: '/pokedex',
        templateUrl: 'app/pokedex/pokedex.html',
        controller: 'PokedexCtrl'
      });
  });
