import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createClassroom } from '../../actions/classrooms'
import { getTeachers } from '../../actions/teachers'
import { Card, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Create = ({classrooms: {isSubmitted}, teachers: {teachers, loading}, getTeachers, createClassroom, history}) => {

    const [formData, setFormData] = useState({
        room: '',
        section: '',
        year: '',
        staffId: '',
        errors: {
            room: '',
            section: '',
            year: '',
            staffId: '', 
        }
    });

    useEffect(() => {
        getTeachers();
    }, []);

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
    }

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

    const submitForm = e => {
        e.preventDefault();
        checkInputs();
        if (validateForm(formData.errors)) {
            createClassroom(formData, history);
        } else {
            return;
        } 
    };

    return (
        <Fragment>
            <Form onSubmit={e => submitForm(e)}>
                <div className="form-header">
                    <h4>Crear classroom</h4>
                    <Button color="primary" size="sm" disabled={isSubmitted}>
                    {
                        !isSubmitted ? 'Crear' : <FontAwesomeIcon icon="spinner" className="" spin/>
                    }
                    </Button>
                </div>
                <Card>
                    <CardBody>
                        <FormGroup>
                            <Label for="grade">Grado</Label>
                            <Input 
                                type="select" 
                                name="room" 
                                id="room"
                                bsSize="sm"
                                placeholder="2"
                                value={formData.room}
                                onChange={e => changeHandler(e)}
                                invalid={formData.errors.room.length > 0}> 
                                <option value="">Seleccione grado escolar</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </Input>
                            <FormFeedback>{formData.errors.room}</FormFeedback>
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
                                <option value="">Seleccione año escolar</option>
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
                                    <option value="">Seleccione docente</option>
                                { teachers.map(teacher => 
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.staff_number} - {teacher.first_name} {teacher.last_name_father} {teacher.last_name_mother}
                                    </option>)}
                            </Input>
                            <FormFeedback>{formData.errors.staffId}</FormFeedback>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Form> 
        </Fragment>
    )
}

Create.propTypes = {
    classrooms: PropTypes.object.isRequired,
    teachers: PropTypes.object.isRequired,
    getTeachers: PropTypes.func.isRequired,
    createClassroom: PropTypes.func.isRequired
}

const mapState = state => ({
    classrooms: state.classrooms,
    teachers: state.teachers
});

export default connect(mapState, {getTeachers, createClassroom})(withRouter(Create))
