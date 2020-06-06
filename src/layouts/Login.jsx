import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap'
import { connect } from 'react-redux'
import { setAlert } from '../actions/alert'
import { signin } from '../actions/auth'
import Alert from '../components/Alert/Alert'
import logo from '../../src/logo_pip.png'

const Login = ({ setAlert, signin, auth: {isAuthenticated, loading} }) => {
    
    const [login, setLogin] = useState({
        userNumber: '',
        password: '',
        errors: {
            userNumber: '',
            password: ''
        }
    });

    const { userNumber, password } = login;

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach( val => {
            val.length > 0 && (valid = false)
        });
        return valid;
    };

    const checkInputs = () => {
        let errors = login.errors;
        let form = document.querySelector('form');
        for (const property in errors) {
            const element = form.querySelector(`[name='${property}']`);
            const { name, value } = element;
            switch (name) {
                case 'userNumber':
                    errors.userNumber = value.length < 1 ? 'Ingrese matricula.' : '';
                    break;
                case 'password':
                    errors.password = value.length < 1 ? 'Ingrese contraseña.' : '';
                    break;
                default:
                    break;
            }
        }
        setLogin({...login, errors})
    };

    const changeHandler = e => {
        let errors = login.errors;
        const { name, value } = e.target;
        switch (name) {
            case 'userNumber':
                errors.userNumber = value.length < 1 ? 'Ingrese matricula.' : '';
                break;
            case 'password':
                errors.password = value.length < 1 ? 'Ingrese contraseña.' : '';
                break;
            default:
                break;
        }
        setLogin({...login, [e.target.name]: e.target.value})
    };

    const submitHandler = (e) => {
        e.preventDefault();
        checkInputs();
        if (validateForm(login.errors)) {
            signin({userNumber, password});
        } else {
            return;
        } 
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="login-wrapper">
            <div className="login">
                <div className="login-logo">
                    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Harvard_Crimson_logo.svg/868px-Harvard_Crimson_logo.svg.png" alt=""/> */}
                    <img src={logo} alt=""/>
                </div>
                <div className="divider"></div>
                <div className="login-form">
                    <h2 className="login-form-title">Iniciar sesión</h2>
                    <Alert />
                    <Form onSubmit={ e => submitHandler(e)}>
                        <FormGroup>
                            <Label>Matrícula</Label>
                            <Input 
                                type="text" 
                                name="userNumber" 
                                placeholder="Ingresa tu matricula"
                                value={userNumber}
                                onChange={ e => changeHandler(e)}
                                invalid={login.errors.userNumber.length > 0}/>
                            <FormFeedback>{login.errors.userNumber}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input 
                                type="password" 
                                name="password" 
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={e => changeHandler(e)}
                                invalid={login.errors.password.length > 0}/>
                            <FormFeedback>{login.errors.password}</FormFeedback>
                        </FormGroup>
                        <Button color="dark" disabled={loading} block>
                            { !loading ? 'Ingresar' : <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>}
                        </Button>
                    </Form>
                    <p className="login-forgot">¿Se te olvido tu Matricula / Contraseña?</p>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapState = state => ({
    auth: state.auth
});

export default connect(
    mapState, 
    {setAlert, signin}
)(Login);
