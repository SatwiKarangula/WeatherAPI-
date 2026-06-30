const Weather = require('../models/weather');
const axios = require('axios');

exports.createWeather = async (req, res) => {

    try {

        const { city, temperature, weather } = req.body;

        if (!city || !temperature || !weather) {

            return res.status(400).json({
                error: 'All fields are required'
            });

        }

        const newWeather = new Weather({
            city,
            temperature,
            weather
        });

        await newWeather.save();

        res.status(201).json(newWeather);

    } catch (error) {

        res.status(500).json({
            error: 'Server Error'
        });

    }

};
exports.getAllWeather = async (req, res) => {

    try {

        const weatherData = await Weather.find();

        res.status(200).json(weatherData);

    } catch (error) {

        res.status(500).json({
            error: 'Server Error'
        });

    }

};
exports.getWeatherById = async (req, res) => {

    try {

        const weather = await Weather.findById(req.params.id);

        if (!weather) {

            return res.status(404).json({
                error: 'Record Not Found'
            });

        }

        res.status(200).json(weather);

    } catch (error) {

        res.status(500).json({
            error: 'Server Error'
        });

    }

};
exports.updateWeather = async (req, res) => {

    try {

        const updatedWeather = await Weather.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }

        );

        res.status(200).json(updatedWeather);

    } catch (error) {

        res.status(500).json({
            error: 'Server Error'
        });

    }

};
exports.deleteWeather = async (req, res) => {

    try {

        await Weather.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Record Deleted Successfully'
        });

    } catch (error) {

        res.status(500).json({
            error: 'Server Error'
        });

    }

};


exports.getWeatherByCity = async (req, res) => {

    try {

        const cityName = req.params.city;

        const weather = await Weather.findOne({

            city: cityName

        });

        if (!weather) {

            return res.status(404).json({
                error: 'City Not Found'
            });

        }

        res.status(200).json(weather);

    } catch (error) {

        res.status(500).json({
            error: 'Server Error'
        });

    }

};
exports.fetchAndStoreWeather = async (req, res) => {

    try {

        const city = req.params.city;

        // Fetch data from OpenWeather API

        const response = await axios.get(

            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`

        );

        // Extract required data

        const weatherData = {

            city: response.data.name,

            temperature: response.data.main.temp,

            weather: response.data.weather[0].description

        };

        // Save into MongoDB

        const newWeather = new Weather(weatherData);

        await newWeather.save();

        // Return response

        res.status(200).json({

            message: 'Weather fetched and stored successfully',

            data: newWeather

        });

    } 
    catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
        error: error.response?.data || error.message
    });

}
};