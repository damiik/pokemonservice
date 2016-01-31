'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PokemonSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String
});

// Added by Dario
PokemonSchema.statics.isValidName = function(name) {

	if( name ) return true;

	return false;
}


export default mongoose.model('Pokemon', PokemonSchema);
