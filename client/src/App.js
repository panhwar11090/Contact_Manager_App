import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navabr from './components/layout/Navbar';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import ContactState from './context/contact/ContactState';
const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navabr/>
          <div className="container">
            <Routes>
              <Route exact path='/' Component={Home}/>
              <Route exact path='/about' Component={About}/>
            </Routes>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
