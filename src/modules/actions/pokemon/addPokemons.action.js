import ActionTypes from '../action-types';

// actions
const addNewPokemons = (pokemons) => {
  return {
    type: ActionTypes.ADD_NEW_POKEMONS,
    payload: pokemons
  }
}

export default addNewPokemons;
