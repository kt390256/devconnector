import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/*
    props : {
        component: "something something",
        auth: {
            isAuthenticated: true,
            loading: true
        }
    }//@end of props
*/ 

//{component: Component} is renaming the component from props to Component
//{component} comes from here <PrivateRoute exact path="/dashboard" component={Dashboard} />
//in this case component refers to 'Dashboard'

//Private route is basically a <Route> but with a 'render' and 'isAuthenticaed' check
/*props here looks like this {
        history: {length: 7},
        location: {pathname: "/dashboard"},
        match: {path: "/dashboard", url: "dashboard", isExact: true}
}*/
const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading}, ...rest }) => 
    <Route {...rest} render={ props => isAuthenticated ? (<Component {...props} />) : (<Redirect to="/login"/>)} />


PrivateRoute.propTypes = {

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
