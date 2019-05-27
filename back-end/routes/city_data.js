const express = require('express'),
    router = express.Router(),
    request = require('request');

router.post('/add-city',async (req, res, next) => {
    if(req.cookies['_city']) {
        res.clearCookie('_city');
    }
    await request.get(`https://api.openweathermap.org/data/2.5/forecast?q=${req.body.city_name}&APPID=c308d9f307529fb075e0920a02f8ff75&units=metric`,
        { json: true }, (err, response, body) => {
            if(body.cod && body.cod === '404') {
                res.cookie('_city', req.cookies['_city'], { expires: new Date(Date.now() + (3600 * 5 * 1000)) });
                res.send({msg: body.message, status: 404, result: {}});
            } else {
                res.cookie('_city', req.body.city_name, { expires: new Date(Date.now() + (3600 * 5 * 1000)) });
                res.send({msg: 'City name was updated', status: 200, result: body});
            }
    })
});

module.exports = router;
