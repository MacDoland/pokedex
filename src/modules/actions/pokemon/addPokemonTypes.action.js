import ActionTypes from '../action-types';

// actions
const addPokemonTypes = (value) => {
  return {
    type: ActionTypes.SET_POKEMON_TYPES,
    payload: value
  }
}

export default addPokemonTypes;
