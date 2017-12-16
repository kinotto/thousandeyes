export const makeActionCreator = (actionType) => {
  return function (payload) {
    return {
      'type': actionType,
      'payload': payload
    };
  };
};
