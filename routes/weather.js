import express from "express";
import { authenticateToken } from "../verifyToken.js";
import { db } from "../index.js"; 
import axios from "axios";

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const { city } = req.body;
    const API_KEY = process.env.WEATHER_API_KEY;
    const API_URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
  
    try {
      const response = await axios.get(API_URL);
      if (response.data.error) {
        return res.status(404).json({ message: 'City not found.' });
      }
  
      const weatherData = response.data;
      const query = 'INSERT INTO searches (user_id, city, weather_info) VALUES (?, ?, ?)';
      db.query(
        query,
        [req.user.id, city, JSON.stringify(weatherData)],
        (err) => {
          if (err) return res.status(500).json({ message: 'Database error.' });
          res.status(200).json({ weather: weatherData });
        }
      );
    } catch (error) {
      res.status(500).json({ message: 'Weather API error.' });
    }
  });

  router.get('/report',authenticateToken, (req, res) => {
    const query = `SELECT users.username, searches.city, searches.weather_info 
                   FROM searches  INNER JOIN users ON searches.user_id = users.id`;
  
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
  
      const report = results.map((row) => ({
        username: row.username,
        city: row.city,
        weather: typeof row.weather_info === 'string' ? JSON.parse(row.weather_info) : row.weather_info,
      }));
      
  
      res.status(200).json(report);
    });
  });

export default router;