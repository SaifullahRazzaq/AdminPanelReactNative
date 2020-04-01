import React, { Component } from 'react';
import { Col} from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import moment from 'moment'
import '../App.css';
import swal from 'sweetalert'
import Calendar from 'ciqu-react-calendar'
import firebase from '../Config/Firebase';
export default class Bayan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      name: '',
      Title: '',
      Category: '',
      Date: '',
      link: '',
      List: []
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

  onChange = (value, inputValue) => {

    this.setState({ Date: value.format('YYYY-MM-DD') })
  }

  onOpenChange = (status) => {
    }

  disabledDate = (currentDate, inputValue) => {
    return false
  }

  DataSave = () => {
    const { name, Title, Category, Date, link } = this.state

    let BayanSection =
    {
      name,
      Title,
      Category,
      Date,
      link
    }
    if (name === '' || Title === ''||  Category === '' || Date === '' || link === '') {
      swal({
        title: "Form",
        text: "Please Enter Data",
        icon: "warning",
        button: "Go"
      });
    }
    else {
      try {
        var key = firebase.database().ref('BayanInfo/').push(BayanSection).key;

        swal({
          title: "Inserted",
          text: "Added Success",
          icon: "success",
          button: "Go"
        });
        this.setState({
          name: "",
          Title: "",
          Category: "",
          Date: "",
          link: "",
        })


      } catch (error) {
    
        swal({
          title: "Inserted",
          text:error.message,
          icon: "error",
          button:"Go"
        });
      }

    }

  }


  render() {
    return (
      <div style={{ flex: 1, justifyContent: 'space-between' }}>

        <Col md={{ size: '7', offset: '2' }}>
          <h1 style={{ fontWeight: '300', marginBottom: '30px', marginTop: '5%', }}>Bayan Section</h1>
          <Divider />
          <br></br>
          <div class="form-group">
            <label for="usr">Name</label>
            <input type="text" class="form-control" id="usr" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
          </div>

          <div class="form-group">
            <label for="usr">Title</label>
            <input type="text" class="form-control" id="usr" value={this.state.Title} onChange={(e) => { this.setState({ Title: e.target.value }) }} />
          </div>

          <div class="form-group">
            <label for="sel1">Category</label>
            <select class="form-control" id="sel1" value={this.state.Category} onChange={(e) => { this.setState({ Category: e.target.value }) }}>
              <option>Select a Category</option>
              {
                this.state.List &&
                this.state.List.map((h, i) =>
                  (<option>{h.Categoryname}</option>))
              }

            </select>
          </div>

          <label>Date</label>
          <Calendar
            onChange={this.onChange}
            value={this.state.value}
            allowClear={true}
            disabled={false}
            placeholder={'please input date'}
            format={'YYYY-MM-DD'}
            onOpenChange={this.onOpenChange}
            disabledDate={this.disabledDate}
          />


          <br></br><br></br>

          <div class="form-group">
            <label for="usr">Link</label>
            <input type="text" class="form-control" id="usr" value={this.state.link} onChange={(e) => { this.setState({ link: e.target.value }) }} />
          </div>



        </Col>
        <div style={{ marginLeft: '67.5%' }}>
          <button type="button" class="btn btn-primary" onClick={this.DataSave}>Add</button>

        </div>
      </div>

    );
  }
}
