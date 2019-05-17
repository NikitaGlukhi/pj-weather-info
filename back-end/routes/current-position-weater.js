const express = require('express'),
    request = require('request'),
    router = express.Router();


router.get('/weather-data', async (req, res) => {
    await request.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lng}&APPID=c308d9f307529fb075e0920a02f8ff75&units=metric`,
        { json: true }, (err, response, body) => {
            res.json(body);
    });
});


router.get('/forecast-weather-data', async (req, res) => {
    await request.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${req.query.lat}&lon=${req.query.lng}&APPID=c308d9f307529fb075e0920a02f8ff75&units=metric`,
        { json: true }, (err, response, body) => {
        res.json(body)
        })
});

router.get('/get-weather-by-city', async (req, res) => {
    await request.get(`https://api.openweathermap.org/data/2.5/forecast?q=${req.cookies['_city']}&APPID=c308d9f307529fb075e0920a02f8ff75&units=metric`,
        { json: true }, (err, response, body) => {
        res.send({result: body});
    })
});

module.exports = router;
