 const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; //open wheather app.

        const weatherInfo = document.getElementById('weather-info');
        const errorMessage = document.getElementById('error-message');

        document.getElementById('get-weather-btn').addEventListener('click', () => {
            const city = document.getElementById('city-input').value.trim();
            if (city === '') {
                showError('Please enter a city name.');
                return;
            }
            fetchWeather(city);
        });

        // Optional: Allow pressing Enter key to trigger search
        document.getElementById('city-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('get-weather-btn').click();
            }
        });

        async function fetchWeather(city) {
            errorMessage.style.display = 'none';
            weatherInfo.classList.remove('active');

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    displayWeather(data);
                } else {
                    showError(data.message || 'City not found. Please try again.');
                }
            } catch (error) {
                showError('Failed to fetch weather data. Please try again later.');
                console.error(error);
            }
        }

        function displayWeather(data) {
            document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('date').textContent = new Date().toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
            document.getElementById('description').textContent = `Condition: ${capitalizeFirstLetter(data.weather[0].description)}`;
            document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById('weather-icon').alt = data.weather[0].description;

            weatherInfo.classList.add('active');
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }