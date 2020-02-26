import ActionTypes from '../actions/action-types';
import TrieStructure from '../data-structures/trie';
import { filterByRange, filterByType } from '../filters/filters';
import mergeSort from '../sorts/merge.sort';
import { valueGetter, idGetter, nameGetter } from '../getters/getters';
import { ascendingCompare, descendingCompare } from '../comparers/comparers';

const defaultState = {
  collection: new TrieStructure(),
  minRange: 1,
  maxRange: 151,
  pokemonStartIndex: 1,
  pokemonEndIndex: 151,
  types: [],
  filteredTypes: [],
  nameSearchString: '',
  sortSelection: { value: ActionTypes.SORT_ID_ASCENDING, label: 'pokemon number ascending' }
};

const getSortGetter = (sortAction) => {
  switch (sortAction) {
    case ActionTypes.SORT_ID_ASCENDING:
      return idGetter;
    case ActionTypes.SORT_ID_DESCENDING:
      return idGetter;
    case ActionTypes.SORT_NAME_ASCENDING:
      return nameGetter;
    case ActionTypes.SORT_NAME_DESCENDING:
      return nameGetter;
    default:
      return valueGetter;
  }
}

const getSortComparer = (sortAction) => {
  switch (sortAction) {
    case ActionTypes.SORT_ID_ASCENDING:
      return ascendingCompare;
    case ActionTypes.SORT_ID_DESCENDING:
      return descendingCompare;
    case ActionTypes.SORT_NAME_ASCENDING:
      return ascendingCompare;
    case ActionTypes.SORT_NAME_DESCENDING:
      return descendingCompare;
    default:
      return ascendingCompare;
  }
}

const getFilteredPokemonSelector = (state) => {
  let items = []
    , sortAction
    , sortGetter
    , sortComparison;

  if (state.pokemon.collection.search) {
    if (state.pokemon.sortSelection && state.pokemon.sortSelection.value) {
      sortAction = state.pokemon.sortSelection.value;
    }

    sortGetter = getSortGetter(sortAction);
    sortComparison = getSortComparer(sortAction);

    items = state.pokemon.collection.search(state.pokemon.nameSearchString.toLowerCase()).slice();
    items = filterByType(items, state.pokemon.filteredTypes);
    items = filterByRange(items, state.pokemon.maxRange)
    items = mergeSort(items, sortGetter, sortComparison);
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