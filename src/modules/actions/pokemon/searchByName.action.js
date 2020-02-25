import ActionTypes from '../action-types';

// actions
const searchByName = (value) => {
  return {
    type: ActionTypes.FILTER_BY_NAME,
    payload: value
  }
}

export default searchByName;