// script.js

let currentTemperatureCelsius = 16; // Example temperature value in Celsius
let isCelsius = true;


// function to convert Celsius to Fahrenheit
function convertToFahrenheit(celsius) {
    return Math.round((celsius * 9 / 5) + 32);
}

    //The toggleTemperatureUnit() function:
//Checks if the current unit is Celsius. If so, it switches to Fahrenheit, updates the text, and changes the displayed temperature.
//If the current unit is Fahrenheit, it switches back to Celsius and updates accordingly

//The link "Switch to °F" triggers the toggleTemperatureUnit() function when clicked.
//The function changes the displayed temperature from Celsius to Fahrenheit and updates the text on the page.
// The link text is updated to allow the user to switch back to Celsius when needed.

document.addEventListener('DOMContentLoaded', function() {
    const cities = [
        { name: 'Amsterdam, Netherlands', lat: 52.367, lon: 4.904 },
        { name: 'Ankara, Turkey', lat: 39.9334, lon: 32.8597 },
        { name: 'Åstorp, Sweden', lat: 56.134, lon: 12.945 },
        { name: 'Athens, Greece', lat: 37.983, lon: 23.727 },
        { name: 'Belfast, Northern Ireland, UK', lat: 54.597, lon: -5.930 },
        { name: 'Barcelona, Spain', lat: 41.387, lon: 2.168 },
        { name: 'Berlin, Germany', lat: 52.520, lon: 13.405 },
        { name: 'Bern, Switzerland', lat: 46.948, lon: 7.447 },
        { name: 'Madrid, Spain', lat: 40.4168, lon: -3.7038 },
        { name: 'Paris, France', lat: 48.8566, lon: 2.3522 },
        { name: 'Rome, Italy', lat: 41.9028, lon: 12.4964 },
        { name: 'Vienna, Austria', lat: 48.2082, lon: 16.3738 },
        { name: 'Warsaw, Poland', lat: 52.2297, lon: 21.0122 },
        { name: 'Prague, Czech Republic', lat: 50.0755, lon: 14.4378 },
        { name: 'Brussels, Belgium', lat: 50.8503, lon: 4.3517 },
        { name: 'Stockholm, Sweden', lat: 59.3293, lon: 18.0686 },
        { name: 'Lisbon, Portugal', lat: 38.7229, lon: -9.1399 },
        { name: 'Budapest, Hungary', lat: 47.4979, lon: 19.0402 },
        { name: 'Dublin, Ireland', lat: 53.3331, lon: -6.2489 },
        { name: 'Oslo, Norway', lat: 59.9139, lon: 10.7522 },
        { name: 'Helsinki, Finland', lat: 60.1699, lon: 24.9384 },
        { name: 'Copenhagen, Denmark', lat: 55.6761, lon: 12.5683 },
        { name: 'Zurich, Switzerland', lat: 47.3769, lon: 8.5417 },
        { name: 'Bratislava, Slovakia', lat: 48.1482, lon: 17.1067 },
        { name: 'Ljubljana, Slovenia', lat: 46.0511, lon: 14.5051 },
        { name: 'Riga, Latvia', lat: 56.9496, lon: 24.1059 },
        { name: 'Tallinn, Estonia', lat: 59.437, lon: 24.7535 },
        { name: 'Vilnius, Lithuania', lat: 54.6872, lon: 25.2798 },
        { name: 'Sofia, Bulgaria', lat: 42.6977, lon: 23.3219 },
        { name: 'Belgrade, Serbia', lat: 44.8176, lon: 20.4633 },
        { name: 'Bucharest, Romania', lat: 44.4268, lon: 26.1025 },
        { name: 'Sarajevo, Bosnia and Herzegovina', lat: 43.8486, lon: 18.3564 },
        { name: 'Zagreb, Croatia', lat: 45.8150, lon: 15.9819 },
        { name: 'Podgorica, Montenegro', lat: 42.4411, lon: 19.2636 },
        { name: 'Pristina, Kosovo', lat: 42.6629, lon: 21.1655 },
        { name: 'Tirana, Albania', lat: 41.3275, lon: 19.8189 },
        { name: 'Minsk, Belarus', lat: 53.9006, lon: 27.5590 },
        { name: 'Chisinau, Moldova', lat: 47.0105, lon: 28.8638 },
        { name: 'Kiev, Ukraine', lat: 50.4501, lon: 30.5234 },
        { name: 'Lviv, Ukraine', lat: 49.8397, lon: 24.0297 },
        { name: 'Kharkiv, Ukraine', lat: 49.9935, lon: 36.2304 },
        { name: 'Saint Petersburg, Russia', lat: 59.9343, lon: 30.3351 },
        { name: 'Moscow, Russia', lat: 55.7558, lon: 37.6176 },
        { name: 'Istanbul, Turkey', lat: 41.0082, lon: 28.9784 },
        { name: 'Cyprus, Nicosia', lat: 35.1856, lon: 33.3823 },
        { name: 'Andorra la Vella, Andorra', lat: 42.5078, lon: 1.5211 },
        { name: 'San Marino, San Marino', lat: 43.9333, lon: 12.4500 },
        { name: 'Vaduz, Liechtenstein', lat: 47.1415, lon: 9.5215 },
        { name: 'Monaco, Monaco', lat: 43.7333, lon: 7.4167 }
        // Add more cities here
      ]
    });

    const weatherContainer = document.getElementById('weather-container');
    const citySelect = document.getElementById('city-selected'); // Assuming this is a <select> element in your HTML for city selection
    const temperatureToggle = document.getElementById('temperature-toggle-container'); // Assuming this button exists for toggling the temperature unit
    const loadingIndicator = document.getElementById('loading-indicator');  // Assuming this element exists for showing loading status


    //paste back under here
    // Populate city select dropdown
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });

    // Event listener for city selection
    citySelect.addEventListener('change', function() {
        const selectedCityName = citySelect.value;
        const selectedCity = cities.find(city => city.name === selectedCityName);
        
        if (selectedCity) {
            renderWeather(selectedCity);
        }
    });

      // Event listener for temperature unit toggle
      temperatureToggle.addEventListener('click', toggleTemperatureUnit);

    // Function to fetch weather data for a city using 7timer API
    async function fetchWeather(city) {
        const url = `http://www.7timer.info/bin/api.pl?lon=${city.lon}&lat=${city.lat}&product=civil&output=json`;
        console.log(`Fetching weather for ${city.name} using URL: ${url}`);
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block'; // Show loading indicator
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            const forecast = data.dataseries.slice(0, 7); // Get the 7-day forecast
            renderWeather(forecast); // Render the weather forecast
        } catch (error) {
            console.error(`Error fetching weather for ${city.name}:`, error);
        } finally {
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none'; // Hide loading indicator
            }
        }
    }
    // paste back above here
    // Function to render the weather forecast
    function renderWeather(forecast) {
        weatherContainer.innerHTML = forecast.map(day => {
            const highTempC = day.temp2m.max;
            const lowTempC = day.temp2m.min;
            const highTempF = convertToFahrenheit(highTempC);
            const lowTempF = convertToFahrenheit(lowTempC);
    
            const highTemp = isCelsius ? `${highTempC} °C` : `${highTempF} °F`;
            const lowTemp = isCelsius ? `${lowTempC} °C` : `${lowTempF} °F`;
    
            return `
                <div class="col bm-2">
                    <div class="card h-100">
                        <p class="weather-date">${formatDate(day.timepoint)}</p>
                        <div class="weather-icon-div">
                            <img src="http://www.7timer.info/img/${day.weather}.png" alt="${day.weather}" />
                        </div>
                        <p class="weather-temperatures">High: ${highTemp}</p>
                        <p class="weather-temperatures">Low: ${lowTemp}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
         // Function to convert Celsius to Fahrenheit
    function convertToFahrenheit(celsius) {
        return Math.round((celsius * 9/5) + 32);
    }

// Helper function to format timepoint
function formatDate(timepoint) {
    const date = new Date(timepoint * 1000);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

// Function to toggle between Celsius and Fahrenheit

function toggleTemperatureUnit() {
    const temperatureUnit = document.getElementById('temperature-unit');
    const temperatureToggle = document.getElementById('temperature-toggle');
    const temperatureValue = document.querySelector('.temperature-value');

    if (isCelsius) {
        //Switch to Fahrenheit
        temperatureUnit.textContent = 'Fahrenheit';
        temperatureToggle.textContent = 'Switch to °C';
        temperatureValue.textContent = `${convertToFahrenheit(currentTemperatureCelsius)} °F` ; // example conversion
    } else {
        //Switch to Celsius
        temperatureUnit.textContent = 'Celsius';
        temperatureToggle.textContent = 'Switch to °F';
        temperatureValue.textContent = `${currentTemperatureCelsius} °C`; // example converson
    }
    isCelsius = !isCelsius; // Toggle the unit
}

//The 7Timer API doesn't provide detailed weather descriptions like "sunny" or "cloudy," but instead offers weather categories (e.g., weather: 'clear', weather: 'cloudy').

function getWeatherDescription(weatherCode) {
    const weatherDescriptions = {
        'clear': 'Clear Sky',
        'pcloudy': 'Partly Cloudy',
        'mcloudy': 'Mostly Cloudy',
        'cloudy': 'Cloudy',
        'rain': 'Rain',
        'snow': 'Snow',
        'ts': 'Thunderstorm',
        'haze': 'Haze',
        'fog': 'Fog',
        'drizzle': 'Drizzle',
        'sleet': 'Sleet',
        'showers': 'Showers',
        'tstorm': 'Thunderstorm', // Alternative code for Thunderstorm
        'dust': 'Dust',
        'mist': 'Mist',
        'smoke': 'Smoke',
        'ice': 'Ice',
        'blizzard': 'Blizzard',
        'windy': 'Windy',
        'cold': 'Cold',
        'hot': 'Hot',
        'partlycloudy': 'Partly Cloudy', // Alternative code for Partly Cloudy
        'mostlycloudy': 'Mostly Cloudy', // Alternative code for Mostly Cloudy
        'fair': 'Fair', // Sometimes used for good weather
        'overcast': 'Overcast',
        'sunny': 'Sunny', // If applicable
        'warm': 'Warm', // If applicable
        'chilly': 'Chilly' // If applicable
    

        // Add more as needed
    };
    return weatherDescriptions[weatherCode] || 'unknown';
}
