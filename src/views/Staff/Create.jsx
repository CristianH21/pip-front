import React, {useState, Fragment} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStaff } from '../../actions/staff'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, Row, Col, Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { setAlert } from '../../actions/alert'

const Create = ({createStaff, history}) => {

    const [formData, setFormData] = useState({
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

    return (
        <div>
            crear
        </div>
    )
}

Create.propTypes = {

}

export default Create
