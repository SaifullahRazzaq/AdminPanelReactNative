import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/VideoCallOutlined';
import PeopleIcon from '@material-ui/icons/EventAvailableOutlined';
import BarChartIcon from '@material-ui/icons/LiveTvOutlined';
import CategoryIcon from '@material-ui/icons/Category';
import LayersIcon from '@material-ui/icons/ExitToAppOutlined';
import DuaIcon from '@material-ui/icons/ScheduleOutlined'
import '../App.css';
import Home from './Home';
import Bayan from './Bayan';
import Dua from './Dua';
import Event from './Event';
import Category from './Category';
import Live from './LiveBayan';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  
  root: {
    display: 'flex',
    // backgroundColor:'#27293D',
  
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    

  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#1E1E2E',
    border:'2px solid #1E1E2E' 
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [component, setComponent] = React.useState('Home')


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{backgroundColor:'#1E1E2E'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer 
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton  onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon style={{color:'white',fontWeight:'bold'}}/> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider/>
        <div style={{backgroundColor:''}}>
    <ListItem button onClick={() => setComponent('Home')}>
      <ListItemIcon >
        <DashboardIcon style={{color:'white',fontWeight:'bold'}} />
      </ListItemIcon>
      <ListItemText primary="Home" style={{color:'white',fontWeight:'bold'}} />
    </ListItem>
    <ListItem button onClick={() => setComponent('Bayan')}>
      <ListItemIcon>
        <ShoppingCartIcon  style={{color:'white',fontWeight:'bold'}}/>
      </ListItemIcon>
      <ListItemText primary="Bayaan Section" style={{color:'white',fontWeight:'bold'}}/>
    </ListItem>

    <ListItem button onClick={() => setComponent('Dua')}>
      <ListItemIcon>
        <DuaIcon style={{color:'white',fontWeight:'bold'}} />
      </ListItemIcon>
      <ListItemText primary="Dua Section" style={{color:'white',fontWeight:'bold'}}/>
    </ListItem>
    <ListItem button onClick={() => setComponent('Event')}> 
      <ListItemIcon>
        <PeopleIcon  style={{color:'white',fontWeight:'bold'}}/>
      </ListItemIcon>
      <ListItemText primary="Event Section"  style={{color:'white',fontWeight:'bold'}}/>
    </ListItem>

    <ListItem button onClick={() => setComponent('Live')}>
      <ListItemIcon >
        <BarChartIcon style={{color:'white',fontWeight:'bold'}} />
      </ListItemIcon>
      <ListItemText primary="Live Bayan"  style={{color:'white',fontWeight:'bold'}}/>
    </ListItem>

    

    <ListItem button onClick={() => setComponent('Category')}>
      <ListItemIcon >
        <CategoryIcon  style={{color:'white',fontWeight:'bold'}} />
      </ListItemIcon>
      <ListItemText primary="Category"  style={{color:'white',fontWeight:'bold'}}/>
    </ListItem>
    
    <ListItem button onClick={() =>{props.history.push('/')}}>
      <ListItemIcon >
        <LayersIcon  style={{color:'white',fontWeight:'bold'}}/>
      </ListItemIcon>
      <ListItemText primary="Logout"  style={{color:'white',fontWeight:'bold'}} />
    </ListItem>
  </div>
        <Divider />
       
      </Drawer>
      
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      
      {component ==='Home' ? 
      <Home/>

      :
    
      component ==='Bayan' ? 
      <Bayan/>
      :
      component ==='Dua' ? 
      
    <Dua/>
  :
  component ==='Event' ? 
  
<Event/>
:
component ==='Category' ? 
  
<Category/>
  :
  component ==='Live' ? 
  
<Live/>
:
  null}
    
  
    
    
      </main>
    </div>
  );
}