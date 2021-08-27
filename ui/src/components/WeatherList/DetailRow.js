import PropTypes from 'prop-types'
import RainDropIcon from './RainDropIcon';
import WindIcon from './WindIcon';
import './style.css';

export default function DetailRow({ detail }) {
    const timeLabel = new Date(detail.dt * 1000).toLocaleString(navigator.language, { hour: 'numeric', hour12: true });
    
    return (
        <div className="weather-detail-row">
            <div className="weather-detail-row-content__time">
                {timeLabel}
            </div>
            <div className="weather-detail-row-content__description">
                {detail?.description}
            </div>
            <RainDropIcon pop={detail.pop} />
            <WindIcon wind={detail.wind} />
            <div className="weather-detail-row-content__temp">
                {Math.round(detail.temp ?? 0)}°F
            </div>
        </div>
    )
}

DetailRow.propTypes = {
    detail: PropTypes.shape({
        dt: PropTypes.number,
        description: PropTypes.string,
        temp: PropTypes.number,
        pop: PropTypes.number,
        wind: PropTypes.number,
        icon: PropTypes.string,
    }).isRequired,
}
