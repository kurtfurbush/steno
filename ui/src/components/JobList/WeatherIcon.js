import getWeatherIconImage from "../../util/getWeatherIconImage";

export default function WeatherIcon({ icon, description }) {
    return (        
        <div className="weather-main-row__weather-icon">
            {getWeatherIconImage(icon, description)}
        </div>
    )
}