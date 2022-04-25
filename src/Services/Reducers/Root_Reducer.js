import Dashboard_Reducer from "./Dashboard_Reducer";
import Login_Reducer from "./Login_Reducer";
import Default_Reducer from "./Default_Reducer";
import Pages_Reducer from "./Pages_Reducer";
import Events_Reducer from "./Events_Reducer";
import { combineReducers } from "redux";

const Root_Reducer = combineReducers({
  Dashboard_Reducer: Dashboard_Reducer,
  Login_Reducer: Login_Reducer,
  Default_Reducer: Default_Reducer,
  Pages_Reducer: Pages_Reducer,
  Events_Reducer: Events_Reducer,
});
export default Root_Reducer;
