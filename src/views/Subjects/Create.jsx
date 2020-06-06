import React, { useState, useEffect, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createSubject } from '../../actions/subjects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap'


const Create = ({subjects: {isSubmitted}, createSubject, history}) => {

    const [formData, setFormData] = useState({
        name: '',
        abbreviation: '',
        grade: '',
        errors: {
            name: '',
            abbreviation: '',
            grade: ''
        }
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
        setFormData({...formData, errors})
    }

    const changeHandler = e => {
        let errors = formData.errors;
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
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const submitForm = e => {
        e.preventDefault();
        checkInputs();
        console.log(formData);
        if (validateForm(formData.errors)) {
            createSubject(formData, history);
        } else {
            return;
        } 
    };

    return (
        <Fragment>
            <Form onSubmit={e => submitForm(e)}>
                <div className="form-header">
                    <h4>Crear materia</h4>
                    <Button color="primary" size="sm" disabled={isSubmitted}>
                    {
                        !isSubmitted ? 'Crear' : <FontAwesomeIcon icon="spinner" className="" spin/>
                    }
                    </Button>
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
                                        value={formData.name}
                                        onChange={e => changeHandler(e)}
                                        invalid={formData.errors.name.length > 0}/>
                                    <FormFeedback>{formData.errors.name}</FormFeedback>
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
                                        value={formData.abbreviation}
                                        onChange={e => changeHandler(e)}
                                        invalid={formData.errors.abbreviation.length > 0}/>
                                    <FormFeedback>{formData.errors.abbreviation}</FormFeedback>
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
                                        value={formData.grade}
                                        onChange={e => changeHandler(e)}
                                        invalid={formData.errors.grade.length > 0}>
                                            <option value="">Seleciona grado</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                    </Input>
                                    <FormFeedback>{formData.errors.grade}</FormFeedback>
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
    subjects: PropTypes.object.isRequired,
    createSubject: PropTypes.func.isRequired
}

const mapState = state => ({
    subjects: state.subjects
});

export default connect(mapState, { createSubject })(withRouter(Create))
