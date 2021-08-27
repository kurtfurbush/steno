

import PropTypes from 'prop-types'
import * as icons from '../../assets/uvIcons.js'

export default function UVIcon({ uvi }) {
    const uvIndex = Math.max(Math.min(Math.round(uvi ?? 0), 11), 1);
    const icon = icons.default[`icon${uvIndex}`];
    return (
        <div className="weather-main-row-content__uv">
            <img
                className="weather-main-row-content__uv-icon"
                src={icon}
                alt={`UV Index of ${uvIndex}`}
            />
        </div>
    )
}

UVIcon.propTypes = {
    uvi: PropTypes.number,
}

UVIcon.defaultProps = {
    uvi: 0,
}
