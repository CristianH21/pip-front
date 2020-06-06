import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStudent } from '../../actions/students'
import { setAlert } from '../../actions/alert'
import { locations } from '../../assets/locations'
import States from '../../components/States/States'
import Cities from '../../components/Cities/Cities'
import { Card, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Create = ({students: {isSubmitted}, createStudent, setAlert, history}) => {

    const [formData, setFormData] = useState({
        studentNumber: '',
        firstName: '',
        lastNameFather: '',
        lastNameMother: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        country: 'México',
        zipCode: '',
        reference: '',
        password: '',
        rePassword: '',
        errors: {
            studentNumber: '',
            firstName: '',
            lastNameFather: '',
            lastNameMother: '',
            dateOfBirth: '',
            gender: '',
            password: '',
            rePassword: '' 
        }
    });

    const [location, setLocation] = useState({
        states: locations.states,
        selectedState: '',
        cities: [],
        selectedCity: ''
    });

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach( val => {
            val.length > 0 && (valid = false)
        });
        return valid;
    }

    const checkInputs = () => {
        let errors = formData.errors;
        let form = document.querySelector('form');
        for (const property in errors) {
            const element = form.querySelector(`[name='${property}']`);
            const { name, value } = element;
            switch (name) {
                case 'studentNumber':
                    errors.studentNumber = value.length < 1 ? 'Campo es requerido.' : '';
                    break; 
                case 'firstName':
                    errors.firstName = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'lastNameFather':
                    errors.lastNameFather = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'lastNameMother':
                    errors.lastNameMother = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'dateOfBirth':
                    errors.dateOfBirth = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'gender':
                    errors.gender = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'password':
                    errors.password = value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                    break;
                case 'rePassword':
                    errors.rePassword = value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                    break;
                default:
                    break;
            }
        }
        setFormData({...formData, errors})
    }

    const changeHandler = e => {
        let errors = formData.errors;
        const { name, value } = e.target;
        switch (name) {
            case 'studentNumber':
                errors.studentNumber = value.length < 1 ? 'Campo es requerido.' : '';
                break; 
            case 'firstName':
                errors.firstName = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'lastNameFather':
                errors.lastNameFather = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'lastNameMother':
                errors.lastNameMother = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'dateOfBirth':
                errors.dateOfBirth = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'gender':
                errors.gender = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'password':
                errors.password = value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                break;
            case 'rePassword':
                errors.rePassword = value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                break;
            default:
                break;
        }
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const onSelectState = e => {
        const { value } = e.target;
        setLocation({
            ...location,
            selectedState: value,
            cities: location.states.find(state => state.name === value).cities
        });
        setFormData({
            ...formData,
            state: value
        })
    }

    const onSelectCity = e => {
        const { value } = e.target;
        setFormData({
            ...formData,
            city: value
        });

        setLocation({
            ...location,
            selectedCity: value,
        });
    }
    
    const submitForm = e => {
        e.preventDefault();
        if (formData.password !== formData.rePassword) {
            return setAlert('Contraseñas no coinciden.', 'danger');
        }
        checkInputs();
        if (validateForm(formData.errors)) {
            createStudent(formData, history);
        } else {
            return;
        }     
    }
    
    return (
        <Fragment>
            <Form onSubmit={e => submitForm(e)}>
                <div className="form-header">
                    <h4>Crear estudiante</h4>
                    <Button color="primary" size="sm" disabled={isSubmitted}>
                    {
                        !isSubmitted ? 'Crear' : <FontAwesomeIcon icon="spinner" className="" spin/>
                    }
                    </Button>
                </div>
                <Card>
                    <CardBody>
                        <CardTitle>Información Personal</CardTitle>
                            <Row>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="firstName">Nombre</Label>
                                        <Input 
                                            type="text" 
                                            name="firstName" 
                                            id="firstName"
                                            bsSize="sm"
                                            value={formData.firstName}
                                            onChange={e => changeHandler(e)}
                                            invalid={formData.errors.firstName.length > 0}/>
                                        <FormFeedback>{formData.errors.firstName}</FormFeedback>    
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="lastNameFather">Apellido Paterno</Label>
                                        <Input 
                                            type="text" 
                                            name="lastNameFather" 
                                            id="lastNameFather"
                                            bsSize="sm"
                                            value={formData.lastNameFather}
                                            onChange={e => changeHandler(e)}
                                            invalid={formData.errors.lastNameFather.length > 0}/>
                                        <FormFeedback>{formData.errors.lastNameFather}</FormFeedback>   
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="lastNameMother">Apellido Materno</Label>
                                        <Input 
                                            type="text" 
                                            name="lastNameMother" 
                                            id="lastNameMother"
                                            bsSize="sm"
                                            value={formData.lastNameMother}
                                            onChange={e => changeHandler(e)}
                                            invalid={formData.errors.lastNameMother.length > 0}/>
                                        <FormFeedback>{formData.errors.lastNameMother}</FormFeedback>    
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="dateOfBirth">Fecha de nacimiento</Label>
                                        <Input 
                                            type="date" 
                                            name="dateOfBirth" 
                                            id="dateOfBirth"
                                            bsSize="sm"
                                            value={formData.dateOfBirth}
                                            onChange={e => changeHandler(e)}
                                            invalid={formData.errors.dateOfBirth.length > 0}/>
                                        <FormFeedback>{formData.errors.dateOfBirth}</FormFeedback>     
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="gender">Género</Label>
                                        <Input 
                                            type="select" 
                                            name="gender" 
                                            id="gender"
                                            bsSize="sm"
                                            value={formData.gender}
                                            onChange={e => changeHandler(e)}
                                            invalid={formData.errors.gender.length > 0}>
                                            <option value="">Seleccione género</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </Input>
                                        <FormFeedback>{formData.errors.gender}</FormFeedback> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <CardTitle>Información Recidencial</CardTitle>
                            <Row>
                                <Col sm="12">
                                    <FormGroup>
                                        <Label for="address">Domicilio</Label>
                                        <Input 
                                            type="text" 
                                            name="address" 
                                            id="address"
                                            bsSize="sm"
                                            value={formData.address}
                                            onChange={e => changeHandler(e)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <States
                                            data={location.states}
                                            selectedState={location.selectedState}
                                            onSelect={onSelectState}/>
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Cities 
                                            data={location.cities}
                                            selectedCity={location.selectedCity}
                                            onSelect={onSelectCity}/>
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="country">País</Label>
                                        <Input 
                                            type="text" 
                                            name="country" 
                                            id="country"
                                            bsSize="sm"
                                            value={formData.country}
                                            onChange={e => changeHandler(e)} disabled/>    
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="2">
                                    <FormGroup>
                                        <Label for="zipCode">Código Postal</Label>
                                        <Input 
                                            type="text" 
                                            name="zipCode" 
                                            id="zipCode"
                                            bsSize="sm"
                                            value={formData.zipCode}
                                            onChange={e => changeHandler(e)}/> 
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="10">
                                    <FormGroup>
                                        <Label for="reference">Referencia</Label>
                                        <Input 
                                            type="text" 
                                            name="reference" 
                                            id="reference"
                                            bsSize="sm"
                                            value={formData.reference}
                                            onChange={e => changeHandler(e)}/> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="studentNumber">Matrícula</Label>
                                        <Input 
                                            type="text" 
                                            name="studentNumber" 
                                            id="studentNumber"
                                            bsSize="sm"
                                            value={formData.studentNumber}
                                            onChange={e => changeHandler(e)}
                                            invalid={formData.errors.studentNumber.length > 0}/>
                                        <FormFeedback>{formData.errors.studentNumber}</FormFeedback> 
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="password">Contraseña</Label>
                                        <Input 
                                            type="password" 
                                            name="password" 
                                            id="password"
                                            bsSize="sm"
                                            value={formData.password}
                                            onChange={e => changeHandler(e)}
                                            invalid={formData.errors.password.length > 0}/>
                                        <FormFeedback>{formData.errors.password}</FormFeedback> 
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="rePassword">Repetir contraseña</Label>
                                        <Input 
                                            type="password" 
                                            name="rePassword" 
                                            id="rePassword"
                                            bsSize="sm"
                                            value={formData.rePassword}
                                            onChange={e => changeHandler(e)}
                                            invalid={formData.errors.rePassword.length > 0}/>
                                        <FormFeedback>{formData.errors.rePassword}</FormFeedback> 
                                    </FormGroup>
                                </Col>
                            </Row>
                    </CardBody>
                </Card>
            </Form>
        </Fragment>
    )
}

Create.propTypes = {
    createStudent: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
}

const mapState = state => ({
    students: state.students
});

export default connect(mapState, { createStudent, setAlert })(withRouter(Create))
