import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getStudents } from '../../actions/students'
import { Card, Jumbotron, Button, Input, Table } from 'reactstrap'
import Paginate from '../../components/Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Students = ({ students: {students, loading}, getStudents }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getStudents();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const toFirstPage = () => setCurrentPage(1);
    const toPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const toLastPage = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        setCurrentPage(totalPages);
    };
    const toNextPage = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const searchForm = e => setSearch(e.target.value);

    const filteredItems = students.filter( item => {
        return item.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const noData = currentItem.length < 1 ? 'No hay datos' : '';

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    if (students.length === 0 && !loading) {
        return(
            <div className="no-data-box">
                <h1 className="display-4">No hay estudiantes</h1>
                <p className="lead">Añade a tu primer estudiante.</p>
                <p className="lead">
                <Link to="/dashboard/estudiantes/crear" className="btn btn-primary">Añadir nuevo</Link>
                </p>
            </div>
        )
    }

    return (
        <Fragment>
            <div className="section-header">
                <h3>Estudiantes</h3>
                <Link to="/dashboard/estudiantes/crear" className="btn btn-primary btn-sm">
                    Añadir nuevo
                </Link>
            </div>
            <div className="search-wrapper">
                <Input 
                    type="search" 
                    name="search" 
                    id="search" 
                    placeholder="Buscar aquí..." 
                    bsSize="sm"
                    autoComplete="off"
                    onChange={e => searchForm(e)}/>
            </div>
            <div className="table-wrapper">
                <Card>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Matrícula</th>
                                <th>Nombre</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { currentItem.map( item => {
                                return(
                                    <tr key={item.id}>
                                        <td>{item.student_number}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name_father}</td>
                                        <td>{item.last_name_mother}</td>
                                        <td>
                                            <Link to={'/dashboard/estudiantes/' + item.id} >Editar</Link>
                                        </td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </Table>
                    <p className="no-data">{ noData }</p>
                </Card>
                <Paginate
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage} 
                    totalItems={filteredItems.length} 
                    paginate={paginate}
                    toFirstPage={toFirstPage}
                    toPrevPage={toPrevPage}
                    toLastPage={toLastPage}
                    toNextPage={toNextPage}/>
            </div>
        </Fragment>
    )
}

Students.propTypes = {
    students: PropTypes.object.isRequired,
    getStudents: PropTypes.func.isRequired
}

const mapState = state => ({
    students: state.students
});

export default connect(mapState, { getStudents })(Students)
