import React, { Component } from "react";

//Components
import Grid from "@material-ui/core/Grid";
import AddStudentForm from "../components/AddStudentForm";

// import axios from "axios";

class home extends Component {
  // state = {
  //   students: null
  // };
  // componentDidMount() {
  //   axios
  //     .get("/students")
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({
  //         students: res.data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    // let recentStudentMarkup = this.state.students ? (
    //   this.state.students.map(student => (
    //     <Student student={student} key={student.studentId} />
    //   ))
    // ) : (
    //   <p>Loading...</p>
    // );
    return (
      <Grid container spacing={2} justify="center">
        <Grid item sm={8} xs={12}>
          <AddStudentForm />
        </Grid>
      </Grid>
    );
  }
}

export default home;
