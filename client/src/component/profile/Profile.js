import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../action/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileGithub from './ProfileGithub';
import ProfileAbout from './ProfileAbout'

const Profile = props => {

    const {
        getProfileById,
        profile: { profile, loading },
        auth,
        match
    } = props

    useEffect(() => {
        getProfileById(props.match.params.id)
    }, [getProfileById, match.params.id])

    // if(profile)
    //     if(profile.user)
    // console.log(auth.user, profile.user._id)

    return (
       <>
        {profile === null || loading ? <Spinner /> :

        <>
            <Link to="/profiles" className="btn btn-light">
                Back to profile
            </Link>
            {auth.isAuthenticated && profile.user && auth.loading === false && auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                </Link>
            )}
            <div className="profile-grid my-1">
                <ProfileTop profile={profile} user={auth.user}/>
                <ProfileAbout profile={profile} user={auth.user}/>
            </div>
            
            {profile.githubusername && (
                <ProfileGithub username={profile.githubusername}/>
            )}


        </>
    }
       </>
    )
}


const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
