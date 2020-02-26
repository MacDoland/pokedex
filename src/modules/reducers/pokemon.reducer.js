import ActionTypes from '../actions/action-types';
import PokeTree from '../data-structures/poketree';
import { filterByRange, filterByType } from '../filters/filters';
import mergeSort from '../sorts/merge.sort';

const defaultState = {
  collection: [],
  pokeTree: new PokeTree(),
  minRange: 1,
  maxRange: 807,
  pokemonStartIndex: 1,
  pokemonEndIndex: 807,
  types: [],
  filteredTypes: [],
  nameSearchString: '',
  sortSelection: { value: ActionTypes.SORT_ID_ASCENDING, label: 'pokemon number ascending' }
};

const getFilteredPokemonSelector = (state) => {
  let items = [];

  if (Array.isArray(state.pokemon.collection)) {
    items = state.pokemon.pokeTree.search(state.pokemon.nameSearchString).slice();
    items = filterByType(items, state.pokemon.filteredTypes);
    items = filterByRange(items, state.pokemon.maxRange)
    items = mergeSort(items, (item) => item.id, (a, b) => a < b);
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
    case ActionTypes.ADD_POKETREE:
      return {
        ...state,
        pokeTree: action.payload
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

      if (filteredTypes.includes(action.payload)) {
        filteredTypes = filteredTypes.filter((type) => type !== action.payload);
      }
      else {
        filteredTypes.push(action.payload);
      }

      return {
        ...state,
        filteredTypes: filteredTypes
      }
    case ActionTypes.FILTER_BY_NAME:
      return {
        ...state,
        nameSearchString: action.payload
      }
    case ActionTypes.SORT_ID_ASCENDING:
      return {
        ...state,
        sortSelection: action.payload
      }
    default:
      return {
        ...state,
        collection: []
      }
  }
};

export { pokemonReducer, getFilteredPokemonSelector };