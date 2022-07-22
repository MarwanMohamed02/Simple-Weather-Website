
// Getting the html objects
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector("#forecast");




// An event listener that executes everytime the event happens
weatherForm?.addEventListener("submit", (event) => {
    
    event.preventDefault();
    
    if (!search) {
        return console.log("Must enter a location");
    }

    const address = search.value;
    

    const url = `/weather?address=${address}`;

    if (forecast) {
        forecast.textContent = "Loading...";
      
    }
    
    
    fetch(url).then((response) => {
        response.json().then(({ location, weatherDescription, temperature, feelslike, error}) => {
            if (error) {
                if (forecast) {
                    forecast.textContent = error;
                }
            }    
            else {
                if (forecast) {
                    forecast.textContent = `${weatherDescription} in ${location} the temp is ${temperature} but feels like ${feelslike}`;
                }
            }
        })
    })
})
