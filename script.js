async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {

        // Step 1: Find city coordinates
        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            alert("City not found");
            return;
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Step 2: Get weather
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        // Step 3: Display data
        document.getElementById("cityName").innerText =
            `${location.name}, ${location.country}`;

        document.getElementById("temperature").innerText =
            `${weatherData.current.temperature_2m} °C`;

        document.getElementById("condition").innerText =
            "Current Weather";

        document.getElementById("humidity").innerText =
            `Humidity: ${weatherData.current.relative_humidity_2m}%`;

        document.getElementById("wind").innerText =
            `Wind Speed: ${weatherData.current.wind_speed_10m} km/h`;

    } catch (error) {

        console.error(error);

        alert("Something went wrong. Please try again.");

    }
}