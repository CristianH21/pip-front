import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, CardBody, CardFooter, CardTitle, CardSubtitle, Row, Col, Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { fetchSubjectsByStudent, fetchSubjectsByTeacher } from '../../actions/subjects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Classes = ({
    profile: {currentProfile}, subjects: {subjects, loading}, user: {role},
    fetchSubjectsByStudent, fetchSubjectsByTeacher
}) => {

    useEffect(() => {
        role === 'student' && fetchSubjectsByStudent(currentProfile.id);
        role === 'teacher' && fetchSubjectsByTeacher(currentProfile.id);
    }, []);


    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    return (
        <Fragment>
            <div className="form-header">
                <h4>Clases</h4>
            </div>
            <Row>
                {
                    subjects.map((subject, index) => (
                        <Col key={index} sm="12" md="4" className="mt-3">
                            <Card>
                                <CardBody>
                                <CardTitle>{subject.name}</CardTitle>
                                <CardSubtitle>Grupo {subject.room}"{subject.section}"</CardSubtitle>
                                </CardBody>
                                <CardFooter>
                                    <Link to={'/dashboard/clases/' + subject.class_id}>
                                        <FontAwesomeIcon icon="folder" className="fa-icon"/>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Fragment>
    )
}

Classes.propTypes = {
    profile: PropTypes.object.isRequired,
    subjects: PropTypes.object.isRequired,
    fetchSubjectsByStudent: PropTypes.func.isRequired,
    fetchSubjectsByTeacher: PropTypes.func.isRequired
}

const mapState = state => ({
    profile: state.profile,
    subjects: state.subjects,
    user: state.auth.user
});

export default connect(mapState, {fetchSubjectsByStudent, fetchSubjectsByTeacher})(Classes)
