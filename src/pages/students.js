import React, { Component } from "react";
import StudentTable from "../components/StudentTable";

import axios from "axios";

import "../loader.css";

class Students extends Component {
  state = {
    students: null
  };
  componentDidMount() {
    axios
      .get("/students")
      .then(res => {
        console.log(res.data);
        this.setState({
          students: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentStudentMarkup = this.state.students ? (
      <StudentTable students={this.state.students} />
    ) : (
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    );
    return <div>{recentStudentMarkup}</div>;
  }
}

export default Students;
