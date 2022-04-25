import { SET_DATA } from "../types/Login_Type";

const pages = {
  data: [],
  loading: false,
};
const Login_Reducer = (data_state = pages, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return { ...data_state, data: actions.payload };
    default:
      return data_state;
  }
};
export default Login_Reducer;
