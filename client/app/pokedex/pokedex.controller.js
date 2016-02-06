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

  	$scope.updatePokemon = function () {

  		pokemonService.editPokemon(pokemonService.currPokemon);
  		$location.path('/' + pokemonService.currPokemon._id);
  	};

  	$scope.newPokemon = { name: '', picture: '', description: '' };

  	$scope.addPokemon = function () {
  		pokemonService.createPokemon($scope.newPokemon);
  		$scope.newPokemon = { name: '', picture: '', description: '' };
  	};


    $scope.goEditPokemon = function() {

    	console.log('edit pokemon:' + '/' + pokemonService.currPokemon._id + '/edit');
        $location.path('/' + pokemonService.currPokemon._id + '/edit');
    };

  });

