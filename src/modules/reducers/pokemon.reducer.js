import ActionTypes from '../actions/action-types';

const defaultState = {
  collection: [],
  maxRange: 300,
  types: [],
  filteredTypes: []
};

const pokemonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_POKEMONS:
      return {
        ...state,
        collection: action.payload
      }
    case ActionTypes.CHANGE_MAX_RANGE:
      return {
        ...state,
        maxRange: action.payload
      }
    case ActionTypes.SET_POKEMON_TYPES:
      return {
        ...state,
        types: action.payload
      }
    default:
      return {
        ...state,
        collection: []
      }
  }
};

export default pokemonReducer;