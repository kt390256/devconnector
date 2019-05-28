import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = props => 
     props.alerts !== null && 
    props.alerts.length > 0 &&
    props.alerts.map( (alert, index) => {
        return (<div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
    )})

// const Alert = props => {
//     return (
//         <div key={props.alerts.id} className={`alert alert-${props.alerts.alertType}`}>
//             {props.alerts.msg}
//         </div>
//     )
// }


Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
