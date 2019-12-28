import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import logo from "./logo.png";

import auth from "../util/auth";
import PropType from "prop-types";

import { Link, withRouter } from "react-router-dom";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

export class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  logout = () => {
    auth.logout();
    this.props.onRouteChabge("logout");
    this.props.history.push("/login");
  };

  componentWillMount() {
    this.setState({
      isLoggedIn: this.props.isLoggedIn
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/"
            >
              <img src={logo} alt="Logo" width="130" height="30" />
            </IconButton>
            <Typography variant="h6" className={classes.title}></Typography>
            {/* <Button color="inherit" component={Link} to="/">
            Home
          </Button> */}
            {this.props.isLoggedIn && (
              <div>
                <Button color="inherit" component={Link} to="/students">
                  Students
                </Button>
                <Button color="inherit" onClick={this.logout}>
                  Logout
                </Button>
              </div>
            )}
            {!this.props.isLoggedIn && (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
            {/* <Button color="inherit" component={Link} to="/signup"> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropType.object.isRequired
};

export default withStyles(useStyles)(withRouter(NavBar));
