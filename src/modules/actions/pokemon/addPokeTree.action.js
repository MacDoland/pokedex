import ActionTypes from '../action-types';

// actions
const addPokeTree = (tree) => {
  return {
    type: ActionTypes.ADD_POKETREE,
    payload: tree
  }
}

export default addPokeTree;
