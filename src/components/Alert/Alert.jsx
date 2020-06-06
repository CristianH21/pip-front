// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'


// const Alert = ({ alerts }) => {
//     const alertArray = alerts.map( alert => {
//         <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
//     });
//     return (
//         { alertArray }
//     )
// }

// Alert.propTypes = {
//     alerts: PropTypes.array.isRequired
// }

// // Getting the main state from reducer index
// // This case we want the alert array state
// // state contains all state values from reducer index
// const mapStateToProps = state => ({
//     alerts: state.alert
// });

// export default connect(mapStateToProps)(Alert)
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => {
    const alertsArray = alerts.map( alert => <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>);
    return (
        <div>
            { alertsArray }
        </div>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapState = state => ({
  alerts: state.alert
})

export default connect(mapState)(Alert)
