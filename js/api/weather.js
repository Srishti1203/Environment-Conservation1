// Cities array to fetch weather data
const cities = ['Delhi,IN', 'New York,US', 'London,GB', 'Tokyo,JP', 'Sydney,AU'];

// Function to fetch and display weather for each city
async function fetchWeatherData() {
    const apiKey = '6b09b5cf4aba377776ecbeec81b4c2f2';  // Your OpenWeatherMap API Key

    cities.forEach(async (city) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayWeatherData(data);
        } catch (error) {
            console.error(`There has been a problem with fetching data for ${city}:`, error);
        }
    });
}

// Function to display weather data with visual effects
function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather');

    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');  // Adding class for styling

    const city = document.createElement('h3');
    city.textContent = data.name;

    const temp = document.createElement('p');
    temp.textContent = `Temperature: ${data.main.temp}°C`;

    const description = document.createElement('p');
    description.textContent = `Conditions: ${data.weather[0].description}`;

    // Append weather data to the card
    weatherCard.appendChild(city);
    weatherCard.appendChild(temp);
    weatherCard.appendChild(description);

    // Append the card to the weather container
    weatherContainer.appendChild(weatherCard);
}

// Call the function to fetch and display the weather data for all cities
fetchWeatherData();
