import * as icons from '../assets/weatherIcons'

const iconMap = {
	"01d": "art_clear",
	"02d": "art_light_clouds",
	"03d": "art_clouds",
	"04d": "art_clouds",
	"09d": "art_rain",
	"10d": "art_light_rain",
	"11d": "art_storm",
	"13d": "art_snow",
	"50d": "art_fog",
	"01n": "art_clear",
	"02n": "art_light_clouds",
	"03n": "art_clouds",
	"04n": "art_clouds",
	"09n": "art_rain",
	"10n": "art_light_rain",
	"11n": "art_storm",
	"13n": "art_snow",
	"50n": "art_fog"
}

export default function getWeatherIconImage(iconCode, altText) {
	const iconName = iconMap[iconCode]
	const icon = iconName ? icons.default[iconName] : null;
	return icon ? <img src={icon} alt={altText} /> : null
}