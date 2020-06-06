import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getStudentById, updateStudent, deleteStudent } from '../../actions/students'
import { locations } from '../../assets/locations'
import States from '../../components/States/States'
import Cities from '../../components/Cities/Cities'
import { setAlert } from '../../actions/alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Input, Label, FormFeedback,
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Update = ({ 
    students: {students, loading, isSubmitted, isDeleting},
    getStudentById, updateStudent, deleteStudent, match, history
}) => {

    // ROUTE
    const { id } = match.params;

    // STATES
    const [studentForm, setStudentForm] = useState({
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

    const [trash, setTrash] = useState('');

    const [trashButton, setTrashButton] = useState(true);

    const [trashModal, setTrashModal] = useState(false);

    // EFFECTS
    useEffect(() => {
        getStudentById(id);
    }, []);

    useEffect(() => {
        console.log(students)
        setStudentForm({
            ...studentForm,
            studentNumber: loading || !students[0].student_number ? '' : students[0].student_number,
            firstName: loading || !students[0].first_name ? '' : students[0].first_name,
            lastNameFather: loading || !students[0].last_name_father ? '' : students[0].last_name_father,
            lastNameMother: loading || !students[0].last_name_mother ? '' : students[0].last_name_mother,
            dateOfBirth: loading || !students[0].date_of_birth ? '' : students[0].date_of_birth,
            gender: loading || !students[0].gender ? '' : students[0].gender,
            address: loading || !students[0].address ? '' : students[0].address,
            city: loading || !students[0].city ? '' : students[0].city,
            state: loading || !students[0].state ? '' : students[0].state,
            country: loading || !students[0].country ? '' : students[0].country,
            zipCode: loading || !students[0].zip_code ? '' : students[0].zip_code,
            reference: loading || !students[0].reference ? '' : students[0].reference
        })
        setLocation({
            ...location,
            selectedState: loading || !students[0].state ? '' : students[0].state,
            selectedCity: loading || !students[0].city ? '' : students[0].city,
            cities: loading || !students[0].state ? [] : location.states.find(state => state.name === students[0].state).cities

        })
    }, [students]);

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
        let errors = studentForm.errors;
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
                    errors.password = value.length > 0 && value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                    break;
                case 'rePassword':
                    errors.rePassword = value.length > 0 && value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                    break;
                default:
                    break;
            }
        }
        setStudentForm({...studentForm, errors})
    }

    const changeHandler = e => {
        let errors = studentForm.errors;
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
                errors.password = value.length > 0 || value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                break;
            case 'rePassword':
                errors.rePassword = value.length > 0 || value.length < 6 ? 'Contraseña tiene que contener 6 caracteres o más.' : '';
                break;
            default:
                break;
        }
        setStudentForm({...studentForm, [e.target.name]: e.target.value})
    }

    const onSelectState = e => {
        const { value } = e.target;
        console.log('Valie: ', value)
        if (value != '' && value != null) {
            setLocation({
                ...location,
                selectedState: value,
                cities: location.states.find(state => state.name === value).cities
            });
            setStudentForm({
                ...studentForm,
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
        setStudentForm({
            ...studentForm,
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
        if (studentForm.password !== studentForm.rePassword) {
            return setAlert('Contraseñas no coinciden.', 'danger');
        }
        checkInputs();
        console.log('let go')
        console.log(studentForm)
        if (validateForm(studentForm.errors)) {
           
            updateStudent(studentForm, id);
        } else {
            return;
        }     
    }

    const submitTrashForm = e => {
        e.preventDefault();
        if (trash === 'eliminar') {
            deleteStudent(id, history)
        }
    }

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    return (
        <Fragment>
            <Form onSubmit={e => submitForm(e)}>
                <div className="form-header">
                    <h4>Modificar estudiante</h4>
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
                                            value={studentForm.firstName}
                                            onChange={e => changeHandler(e)}
                                            invalid={studentForm.errors.firstName.length > 0}/>
                                        <FormFeedback>{studentForm.errors.firstName}</FormFeedback>    
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
                                            value={studentForm.lastNameFather}
                                            onChange={e => changeHandler(e)}
                                            invalid={studentForm.errors.lastNameFather.length > 0}/>
                                        <FormFeedback>{studentForm.errors.lastNameFather}</FormFeedback>   
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
                                            value={studentForm.lastNameMother}
                                            onChange={e => changeHandler(e)}
                                            invalid={studentForm.errors.lastNameMother.length > 0}/>
                                        <FormFeedback>{studentForm.errors.lastNameMother}</FormFeedback>    
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
                                            value={studentForm.dateOfBirth}
                                            onChange={e => changeHandler(e)}
                                            invalid={studentForm.errors.dateOfBirth.length > 0}/>
                                        <FormFeedback>{studentForm.errors.dateOfBirth}</FormFeedback>     
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
                                            value={studentForm.gender}
                                            onChange={e => changeHandler(e)}
                                            invalid={studentForm.errors.gender.length > 0}>
                                            <option value="">Seleccione género</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </Input>
                                        <FormFeedback>{studentForm.errors.gender}</FormFeedback> 
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
                                            value={studentForm.address}
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
                                            value={studentForm.country}
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
                                            value={studentForm.zipCode}
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
                                            value={studentForm.reference}
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
                                            value={studentForm.studentNumber}
                                            onChange={e => changeHandler(e)}
                                            invalid={studentForm.errors.studentNumber.length > 0}/>
                                        <FormFeedback>{studentForm.errors.studentNumber}</FormFeedback> 
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
                                            value={studentForm.password}
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
                                            value={studentForm.rePassword}
                                            onChange={e => changeHandler(e)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                    </CardBody>
                </Card>
            </Form>
            <div>
                <Modal isOpen={trashModal} toggle={toggleTrash}>
                    <ModalHeader toggle={toggleTrash}>Eliminar estudiante</ModalHeader>
                    <Form onSubmit={e => submitTrashForm(e)}>
                        <ModalBody>
                            <span>Antes de eliminar a este estudiante "{studentForm.firstName}", considere lo siguiente:</span>
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
    students: PropTypes.object.isRequired,
    getStudentById: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired
}

const mapState = state => ({
    students: state.students
});

export default connect(mapState, {
    getStudentById, updateStudent, deleteStudent
})(withRouter(Update))
