import React,{useState}  from 'react'
import PropTypes from 'prop-types'
import {Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginate = ({ currentPage, itemsPerPage, totalItems, paginate, toFirstPage, toNextPage, toLastPage, toPrevPage }) => {

    const [current, setCurrent] = useState();
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const isActive = (number) => (currentPage === number) ? 'active' : '';

    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first href="#!" onClick={() => toFirstPage()}/>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#!" onClick={() => toPrevPage()}/>
            </PaginationItem>
            { pageNumbers.map(number => (
                <PaginationItem key={number} className={isActive(number)}>
                    <PaginationLink 
                        href="#!"
                        onClick={() => paginate(number)}>{number}</PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem>
                <PaginationLink next href="#!" onClick={() => toNextPage()}/>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#!" onClick={() => toLastPage()}/>
            </PaginationItem>
        </Pagination>
    )
}

Paginate.propTypes = {

}

export default Paginate
