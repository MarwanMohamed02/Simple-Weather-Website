import request from 'request'


interface Data {
    location: any | undefined,
    temperature: any | undefined,
    weatherDescription: any | undefined,
    feelslike: any | undefined,
    error: any | undefined,

}


function getRequest(URL: string): Promise<any> {
    return new Promise((resolve, reject) => {
        request({ url: URL, json: true }, (error: Error, response: request.Response) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(response.body);
            }
        })
    })
}

async function geocode(address: string): Promise<any> {
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
            }
            return result;
        }
    } catch (error) {
        throw "Unable to connect to location services!";
    }
}

async function forecast(address: any): Promise<Data> {
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
            }
        }

    } catch (err: any) {
        return {
            location: undefined,
            weatherDescription: undefined,
            temperature: undefined,
            feelslike: undefined,
            error: err
        }
    }
}

export { geocode, forecast };

