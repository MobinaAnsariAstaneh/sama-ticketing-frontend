import Login from "../components/login/login";
import Profile from "../components/profile/profile";
import Guide from "../components/guide/guide";
import Dashboard from "../components/dashboard/dashboard";
import Forgot from "../components/forgot/forgot";
import Register from "../components/register/register";
import Admin from "../components/admin/admin";
import Email from "../components/Result/email";
import Snake from "../components/snake/snake";
// import Bug from "../components/fun/fun";
import "antd/dist/antd.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot">
            <Forgot />
          </Route>
          <Route path="/email">
            <Email />
          </Route>
          <Route path="/guide">
            <Guide />
          </Route>
          <Route path="/snake">
            <Snake />
          </Route>
          {/* <Route path="/fun">
            <Bug />
          </Route> */}
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/">
            {JSON.parse(localStorage.getItem("auth")) ? (
              <Dashboard />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  let variable = localStorage.getItem("auth");
  console.log("variable" , variable);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        JSON.parse(variable) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
