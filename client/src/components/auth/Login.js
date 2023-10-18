import React,{useState} from 'react';

const Login = () => {
    
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const { email, password} = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        console.log("User Loged in")
    }


  return (
    <div className='form-container'>
        <h1>User Login</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' value={email} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={password} onChange={onChange} minLength="6"/>
            </div>
            <input type="submit" value="Login" className="btn btn-primary btn-block" />
        </form>
    </div>
  )
}

export default Login;
