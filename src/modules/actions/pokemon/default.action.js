const defaultActionCreator = (type, value) => {
  return {
    type: type,
    payload: value
  }
}

export default defaultActionCreator;
