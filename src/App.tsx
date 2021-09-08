import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SignIn from "./components/users/signin.component";
import SignUp from "./components/users/signup.component";
import HomePage from "./components/home.component";
import authService from "services/auth.service";

const PrivateRoute: any = (props: any) => {
  return authService.isLogged() ? (<Route path={props.path} exact={props.exact} component={props.component} />) :
    (<Redirect to="/signin" />);
};
class App extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={["/", "/home"]} component={HomePage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    )
  }
}

export default App;
