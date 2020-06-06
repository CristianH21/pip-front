import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSubjects } from '../../actions/subjects'
import { Card, Button, Form, FormGroup, Input, Table } from 'reactstrap'
import Paginate from '../../components/Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Materias = ({subjects: {subjects, loading}, getSubjects}) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getSubjects();
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

    const filteredItems = subjects.filter( item => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const noData = currentItem.length < 1 ? 'No hay datos' : '';

    if (loading) {
        return <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>;
    }

    if (subjects.length === 0 && !loading) {
        return(
            <div className="no-data-box">
                <h1 className="display-4">No hay materias</h1>
                <p className="lead">Añade tu primer materia.</p>
                <p className="lead">
                <Link to="/dashboard/materias/crear" className="btn btn-primary">Añadir nueva</Link>
                </p>
            </div>
        )
    }

    return (
        <Fragment>

            <div className="section-header">
                <h3>Materias</h3>
                <Link to="/dashboard/materias/crear" className="btn btn-primary btn-sm">
                    Añadir nueva
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
                                <th>Materia</th>
                                <th>Abreviación</th>
                                <th>Grado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { currentItem.map( item => {
                                return(
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.abbreviation}</td>
                                        <td>{item.grade}</td>
                                        <td>
                                            <Link to={'/dashboard/materias/' + item.id} >Editar</Link>
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

Materias.propTypes = {
    subjects: PropTypes.object.isRequired,
    getSubjects: PropTypes.func.isRequired
}

const mapState = state => ({
    subjects: state.subjects
})

export default connect(mapState, { getSubjects })(Materias)
