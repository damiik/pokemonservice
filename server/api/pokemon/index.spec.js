'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

//added by Dario for additional tests
var app = require('../../app');
var request = require('supertest');
var Pokemon = require('./pokemon.model');



var pokemonCtrlStub = {
  index: 'pokemonCtrl.index',
  show: 'pokemonCtrl.show',
  create: 'pokemonCtrl.create',
  update: 'pokemonCtrl.update', 
  destroy: 'pokemonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pokemonIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './pokemon.controller': pokemonCtrlStub
});

describe('Pokemon API Router:', function() {

  it('should return an express router instance', function() {
    pokemonIndex.should.equal(routerStub);
  });

  describe('GET /api/pokemons', function() {

    it('should route to pokemon.controller.index', function() {
      routerStub.get
        .withArgs('/', 'pokemonCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/pokemons/:id', function() {

    it('should route to pokemon.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'pokemonCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/pokemons', function() {

    it('should route to pokemon.controller.create', function() {
      routerStub.post
        .withArgs('/', 'pokemonCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/pokemons/:id', function() {

    it('should route to pokemon.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'pokemonCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/pokemons/:id', function() {

    it('should route to pokemon.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'pokemonCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/pokemons/:id', function() {

    it('should route to pokemon.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'pokemonCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

//////////////////////////////////////////////////////////////////////////////////////////
describe('Pokemon Model (by Dario)', function() {

  describe('.isValidName', function() { 

    it('should return false for an empty string', function( done ) {

      assert.equal(Pokemon.isValidName(''), false);
      done();
    });
  });
});


describe('GET /api/pokemons  (by Dario)', function() {

  it('should respond with JSON array', function( done ) {

    request(app)
    .get('/api/pokemons')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if(err) return done(err);
      res.body.should.be.instanceof(Array);
      done();
    });
  });
});