import React from 'react';
import PropTypes from 'prop-types'
import logError from '../../util/logError';
import WeatherIcon from './WeatherIcon';
import UVIcon from './UVIcon.js';
import ExpandIcon from './ExpandIcon';
import ProviderRow from './ProviderRow';
import './style.css';

export default function MainRow({ job }) {
    const [expanded, setExpanded] = React.useState(false);
    const [providers, setProviders] = React.useState([]);
    const [error, setError] = React.useState();
    
    
    const fetchProvidersForJob = async jobId => {
        if (providers.length) {
            return;
        }

        try {
            const data = await fetch({ url: `http://localhost:5000/api/v1/jobs/suggestedProviders?jobId=${jobId}` }) ?? {};
            setProviders(data);
        } catch(e) {
            logError(e);
            setError("Provider data currently unavailable.")
        }
    };

    const handleFetchProviders = () => {
        setExpanded(!expanded);
        fetchProvidersForJob();
    }

    // Move to date utils file / abstract potential use of date-fns, etc.
    const dayDate = new Date(job.datetime);
    const dayLabel = dayDate.getDay() === new Date().getDay()
        ? 'Today'
        : dayDate.toLocaleString(navigator.language, { weekday: 'long' });

    // Better handle a11y, this is quick and dirty
    return (      
        <>  
            <div className="job-main-row" onClick={handleFetchProviders}>
                <WeatherIcon icon={job.icon} description={job.description} />
                <div className="job-main-row-content-container">
                    <div className="job-main-row-content-description">
                        <div className="job-main-row-content--primary">
                            {dayLabel}
                        </div>
                        <div className="job-main-row-content--secondary">
                            {job.description}
                        </div>
                    </div>
                    <UVIcon uvi={job.uvi} />
                    <div className="job-main-row-content-temperatures">
                        <div className="job-main-row-content--primary">
                            {Math.round(job.maxTemp ?? 0)}°F
                        </div>
                        <div className="job-main-row-content--secondary">
                            {Math.round(job.minTemp ?? 0)}°F
                        </div>
                    </div>
                    <div className="job-main-row-content-expand">
                        <ExpandIcon direction={expanded ? 'up' : 'down'} />
                    </div>
                </div>
            </div>
            {expanded && providers.map(provider => <ProviderRow key={provider.id} provider={provider} />)}
        </>
    )
}

MainRow.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.string,
        datetime: PropTypes.string,
        status: PropTypes.string,
        location_type: PropTypes.string,
    }).isRequired,
    
}
