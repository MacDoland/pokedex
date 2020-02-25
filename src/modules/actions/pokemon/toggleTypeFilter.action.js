import ActionTypes from '../action-types';

// actions
const toggleTypeFilter = (value) => {
  return {
    type: ActionTypes.TOGGLE_TYPE_FILTER,
    payload: value
  }
}

export default toggleTypeFilter;
