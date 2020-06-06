import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers, faClipboard, faBookOpen, faBars, faUser, faAngleDown, faAngleUp, faCog, faBell, faSignOutAlt, faSpinner, faPlus, faFolder, faUserPlus, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/css/bootstrap.mod.css'
import './assets/css/main.css'
import './assets/css/login.css'
import Login from './layouts/Login'
import Dashboard from './layouts/Dashboard'
import PrivateRoute from './components/Routing/PrivateRoute'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

library.add(faUsers, faClipboard, faBookOpen, faBars, faUser, faAngleDown, faAngleUp, faCog, faBell, faSignOutAlt, faSpinner, faPlus, faFolder, faUserPlus, faFileAlt, faTrash);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser(), []);
  });

  return(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route path="**" component={Login} />
        </Switch>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
