import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import { withRouter } from "react-router-dom";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export class StudentTable extends React.Component {
  state = {
    selectedRow: null,
    columns: [
      { title: "Index", field: "index" },
      { title: "NIC", field: "nic" },
      { title: "Name", field: "fullname" },
      { title: "Dep.", field: "department" },
      // { title: "Address", field: "address" },
      // { title: "Email", field: "email" },
      // { title: "DOB", field: "dob" },
      { title: "Gender", field: "gender" },
      // { title: "Religion", field: "religion" },
      { title: "Mobile No", field: "mobile_number" }
      // { title: "Parent No", field: "parents_number" }
    ],
    data: []
  };

  render() {
    const { students } = this.props;

    let recentStudentMarkup = students
      ? students.map(student => ({
          fullname: student.fullname,
          nic: student.nic,
          index: student.index,
          department: student.department,
          address: student.address,
          email: student.email,
          mobile_number: student.mobile_number,
          parents_number: student.parents_number,
          dob: student.dob.toString(),
          gender: student.gender,
          religion: student.religion,
          imageUrl: student.imageUrl,
          createdBy: student.createdAt,
          createdAt: student.createdAt.toString()
        }))
      : {};

    return (
      <MaterialTable
        title="All Students"
        columns={this.state.columns}
        data={recentStudentMarkup}
        icons={tableIcons}
        style={{ paddingLeft: 10 }}
        onRowClick={(evt, selectedRow) => {
          this.setState({ selectedRow });
          this.props.history.push({
            pathname: `/students/${selectedRow.index}`,
            state: { student: selectedRow }
          });
        }}
        editable={{
          // onRowAdd: newData =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       setState(prevState => {
          //         const data = [...prevState.data];
          //         data.push(newData);
          //         return { ...prevState, data };
          //       });
          //     }, 600);
          //   }),
          // onRowUpdate: (newData, oldData) =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       if (oldData) {
          //         this.setState(prevState => {
          //           const data = [...prevState.data];
          //           data[data.indexOf(oldData)] = newData;
          //           return { ...prevState, data };
          //         });
          //       }
          //     }, 600);
          //   }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    );
  }
}

export default withRouter(StudentTable);
