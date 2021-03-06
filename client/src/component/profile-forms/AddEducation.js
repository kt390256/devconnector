import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addEducation } from '../../action/profile'

const AddEducation = props => {


    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        field: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, field ,from, to ,current, description } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    return (
        <>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add your education
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                    e.preventDefault()
                    props.addEducation(formData, props.history)
                    }}>
                <div className="form-group">
                <input type="text" placeholder="* School" name="school"  value={school} onChange={e => onChange(e)}required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Degree" name="degree"  value={degree} onChange={e => onChange(e)}required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field" name="field"  value={field} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" checked={current} value="" value={current} 
                    onChange={e => {
                        setFormData({...formData, current: !current})
                        toggleDisabled(!toDateDisabled);
                        }}/> Current education</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to"  value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ""}/>
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={description} onChange={e => onChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </>
    )
}

AddEducation.propTypes = {

}

export default connect(null, { addEducation })(AddEducation)
