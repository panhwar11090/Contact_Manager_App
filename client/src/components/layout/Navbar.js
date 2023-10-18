import React from 'react';
import { PropTypes } from 'prop-types';
import {Link, link} from 'react-router-dom';
const Navabr = ({title, icon})=>{
    return(
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/>{title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </div>
    )
}

Navabr.propTypes={
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navabr.defaultProps={
    title:'Contact Management',
    icon: 'fas fa-id-card-alt'
}

export default Navabr;