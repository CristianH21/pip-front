import React from 'react'
import {
    Link,
    useRouteMatch
  } from 'react-router-dom'
import { connect } from 'react-redux'
import { Nav } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import routes from '../../utils/routes'


const Sidebar = ({isMenu, location, user}) => {
    const sidebarClass = isMenu ? 'sidebar' : 'sidebar hide';
    const { url } = useRouteMatch();
    
    const activeRoute = (routeName) => {
        return location.pathname === routeName ? 'active' : '';
    }

    const filteredRoutes = routes.filter( route => {
        return route.allowedRoles.includes(user.role) && route.sidebar
    })

    return (
        <div 
            className={sidebarClass}
            data-color="black">
            <div className="sidebar-logo">
                <a href="">Plataforma Escolar</a>
            </div>
            <div className="sidebar-wrapper">
                <Nav>
                    {
                        filteredRoutes.map((prop, key) => {
                            return (
                                <li key={key}>
                                    <Link to={`${url}${prop.path}`} className={activeRoute(`${url}/${prop.path}`)}>
                                        <FontAwesomeIcon icon={prop.icon} className="fa-icon"/> 
                                        {prop.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </Nav>
            </div>

        </div>

    )
}

const mapState = state => ({
    user: state.auth.user
})

export default connect(mapState)(Sidebar)


{/* <li className="">
<Link to={url} className={activeRoute('/dashboard')}>
    <FontAwesomeIcon icon="clipboard" className="fa-icon"/> 
    Dashboard
</Link>
</li>
<li className="">
<Link to={`${url}/estudiantes`} className={activeRoute('/dashboard/estudiantes')}>
    <FontAwesomeIcon icon="users" className="fa-icon"/>
    Estudantes
</Link>
</li>
<li className="">
<Link to={`${url}/grupos`} className={activeRoute('/dashboard/grupos')}>
    <FontAwesomeIcon icon="book-open" className="fa-icon"/> 
    Grupos
</Link>
</li>
<li className="">
<Link to={`${url}/materias`} className={activeRoute('/dashboard/materias')}>
    <FontAwesomeIcon icon="book-open" className="fa-icon"/> 
    Materias
</Link>
</li>
<li className="">
<Link to={`${url}/docentes`} className={activeRoute('/dashboard/docentes')}>
    <FontAwesomeIcon icon="users" className="fa-icon"/>
    Docentes
</Link>
</li> */}