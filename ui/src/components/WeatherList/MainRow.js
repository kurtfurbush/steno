import React from 'react';
import PropTypes from 'prop-types'
import WeatherIcon from './WeatherIcon';
import UVIcon from './UVIcon.js';
import ExpandIcon from './ExpandIcon';
import DetailRow from './DetailRow';
import './style.css';

export default function MainRow({ day }) {
    const [expanded, setExpanded] = React.useState(false);

    // Move to date utils file / abstract potential use of date-fns, etc.
    const dayDate = new Date(day.dt);
    const dayLabel = dayDate.getDay() === new Date().getDay()
        ? 'Today'
        : new Date(day.dt).toLocaleString(navigator.language, { weekday: 'long' });

    // Better handle a11y, this is quick and dirty
    return (      
        <>  
            <div className="weather-main-row" onClick={() => setExpanded(!expanded)}>
                <WeatherIcon icon={day.icon} description={day.description} />
                <div className="weather-main-row-content-container">
                    <div className="weather-main-row-content-description">
                        <div className="weather-main-row-content--primary">
                            {dayLabel}
                        </div>
                        <div className="weather-main-row-content--secondary">
                            {day.description}
                        </div>
                    </div>
                    <UVIcon uvi={day.uvi} />
                    <div className="weather-main-row-content-temperatures">
                        <div className="weather-main-row-content--primary">
                            {Math.round(day.maxTemp ?? 0)}°F
                        </div>
                        <div className="weather-main-row-content--secondary">
                            {Math.round(day.minTemp ?? 0)}°F
                        </div>
                    </div>
                    <div className="weather-main-row-content-expand">
                        <ExpandIcon direction={expanded ? 'up' : 'down'} />
                    </div>
                </div>
            </div>
            {expanded && day.details.map(detail => <DetailRow key={detail.dt} detail={detail} />)}
        </>
    )
}

MainRow.propTypes = {
    day: PropTypes.shape({
        dt: PropTypes.number,
        description: PropTypes.string,
        maxTemp: PropTypes.number,
        minTemp: PropTypes.number,
        icon: PropTypes.string,
        details: PropTypes.arrayOf(PropTypes.shape({
            dt: PropTypes.number,
            description: PropTypes.string,
            temp: PropTypes.number,
            pop: PropTypes.number,
            wind: PropTypes.number,
            icon: PropTypes.string,
        })).isRequired,
    }).isRequired,
    
}
