// this is an action
const colorChangeAction = "COLOR_CHANGE";

// this is an action creator
export const colorChange = color => {
  return { type: colorChangeAction, color };
};

const initialState = { color: "#865D53" };
// this is a reducer
export default function colorReducer(state = initialState, action) {
  switch (action.type) {
    case "COLOR_CHANGE":
      return {
        color: action.color
      };
    default:
      return state;
  }
}
