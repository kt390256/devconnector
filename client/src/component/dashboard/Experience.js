import React from 'react';
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../action/profile';

const Experience = props => {

    const experiences = props.experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                    ' Now'
                ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                )}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => props.deleteExperience(exp.id)}>Delete</button>
            </td>
        </tr>
    ))

    return (
        <React.Fragment>
            <h2 className="my-2">Experience Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {experiences}
                    </tbody>
                </table>
        </React.Fragment>
    )
}


export default connect(null, { deleteExperience })(Experience);
