import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTeacherById, updateTeacher, deleteTeacher } from '../../actions/teachers'
import { locations } from '../../assets/locations'
import States from '../../components/States/States'
import Cities from '../../components/Cities/Cities'
import { setAlert } from '../../actions/alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Input, Label, FormFeedback,
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Update = ({ 
    teachers: {teachers, loading, isSubmitted, isDeleting},
    getTeacherById, updateTeacher, deleteTeacher, match, history
}) => {

    // ROUTE
    const { id } = match.params;

    // STATES
    const [teacherForm, setTeacherForm] = useState({
        staffNumber: '',
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
            staffNumber: '',
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

    const [trash, setTrash] = useState('');

    const [trashButton, setTrashButton] = useState(true);

    const [trashModal, setTrashModal] = useState(false);

    // EFFECTS
    useEffect(() => {
        getTeacherById(id);
    }, []);

    useEffect(() => {
        
        setTeacherForm({
            ...teacherForm,
            staffNumber: loading || !teachers[0].staff_number ? '' : teachers[0].staff_number,
            firstName: loading || !teachers[0].first_name ? '' : teachers[0].first_name,
            lastNameFather: loading || !teachers[0].last_name_father ? '' : teachers[0].last_name_father,
            lastNameMother: loading || !teachers[0].last_name_mother ? '' : teachers[0].last_name_mother,
            dateOfBirth: loading || !teachers[0].date_of_birth ? '' : teachers[0].date_of_birth,
            gender: loading || !teachers[0].gender ? '' : teachers[0].gender,
            address: loading || !teachers[0].address ? '' : teachers[0].address,
            city: loading || !teachers[0].city ? '' : teachers[0].city,
            state: loading || !teachers[0].state ? '' : teachers[0].state,
            country: loading || !teachers[0].country ? '' : teachers[0].country,
            zipCode: loading || !teachers[0].zip_code ? '' : teachers[0].zip_code,
            reference: loading || !teachers[0].reference ? '' : teachers[0].reference
        })
        setLocation({
            ...location,
            selectedState: loading || !teachers[0].state ? '' : teachers[0].state,
            selectedCity: loading || !teachers[0].city ? '' : teachers[0].city,
            cities: loading || !teachers[0].state ? [] : location.states.find(state => state.name === teachers[0].state).cities
        })
    }, [teachers]);

    // ACTIONS
    const toggleTrash = () => setTrashModal( prevState => prevState = !trashModal);

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach( val => {
            val.length > 0 && (valid = false)
        });
        return valid;
    }

    const checkInputs = () => {
        let errors = teacherForm.errors;
        let form = document.querySelector('form');
        for (const property in errors) {
            const element = form.querySelector(`[name='${property}']`);
            const { name, value } = element;
            switch (name) {
                case 'staffNumber':
                    errors.staffNumber = value.length < 1 ? 'Campo es requerido.' : '';
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
                    errors.password = value.length > 0 && value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                    break;
                case 'rePassword':
                    errors.rePassword = value.length > 0 && value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                    break;
                default:
                    break;
            }
        }
        setTeacherForm({...teacherForm, errors})
    }

    const changeHandler = e => {
        let errors = teacherForm.errors;
        const { name, value } = e.target;
        switch (name) {
            case 'staffNumber':
                errors.staffNumber = value.length < 1 ? 'Campo es requerido.' : '';
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
                errors.password = value.length > 0 || value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                break;
            case 'rePassword':
                errors.rePassword = value.length > 0 || value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                break;
            default:
                break;
        }
        setTeacherForm({...teacherForm, [e.target.name]: e.target.value})
    }

    const onSelectState = e => {
        const { value } = e.target;
        if (value != '' && value != null) {
            setLocation({
                ...location,
                selectedState: value,
                cities: location.states.find(state => state.name === value).cities
            });
            setTeacherForm({
                ...teacherForm,
                state: value
            });
        }
    }

    const onSelectCity = e => {
        const { value } = e.target;
        setLocation({
            ...location,
            selectedCity: value,
        });
        setTeacherForm({
            ...teacherForm,
            city: value
        });
    }

    const trashChangeHandler = e => {
        const { value } = e.target;
        setTrashButton(value === 'eliminar' ? false : true);
        setTrash(value);
    }

    const submitForm = e => {
        e.preventDefault();
        if (teacherForm.password !== teacherForm.rePassword) {
            return setAlert('Contraseñas no coinciden.', 'danger');
        }
        checkInputs();
        console.log('let go')
        console.log(teacherForm)
        if (validateForm(teacherForm.errors)) {
            updateTeacher(teacherForm, id);
        } else {
            return;
        }     
    }

    const submitTrashForm = e => {
        e.preventDefault();
        if (trash === 'eliminar') {
            deleteTeacher(id, history)
        }
    }

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    return (
        <Fragment>
            <Form onSubmit={e => submitForm(e)}>
                <div className="form-header">
                    <h4>Modificar docente</h4>
                    <div className="button-group">
                        <Button type="button" color="secondary" size="sm" onClick={toggleTrash}>
                            <FontAwesomeIcon icon="trash" className=""/>
                        </Button>
                        <Button color="primary" size="sm" disabled={isSubmitted}>
                            {
                                !isSubmitted ? 'Actualizar' : <FontAwesomeIcon icon="spinner" className="" spin/>
                            }
                        </Button>
                    </div>

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
                                            value={teacherForm.firstName}
                                            onChange={e => changeHandler(e)}
                                            invalid={teacherForm.errors.firstName.length > 0}/>
                                        <FormFeedback>{teacherForm.errors.firstName}</FormFeedback>    
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
                                            value={teacherForm.lastNameFather}
                                            onChange={e => changeHandler(e)}
                                            invalid={teacherForm.errors.lastNameFather.length > 0}/>
                                        <FormFeedback>{teacherForm.errors.lastNameFather}</FormFeedback>   
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
                                            value={teacherForm.lastNameMother}
                                            onChange={e => changeHandler(e)}
                                            invalid={teacherForm.errors.lastNameMother.length > 0}/>
                                        <FormFeedback>{teacherForm.errors.lastNameMother}</FormFeedback>    
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
                                            value={teacherForm.dateOfBirth}
                                            onChange={e => changeHandler(e)}
                                            invalid={teacherForm.errors.dateOfBirth.length > 0}/>
                                        <FormFeedback>{teacherForm.errors.dateOfBirth}</FormFeedback>     
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
                                            value={teacherForm.gender}
                                            onChange={e => changeHandler(e)}
                                            invalid={teacherForm.errors.gender.length > 0}>
                                            <option value="">Seleccione género</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </Input>
                                        <FormFeedback>{teacherForm.errors.gender}</FormFeedback> 
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
                                            value={teacherForm.address}
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
                                            value={teacherForm.country}
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
                                            value={teacherForm.zipCode}
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
                                            value={teacherForm.reference}
                                            onChange={e => changeHandler(e)}/> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm="12" md="4">
                                    <FormGroup>
                                        <Label for="staffNumber">Matrícula</Label>
                                        <Input 
                                            type="text" 
                                            name="staffNumber" 
                                            id="staffNumber"
                                            bsSize="sm"
                                            value={teacherForm.staffNumber}
                                            onChange={e => changeHandler(e)}
                                            invalid={teacherForm.errors.staffNumber.length > 0}/>
                                        <FormFeedback>{teacherForm.errors.staffNumber}</FormFeedback> 
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
                                            value={teacherForm.password}
                                            onChange={e => changeHandler(e)}/>
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
                                            value={teacherForm.rePassword}
                                            onChange={e => changeHandler(e)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                    </CardBody>
                </Card>
            </Form>
            <div>
                <Modal isOpen={trashModal} toggle={toggleTrash}>
                    <ModalHeader toggle={toggleTrash}>Eliminar docente</ModalHeader>
                    <Form onSubmit={e => submitTrashForm(e)}>
                        <ModalBody>
                            <span>Antes de eliminar a este docente "{teacherForm.firstName}", considere lo siguiente:</span>
                            <ul className="ul-list">
                                <li>Esta materia ya no estará disponible para docentes ni estudiantes.</li>
                                <li>Esta materia ya no estará disponible para agregar en classroom.</li>
                            </ul>
                            <p className="mt-3">Escriba la palabra "eliminar" para confirmar la eliminación:</p>
                            <FormGroup>
                                <Input 
                                    type="text"
                                    bsSize="sm"
                                    placeholder="eliminar"
                                    value={trash}
                                    onChange={e => trashChangeHandler(e)}/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="danger" size="sm" disabled={trashButton || isDeleting} block>
                                {
                                    !isDeleting ? 'Eliminar' : <FontAwesomeIcon icon="spinner" className="" spin/>
                                }
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        </Fragment>
    )
}

Update.propTypes = {
    teachers: PropTypes.object.isRequired,
    getTeacherById: PropTypes.func.isRequired,
    updateTeacher: PropTypes.func.isRequired,
    deleteTeacher: PropTypes.func.isRequired
}

const mapState = state => ({
    teachers: state.teachers
});

export default connect(mapState, {
    getTeacherById, updateTeacher, deleteTeacher
})(withRouter(Update))
