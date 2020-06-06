import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = props => {
    const { component: Component, auth: {isAuthenticated, loading, user}, ...rest} = props;
    return (
        <Route {...rest} render={prop => !isAuthenticated && !loading ? (<Redirect to="/" />) : (<Component {...prop} />)}/>
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapState = state => ({
    auth: state.auth
})

export default connect(mapState)(PrivateRoute)
