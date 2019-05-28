import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {getCurrentProfile} from '../../action/profile';
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardAction';
import Experience from './Experience'
import Education from './Education'

const Dashboard = props => {

    const { profile: {profile, loading }} = props;
   
    useEffect(() => {
        props.getCurrentProfile()
    }, [])

    return props.loading && props.profile === null ?  <Spinner /> : 
        <Fragment> 
            <h1 className="large text-primary">DashBoard</h1>
             <p className="lead">
                <i className="fas fa-user"></i>
                    Welcome <strong>{ props.auth.user && props.auth.user.name }</strong>
             </p>

             {profile !== null ? 
             <Fragment>
                 <DashboardAction />
                 <Experience experience={profile.experience}/>
                 <Education education={profile.education} />
             </Fragment>
             :
             <Fragment>
             <p>you have not yet setup a profile, please add some info</p>
             <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
            </Link>
         </Fragment> 
            }
         </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
})

const mapDispatchToProps = dispatch => ({
    getCurrentProfile: () => dispatch(getCurrentProfile()) 
})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
