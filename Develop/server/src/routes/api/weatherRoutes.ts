import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  const city = req.body.cityName;                           //cityName is coming from the payload
  const apikey = '3403518487872e7d87d9c94ea40d7228'; // Replace with your actual API key
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process the data and send it in the response
      res.json({ city, data, searchHistory: '' });
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    });
  // WeatherService.getWeatherForCity(city).then((data) => res.json(data));        //this gets the city out of the req user sent, goes to the route, pass it to the function
  // TODO: save city to search history
  const searchHistory = '';
  res.json({city,searchHistory})
});

// TODO: GET search history
// router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
