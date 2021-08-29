import React from 'react';
import sortBy from 'lodash/sortBy';
import fetch from '../../util/fetch';
import logError from '../../util/logError';
import { transformData } from './transforms';
import MainRow from './MainRow';
import './style.css';

// Would have a client-side cache (react-query / redux).
// Would also add a server-side cache with Redis to avoid pinging the primary data store (3rd party api, db, etc.)

export default function JobList({ loading }) {
    // There are various strategies for data management. When first starting out a small app (even with growth potential),
    // I wouldn't introduce something as overhead-heavy as Redux right away, since features and general app structure can quickly change.
    // Once it gets to the point of a better view of shared data needs, then Redux and Redux-Saga comes in handy.
    // Given the simplicity of this component (for now), I'm just going with useState.
    // For a more complex component that still doesn't need to share state, useReducer is a good option.
    // I'm also a big fan of React-Query since it handles caching and auto-refreshing for you, exposing the data via context throughout the app.

    const [upcomingJobs, setUpcomingJobs] = React.useState([]);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        const fetchUpcomingJobs = async () => {
            try {
                const data = await fetch({ url: `http://localhost:5000/api/v1/jobs/upcoming`, transform: transformData }) ?? {};
                setUpcomingJobs(sortBy(data, 'datetime'));
            } catch(e) {
                logError(e);
                setError("Job data currently unavailable.")
            }
        }
        fetchUpcomingJobs();
    }, [])

    const showLoader = !(error || upcomingJobs);

    let content;

    if (showLoader) {
        content = <div>Make a prettier loader!</div>;
    } else if (error) {
        content = <div className="job-error">{error}</div>
    } else {
        content = upcomingJobs?.map(job=>(<MainRow key={job.id} job={job} />))
    }

    return (       
        <> 
            <div className="job-main-list">
                {content}
            </div>
        </>
    )
}
