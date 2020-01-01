import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import axios from "axios";
import PropType from "prop-types";
import auth from "../util/auth";
import { withRouter } from "react-router-dom";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Developed by "}
//       <Link color="inherit" href="https://material-ui.com/">
//         blasanka.github.io
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const useStyles = theme => ({
  root: {
    height: "90vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
});

class Login extends React.Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/login", userData)
      .then(res => {
        this.setState({
          loading: false
        });
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        if (this._isMounted) {
          this.props.onRouteChange("students");
        }
        auth.login();
        this.props.history.push("/students");
      })
      .catch(err => {
        console.error(err);
        if (err.response) {
          this.setState({
            loading: false,
            errors: err.response.data
          });
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                helperText={errors.email}
                error={errors.email ? true : false}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                helperText={errors.password}
                error={errors.password ? true : false}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              {errors.error && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Log In
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
              {/* <Box mt={5}>
              <Copyright />
            </Box> */}
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropType.object.isRequired
};

export default withStyles(useStyles)(withRouter(Login));
