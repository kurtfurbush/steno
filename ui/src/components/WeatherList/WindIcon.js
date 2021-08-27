import PropTypes from 'prop-types'
import icon from '../../assets/wind.png'

export default function WindIcon({ wind }) {
    const label = `${Math.round(wind)}mph`;
    return (
        <div className="weather-detail-row-content__wind">
            <img
                className="weather-detail-row-content__wind-icon"
                src={icon}
                alt={`Wind speed of ${label}`}
            />
            {label}
        </div>
    )
}

WindIcon.propTypes = {
    wind: PropTypes.number,
}

WindIcon.defaultProps = {
    wind: 0,
}
