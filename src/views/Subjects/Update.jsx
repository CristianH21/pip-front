import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSubjectById, updateSubject, deleteSubject } from '../../actions/subjects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Input, Label, FormFeedback,
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


function Update({ subjects: {subjects, loading, isSubmitted, isDeleting},
    getSubjectById, updateSubject, deleteSubject, match, history
}) {

    // ROUTE
    const { id } = match.params;

    // STATES
    const [subjectForm, setSubjectForm] = useState({
        name: '',
        abbreviation: '',
        grade: '',
        errors: {
            name: '',
            abbreviation: '',
            grade: '',
        }
    });

    const [trash, setTrash] = useState('');

    const [trashButton, setTrashButton] = useState(true);

    const [trashModal, setTrashModal] = useState(false);

    // EFFECTS
    useEffect(() => {
        getSubjectById(id);
    }, []);

    useEffect(() => {
        setSubjectForm({
            ...subjectForm,
            name: loading || !subjects[0].name ? '' : subjects[0].name,
            abbreviation: loading || !subjects[0].abbreviation ? '' : subjects[0].abbreviation,
            grade: loading || !subjects[0].grade ? '' : subjects[0].grade
        })
    }, [subjects]);

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
        let errors = subjectForm.errors;
        let form = document.querySelector('form');
        for (const property in errors) {
            const element = form.querySelector(`[name='${property}']`);
            const { name, value } = element;
            switch (name) {
                case 'name':
                    errors.name = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'abbreviation':
                    errors.abbreviation = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'grade':
                    errors.grade = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                default:
                    break;
            }
        }
        setSubjectForm({...subjectForm, errors})
    }

    const changeHandler = e => {
        let errors = subjectForm.errors;
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                errors.name = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'abbreviation':
                errors.abbreviation = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'grade':
                errors.grade = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            default:
                break;
        }
        setSubjectForm({...subjectForm, [e.target.name]: e.target.value})
    };

    const trashChangeHandler = e => {
        const { value } = e.target;
        setTrashButton(value === 'eliminar' ? false : true);
        setTrash(value);
    }

    const submitForm = e => {
        e.preventDefault();
        checkInputs();
        if (validateForm(subjectForm.errors)) {
            updateSubject(subjectForm, id);
        } else {
            return;
        } 
    }

    const submitTrashForm = e => {
        e.preventDefault();
        if (trash === 'eliminar') {
            deleteSubject(id, history)
        }
    }

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    return (
        <Fragment>
            <Form onSubmit={e => submitForm(e)}>
                <div className="form-header">
                    <h4>Modificar materia</h4>
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
                        <CardTitle></CardTitle>
                        <Row>
                            <Col sm="12" md="8">
                                <FormGroup>
                                    <Label for="name">Nombre</Label>
                                    <Input
                                        type="text" 
                                        name="name" 
                                        id="name"
                                        bsSize="sm"
                                        value={subjectForm.name}
                                        onChange={e => changeHandler(e)}
                                        invalid={subjectForm.errors.name.length > 0}/>
                                    <FormFeedback>{subjectForm.errors.name}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="2">
                                <FormGroup>
                                    <Label for="abbreviation">Abreviación</Label>
                                    <Input 
                                        type="text" 
                                        name="abbreviation" 
                                        id="abbreviation"
                                        bsSize="sm"
                                        value={subjectForm.abbreviation}
                                        onChange={e => changeHandler(e)}
                                        invalid={subjectForm.errors.abbreviation.length > 0}/>
                                    <FormFeedback>{subjectForm.errors.abbreviation}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="2">
                                <FormGroup>
                                    <Label for="grade">Grado</Label>
                                    <Input 
                                        type="select" 
                                        name="grade" 
                                        id="grade"
                                        bsSize="sm"
                                        value={subjectForm.grade}
                                        onChange={e => changeHandler(e)}
                                        invalid={subjectForm.errors.grade.length > 0}>
                                            <option value="">Seleciona grado</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                    </Input>
                                    <FormFeedback>{subjectForm.errors.grade}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Form>
            <div>
                <Modal isOpen={trashModal} toggle={toggleTrash}>
                    <ModalHeader toggle={toggleTrash}>Eliminar materia</ModalHeader>
                    <Form onSubmit={e => submitTrashForm(e)}>
                        <ModalBody>
                            <span>Antes de eliminar la materia "{subjectForm.name}", considere lo siguiente:</span>
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
    subjects: PropTypes.object.isRequired,
    getSubjectById: PropTypes.func.isRequired,
    updateSubject: PropTypes.func.isRequired,
    deleteSubject: PropTypes.func.isRequired
}

const mapState = state => ({
    subjects: state.subjects
});

export default connect(mapState, {
    getSubjectById, updateSubject, deleteSubject
})(withRouter(Update))

