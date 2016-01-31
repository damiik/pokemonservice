/**
 * Pokemon model events
 */

'use strict';

import {EventEmitter} from 'events';
var Pokemon = require('./pokemon.model');
var PokemonEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PokemonEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Pokemon.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PokemonEvents.emit(event + ':' + doc._id, doc);
    PokemonEvents.emit(event, doc);
  }
}

export default PokemonEvents;
