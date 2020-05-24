import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import Error404NotFound from './components/exceptions/Error404NotFound'

class App extends Component {
  state = {
    click_outside: false
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App" onClick={()=>this.setState({...this.state, click_outside: true})}>
          <Navbar clickOutside={this.state.click_outside}/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/login' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/:text' component={Error404NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
