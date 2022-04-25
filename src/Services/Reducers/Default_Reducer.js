import { SET_LOGO, SET_NAME } from "../types/Defaults";

const defaults = {
  name: [],
  logo: [],
  loading: false,
};
const Login_Reducer = (data_state = defaults, actions) => {
  switch (actions.type) {
    case SET_LOGO:
      return { ...data_state, logo: actions.payload };
    case SET_NAME:
      return { ...data_state, name: actions.payload };
    default:
      return data_state;
  }
};
export default Login_Reducer;
