import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
const API_KEY = process.env.API_KEY;

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  const city = req.body.cityName;                           //cityName is coming from the payload
  const apikey = API_KEY; // Replace with your actual API key
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // console.log('data:', data);
      const { name, lat, lon } = data[0];
      // Process the data and send it in the response
      res.json({ name, lat, lon});
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    });
  // WeatherService.getWeatherForCity(city).then((data) => res.json(data));        //this gets the city out of the req user sent, goes to the route, pass it to the function
  // TODO: save city to search history
  // const searchHistory = '';
  // res.json({city,searchHistory})
});

router.post('/forecast', (req, res) => {
  const { lat, lon } = req.body;
  console.log('lat:', lat, 'lon:', lon);
  const apikey = API_KEY;
  const newApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;
  fetch(newApiUrl)
    .then(response => response.json())
    .then(data => {
      console.log('data:', data);
      // Process the data and send it in the response
      res.json({ data });
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    });
});
// TODO: GET search history
// router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
