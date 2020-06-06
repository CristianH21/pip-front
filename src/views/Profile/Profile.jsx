import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, editCurrentProfile } from '../../actions/profile'
import ProfileFormTypes from '../../utils/ProfileFormTypes'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, 
    Form, FormGroup, Label, Input } from 'reactstrap'
import classnames from 'classnames'
import { locations } from '../../assets/locations'
import States from '../../components/States/States'
import Cities from '../../components/Cities/Cities'

const Profile = ({ 
    profile: { currentProfile, loading}, user: { user_number, user_type },
    getCurrentProfile, editCurrentProfile
    }) => {


    const [activeTab, setActiveTab] = useState('1');

    const [personalForm, setPersonalForm] = useState({
        dateOfBirth: '',
        gender: ''
    });

    const [addressForm, setAddressForm] = useState({
        address: '',
        city: '',
        state: '',
        country: 'México',
        zipCode: '',
        reference: ''
    });

    const [location, setLocation] = useState({
        states: locations.states,
        selectedState: '',
        cities: [],
        selectedCity: ''
    });

    useEffect(() => {
        getCurrentProfile();
    }, [loading]);

    useEffect(() => {
        setPersonalForm({
            first_name: loading || !currentProfile.first_name ? '' : currentProfile.first_name,
            last_name_father: loading || !currentProfile.last_name_father ? '' : currentProfile.last_name_father,
            last_name_mother: loading || !currentProfile.last_name_mother ? '' : currentProfile.last_name_mother,
            dateOfBirth: loading || !currentProfile.date_of_birth ? '' : currentProfile.date_of_birth,
            gender: loading || !currentProfile.gender ? '' : currentProfile.gender
        });
        setAddressForm({
            address: loading || !currentProfile.address ? '' : currentProfile.address,
            city: loading || !currentProfile.city ? '' : currentProfile.city,
            state: loading || !currentProfile.state ? '' : currentProfile.state,
            country: loading || !currentProfile.country ? 'Mexico' : currentProfile.country,
            zipCode: loading || !currentProfile.zip_code ? '' : currentProfile.zip_code,
            reference: loading || !currentProfile.reference ? '' : currentProfile.reference
        });
        setLocation({
            ...location,
            selectedState: currentProfile.state,
            selectedCity: currentProfile.city,
            cities: (currentProfile.state !== '' && currentProfile.state != null) ? location.states.find(state => state.name === currentProfile.state).cities : []
        });
    }, [currentProfile]);

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const changePersonalHandler = (e) => setPersonalForm({...personalForm, [e.target.name]: e.target.value});
    const changeAddressHandler = (e) => setAddressForm({...addressForm, [e.target.name]: e.target.value});

    const onPersonalSubmit = e => {
        e.preventDefault();
        editCurrentProfile(personalForm, user_type, ProfileFormTypes.PERSONAL);
    }

    const onAddressSubmit = e => {
        e.preventDefault();
        editCurrentProfile(addressForm, user_type, ProfileFormTypes.ADDRESS);
    }

    const onContactSubmit = e => {
        e.preventDefault();
    }

    const onSelectState = e => {
        const { value } = e.target;
        setLocation({
            ...location,
            selectedState: value,
            cities: value !== '' ? location.states.find(state => state.name === value).cities : []
        });
        setAddressForm({
            ...addressForm,
            state: value
        });
    }

    const onSelectCity = e => {
        const { value } = e.target;
        setLocation({
            ...location,
            selectedCity: value
        });
        setAddressForm({
            ...addressForm,
            city: value
        });

    }

    return (
        <Fragment>
            <div className="profile-header">
                <div className="header-image">
                    <img src="https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png" alt=""/>
                </div>
                <div className="header-info">
                    <div className="info-name">
                        {personalForm.first_name} {personalForm.last_name_father} {personalForm.last_name_mother}
                    </div>
                    <div className="info-usernumber">
                        Matrícula: {user_number}
                    </div>
                </div>
            </div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Información Personal
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Información Residencial
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Datos de Contacto
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <Card body>
                                <Form onSubmit={ e => onPersonalSubmit(e)}>
                                    <Row form>
                                        <Col md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="first_name">Nombre</Label>
                                                <Input 
                                                    type="text" 
                                                    name="first_name" 
                                                    id="first_name"
                                                    bsSize="sm" 
                                                    value={personalForm.first_name}
                                                    disabled/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="last_name_father">Apellido Paterno</Label>
                                                <Input 
                                                    type="text" 
                                                    name="last_name_father" 
                                                    id="last_name_father"
                                                    bsSize="sm"
                                                    value={personalForm.last_name_father}
                                                    disabled/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="last_name_mother">Apellido Paterno</Label>
                                                <Input 
                                                    type="text" 
                                                    name="last_name_mother" 
                                                    id="last_name_mother"
                                                    bsSize="sm"
                                                    value={personalForm.last_name_mother}
                                                    disabled/>
                                            </FormGroup>  
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="dateOfBirth">Fecha de nacimiento</Label>
                                                <Input 
                                                    type="date" 
                                                    name="dateOfBirth" 
                                                    id="dateOfBirth"
                                                    bsSize="sm"
                                                    value={personalForm.dateOfBirth}
                                                    onChange={e => changePersonalHandler(e)}/>
                                            </FormGroup> 
                                        </Col>
                                        <Col md={4} sm={12}>
                                            <FormGroup>
                                                <Label for="gender">Género</Label>
                                                <Input 
                                                    type="select" 
                                                    name="gender" 
                                                    id="gender"
                                                    bsSize="sm"
                                                    value={personalForm.gender}
                                                    onChange={e => changePersonalHandler(e)}>
                                                    <option>Masculino</option>
                                                    <option>Femenino</option>
                                                </Input>
                                            </FormGroup> 
                                        </Col>
                                    </Row>
                                    <Button 
                                        type="submit" 
                                        color="dark"
                                        size="sm">
                                        Actualizar
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <Card body>  
                                <CardTitle>Actualiza tu información residencial.</CardTitle>
                                <Form onSubmit={ e => onAddressSubmit(e)}>
                                    <FormGroup>
                                        <Label for="address">Domicilio</Label>
                                        <Input 
                                            type="text" 
                                            name="address" 
                                            id="address"
                                            bsSize="sm" 
                                            value={addressForm.address}
                                            onChange={e => changeAddressHandler(e)}/>
                                    </FormGroup>
                                    <Row form>
                                        <Col md={4}>
                                            <FormGroup>
                                                <States
                                                    data={location.states}
                                                    selectedState={location.selectedState}
                                                    onSelect={onSelectState}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Cities 
                                                    data={location.cities}
                                                    selectedCity={location.selectedCity}
                                                    onSelect={onSelectCity}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="country">País</Label>
                                                <Input 
                                                    type="text" 
                                                    name="country" 
                                                    id="country"
                                                    bsSize="sm"
                                                    value={addressForm.country}
                                                    onChange={e => changeAddressHandler(e)} disabled="disabled"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="zipCode">Código Postal</Label>
                                                <Input 
                                                    type="text" 
                                                    name="zipCode" 
                                                    id="zipCode"
                                                    bsSize="sm"
                                                    value={addressForm.zipCode}
                                                    onChange={e => changeAddressHandler(e)}/>
                                            </FormGroup>  
                                        </Col>
                                        <Col md={10}>
                                            <FormGroup>
                                                <Label for="reference">Referencia</Label>
                                                <Input 
                                                    type="text" 
                                                    name="reference" 
                                                    id="reference"
                                                    bsSize="sm"
                                                    value={addressForm.reference}
                                                    onChange={e => changeAddressHandler(e)}/>
                                            </FormGroup>  
                                        </Col>
                                    </Row>
                                    <Button 
                                        type="submit" 
                                        color="dark"
                                        size="sm">
                                        Actualizar
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <Card body>
                                <CardTitle></CardTitle>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}

Profile.propTypes = {  
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    editCurrentProfile: PropTypes.func.isRequired
}

const mapState = state => ({
    profile: state.profile,
    user: state.auth.user
});

export default connect(mapState, {
    getCurrentProfile,
    editCurrentProfile
})(Profile)
