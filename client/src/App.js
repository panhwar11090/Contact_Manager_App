import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navabr from './components/layout/Navbar';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navabr/>
              <div className="container">
                <Alerts/>
                <Routes>
                  <Route exact path='/' Component={Home}/>
                  <Route exact path='/about' Component={About}/>
                  <Route exact path='/register' Component={Register}/>
                  <Route exact path='/login' Component={Login}/>
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
