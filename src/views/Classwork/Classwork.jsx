import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTeacherClasswork, getStudentsClasswork, createPeriod, createAssignment } from '../../actions/classwork'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,
        Input, Label, FormFeedback, Card, CardBody, UncontrolledCollapse, CardHeader, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Classwork = ({
    classwork: {classwork, loading}, user: { role },
    getTeacherClasswork, getStudentsClasswork, createPeriod, createAssignment, match
}) => {

    const classId = match.params.id;

    const [modal, setModal] = useState(false);
    const [assignmentModal, setAssignmentModal] = useState(false);

    const [periodForm, setPeriodForm] = useState({
        name: '',
        errors: {
            name: ''
        }
    });

    const [assignment, setAssignment] = useState({
        type: '',
        title: '',
        instructions: '',
        points: '',
        dueDate: '',
        periodId: '',
        periodName: '',
        errors: {
            type: '',
            title: '',
            instructions: '' 
        }
    });

    const [classworkModal, setClassworkModal] = useState([]);

    useEffect(() => {
        role === 'student' && getStudentsClasswork(classId);
        role === 'teacher' && getTeacherClasswork(classId);
    }, []);

    useEffect(() => {
        setClassworkModal(classwork);
    }, [classwork]);

    const toggle = () => setModal(!modal);

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach( val => {
            val.length > 0 && (valid = false)
        });
        return valid;
    };

    const checkInputs = () => {
        let errors = periodForm.errors;
        let form = document.querySelector('form');
        for (const property in errors) {
            const element = form.querySelector(`[name='${property}']`);
            const { name, value } = element;
            switch (name) {
                case 'name':
                    errors.name = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                default:
                    break;
            }
        }
        setPeriodForm({...periodForm, errors})
    };

    const changeHandler = e => {
        let errors = periodForm.errors;
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                errors.name = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            default:
                break;
        }
        setPeriodForm({...periodForm, [e.target.name]: e.target.value})
    };

    const assignmentCheckInputs = () => {
        let errors = assignment.errors;
        let form = document.querySelector('form');
        for (const property in errors) {
            const element = form.querySelector(`[name='${property}']`);
            const { name, value } = element;
            switch (name) {
                case 'title':
                    errors.title = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                default:
                    break;
            }
        }
        setAssignment({...assignment, errors})
    };

    const assignmentChangeHandler = e => {
        let errors = assignment.errors;
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                errors.title = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            default:
                break;
        }
        setAssignment({...assignment, [e.target.name]: e.target.value})
    };

    const toggleAssignmentModal = (periodId, periodName) => {
        setAssignmentModal( prevState => prevState = !assignmentModal);
        setAssignment({...assignment, periodId, periodName});
    }

    const addAssignment = e => {
        e.preventDefault();
        console.log('Form submmited: ', assignment);
        createAssignment(assignment, classId);
    };

    const submitForm = e => {
        e.preventDefault();
        checkInputs();
        if (validateForm(periodForm.errors)) {
            createPeriod(periodForm, classId);
        } else {
            return;
        } 
    }

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    if (classwork.length < 1 && !loading) {
        return <p>500: No encontramos datos de classroom, verifique su conexión.</p>;
    }

    return (
        <Fragment>
            <div className="section-header">
                <h4>Materia</h4>
                {
                    role === 'teacher' && <Button color="primary" size="sm" onClick={toggle}>Crear Período</Button>
                }     
            </div>
            {
                classwork.map(value => (
                    <Card key={value.id} className="mt-3">
                        <CardHeader>
                            <span>
                                Perído: {value.name}
                            </span>
                            {
                                role === 'teacher' &&
                                <Button color="secondary" size="sm" onClick={() => toggleAssignmentModal(value.id, value.name)}>
                                    <FontAwesomeIcon icon="plus" />
                                </Button>
                            }
                        </CardHeader>
                        <CardBody className="no-padding">
                            {
                                value.assignments.map(assignment => (
                                    <div key={assignment.id} className="classwork-item">
                                        <div className="classwork-item__flex">
                                            <FontAwesomeIcon icon="file-alt" className="classwork-item__icon"/>
                                            <div>
                                                <span className="classwork-item__title">
                                                    <Link to={`/dashboard/asignacion/${assignment.id}`}>
                                                        {assignment.title}
                                                    </Link>
                                                </span>
                                                <span className="classwork-item__subtitle">
                                                {
                                                    assignment.date_registered
                                                }
                                                {
                                                    assignment.delivered != null && ' | Entregado'
                                                }
                                                    
                                                </span>
                                            </div>
                                        </div>
                                        <div className="classwork-item__flex">
                                            {
                                               assignment.delivered != null &&  <FontAwesomeIcon icon="check" className="classwork-item__icon__end checked"/>
                                            }
                                            {
                                                role === 'teacher' &&
                                                <Button color="secondary" size="sm" onClick={() => toggleAssignmentModal(value.id, value.name)}>
                                                    <FontAwesomeIcon icon="users" />
                                                </Button>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </CardBody>
                    </Card>
                ))
            }
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Crear período</ModalHeader>
                    <Form onSubmit={e => submitForm(e)}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Nombre</Label>
                                <Input 
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    bsSize="sm"
                                    placeholder="1"
                                    value={periodForm.name}
                                    onChange={e => changeHandler(e)}
                                    invalid={periodForm.errors.name.length > 0}/>
                                <FormFeedback>{periodForm.errors.name}</FormFeedback>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" size="sm">Crear</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
            <div>
                <Modal isOpen={assignmentModal} toggle={toggleAssignmentModal} size="lg">
                    <ModalHeader toggle={toggleAssignmentModal}>Asignar actividad a período: {assignment.periodName}</ModalHeader>
                    <Form onSubmit={e => addAssignment(e)}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="type">Tipo</Label>
                            <Input 
                                type="select" 
                                name="type" 
                                id="type"
                                bsSize="sm"
                                value={assignment.type}
                                onChange={e => assignmentChangeHandler(e)}
                                invalid={assignment.errors.type.length > 0}>
                                    <option value="">Seleciona asignación</option>
                                    <option value="actividad">Actividad</option>
                            </Input>
                            <FormFeedback>{assignment.errors.type}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Encabezado</Label>
                            <Input 
                                type="text" 
                                name="title" 
                                id="title"
                                bsSize="sm"
                                value={assignment.title}
                                onChange={e => assignmentChangeHandler(e)}
                                invalid={assignment.errors.title.length > 0}/>
                            <FormFeedback>{assignment.errors.title}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="instructions">Instrucciones</Label>
                            <Input 
                                type="textarea" 
                                name="instructions" 
                                id="instructions"
                                row="10"
                                placeholder="Descripción de la actividad..." 
                                onChange={e => assignmentChangeHandler(e)}
                                invalid={assignment.errors.instructions.length > 0}/>
                            <FormFeedback>{assignment.errors.instructions}</FormFeedback>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" size="sm">Crear</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
            </div>
        </Fragment>
    )
}

Classwork.propTypes = {
    classwork: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getTeacherClasswork: PropTypes.func.isRequired,
    getStudentsClasswork: PropTypes.func.isRequired,
    createPeriod: PropTypes.func.isRequired,
    createAssignment: PropTypes.func.isRequired
}

const mapState = state => ({
    classwork: state.classwork,
    user: state.auth.user
});

export default connect(mapState, {getTeacherClasswork, getStudentsClasswork, createPeriod, createAssignment})(withRouter(Classwork))
