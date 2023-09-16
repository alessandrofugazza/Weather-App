const initialState = {
  detailedView: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DETAILED_VIEW":
      return {
        ...state,
        detailedView: !state.detailedView,
      };
    default:
      return state;
  }
};

export default mainReducer;
