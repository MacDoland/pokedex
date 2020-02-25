import ActionTypes from '../action-types';

// actions
const setPokemonRange = (value) => {
  return {
    type: ActionTypes.SET_POKEMON_RANGE,
    payload: value
  }
}

export default changeMaxRange;