import React, { Component } from 'react';
import { Col } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import '../App.css';
import swal from 'sweetalert';
import firebase from '../Config/Firebase'
export default class Dua extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            starttime: '',
            endtime: '',
            image: []
        };
    }

    DataSave = () => {
        const { name, description, starttime, endtime, image } = this.state


        if (name === '' || description === '' || starttime === '' || endtime === '') {
            swal({
                title: "Form",
                text: "Please Enter Data",
                icon: "warning",
                button: "Go"
            });
        }
        else {
            try {

                var storageRef = firebase.storage().ref('images/' + image.name);

                storageRef.put(this.state.image).then(function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                }).then(function () {
                    storageRef.getDownloadURL().then(function (downloadURL) {

                        var key = firebase.database().ref("Event").push().key;
                        let Object =
                        {
                            name,
                            description,
                            starttime,
                            endtime,
                            key: key
                        }

                        firebase.database().ref("Event").set(Object).then(() => {
                            swal({
                                title: "Upload",
                                text: "Upload Successfully",
                                icon: "success",
                                button:"Go"
                              });

                        })



                    });
                });
                this.setState({ name: null, Title: null, Category: null, image: null })
            }

            catch (error) {
                swal({
                    title: "Login",
                    text: "Please Enter valid Email or Password",
                    icon:error.message,
                    button:"Go"
                  });
            }

        }
    }

    render() {
        return (
            <div>


                <Col md={{ size: '7', offset: '2' }}>
                    <h1 style={{ fontWeight: '100', marginBottom: '30px', marginTop: '5%,' }}>Event</h1>
                    <Divider style={{ backgroundColor: 'white' }} />
                    <br></br>

                    <center>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            </div>
                            <label style={{ textAlign: 'center', fontSize: 22, }}>Name </label>
                            <input style={{ marginLeft: 65 }} value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>

                        <br></br>
                        <div class="input-group mb-3">

                            <div class="input-group-prepend">
                            </div>
                            <label style={{ textAlign: 'center', fontSize: 22 }}>Description</label>
                            <input style={{ marginLeft: 10 }} value={this.state.description} onChange={(e) => { this.setState({ description: e.target.value }) }} type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <br></br>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">

                            </div>
                            <label style={{ textAlign: 'center', fontSize: 22 }}>Start-Time</label>
                            <input style={{ marginLeft: 18 }} value={this.state.starttime} onChange={(e) => { this.setState({ starttime: e.target.value }) }} type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>

                        <br></br>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">

                            </div>
                            <label style={{ textAlign: 'center', fontSize: 22 }}>End-Time</label>
                            <input style={{ marginLeft: 24 }} value={this.state.endtime} onChange={(e) => { this.setState({ endtime: e.target.value }) }} type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">

                            </div>
                            <label style={{ textAlign: 'center', fontSize: 22 }}>Upload</label>
                            <input style={{ marginLeft: 50 }} type="file" name="file" onChange={(e) => { this.setState({ image: e.target.files[0] }) }} />

                        </div>

                    </center>


                </Col>
                <div style={{ marginLeft: '67.5%' }}>
                    <button type="button" class="btn btn-primary" onClick={this.DataSave}>Add</button>

                </div>
            </div>

        );
    }
}
