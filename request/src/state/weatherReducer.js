import { getForecastForZipcodeRequest } from "../requests";

// these are actions
const requestSendingAction = "REQUEST_SENDING";
const requestSuccessAction = "REQUEST_SUCCESS";
const requestErrorAction = "REQUEST_ERROR";

// these are thunkless action creators
export const requestSending = () => ({ type: requestSendingAction });

export const requestSuccess = payload => ({
  type: requestSuccessAction,
  payload
});

export const requestError = error => ({
  type: requestErrorAction,
  payload: error
});

// this action creator is a thunk
export const getForecastForZipcode = zipCode => async dispatch => {
  try {
    dispatch(requestSending());

    const result = await getForecastForZipcodeRequest(zipCode);

    dispatch(requestSuccess(result));

    return result;
  } catch (err) {
    dispatch(requestError(err));
  }
};

// this is a reducer
export default function weatherReducer(state = {}, action) {
  switch (action.type) {
    case "REQUEST_SENDING":
      return {
        status: "sending"
      };

    case "REQUEST_SUCCESS":
      return {
        status: "success",
        forecast: action.payload
      };

    case "REQUEST_ERROR":
      return {
        status: "error"
      };

    default:
      return state;
  }
}
