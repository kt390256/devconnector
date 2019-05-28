import React,{ Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert.js'
import { register } from '../../action/auth.js'

const Register = props => {

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
       //accessing the state directly
       if(password !== password2){
          props.setAlert("Password do not match", 'danger', 3000);
       } else {
          props.register({ name, email, password })
       }
   }

   if(props.isAuthenticated){
        return <Redirect to="/dashboard" />
   }

    return (
        <Fragment>
                <h1 className="large text-primary">Sign Up</h1>
                 <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name} 
                        onChange= {e => onChange(e)} 
                     />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email} 
                        onChange={e => onChange(e)}
                    />
                <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password} 
                    onChange={e => onChange(e)}
                    //minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={password2} 
                    onChange={e => onChange(e)}
                    name="password2"
                    //minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
      </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
})

const mapDispatchToProps = dispatch => ({
    setAlert: (msg, alertType, timeout) => dispatch(setAlert(msg, alertType, timeout)),
    register: (name, email, password) => dispatch(register(name, email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
