import { Coords, Weather } from "./currentWeather.interface";

export interface Forecast {
    city: City;
    cnt: number;
    list: [];
    message: number;
    cod: string;
}

interface City {
    id: number;
    name: string;
    coord: Coords;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface ForecastWeather {
	clouds: { all: number };
	dt: number;
	dt_txt: string;
	main: {
		feels_like: number;
		grnd_level: number;
		humidity: number;
		pressure: number;
		sea_level: number;
		temp: number;
		temp_kf: number;
		temp_max: number;
		temp_min: number
	};
	pop: number;
	sys: { pod: string };
	visibility: number;
	weather: Weather[];
	wind: { speed: number; deg: number; gust: number; };
}