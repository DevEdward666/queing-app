import { SET_DATA } from "../types/Login_Type";

export const action_Login_user = (username, password) => async () => {
  var url = `${process.env.REACT_APP_BASE_URL}/api/token`;
  const fetchdata = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: username,
      password: password,
      grant_type: "password",
    }),
  });
  const parseData = await fetchdata.json();
  if (parseData.access_token != null) {
    window.localStorage.setItem("tokenizer", parseData.access_token);
    window.localStorage.setItem("refreshtoken", parseData.refresh_token);
    window.location.href = "/";
  } else {
    alert("Wrong Username/Password");
  }
};
