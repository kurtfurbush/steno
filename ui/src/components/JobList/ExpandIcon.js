

import PropTypes from 'prop-types'
import chevronIcon from '../../assets/chevron.png'

// Certain re-usable components like this would be moved out to a generic component not tied to the consumer's styles
export default function ExpandIcon({ direction }) {
    const imgCn = `weather-main-row-content__expand-icon weather-main-row-content__expand-icon--${direction}`;
    return (
        <div className="weather-main-row-content__expand">
            <img
                className={imgCn}
                src={chevronIcon}
                alt={`collapse arrow`}
            />
        </div>
    )
}

ExpandIcon.propTypes = {
    direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
}

ExpandIcon.defaultProps = {
    direction: 'down',
}
