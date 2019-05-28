import React,{ Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { login } from '../../action/auth';

const Login = props => {

    //React hooks
    const [formData, setFormData] = useState({ //default value
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    //deconstruct state for instant access
    //you dont have to, but you ca access them like formData.name
    const { name, email, password, password2 } = formData;

    //example
    //const [count, setCount] = useState(0);
    //<p>you click {count} times</p>


    //class component
    /*<button onClick={() => this.setState({ count: this.state.count + 1})}>
      s
      functional component
      <button onClick={() => setCount(count + 1)}
    */
   //const onChange = e => setFormData({...formData, name: e.target.value});


   //using this copy object method because onChange() is being called on different 
   const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

   const onSubmit = async e => {
       e.preventDefault();
       //accessing the state directl
        props.login(email, password);
   }

   //reidrect if loggin
   if(props.isAuthenticated){
       return <Redirect to="/dashboard" />
   }

    return (
        <Fragment>
                <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
            <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
          
             
                <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email} 
                    onChange={e => onChange(e)}
                />
   
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password} 
                    onChange={e => onChange(e)}
                    minLength="6"
                />
                </div>
         
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                DOn't have an account? <Link to="/register">Sign Up</Link>
            </p>
      </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
})


const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(login(email, password))
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)
