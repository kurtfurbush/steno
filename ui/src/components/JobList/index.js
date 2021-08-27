import React from 'react';
import loadingIcon from '../../assets/cloud-loader.gif';
import fetch from '../../util/fetch';
import logError from '../../util/logError';
import { transformData } from './transforms';
import MainRow from './MainRow';
import './style.css';

// Would have a client-side cache (react-query /redux). Using a simple one for now.
// Would also add a server-side cache with Redis to avoid pinging the primary data store (3rd party api, db, etc.)

const WeatherCache = {};

export default function JobList({ loading }) {
    // There are various strategies for data management. When first starting out a small app (even with growth potential),
    // I wouldn't introduce something as overhead-heavy as Redux right away, since features and general app structure can quickly change.
    // Once it gets to the point of a better view of shared data needs, then Redux and Redux-Saga comes in handy.
    // Given the simplicity of this component (for now), I'm just going with useState.
    // For a more complex component that still doesn't need to share state, useReducer is a good option.
    // I'm also a big fan of React-Query since it handles caching and auto-refreshing for you, exposing the data via context throughout the app.

    const [zip, setZip] = React.useState('');
    const [data, setData] = React.useState();
    const [error, setError] = React.useState();
    
    const fetchData = async () => {
        if (!zip) {
            setData();
            setError();
            return;
        }

        const cachedData = WeatherCache[zip];

        if(cachedData) {
            setData(cachedData);
            return;
        }

        setData();
        setError();

        try {
            const data = await fetch({ url: `http://localhost:5000/api/v1/weather/daily/${zip}`, transform: transformData }) ?? {};

            if (!data?.daily?.length) {
                throw Error('No data found');
            }

            // Write a more performant operation. Small data so doing O(n^2) for now.
            const transformedDailyData = data?.daily?.map(day => {
                    const b = {
                        ...day,
                        details: data?.detail?.filter(detail => new Date(detail.dt * 1000).getDate() ===new Date(day.dt).getDate()),
                    }
                    return b;
                });

            const result = {
                weather: transformedDailyData,
                location: {
                    city: data.city,
                    country: data.country
                }
            }

            WeatherCache[zip] = result;

            setData(result);
        } catch(e) {
            logError(e);
            setError("Looks like a rainy day for us! We couldn't find weather for that zip code. Make sure it's a real one.")
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        fetchData();
    }

    const handleZipChange = e => {
        const { target: { value = '' } } = e;
        const validZip =  value.replace( /[^\d]/g, '');
        setZip(validZip);
    }

    const showLoader = !(error || data);

    let content;

    if (showLoader) {
        content = <img className="weather-loader" src={loadingIcon} alt="loading" />;
    } else if (error) {
        content = <div className="weather-error">{error}</div>
    } else {
        content = (
            <>
                <div className="weather-location">
                    {data.location?.city}, {data.location?.country}
                </div>
                {data?.weather?.map(day=>(<MainRow key={day.dt} day={day} />))}
            </>
        )
    }

    return (       
        <> 
            <form className="weather-main-form" onSubmit={handleSubmit}>
                <div className="weather-main-zip-input">
                    <input
                        id="weather-zip"
                        type="numeric"
                        inputMode="numeric"
                        pattern="[\d]{5}"
                        maxLength={5}
                        autoFocus
                        value={zip}
                        onChange={handleZipChange}
                    />
                    <label htmlFor="weather-zip">
                        Zip Code
                    </label>
                </div>
                <button
                    className="weather-main-form-submit"
                    type="submit"
                >
                    Get it
                </button>
            </form>
            <div className="weather-main-list">
                {content}
            </div>
        </>
    )
}
