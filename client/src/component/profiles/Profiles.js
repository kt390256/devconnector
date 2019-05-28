import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../action/profile'

const Profiles = props=> {

    const {
        getProfiles,
        profile: {
            profile, loading
        }
    } = props;

    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return <React.Fragment>
            {loading ? <Spinner /> 
                     : 
                <>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i>
                    Browse and connect with Developers
                </p>
                <div className="profiles">
                    {profile !== null && profile.length > 0 ? (
                       profile.map(prof => (
                            <ProfileItem key={prof._id} profile={prof} />
                        ))
                    ): (
                       <Spinner />
                    )}
                </div>
                </>
            }
        </React.Fragment>
       
}


const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
