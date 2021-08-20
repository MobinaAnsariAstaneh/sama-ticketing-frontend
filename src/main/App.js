import Login from "../components/login/login";
import Profile from "../components/profile/profile";
import Guide from "../components/guide/guide";
import Dashboard from "../components/dashboard/dashboard";
import Forgot from "../components/forgot/forgot";
import Register from "../components/register/register";
import Admin from "../components/admin/admin";
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
          <Route path="/guide">
            <Guide />
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
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
  return (
    <Route
      {...rest}
      render={({ location }) =>
        JSON.parse(localStorage.getItem("auth")) ? (
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
