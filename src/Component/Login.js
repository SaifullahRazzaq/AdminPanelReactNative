import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from './AppBar';
import '../Config/Firebase';
import swal from 'sweetalert';


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    alignItems: 'center'


  },
  form: {
    width: '100%',
    marginTop: '5%',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state =
    {
      Email: '',
      Password: '',
    }

  }
  handle = () => {
    const { Email, Password } = this.state;



    if (Email === null || Password === '') {

      swal({
        title: "Login",
        text: "Please Enter valid Email or Password",
        icon: "error",
        button: "Go"
      });
    }
    else {



      firebase.auth().signInWithEmailAndPassword(Email, Password).then((userinfo => {
        if (userinfo) {
          swal({
            title: "Login",
            text: "Login Success",
            icon: "success",
            button: "Go"
          });
          this.props.history.push('/Dashboard')
        }
      }))
        .catch((error) => {
          swal({
            title: "Login",
            text: error.message,
            icon: "error",
            button: "Go"
          });
        })

    }

  }
  render() {


    return (
      <>
        <AppBar />
        <Container component="main" maxWidth="xs" style={{ marginTop: '10%' }}>
          <div style={{ margin: 10 }}>
            <center>
              <Avatar style={{ textAlign: 'center', color: 'white', backgroundColor: '#DC004E' }}>
                <LockOutlinedIcon />
              </Avatar>
            </center>

            <form className={styles.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(email) => { this.setState({ Email: email.target.value }) }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(pass) => { this.setState({ Password: pass.target.value }) }}
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
                onClick={this.handle}
              >
                Login
          </Button>

            </form>
          </div>

        </Container>
      </>
    );
  }
}
export default withStyles(styles)(Login);