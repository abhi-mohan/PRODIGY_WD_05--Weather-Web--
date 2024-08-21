function fetchWeather() {
    const location = document.getElementById('locationInput').value.trim();
    const weatherDisplay = document.getElementById('weatherDisplay');

    if (location) {
        // Simulated weather data
        const randomTemperature = Math.floor(Math.random() * 30) + 15; // Random temperature between 15°C and 45°C
        const feelsLike = randomTemperature - 2;
        const conditions = [
            { condition: 'Sunny', gif: 'https://i.pinimg.com/originals/3a/2a/8f/3a2a8f79d9d4a7d36a258fb129ba36f9.gif', background: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/sunny-weather-summer-free-photo.jpg?w=2210&quality=70', comment: 'It\'s a bright day, enjoy!' },
            { condition: 'Cloudy', gif: 'https://i.pinimg.com/originals/87/9e/00/879e002a9082b4d32901840cb70c0929.gif', background: 'https://images.unsplash.com/photo-1500740516770-92bd004b996e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGNsb3VkeSUyMHNreXxlbnwwfHwwfHx8MA%3D%3D', comment: 'Cloudy day, stay cozy!' },
            { condition: 'Rainy', gif: 'https://media.tenor.com/GeiuKcl9VxIAAAAM/coffee.gif', background: 'https://static.vecteezy.com/system/resources/previews/033/645/252/non_2x/drizzle-rainy-day-in-autumn-background-and-wallpaper-generative-ai-photo.jpg', comment: 'Grab an umbrella, it\'s rainy!' },
            { condition: 'Windy', gif: 'https://i.pinimg.com/originals/88/af/b6/88afb65fa9d1b681269e3e6df180d77e.gif', background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPjrTps-Aq55XlwsoyuNAEJmUoLLX1WozRg&s', comment: 'Hold onto your hat, it\'s windy!' },
            { condition: 'Stormy', gif: 'https://media3.giphy.com/media/Y3q0cKmWt3DJLduGAX/giphy.gif?cid=6c09b952nnzkgqcsl693esvfdt9cetkw6ipku4qdp22xy9fq&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s', background: 'https://www.timeforkids.com/wp-content/uploads/2019/03/Thunderincity.jpg?w=1024', comment: 'Better stay indoors, it\'s stormy!' },
            { condition: 'Snowy', gif: 'https://media0.giphy.com/media/QYSZWvBhlfQTL8Fapy/giphy.gif?cid=6c09b9521mxchp9gkdhfrb8pmwlvzoweq3kp98qc2a8nd3hz&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g', background: 'data:image/jpeg;base64,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', comment: 'Bundle up, it\'s snowy!' }
        ];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const humidity = Math.floor(Math.random() * 100);
        const windSpeed = Math.floor(Math.random() * 20);
        const sunrise = '6:00 AM';
        const sunset = '7:30 PM';
        const hourlyReport = [
            { hour: '10 AM', temp: randomTemperature - 2 },
            { hour: '11 AM', temp: randomTemperature - 1 },
            { hour: '12 PM', temp: randomTemperature },
            { hour: '1 PM', temp: randomTemperature + 1 },
            { hour: '2 PM', temp: randomTemperature + 2 }
        ];

        // Change background image according to weather
        document.body.style.backgroundImage = `url('${randomCondition.background}')`;

        // Animate weather display
        weatherDisplay.classList.remove('active');
        setTimeout(() => {
            weatherDisplay.innerHTML = `
                <p class="location">${location}</p>
                <img src="${randomCondition.gif}" alt="${randomCondition.condition}">
                <p class="temperature">${randomTemperature}°C</p>
                <p class="condition">${randomCondition.condition}</p>
                <div class="additional-info">
                    <p>Feels like: ${feelsLike}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} km/h</p>
                    <p>Sunrise: ${sunrise}</p>
                    <p>Sunset: ${sunset}</p>
                </div>
                <div class="hourly-report">
                    <h4>Hourly Report:</h4>
                    ${hourlyReport.map(report => `<div>${report.hour}: ${report.temp}°C</div>`).join('')}
                </div>
                <p class="comments">${randomCondition.comment}</p>
            `;
            weatherDisplay.classList.add('active');
        }, 300);
    } else {
        weatherDisplay.innerHTML = `<p>Please enter a location.</p>`;
    }
}
