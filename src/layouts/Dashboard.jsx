import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
  } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../actions/profile'
import { changePassword } from '../actions/auth'
import Alert from '../components/Alert/Alert'
import routes from '../utils/routes'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import logo from '../assets/img/escudo.png'


const Dashboard = (props) => {

    const { getCurrentProfile, profile: {loading}, user, changePassword, isLoading} = props;

    const password = useRef(null);
    const repassword = useRef(null);

    const [pwdForm, setPwdForm] = useState({
        password: '',
        repassword: '',
        errors: {
            password: '',
            repassword: ''
        }
    });

    useEffect(() => {
        getCurrentProfile();
    },[loading]);

    const { path } = useRouteMatch();

    const [menu, setMenu] = useState(true);
    
    const mainClass = menu ? 'main-wrapper' : 'main-wrapper hide';

    const filteredRoutes = routes.filter(route => {
        return (route.allowedRoles.includes(user.role))
    });

    const toggleMenu = () => {
        setMenu(prevState => !prevState);
    };

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach( val => {
            val.length > 0 && (valid = false)
        });
        return valid;
    };

    const checkInputs = () => {
        let errors = pwdForm.errors;
        const pwdValue = password.current.props.value;
        const rePwdValue = repassword.current.props.value;

        errors.password = pwdValue.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
        errors.repassword = rePwdValue.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : rePwdValue !== pwdForm.password ? 'Contraseña no es igual.' : '';
        setPwdForm({...pwdForm, errors})
    };

    const changeHandler = e => {
        let errors = pwdForm.errors;
        const { name, value } = e.target;
        switch (name) {
            case 'password':
                errors.password = value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                break;
            case 'repassword':
                errors.repassword = value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : value !== pwdForm.password ? 'Contraseña no es igual.' : '';
                break;
            default:
                break;
        }
        setPwdForm({...pwdForm, [e.target.name]: e.target.value})
    };

    const submitHandler = (e) => {
        e.preventDefault();
        checkInputs();
        if (validateForm(pwdForm.errors)) {
            changePassword(pwdForm.password);
        } else {
            return;
        } 
    };

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    if (user.new_user) {
        return (
            <div>
            <Modal isOpen={true}>
              <ModalBody>
                <h4 className="center-text nice-title">¡Bienvenido a nuestra plataforma!</h4>
                <div className="center-text">
                    <img className="brand-logo" src={logo} alt=""/>
                </div>
                <p>Para continuar, tiene que cambiar su contraseña.</p>
                <Form onSubmit={e => submitHandler(e)}>
                    <FormGroup>
                        <Input 
                            type="password" 
                            name="password" 
                            placeholder="Ingresa nueva contraseña"
                            ref={password}
                            value={pwdForm.password}
                            onChange={ e => changeHandler(e)}
                            invalid={pwdForm.errors.password.length > 0}/>
                        <FormFeedback>{pwdForm.errors.password}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            type="password" 
                            name="repassword" 
                            placeholder="Repeta la contraseña"
                            ref={repassword}
                            value={pwdForm.repassword}
                            onChange={ e => changeHandler(e)}
                            invalid={pwdForm.errors.repassword.length > 0}/>
                        <FormFeedback>{pwdForm.errors.repassword}</FormFeedback>
                    </FormGroup>
                    <Button color="dark" disabled={isLoading} block>
                        { !isLoading ? 'Cambiar contraseña' : <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>}
                    </Button>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        )
    }

    return (
        <div className="dashboard-wrapper">
            <Sidebar {...props} isMenu={menu} />
            <div className={mainClass}>
                <Header toggleMenu={toggleMenu}/>
                <div className="main-switch">
                    <Alert />
                    <Switch>
                        <Route exact path={path}>Dashboard</Route>
                        {
                            filteredRoutes.map( (prop, key) => {
                                return (
                                    <Route
                                    key={key}
                                    exact 
                                    path={`${path}${prop.path}`}
                                    component={prop.component} />
                                )
                            })
                        }
                        <Route path="**" Redirect="/dashboard" />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
}

const mapState = state => ({
    profile: state.profile,
    user: state.auth.user,
    isLoading: state.auth.loading
})

export default connect(mapState, {
    getCurrentProfile, changePassword 
})(Dashboard)