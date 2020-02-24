import ActionTypes from '../action-types';

// actions
const changeMaxRange = (value) => {
  return {
    type: ActionTypes.CHANGE_MAX_RANGE,
    payload: value
  }
}

export default changeMaxRange;