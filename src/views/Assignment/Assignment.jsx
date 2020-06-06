import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAssignmentById } from '../../actions/assignment'
import { getAssignmentByStudent } from '../../actions/studentassignment'
import { uploadAssignment } from '../../actions/students'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,
    Input, Label, FormFeedback, FormText } from 'reactstrap';

function Assignment({
    assignment: {assignment, loading}, profile: {currentProfile}, studentassignment: {studentassignment},
    getAssignmentById, getAssignmentByStudent, uploadAssignment, match, history
}) {

    const assignmentId = match.params.id;

    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('');

    useEffect(() => {
        getAssignmentById(assignmentId);
        getAssignmentByStudent(assignmentId, currentProfile.id)
    }, []);

    const toggle = () => setModal(prevState => prevState = !modal);

    const changeHandler = e => {
        setFile(e.target.files[0]);
    };

    const submitForm = e => {
        e.preventDefault();
        uploadAssignment(file, assignmentId, currentProfile.id);
        setModal(prevState => prevState = !modal);
    }

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    if (assignment.length < 1 && !loading) {
        return <p>500: No encontramos datos de esta asignación, verifique su conexión.</p>;
    }

    if (studentassignment != null) {
        return (
            <Fragment>
                <div className="form-header">
                    <Button size="sm" onClick={history.goBack}>Regresar</Button>
                    <Button color="primary" size="sm" onClick={toggle}> Subir Tarea </Button>
                </div>
                <div className="assignment-container">
                    <h3 className="assignment-header">{ assignment.title} </h3>
                    <hr/>
                    <p className="assignment-instructions">INTRUCCIONES: {assignment.instructions}</p>
                </div>
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Subir Tarea</ModalHeader>
                        <Form onSubmit={e => submitForm(e)}>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="fileObj">Archivo</Label>
                                    <Input 
                                        type="file" 
                                        bsSize="sm"
                                        onChange={e => changeHandler(e)}/>
                                    <FormText color="muted">
                                        Formatos permitidos: PDF, DOC, DOCX, JPEG, JPG.
                                    </FormText>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button type="submit" color="primary" size="sm">Subir</Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
                </div>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <div className="form-header">
                <Button size="sm" onClick={history.goBack}>Regresar</Button>
            </div>
            <div className="assignment-container">
                <h3 className="assignment-header">{ assignment.title} </h3>
                <hr/>
                <p className="assignment-instructions">INTRUCCIONES: {assignment.instructions}</p>
            </div>
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Subir Tarea</ModalHeader>
                    <Form onSubmit={e => submitForm(e)}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="fileObj">Archivo</Label>
                                <Input 
                                    type="file" 
                                    bsSize="sm"
                                    onChange={e => changeHandler(e)}/>
                                <FormText color="muted">
                                    Formatos permitidos: PDF, DOC, DOCX, JPEG, JPG.
                                </FormText>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" size="sm">Subir</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        </Fragment>
    )
}

Assignment.propTypes = {
    assignment: PropTypes.object.isRequired,
    studentassignment: PropTypes.object.isRequired,
    getAssignmentById: PropTypes.func.isRequired,
    uploadAssignment: PropTypes.func.isRequired,
    getAssignmentByStudent: PropTypes.func.isRequired
}


const mapState = state => ({
    assignment: state.assignment,
    profile: state.profile,
    studentassignment: state.studentassignment
});

export default connect(mapState, {getAssignmentById, uploadAssignment, getAssignmentByStudent})(withRouter(Assignment))

