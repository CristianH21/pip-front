import React from 'react'
import PropTypes from 'prop-types'

const Cities = ({data, onSelect, selectedCity}) => {
    return (
        <div>
            <label>Cuidad</label>
            <select name="city" value={selectedCity} className="form-control-sm form-control" onChange={ e => onSelect(e)}>
                <option>Ciudad</option>
                {
                    data.map((city, index) => (
                        <option
                            key={index}
                            value={city.name}>
                            {city.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

Cities.propTypes = {

}

export default Cities
