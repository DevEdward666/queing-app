import { SET_DATA, SET_APP_DATA } from "../types/Dashboard_Type";

const pages = {
  data: [],
  AppData: [],
  loading: false,
};
const Dashboard_Reducer = (data_state = pages, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return { ...data_state, data: actions.payload };
    case SET_APP_DATA:
      return { ...data_state, AppData: actions.payload };
    default:
      return data_state;
  }
};
export default Dashboard_Reducer;
