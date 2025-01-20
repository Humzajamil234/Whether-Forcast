// API Key and URL (replace with your own OpenWeatherMap API key)
const apiKey = '9d1d49751e881de4553a5c907ed7db23'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Get references to DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherLocation = document.getElementById('weatherLocation');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

// Function to fetch weather data
async function getWeather(city) {
    try {
        console.log(`Fetching weather for: ${city}`); // Debugging log
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);

        // Check if the response is ok (status code 200)
        if (!response.ok) {
            throw new Error(`City not found or invalid API Key! Status Code: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Debugging log

        // Check if API response is valid
        if (data.cod === 200) {
            // Display weather data
            weatherLocation.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `${data.main.temp}°C`;
            description.textContent = `${data.weather[0].description}`;
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error(error); // Log error to console
        alert('Failed to fetch weather data. Please check your API key, city name, or try again later.');
    }
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Optional: Allow "Enter" key to trigger the search
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});