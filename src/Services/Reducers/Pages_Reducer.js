import { INSERT_DATA, UPDATE_DATA } from "../types/Pages_Type";

const pagescrud = {
  success: false,
  loading: false,
};
const Login_Reducer = (data_state = pagescrud, actions) => {
  switch (actions.type) {
    case INSERT_DATA:
      return { ...data_state, success: actions.payload };
    case UPDATE_DATA:
      return { ...data_state, success: actions.payload };
    default:
      return data_state;
  }
};
export default Login_Reducer;
