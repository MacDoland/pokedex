import ActionTypes from './action-types';

// actions
const changeMinRange = () => {
  return {
    type: ActionTypes.CHANGE_MIN_RANGE
  }
}

export default {
  changeMinRange,
  ActionTypes
};