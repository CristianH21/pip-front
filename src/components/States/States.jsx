import React from 'react'
import PropTypes from 'prop-types'

const States = ({data, onSelect, selectedState}) => {
    return (
        <div>
            <label>Estado</label>
            <select name="state" value={selectedState} className="form-control-sm form-control" onChange={e => onSelect(e)}>
                <option value="">Estado</option>
                {
                    data.map((state, index) => (
                        <option
                            key={index}
                            value={state.name}>
                            {state.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

States.propTypes = {

}

export default States
