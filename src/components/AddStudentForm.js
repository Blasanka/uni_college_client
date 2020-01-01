import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Slide from "@material-ui/core/Slide";

// MUI colors
import { green } from "@material-ui/core/colors";

// Date picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

//clxs
import clsx from "clsx";

// icons
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

//validation
import { validateFormData } from "../util/validator";

const genderTypes = [
  {
    value: "male",
    label: "Male"
  },
  {
    value: "female",
    label: "Female"
  },
  {
    value: "other",
    label: "Other"
  }
];

const useStyles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1)
  // },
  buttons: {
    position: "relative",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  title: {
    margin: theme.spacing(1)
  },
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto",
    width: "40px",
    height: "40px"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  // button: {
  //   position: "relative",
  //   marginTop: 20
  // },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  }
});

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

const SlideTransition = React.forwardRef((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}
class AddStudentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      indexNumber: "",
      nic: "",
      department: "",
      dob: new Date("2000-01-01T00:00:00"),
      address: "",
      genderType: "",
      email: "",
      phoneNumber: "",
      parentsNumber: "",
      religion: "",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/unicollege-b8518.appspot.com/o/no-image.png?alt=media",
      errors: {},
      loading: false,
      snackBarOpen: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const newStudent = {
      fullname: this.state.fullName,
      index: this.state.indexNumber,
      nic: this.state.nic,
      department: this.state.department,
      dob: this.state.dob,
      address: this.state.address,
      gender: this.state.genderType,
      email: this.state.email,
      mobile_number: this.state.phoneNumber,
      parents_number: this.state.parentsNumber,
      religion: this.state.religion,
      imageUrl: this.state.imageUrl
    };

    const validity = validateFormData(newStudent);
    console.log(validity.valid);
    if (validity.valid) {
      this.setState({
        loading: true,
        errors: {}
      });

      axios
        .post("/student", newStudent)
        .then(res => {
          this.setState({
            loading: false,
            snackBarOpen: true
          });
          console.log(`successfully submitted: status code: ${res.status}`);
        })
        .catch(err => {
          this.setState({
            loading: false,
            errors: err.response.data
          });
          console.error(
            `Could not submit filled data. Please try again! ${err.status}`
          );
        });
    } else {
      this.setState({
        errors: validity.errors,
        loading: validity.valid
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDateChange = date => {
    this.setState({
      dob: date
    });
  };

  clearForm = () => {
    this.setState({
      fullName: "",
      indexNumber: "",
      nic: "",
      department: "",
      dob: new Date("2000-01-01T00:00:00"),
      address: "",
      genderType: "",
      email: "",
      phoneNumber: "",
      parentsNumber: "",
      religion: "",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/unicollege-b8518.appspot.com/o/no-image.png?alt=media",
      errors: {},
      loading: false,
      snackBarOpen: false
    });
  };

  handleSnackBarClick = () => {
    this.setState({
      snackBarOpen: true
    });
  };

  handleSnackBarClose = () => {
    this.setState({
      ...this.state,
      snackBarOpen: false
    });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h5" gutterBottom>
          Add new member
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            id="fullName"
            name="fullName"
            label="Full Name"
            style={{ margin: 8 }}
            placeholder="Type your name here"
            margin="normal"
            variant="outlined"
            helperText={errors.fullName}
            error={errors.fullName ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.fullName}
            onChange={this.handleChange}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="indexNumber"
            name="indexNumber"
            label="Index number"
            style={{ margin: 8 }}
            placeholder="Type your Index number here"
            margin="normal"
            variant="outlined"
            helperText={errors.indexNumber}
            error={errors.indexNumber ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.indexNumber}
            onChange={this.handleChange}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="nic"
            name="nic"
            label="NIC"
            style={{ margin: 8 }}
            placeholder="Type National Identity Card number here"
            helperText={errors.nic}
            error={errors.nic ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.nic}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="department"
            name="department"
            label="Department"
            style={{ margin: 8 }}
            placeholder="Type your department here"
            margin="normal"
            variant="outlined"
            helperText={errors.department}
            error={errors.department ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.department}
            onChange={this.handleChange}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              id="dob"
              name="dob"
              label="DOB"
              variant="inline"
              inputVariant="outlined"
              format="MM/dd/yyyy"
              style={{ margin: 8 }}
              placeholder="Type your Date Of Birth here"
              helperText={errors.dob}
              error={errors.dob ? true : false}
              className={classes.textField}
              value={this.state.dob}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="address"
            name="address"
            label="Address"
            style={{ margin: 8 }}
            placeholder="Type your permanent address here"
            helperText={errors.address}
            error={errors.address ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="email"
            name="email"
            label="Email (Optional)"
            style={{ margin: 8 }}
            placeholder="Type your email address here"
            helperText={errors.email}
            error={errors.email ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="genderType"
            name="genderType"
            style={{ margin: 8 }}
            variant="outlined"
            label="Select Gender"
            helperText={errors.genderType}
            error={errors.genderType ? true : false}
            className={classes.textField}
            value={this.state.genderType}
            onChange={this.handleChange}
            InputLabelProps={{
              shrink: true
            }}
            select
            fullWidth
          >
            {genderTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label + ""}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            style={{ margin: 8 }}
            placeholder="Type your mobile number here"
            helperText={errors.phoneNumber}
            error={errors.phoneNumber ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="parentsNumber"
            name="parentsNumber"
            label="Parent's Number"
            style={{ margin: 8 }}
            placeholder="Tpye your parent's number here"
            helperText={errors.parentsNumber}
            error={errors.parentsNumber ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.parentsNumber}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="religion"
            name="religion"
            label="Religion"
            style={{ margin: 8 }}
            placeholder="Type your religion here"
            helperText={errors.religion}
            error={errors.religion ? true : false}
            className={classes.textField}
            type="text"
            value={this.state.religion}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <div className={classes.buttons} spacing={2} justify="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={this.state.loading}
            >
              <DoneIcon />
              &nbsp; Submit
              {this.state.loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
            <Button
              onClick={this.clearForm}
              variant="contained"
              color="default"
            >
              <ClearIcon />
              &nbsp; Clear
            </Button>
          </div>
        </form>
        <Snackbar
          open={this.state.snackBarOpen}
          onClose={this.handleSnackBarClose}
          // TransitionComponent={SlideTransition}
          autoHideDuration={5000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          // message={<span id="message-id">Successfully submitted!</span>}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackBarClose}
            variant="success"
            message="Successfully submitted!"
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddStudentForm);
