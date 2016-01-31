'use strict';

describe('Controller: PokedexCtrl', function () {

  // load the controller's module
  beforeEach(module('angularfull2App'));

  var PokedexCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PokedexCtrl = $controller('PokedexCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
