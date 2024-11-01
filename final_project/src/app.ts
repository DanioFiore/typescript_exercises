import Weather from './weather';
import { CurrentWeather } from './interfaces/currentWeather.interface';
import { Forecast, ForecastWeather } from './interfaces/forecast.interface';

const citySearchForm = document.querySelector('.city-search-form') as HTMLFormElement;

if (citySearchForm) {
    citySearchForm.addEventListener('submit', async (event: SubmitEvent) => {
        // prevent the form from submitting normally (refreshing the page)
        event.preventDefault();

        const cityInput = citySearchForm.querySelector('#city') as HTMLInputElement;
        const searchResults = document.querySelector('.search-results') as HTMLUListElement;
        const city = cityInput.value.trim();

        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        const weather = Weather.getInstance();
        const locations = await weather.getLocations(city);

        searchResults.innerHTML = '';

        if (!locations.length) {
            alert('No locations found for the given city.');
            return;
        }

        locations.forEach((location: any) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            const parts = [
                location.name,
                location.state,
                location.country
            ].filter(part => part); // undefined values are filtered out
            
            button.textContent = parts.join(', ');
            
            button.addEventListener('click', async () => {
                searchResults.innerHTML = '';
                Promise.all([
                    weather.getCurrentWeather(location.lat, location.lon),
                    weather.getForecast(location.lat, location.lon)
                ]).then(([currentWeather, forecast]) => {
                    showWeatherData(currentWeather, forecast);
                });
            });
            li.appendChild(button);
            searchResults.appendChild(li);
        });
    });
}

function showWeatherData(currentWeather: CurrentWeather, forecast: Forecast) {
    const weatherMain = document.querySelector('.weather-main') as HTMLParagraphElement;
    const weatherLocation = document.querySelector('.weather-location') as HTMLParagraphElement;
    const weatherTemperature = document.querySelector('.weather-temperature') as HTMLParagraphElement;
    const weatherStats = document.querySelector('.weather-stats') as HTMLElement;
    const weatherDaily = document.querySelector('.weather-daily ul') as HTMLUListElement;

    weatherStats.className = '';
    weatherStats.classList.add('weather-stats', currentWeather.weather[0].main.toLowerCase());
    weatherMain.textContent = currentWeather.weather[0].description;
    weatherLocation.textContent = currentWeather.name;
    weatherTemperature.textContent = `${currentWeather.main.temp}°C`;
    weatherDaily.innerHTML = '';
    const forecastElements = createWeatherDay(forecast);

    forecastElements.forEach((element: HTMLElement) => {
        weatherDaily.appendChild(element);
    });
}

function createWeatherDay(forecast: Forecast) {
	const forecastMap = forecast.list.map((forecastWeather: ForecastWeather) => {
		const li = document.createElement( 'li' );
		const day = new Date(forecastWeather.dt * 1000);
		li.innerHTML = `
            <span class="day">${ day.toLocaleDateString( 'it-IT', { weekday: 'long' } ) }</span>
            <span class="stats">
                <span>${ forecastWeather.main.temp }</span>
                <span>${ forecastWeather.weather[0].description }</span>
            </span>
		`;
		return li;
	});

	return forecastMap;
}