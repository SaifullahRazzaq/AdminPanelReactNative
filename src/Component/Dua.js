import React, { Component } from 'react';
import { Col } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import firebase from '../Config/Firebase'
import '../App.css';
import swal from 'sweetalert';
export default class Dua extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            Title:'',
            Category:'',
            image:[] ,
            List:[] ,
            index:0

        };
    }



    DataSave =() =>
    {
      const {name,Title,Category,image}=this.state
   
    
      if(name === '' || Title === '' || Category ===  '')
      {
        swal({
          title: "Form",
          text: "Please Enter Data",
          icon: "warning",
          button:"Go"
        });
      }
      else
      {
        try {

          var storageRef = firebase.storage().ref('images/' + image.name);
  
          storageRef.put(this.state.image).then(function(snapshot) {  
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
  
          }).then(function() {
              storageRef.getDownloadURL().then(function(downloadURL) {
               
                  var key = firebase.database().ref("CategoryList").push().key;
                let Object =
                {
                  name,
                  Title,
                  Category,
                  downloadURL,
                  key:key
                }
              
                  firebase.database().ref("CategoryList/" + key).set(Object).then(() => {
                    swal({
                      title: "Inserted",
                      text: "Added Success",
                      icon: "success",
                      button:"Go"
                    });
                    
                  })
                  
                  
                  
                });
              });
              this.setState({name:"",Title:"",Category:"",})  
            }
            
       catch (error) {
        swal({
          title: "Inserted",
          text: error.message,
          icon: "success",
          button:"Go"
        });
      }
        
      }
  
    }
    render() {
        return (
            <div style={{ flex: 1, justifyContent: 'space-between' }}>

                <Col md={{ size: '7', offset: '2' }}>
                    <h1 style={{ fontWeight: '300', marginBottom: '30px', marginTop: '5%', }}>Dua Section</h1>
                    <Divider />
                    <br></br>

                    <div class="form-group">
  <label for="usr">Name</label>
  <input type="text" class="form-control" id="usr" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
</div>

                    
                        <div class="form-group">
  <label for="usr">Tile</label>
  <input type="text" class="form-control" id="usr" value={this.state.Title} onChange={(e)=>{this.setState({Title:e.target.value})}}/>
</div>

<div class="form-group">
  <label for="sel1">Category</label>
  <select class="form-control" id="sel1" value={this.state.Category} onChange={(e)=>{this.setState({Category:e.target.value})}}>
  <option>Select Category</option>
     <option>Hajj</option>
     <option>Dua Section</option>
    <option>Bayaan Section</option>
    <option>Event Section</option>
  </select>
</div>
                        
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">

                            </div>
                            <label style={{ textAlign: 'center', fontSize: 22 }}>Upload</label>
                            <input  style={{ marginLeft: 50 }} type="file"  name="file"   onChange={(e)=>{this.setState({image:e.target.files[0]})}}/>
                        </div>

            


                </Col>
                <div style={{ marginLeft: '67.5%' }}>
                    <button type="button" class="btn btn-primary" onClick={this.DataSave}>Add</button>

                </div>
            </div>

        );
    }
}
