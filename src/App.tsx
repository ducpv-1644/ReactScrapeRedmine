import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SignIn from "./components/auth/signin.component";
import SignUp from "./components/auth/signup.component";
import ListMembers from "./components/members/list.members.component";
import authService from "services/auth.service";
import MemberDetail from "components/members/detail.members.component";

const PrivateRoute: any = (props: any) => {
  return authService.isLogged() ? (<Route path={props.path} exact={props.exact} component={props.component} />) :
    (<Redirect to="/signin" />);
};
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <PrivateRoute exact path={["/", "/home"]} component={ListMembers} />
        <PrivateRoute exact path="/member/:id" component={MemberDetail} />
  
      </Switch>
    )
  }
}

export default App;
