import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// const classes = useStyles();
const styles = {
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
};

class Bar extends Component {
  render() {

    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={styles.title}>
              Admin Login
          </Typography>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(Bar)