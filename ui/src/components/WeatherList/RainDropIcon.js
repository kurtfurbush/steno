import PropTypes from 'prop-types'
import icon from '../../assets/rain-drop.png'

export default function RainDropIcon({ pop }) {
    const label = `${Math.round((pop ?? 0) * 100)}%`;
    return (
        <div className="weather-detail-row-content__pop">
            <img
                className="weather-detail-row-content__pop-icon"
                src={icon}
                alt={`Probability of precipitation of ${label}`}
            />
            {label}
        </div>
    )
}

RainDropIcon.propTypes = {
    pop: PropTypes.number,
}

RainDropIcon.defaultProps = {
    pop: 0,
}
