'use strict';

angular.module('angularfull2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pokedex', {
        url: '/',
        templateUrl: 'app/pokedex/pokedex.html',
        controller: 'PokedexCtrl'
      })
      .state('pokedex.add', {
      	url: 'add',
      	controller: 'PokedexCtrl',
      	views: {
        	'pokedex-content': { templateUrl: 'app/pokedex/pokedex.add.html' }
        }
      })
      .state('pokedex.view', {
      	url: ':name',
      	controller: 'PokedexCtrl',
      	views: {
      		'pokedex-content': { templateUrl: 'app/pokedex/pokedex.view.html' }
      	}
      })
      .state('pokedex.edit', {
      	url: ':name/edit',
      	controller: 'PokedexCtrl',
      	views: {
        	'pokedex-content': { templateUrl: 'app/pokedex/pokedex.edit.html' }
        }
      });
  });
