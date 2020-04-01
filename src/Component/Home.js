import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Col } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import firebase from '../Config/Firebase'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const styles = ({
  table: {
    minWidth: 650,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      email: '',
      password: '',
    };
  }
  componentDidMount() {

    const getdata = [];
    firebase.database().ref('CategoryList').once("value", (data) => {
      var Evaluationdata = data.val();
      for (var key in Evaluationdata) {
        getdata.push(Evaluationdata[key])
      }

    }).then(() => {

      this.setState({ List: getdata })
    })
  }

  delete(row) {
    const getdata = []
    firebase.database().ref("CategoryList/" + row.key).remove().then(() => {
      firebase.database().ref('CategoryList').once("value", (data) => {
        var Evaluationdata = data.val();
        for (var key in Evaluationdata) {


          console.log(Evaluationdata[key])
          getdata.push(Evaluationdata[key])
        }

      }).then(() => {

        this.setState({ List: getdata })
      })



    })
  }

  Search(e) {

    const { List } = this.state;
    let query = e.target.value
    
   List.filter(element => {
      return element.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  render() {
    return (
      <div>

        <Col md={{ size: '7', offset: '2' }}>
          <h1 style={{ fontWeight: '100', marginBottom: '30px', marginTop: '2%', }}>Home</h1>
          <Divider />
          <br></br>
          <div class="form-group">
            <label for="usr">Name</label>
            <input type="text" class="form-control" id="usr" onChange={(e) => this.Search(e)} />
          </div>




          <br></br>
          <div class="form-group">
            <label for="sel1">Category</label>
            <select class="form-control" id="sel1">
              <option>Dua Section</option>
              <option>Bayaan Section</option>
              <option>Event Section</option>
            </select>
          </div>



        </Col>
        <div style={{ marginLeft: '67.5%' }}>
          <button type="button" class="btn btn-primary">Search</button>

        </div>

        <br></br>



        <TableContainer component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.List.map((row) => (

                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moment().format('L')}
                  </TableCell>
                  <TableCell align="right"><button style={{ margin: 10 }} className="btn btn-danger" onClick={this.delete.bind(this, row)}>Delete</button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>

    );
  }
}
export default withStyles(styles)(Home)













