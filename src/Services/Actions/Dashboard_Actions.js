import { SET_DATA, SET_APP_DATA } from "../types/Dashboard_Type";

const auth = window.localStorage.getItem("tokenizer");

export const action_set_app = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/pages/getallApp`;
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
        type: SET_APP_DATA,
        payload: res.data,
      });
    });
};

export const action_set_data = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/pages/getAllPages`;
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
        type: SET_DATA,
        payload: res.data,
      });
    });
};
export const action_get_apk = (apkname) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/ns/getapkdashboard?apkname=${apkname}`;
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
    .then((res) => {});
};

export const action_get_pages_search = (pagename) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/pages/getallPagesbyName`;
  var bearer_token = auth;
  var bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application//x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: pagename,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DATA,
        payload: res.data,
      });
    });
};
