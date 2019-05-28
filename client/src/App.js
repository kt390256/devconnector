import './App.css';

import React , { Fragment, useEffect } from 'react';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom';

//Component
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import Dashboard from './component/dashboard/Dashboard'
import PrivateRoute from './component/routing/PrivateRoute';
import CreateProfile from './component/profile-forms/CreateProfile';
import EditProfile from './component/profile-forms/EditProfile'
import AddExperience from './component/profile-forms/AddExperience'
import AddEducation from './component/profile-forms/AddEducation'
import Profiles from './component/profiles/Profiles'
import Profile from './component/profile/Profile'
import Posts from './component/posts/Posts'
import Post from './component/post/Post'

//Others
import { loadUser } from './action/auth'
import setAuthToken from './utils/setAuthToken'
import store from "./store.js"

    //if there is a token
if(localStorage.token) {
    //put that token into the header

    setAuthToken(localStorage.token);
}   

const App = () => {

    //replacement for componentDidMount and componentDidUpdate
    //the second arguement is an array of values(usually props)
    //IF empty, this function only run once
    //NOT empty, this will run after every render
    //If any value in the array changes, the callback will be fired after every render

    /*
        useEffect(()= > {
            return () => {
                console.log("will unmount")
            }
        })
    */ 



    //@ IMPORTANT
    //  This is what persist the log in session
    useEffect(() => {
        store.dispatch(loadUser())//this one calls the action creator directly
    }, [])
    
     return (
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path='/' component={Landing} />
                    <section className="container">
                        <Alert />
                        <Switch>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/profiles" component={Profiles} />
                            <Route exact path="/profile/:id" component={Profile} />
                            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/add-experience" component={AddExperience} />
                            <PrivateRoute exact path="/add-education" component={AddEducation} />
                            <PrivateRoute exact path="/posts" component={Posts} />
                            <PrivateRoute exact path="/posts/:id" component={Post} />
                        </Switch>
                    </section>
            </Fragment>
        </Router>
        )

}

 


export default App;
