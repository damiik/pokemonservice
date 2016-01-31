'use strict';

angular.module('angularfull2App')
  .controller('PokedexCtrl', function ($scope, pokemonService, $location) {
  	$scope.pokemonService = pokemonService;
  	pokemonService.getAllPokemons();

  	$scope.viewPokemon = function (pokemon) {
  		pokemonService.getPokemon(pokemon._id);
  		$location.path('/' + pokemon._id);
  	};

  	$scope.deletePokemon = function () {
  		pokemonService.deletePokemon(pokemonService.currPokemon._id);
  		$location.path('/');
  	};

  	$scope.newPokemon = { name: '', picture: '', description: '' };

  	$scope.addPokemon = function () {
  		pokemonService.createPokemon($scope.newPokemon);
  		$scope.newPokemon = { name: '', picture: '', description: '' };
  	};
  });