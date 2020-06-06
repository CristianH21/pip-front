import React, { useState, useEffect, Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Input, Label,
        FormFeedback, UncontrolledCollapse, Row, Col, Table,
        Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { updateClassroom, getClassroomById, updateClassroomStudents, updateClassroomSubjects } from '../../actions/classrooms'
import { getTeachers } from '../../actions/teachers'
import { getSubjects } from '../../actions/subjects'
import { getStudents } from '../../actions/students'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Update = ({
        teachers: {teachers}, classrooms: {classrooms, loading, isSubmitted}, subjects: {subjects},
        students: {students}, getTeachers, getSubjects, getStudents, getClassroomById, updateClassroom, 
        updateClassroomStudents, updateClassroomSubjects, history, match
    }) => {

    const [searchStudents, setSearchStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [studentValue, setStudentValue] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [modalSettings, setModalSettings] = useState(false);
    const [modalAddUser, setModalAddUser] = useState(false);
    const [saveSubjects, setSaveSubjects] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        room: '',
        section: '',
        year: '',
        staffId: '',
        subjects: [],
        errors: {
            room: '',
            section: '',
            year: '',
            staffId: '', 
        }
    });

    const [studentsForm, setStudentsForm] = useState({
        classroom_id: '',
        students: [],
    });

    useEffect(() => {
        getTeachers();
        getStudents();
        getClassroomById(match.params.id);
    }, []);

    useEffect(() => {
        setFormData({
            ...formData,
            id: loading || !classrooms[0].id ? '' : classrooms[0].id,
            room: loading || !classrooms[0].room ? '' : classrooms[0].room,
            section: loading || !classrooms[0].section ? '' : classrooms[0].section,
            year: loading || !classrooms[0].year ? '' : classrooms[0].year,
            staffId: loading || !classrooms[0].staff_id ? '' : classrooms[0].staff_id,
            subjects: loading || !classrooms[0].subjects ? [] : classrooms[0].subjects
        });
        setStudentsForm({
            classroom_id: loading || !classrooms[0].id ? '' : classrooms[0].id,
            students: loading || !classrooms[0].students ? [] : classrooms[0].students
        });
        setSelectedStudents(loading || !classrooms[0].students ? [] : classrooms[0].students);
    }, [classrooms]);

    const toggleSettings = () => setModalSettings(preState => preState = !modalSettings);

    const toggleAddUser = () => setModalAddUser(preState => preState = !modalAddUser);

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach( val => {
            val.length > 0 && (valid = false)
        });
        return valid;
    };

    const checkInputs = () => {
        let errors = formData.errors;
        let form = document.querySelector('form');
        for (const property in errors) {
            const element = form.querySelector(`[name='${property}']`);
            const { name, value } = element;
            switch (name) {
                case 'room':
                    errors.room = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'section':
                    errors.section = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'year':
                    errors.year = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                case 'staffId':
                    errors.staffId = value.length < 1 ? 'Campo es requerido.' : '';
                    break;
                default:
                    break;
            }
        }
        setFormData({...formData, errors})
    };

    const changeHandler = e => {
        let errors = formData.errors;
        const { name, value } = e.target;
        switch (name) {
            case 'room':
                errors.room = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'section':
                errors.section = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'year':
                errors.year = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            case 'staffId':
                errors.staffId = value.length < 1 ? 'Campo es requerido.' : '';
                break;
            default:
                break;
        }
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const searchStudentsHandler = e => {
        const { value } = e.target;
        setStudentValue(value);
        setSearchStudents(value === '' ? [] : students.filter(student => student.student_number.toLowerCase().indexOf(value.toLowerCase()) !== -1));
    }

    const addStudent = (student, e) => {
        const { id } = student;
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedStudents([...selectedStudents, student]);
        } else {
            setSelectedStudents([...selectedStudents.filter(item => item.id !== id)])
        }
        setStudentValue('');
        setSearchStudents([]);
    };

    const subjectHandler = (e) => {
        const { value } = e.target;
        console.log(formData.subjects);
        formData.subjects.forEach(s => {
            if (s.id === value) {
                s.enable = !s.enable
            }
        });
        setFormData({
            ...formData,
            subjects: formData.subjects
        });
        setSaveSubjects(true);
    }

    const submitForm = e => {
        e.preventDefault();
        checkInputs();
        if (validateForm(formData.errors)) {
            updateClassroom(formData, history);
        } else {
            return;
        } 
    };

    const submitStudentForm = e => {
        e.preventDefault();
        const data = {
            classroom_id: formData.id,
            students: selectedStudents
        }
        updateClassroomStudents(data, history);
        toggleAddUser();
    ;}

    const saveSubjectsHandler = e => {
        const data = {
            classroom_id: formData.id,
            subjects: formData.subjects
        }
        updateClassroomSubjects(data);
        setSaveSubjects(false);
    }

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    return (
        <Fragment>
            <div className="form-header">
            <h4>Classroom {formData.room} "{formData.section}"</h4>
                <div className="button-group">
                    {
                        saveSubjects ? 
                        <Button type="button" color="primary" size="sm" disabled={isSubmitted} onClick={saveSubjectsHandler}>
                                {
                                    !isSubmitted ? 'Guardar Cambios' : <FontAwesomeIcon icon="spinner" spin/>
                                }
                        </Button> : ''
                    }
                    <Button type="button" color="secondary" size="sm" onClick={toggleSettings}>
                        <FontAwesomeIcon icon="cog"/>
                    </Button>
               </div>
            </div>
            <div className="">
                {
                    (formData.subjects.length < 1 && !loading) && 'No hay materias disponibles.'
                }
                <Row>
                    {
                        formData.subjects.map(subject => {
                            return(
                                <Col key={subject.id} className="mb-3" sm="12" md="3">
                                    <Card className="card-wrapper">
                                        <input className="c-card" type="checkbox" value={subject.id} checked={subject.enable} onChange={e => subjectHandler(e)} />
                                        <CardBody>
                                        <CardTitle>{subject.name}</CardTitle>
                                        <CardSubtitle>{subject.enable ? 'Activo' : 'Inactivo'}</CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
            <div className="section-header mt-3">
                <h4>Estudiantes</h4>
                <div className="button-group">
                    <Button type="button" color="secondary" size="sm" onClick={toggleAddUser}>
                        <FontAwesomeIcon icon="user-plus"/>
                    </Button>
               </div>
            </div>
            <div>
                { studentsForm.students.length < 1 && <p>No hay estudiantes agregados.</p> }
                {
                    studentsForm.students.map(student => (
                        <Card key={student.id} className="mb-1">
                            <CardBody>
                                <FontAwesomeIcon icon="user" />{' '}
                                {student.student_number} - {student.first_name} {student.last_name_father} {student.last_name_mother}
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
            <div>
                <Modal isOpen={modalSettings} toggle={toggleSettings} >
                    <ModalHeader toggle={toggleSettings}>Configuración de classroom</ModalHeader>
                    <Form onSubmit={e => submitForm(e)}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="grade">Grado</Label>
                                <Input 
                                    type="text" 
                                    name="room" 
                                    id="room"
                                    bsSize="sm"
                                    placeholder="2"
                                    value={formData.room}
                                    disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="section">Salón</Label>
                                <Input 
                                    type="text" 
                                    name="section" 
                                    id="section"
                                    bsSize="sm"
                                    placeholder="A"
                                    value={formData.section}
                                    onChange={e => changeHandler(e)}
                                    invalid={formData.errors.section.length > 0}/>
                                <FormFeedback>{formData.errors.section}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="year">Año</Label>
                                <Input 
                                    type="select" 
                                    name="year" 
                                    id="year"
                                    bsSize="sm"
                                    value={formData.year}
                                    onChange={e => changeHandler(e)}
                                    invalid={formData.errors.year.length > 0}>
                                    <option value="">Seleciona año escolar</option>
                                    <option value="2019/2020">2019 - 2020</option>
                                    <option value="2020/2021">2020 - 2021</option>
                                </Input>
                                <FormFeedback>{formData.errors.year}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="staffId">Docente asignado</Label>
                                <Input 
                                    type="select" 
                                    name="staffId" 
                                    id="staffId"
                                    bsSize="sm"
                                    value={formData.staffId}
                                    onChange={e => changeHandler(e)}
                                    invalid={formData.errors.staffId.length > 0}>
                                        <option value="">Seleciona docente</option>
                                    { teachers.map(teacher => 
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.staff_number} - {teacher.first_name} {teacher.last_name_father} {teacher.last_name_mother}
                                        </option>)}
                                </Input>
                                <FormFeedback>{formData.errors.staffId}</FormFeedback>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" size="sm" disabled={isSubmitted}>
                                {
                                    !isSubmitted ? 'Actualizar' : <FontAwesomeIcon icon="spinner" spin/>
                                }
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
            <div>
            <Modal isOpen={modalAddUser} toggle={toggleAddUser} >
                    <ModalHeader toggle={toggleAddUser}>Agregar estudiantes</ModalHeader>
                    <Form onSubmit={e => submitStudentForm(e)}>
                        <ModalBody>
                            <FormGroup>
                                <Input 
                                    type="search" 
                                    name="search" 
                                    placeholder="Buscar estudiante por matrícula..."
                                    bsSize="sm"
                                    autoComplete="off"
                                    value={studentValue}
                                    onChange={e => searchStudentsHandler(e)}/>
                            </FormGroup>
                            {
                                selectedStudents.map(student => {
                                    return (
                                        <div key={student.id}>
                                            <input className="" type="checkbox" checked={true} onChange={e => addStudent(student, e)}/>{' '}
                                            {student.student_number} - {student.first_name} {student.last_name_father} {student.last_name_mother}
                                        </div>
                                    )
                                })
                            }
                            {
                                searchStudents.map(student => {
                                    const isMatch = selectedStudents.find(item => item.id === student.id);
                                    if (!isMatch) {
                                        return (
                                            <div key={student.id}>
                                                <input className="" type="checkbox" checked={false} onChange={e => addStudent(student, e)}/>{' '}
                                                {student.student_number} - {student.first_name} {student.last_name_father} {student.last_name_mother}
                                            </div>
                                        )
                                    }
                                })
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" size="sm">Agregar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        </Fragment>
    )
}

Update.propTypes = {
    teachers: PropTypes.object.isRequired,
    classrooms: PropTypes.object.isRequired,
    subjects: PropTypes.object.isRequired,
    getTeachers: PropTypes.func.isRequired,
    getSubjects: PropTypes.func.isRequired,
    getStudents: PropTypes.func.isRequired,
    getClassroomById: PropTypes.func.isRequired,
    updateClassroom: PropTypes.func.isRequired,
    updateClassroomStudents: PropTypes.func.isRequired,
    updateClassroomSubjects: PropTypes.func.isRequired
}

const mapState = state => ({
    teachers: state.teachers,
    classrooms: state.classrooms,
    subjects: state.subjects,
    students: state.students
});

export default connect(mapState, {
    getTeachers, getStudents, getClassroomById, getSubjects,
    updateClassroom, updateClassroomStudents, updateClassroomSubjects
})(withRouter(Update))
