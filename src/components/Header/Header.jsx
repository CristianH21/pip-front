import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Header = (props) => {
    const { logout, profile } = props;

    const { first_name, last_name_father, last_name_mother } = profile;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div className="header-wrapper">
            <FontAwesomeIcon 
                icon="bars" 
                className="fa-icon"
                onClick={props.toggleMenu}/>
            <div className="header-links">
                <Nav>
                    <li>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret tag="a" className="nav-link">
                                {first_name} {last_name_father} {last_name_mother}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem header>Perfil</DropdownItem>
                                <DropdownItem href="/dashboard/mi-perfil">
                                    <FontAwesomeIcon icon="user" className="fa-icon"/>
                                        Mi perfil
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={logout}>
                                    <FontAwesomeIcon icon="sign-out-alt" className="fa-icon"/>
                                    Cerrar sesión
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                </Nav>
            </div>
        </div>  
    )
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapState = state => ({
    profile: state.profile.currentProfile
});

export default connect(mapState, {logout})(Header)
