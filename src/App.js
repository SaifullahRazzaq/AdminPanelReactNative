import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/DashBoard';
import Home from './Component/Home';
import Bayan from './Component/Bayan';
import Dua from './Component/Dua';
import './App.css';
import Category from './Component/Category';
import Event from './Component/Event';



class App extends Component {
  render() {
    return (
   

    <Router>
   <div >
   
  
        <Switch >
              <Route exact path ='/' component={Login} />
              <Route path='/Dashboard' component={Dashboard} />
              <Route path='/Home' component={Home} />
              <Route path="/Bayan" component={Bayan}/>
              <Route path="/Dua" component={Dua}/>
              <Route path="/Category" component={Category}/>
              <Route path='/Event' component={Event} />
              {/* <Route path='/MyRequest' component={MyRequest}/> */}
          
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App