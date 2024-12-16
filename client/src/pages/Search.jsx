import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Search = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleWeatherSearch = async () => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
            alert('User is not logged in.');
            return;
        }
        try {
          const response = await axios.post(
            'http://localhost:8080/api/weather/',
            { city },
            { headers: { Authorization: token } }
          );
          if (response.data && response.data.weather) {
            setWeatherData(response.data.weather);
            alert('Weather data retrieved successfully!');
        } else {
            alert('Unexpected response format.');
            console.log(response); // Debug unexpected response
        }
        //   console.log(response);
        //   setWeatherData(response.data.weather);
        //   alert('Weather data retrieved successfully!');
        } catch (error) {
          alert(error.response.data.message);
        }
      };
    
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "5px"}}>
        <h2>Weather Search</h2>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleWeatherSearch}>Search</button>
        <p><Link to="/report" style={{color: "inherit"}}>Show all my search history</Link></p>
        {weatherData && (
          <div>
            <h3>Weather Data for {city}</h3>
            <p>Temperature: {weatherData.current.temperature}°C</p>
            <p>Weather: {weatherData.current.weather_descriptions.join(', ')}</p>
          </div>
        )}
    </div>
  )
}

export default Search