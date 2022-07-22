"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecast = exports.geocode = void 0;
const request_1 = __importDefault(require("request"));
function getRequest(URL) {
    return new Promise((resolve, reject) => {
        (0, request_1.default)({ url: URL, json: true }, (error, response) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(response.body);
            }
        });
    });
}
async function geocode(address) {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWFyd2FuMDIiLCJhIjoiY2w1YmNvdmxqMDY5eDNlb2U2NWkzcTA2cCJ9.plf8TnzZsNx3Dk_nNJQhlA&limit=1";
    try {
        let requestedData = await getRequest(url);
        if (requestedData.features.length === 0)
            return { error: "Unable to find location... Try again with different search term" };
        else {
            const result = {
                location: requestedData.features[0].place_name,
                latitude: requestedData.features[0].center[1],
                longitude: requestedData.features[0].center[0]
            };
            return result;
        }
    }
    catch (error) {
        throw "Unable to connect to location services!";
    }
}
exports.geocode = geocode;
async function forecast(address) {
    try {
        let data = await geocode(address);
        let { location, longitude, latitude, error } = data;
        if (error) {
            throw error;
        }
        else {
            let url = "http://api.weatherstack.com/current?access_key=5ddff8cbfe49cb30e6171de9efb0d984&query=" + latitude + "," + longitude;
            let requestedData = await getRequest(url);
            let { weather_descriptions, temperature, feelslike } = requestedData.current;
            return {
                location,
                weatherDescription: weather_descriptions[0],
                temperature,
                feelslike,
                error: undefined
            };
        }
    }
    catch (err) {
        return {
            location: undefined,
            weatherDescription: undefined,
            temperature: undefined,
            feelslike: undefined,
            error: err
        };
    }
}
exports.forecast = forecast;
