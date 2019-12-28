import React, { Component } from "react";

import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  cardContent: {
    padding: 25
  },
  image: {
    minWidth: 200,
    objectFit: "cover"
  }
};

class Student extends Component {
  render() {
    const {
      classes,
      student: { studentId, fullname, createdAt, imageUrl, createdBy }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={imageUrl}
          title="Profile Image"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${createdBy}`}
            color="primary"
          >
            {createdBy}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`${createdAt}`}
          </Typography>
          <Typography variant="body2">{`${fullname}`}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Student);
