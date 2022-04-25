import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DashHome } from "./dashcomponents/DashHome";
import { Generator } from "./components/Generator";
import { AdminDash } from "./dashcomponents/AdminDash";
import AdminDashFunc from "./dashcomponents/AdminDashFunc";
import Login from "./Containers/LoginCtnr";
import { Navigation } from "./components/Navigation";
import NavigationFunc from "./components/NavigationFunc";
import DashHomeFunc from "./dashcomponents/DashHomeFunc";
import Calendar from "./components/Calendar";
import store from "./Services/Store";
import { Provider } from "react-redux";

const LoginContainer = () => (
  <div>
    <Provider store={store}>
      <Route path="/Login" component={Login} />
    </Provider>
  </div>
);
const DefaultContainer = () => (
  <div>
    <Provider store={store}>
      <NavigationFunc />
      <Route path="/" component={DashHomeFunc} exact />
      <Route path="/Generator" component={Generator} />
      <Route path="/Admin" component={AdminDashFunc} />
      <Route path="/Calendar" component={Calendar} />
    </Provider>
  </div>
);
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/(login)" component={LoginContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
