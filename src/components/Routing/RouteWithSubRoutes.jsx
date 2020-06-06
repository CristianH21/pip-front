import React from 'react'
import {Route} from "react-router-dom";

const RouteWithSubRoutes = ({path, component: Component, routes}) => {
    return (
        <Route 
            path={path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <Component {...props} routes={routes} />
              )}
            />
    )
}

export default RouteWithSubRoutes