import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import themeFile from "./util/theme";

// MuI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// import jwtDecode from "jwt-decode";

//components
import Navbar from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";

// Pages
import home from "./pages/home";
import Login from "./pages/login";
// import signup from "./pages/signup";
import Students from "./pages/students";
import Details from "./pages/details";

const theme = createMuiTheme(themeFile);

// let authenticated;
// const token = localStorage.FBIdToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = "/login";
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// } else {
//   authenticated = false;
// }

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: "login",
      isLoggedIn: false
    };
  }

  onRouteChange = route => {
    if (route === "logout") {
      this.setState(this.initialState);
    } else if (route === "students") {
      this.setState({ isLoggedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar
              isLoggedIn={this.state.isLoggedIn}
              onRouteChange={this.onRouteChange}
            />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={home}
                  onRouteChange={this.onRouteChange}
                />
                <Route
                  path="/login"
                  component={() => <Login onRouteChange={this.onRouteChange} />}
                />
                {/* <AuthRoute path="/signup" component={signup} authenticated /> */}
                <AuthRoute
                  exact
                  path="/students"
                  component={() => (
                    <Students onRouteChange={this.onRouteChange} />
                  )}
                />
                <AuthRoute
                  exact
                  path="/students/:studentId"
                  component={() => (
                    <Details onRouteChange={this.onRouteChange} />
                  )}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
