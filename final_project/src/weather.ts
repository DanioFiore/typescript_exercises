import { CurrentWeather } from "./interfaces/currentWeather.interface";
import { GeocodedLocation } from "./interfaces/geocoding.interface";
import { Forecast } from "./interfaces/forecast.interface";

class Weather {
    private static instance: Weather;
    private weatherEndpoint: string = 'https://api.openweathermap.org/data/2.5/weather';
    private geocodingEndpoint: string = 'https://api.openweathermap.org/geo/1.0/direct';
    private forecastEndpoint: string = 'https://api.openweathermap.org/data/2.5/forecast';
    private settings: {[key: string]: string} = {
        units: 'metric',
        lang: 'en'
    }
    private apiKey: string = 'your-api-key-here'; // replace with your own API key

    constructor() {}

    static getInstance(): Weather {
        // Weather can not exists because it's static property
        if (!Weather.instance) {
            Weather.instance = new Weather();
        }

        return Weather.instance;
    }

    // here we will have as return a promise (because it's an asynchronous function) that contains an array of GeocodedLocation
    async getLocations(query: string): Promise<GeocodedLocation[]> {
        const response = await fetch(`${this.geocodingEndpoint}?q=${query}&limit=5&appid=${this.apiKey}&lang=${this.settings.lang}`);
        const data: GeocodedLocation[] = await response.json();

        return data;
    }

    async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
        const response = await fetch(`${this.weatherEndpoint}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.settings.units}&lang=${this.settings.lang}&cnt=5`);

        const data: CurrentWeather = await response.json();

        return data;
    }

    async getForecast(lat: number, lon: number): Promise<Forecast> {
        const response = await fetch(`${this.forecastEndpoint}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.settings.units}&lang=${this.settings.lang}&cnt=5`);

        const data: Forecast = await response.json();

        return data;
    }
}

export default Weather;