import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getStaff } from '../../actions/staff'
import { Card, Input, Table } from 'reactstrap'
import Paginate from '../../components/Pagination/Pagination'

const Staff = ({ staff: {staff, loading }, getStaff }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getStaff();
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

    const filteredItems = staff.filter( item => {
        return item.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const noData = currentItem.length < 1 ? 'No hay datos' : '';

    if (staff.length === 0 && !loading) {
        return(
            <div className="no-data-box">
                <h1 className="display-4">No hay personal</h1>
                <p className="lead">Añade a tu primer personal.</p>
                <p className="lead">
                <Link to="/dashboard/personal/crear" className="btn btn-primary">Añadir nuevo</Link>
                </p>
            </div>
        )
    }
    
    return (
        <Fragment>
            <h3>
                Personal {' '}
                <Link to="/dashboard/personal/crear" className="btn btn-primary btn-sm">
                    Añadir nuevo
                </Link>
            </h3>
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
                                        <td>{item.staff_number}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name_father}</td>
                                        <td>{item.last_name_mother}</td>
                                        <td>
                                            <Link to={'/dashboard/personal/editar/' + item.staff_number} >Editar</Link>
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

Staff.propTypes = {
    staff: PropTypes.object.isRequired,
    getStaff: PropTypes.func.isRequired
}

const mapState = state => ({
    staff: state.staff
});

export default connect(mapState, { getStaff })(Staff)
