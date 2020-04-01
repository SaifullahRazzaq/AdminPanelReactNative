import React, { Component } from 'react';
import {Col} from 'reactstrap';
import Divider from '@material-ui/core/Divider';


export default class LiveBayan extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div>
        <Col  md={{size:'7', offset:'2'}}>
        <h1 style={{fontWeight:'300', marginBottom:'30px', marginTop:'2%',}}>Live</h1>
<Divider/>
<br></br>
<div class="form-group">
<label for="usr">Live Straming Url</label>
<input type="text" class="form-control" id="usr"/>
<br></br>
<div style={{flex:1,justifyContent:'space-between',}}>
<button style={{marginRight:20}} type="button" class="btn btn-info">Update</button>
<button type="button" class="btn btn-danger">Delete</button>


</div>
</div>


<div class="form-group">
<label for="usr">Message</label>
<input type="text" class="form-control" id="usr"/>
<br></br>
<div style={{flex:1,justifyContent:'space-between',}}>
<button style={{marginRight:20}} type="button" class="btn btn-info">Update</button>
<button type="button" class="btn btn-danger">Delete</button>


</div>
</div>


  <br></br>
  
 


</Col>




</div>
    );
  }
}
