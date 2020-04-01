import React, { Component } from 'react';
import { Col } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import firebase from '../Config/Firebase';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../App.css';
import swal from 'sweetalert';

const styles = ({
  table: {
    minWidth: 650,
  },
});
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      List: [],
      focus: false
    };
  }

  componentDidMount() {
    const getdata = [];
    firebase.database().ref('Category').once("value", (data) => {
      var Evaluationdata = data.val();
      for (var key in Evaluationdata) {

        getdata.push(Evaluationdata[key])
      }

    }).then(() => {

      this.setState({ List: getdata })
    })
  }

  DataSave = () => {
    const { name } = this.state;
    if (name === '') {
      swal({
        title: "Form",
        text: "Please Enter Data",
        icon: "warning",
        button: "Go"
      });
    }
    else {
      try {

        var key = firebase.database().ref('Category/').push().key;
        let object = {
          Categoryname: name,
          key,
        }


        firebase.database().ref("Category/" + key).set(object).then(() => {
          swal({
            title: "Inserted",
            text: "Insert Data Successfully",
            icon: "success",
            button: "Go"
          });
        })

        this.setState({ name: "" })
        const getdata = [];
        firebase.database().ref('Category').once("value", (data) => {
          var Evaluationdata = data.val(
          );
          for (var key in Evaluationdata) {


            getdata.push(Evaluationdata[key])
          }

        }).then(() => {

          this.setState({ List: getdata })
        })

      } catch (error) {
        swal({
          title: "Login",
          text: error.message,
          icon: "error",
          button: "Go"
        });

      }
    }

  }

  delete(row) {
    firebase.database().ref("/" + row).remove().then(() => {
      console.log("removed")
    })
  }


  Edit(key) {
    swal({
      text: 'Please Enter Value',
      content: "input",
      button: {
        text: "Update",
        closeModal: true,
      },
    })
      .then(name => {
        let object = {
          Categoryname: name,
          key,

        }

        firebase.database().ref("Category/" + key).set(object).then(() => {
          const getdata = [];
          firebase.database().ref('Category').once("value", (data) => {
            var Evaluationdata = data.val();
            for (var key in Evaluationdata) {
              getdata.push(Evaluationdata[key])
            }

          }).then(() => {

            this.setState({ List: getdata })
          })

        })
      })
  }



  render() {

    return (
      <div style={{ flex: 1, justifyContent: 'space-between' }}>

        <Col md={{ size: '7', offset: '2' }}>
          <h1 style={{ fontWeight: '300', marginBottom: '30px', marginTop: '5%', }}>Category </h1>
          <Divider />
          <br></br>

          <div class="form-group">
            <label for="usr">Name</label>
            <input type="text" class="form-control" id="usr" focus={this.state.focus} value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
          </div>
        </Col>
        <div style={{ marginLeft: '67.5%' }}>
          <button type="button" class="btn btn-primary" onClick={this.DataSave}>Add</button>

        </div>
        <br></br>

        <TableContainer component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TableCell>Category</TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.List.map((row) => (
                <TableRow key={row.Categoryname}>
                  <TableCell component="th" scope="row">
                    {row.Categoryname}
                  </TableCell>
                  <TableCell align="right"><button style={{ margin: 10 }} className="btn btn-danger" onClick={this.delete.bind(this, row.key)}>Delete</button>
                    <button className="btn btn-info" onClick={this.Edit.bind(this, row.key)}>Edit</button>
                  </TableCell>
                  {/* <TableCell align="right"></TableCell> */}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    );
  }
}
export default withStyles(styles)(Category)