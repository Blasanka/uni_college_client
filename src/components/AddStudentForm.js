import React from "react";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  title: {
    margin: theme.spacing(1)
  }
});

class AddStudentForm extends React.Component {
  state = {
    genderType: "Male",
    setGenderType: null
  };

  handleChange = event => {
    this.setGenderType(event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h5" gutterBottom>
          Add new member
        </Typography>
        <TextField
          id="outlined-full-width"
          label="Full Name"
          style={{ margin: 8 }}
          placeholder="Type your name here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Index number"
          style={{ margin: 8 }}
          placeholder="Type your Index number here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="NIC"
          style={{ margin: 8 }}
          placeholder="Type National Identity Card number here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Department"
          style={{ margin: 8 }}
          placeholder="Type your department here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="DOB"
          style={{ margin: 8 }}
          placeholder="Type your Date Of Birth here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />

        <TextField
          id="outlined-full-width"
          label="Address"
          style={{ margin: 8 }}
          placeholder="Type your permanent address here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Email (Optional)"
          style={{ margin: 8 }}
          placeholder="Type your email address here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          style={{ margin: 8 }}
          // placeholder="Placeholder"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          select
          label="Select Gender"
          value={this.state.genderType}
          onChange={this.handleChange}
          // helperText="Select"
        >
          {genderTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label + ""}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-full-width"
          label="Phone Number"
          style={{ margin: 8 }}
          placeholder="Type your mobile number here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Parent's Number"
          style={{ margin: 8 }}
          placeholder="Tpye your parent's number here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Religion"
          style={{ margin: 8 }}
          placeholder="Type your religion here"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <div className={classes.buttons} spacing={2} justify="center">
          <Button variant="contained" color="primary">
            <DoneIcon />
            &nbsp; Submit
          </Button>
          <Button variant="contained" color="default">
            <ClearIcon />
            &nbsp; Clear
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddStudentForm);
