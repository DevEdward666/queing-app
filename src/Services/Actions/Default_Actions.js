import { SET_LOGO, SET_NAME } from "../types/Defaults";

const auth = window.localStorage.getItem("tokenizer");
export const action_GET_defaultname = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/company/company-name`;
  var bearer_token = auth;
  var bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_NAME,
        payload: res.data[0].hospname,
      });
    });
};
export const action_GET_defaultlogo = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/company/company-logo`;
  var bearer_token = auth;
  var bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_LOGO,
        payload: res.data,
      });
    });
};
