import React from 'react';
import PropTypes from 'prop-types'
import logError from '../../util/logError';
import fetch from '../../util/fetch';
import ExpandIcon from './ExpandIcon';
import ProviderRow from './ProviderRow';
import './style.css';

export default function MainRow({ job }) {
    const [expanded, setExpanded] = React.useState(false);
    const [providers, setProviders] = React.useState([]);
    const [error, setError] = React.useState();
    
    
    const fetchProvidersForJob = async () => {
        if (providers.length) {
            return;
        }

        try {
            const data = await fetch({ url: `http://localhost:5000/api/v1/jobs/suggestedProviders?jobId=${job.id}` }) ?? {};
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
    const dayLabel = dayDate.toLocaleString(navigator.language, { hour12: true });

    // Better handle a11y, this is quick and dirty
    return (      
        <>  
            <div className="job-main-row" onClick={handleFetchProviders}>
                <div className="job-main-row-content-container">
                    <div className="job-main-row-content-description">
                        <div className="job-main-row-content--primary">
                            {dayLabel}
                        </div>
                        <div className="job-main-row-content--secondary">
                            {job.location_type === 'REMOTE' ? 'Remote' : 'On-Site'}
                        </div>
                    </div>
                    <div className="job-main-row-content-status">
                        {job.status}
                    </div>
                    <div className="job-main-row-content-expand">
                        <ExpandIcon direction={expanded ? 'up' : 'down'} />
                    </div>
                </div>
            </div>
            {expanded && providers?.map(provider => <ProviderRow key={provider.id} provider={provider} />)}
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
