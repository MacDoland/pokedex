import ActionTypes from '../actions/action-types';
import { filterByRange, filterByType } from '../filters/filters';

const defaultState = {
  collection: [],
  minRange: 1,
  maxRange: 807,
  pokemonStartIndex: 1,
  pokemonEndIndex: 807,
  types: [],
  filteredTypes: []
};

const getFilteredPokemonSelector = (state) => {
  let items = [];

  if(Array.isArray(state.pokemon.collection)){
    items = state.pokemon.collection.slice();
    items = filterByType(items, state.pokemon.filteredTypes);
    items = filterByRange(items, state.pokemon.maxRange);
  }
  
  return items;
}

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
    case ActionTypes.TOGGLE_TYPE_FILTER:
      let filteredTypes = state.filteredTypes.slice();

      if(filteredTypes.includes(action.payload)){
        filteredTypes = filteredTypes.filter((type) => type != action.payload);
      }
      else{
        filteredTypes.push(action.payload);
      }

      return {
        ...state,
        filteredTypes: filteredTypes
      }
    default:
      return {
        ...state,
        collection: []
      }
  }
};

export { pokemonReducer, getFilteredPokemonSelector };