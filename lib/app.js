const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const { formatLocation, formatWeather, formatReview } = require('./mungeUtils.js');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/location', async(req, res) => {
  try {
    const city = req.query.search;

    const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API}&q=${city}&format=json`);

    const formattedLocation = formatLocation(locationData.body);

    res.json(formattedLocation);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});


app.get('/weather', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;

    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API}`);
    const finalResponse = formatWeather(weatherData.body);

    res.json(finalResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


app.get('/reviews', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;

    const reviewData = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`)
      .set('Authorization', `Bearer ${process.env.YELP_API}`);
      
    const finalResponse = formatReview(reviewData.body);

    res.json(finalResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
