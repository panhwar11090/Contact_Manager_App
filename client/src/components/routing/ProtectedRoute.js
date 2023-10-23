import React,{useEffect,useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

function ProtectedRoute(props) {
    const{Component} = props;
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;

    useEffect(()=>{
        if(!isAuthenticated && !loading){
            navigate('/login')
        }

    });
    return (
        <div>
            <Component/>
        </div>
    );
}

export default ProtectedRoute;
