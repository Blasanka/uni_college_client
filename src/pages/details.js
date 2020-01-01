import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// icons
import BackArrow from "@material-ui/icons/ArrowBack";

// @material-ui/core components
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardAvatar from "../components/Card/CardAvatar.js";
import CardBody from "../components/Card/CardBody.js";
import Typography from "@material-ui/core/Typography";

const useStyles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "2px",
    textDecoration: "none"
  },
  label: {
    color: "rgba(150,150,150,.88)",
    fontFamily: "'Helvetica', 'Roboto', 'Arial', sans-serif"
  },
  value: {
    color: "rgba(70,70,70,.95)",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  }
});

export class Details extends Component {
  handleClick = () => {
    this.props.history.push("/students");
  };

  render() {
    const { classes } = this.props;
    const { student } = this.props.location.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}></GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={student.imageUrl} alt={student.fullname} />
                </a>
              </CardAvatar>
              <CardBody profile>
                <Typography variant="h5">{student.fullname}</Typography>
                <Typography variant="h6">{student.index}</Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>NIC: </span>
                  <span className={classes.value}>{student.nic}</span>
                </Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>Department: </span>{" "}
                  <span className={classes.value}>{student.department}</span>
                </Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>DOB: </span>
                  <span className={classes.value}>{student.dob}</span>
                </Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>Phone No: </span>
                  <span className={classes.value}>{student.mobile_number}</span>
                </Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>Parent's No: </span>
                  <span className={classes.value}>
                    {student.parents_number}
                  </span>
                </Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>Address: </span>
                  <span className={classes.value}>{student.address}</span>
                </Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>Email: </span>
                  <span className={classes.value}>{student.email}</span>
                </Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>Gender: </span>
                  <span className={classes.value}>{student.gender}</span>
                </Typography>
                <Typography variant="subtitle1">
                  <span className={classes.label}>Religion: </span>
                  <span className={classes.value}>{student.religion}</span>
                </Typography>
                <Button color="secondary" onClick={this.handleClick}>
                  <BackArrow />
                  &nbsp; Go Back
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(useStyles)(withRouter(Details));
