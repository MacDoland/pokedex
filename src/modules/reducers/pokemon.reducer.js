import ActionTypes from '../actions/action-types';
import _ from "lodash";

const defaultState = {
  collection: []
};

const pokemonReducer = (state = defaultState, action) => {
  console.log("state", state);
  switch (action.type) {
    case ActionTypes.ADD_NEW_POKEMONS:
      return {
        ...state,
        collection: action.payload
      }
    default:
      return {
        ...state,
        collection: []
      }
  }
};

export default pokemonReducer;