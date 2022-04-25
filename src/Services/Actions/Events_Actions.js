import { SET_DATA } from "../types/Events_Type";

export const action_get_events = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/values/getallevents`;
  await fetch(url)
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DATA,
        payload: res.data,
      });
    });
};
