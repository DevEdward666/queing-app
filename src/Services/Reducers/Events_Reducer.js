import { SET_DATA } from "../types/Events_Type";

const events = {
  data: [],
  loading: false,
};
const Events_Reducer = (data_state = events, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return { ...data_state, data: actions.payload };
    default:
      return data_state;
  }
};
export default Events_Reducer;
