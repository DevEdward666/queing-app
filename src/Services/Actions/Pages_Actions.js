import { INSERT_DATA, UPDATE_DATA } from "../types/Pages_Type";

const auth = window.localStorage.getItem("tokenizer");

export const action_insertpage = (name, urls, imageurl) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/pagesadmin/insertnewpages`;
  var bearer_token = auth;
  var bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      url: urls,
      scheme: imageurl,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: INSERT_DATA,
        payload: res.success,
      });
    });
};
export const action_updatepage = (id, name, urls, isActive) => async (
  dispatch
) => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/pagesadmin/updatepages`;
  var bearer_token = auth;
  var bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      url: urls,
      isActive: isActive,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: UPDATE_DATA,
        payload: res.success,
      });
    });
};
