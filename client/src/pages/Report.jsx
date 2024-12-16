import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Report = () => {
    const [report, setReport] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/weather/report',{headers: { Authorization: token }});
                setReport(response.data);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Failed to fetch the report. Please try again.');
                }
            }
        };

        fetchReport(); // Call the fetchReport function
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <h2>Weather Report</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if any */}
            <ul>
                {report.map((item, index) => (
                    <li key={index}>
                        {item.username} searched for {item.city} -{' '}
                        {item.weather.current.weather_descriptions.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Report;
