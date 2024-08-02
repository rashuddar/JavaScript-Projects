const button = document.querySelector("button");
const apiKey = process.env.GEO_APP_API_KEY;

button.addEventListener("click", () => {
    // console.log(navigator.geolocation)
    if (navigator.geolocation) {
        //if browser support geolocation api
        //geolocation.getCurrentPosition method is used to get current position of the device
        //it takes three parameters success, error, options. If everything is right then success.
        // callback function will call else error callback function will call. We don't need third parameter for this project
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerText = "Your Browser Doesn't Support"
    }
});



// openCage Geocoding Api--> https://opencagedata.com/api--> reverse geocoding --> https://api.opencagedata.com/geocode/v1/json?q=LAT+LON&key=YOUR-API-KEY --> signup for API key-->
function onSuccess(position) {
    // console.log(position)
    let { latitude, longitude } = position.coords;
    // console.log(latitude, longitude)
    // sending get request to the api with passing latitude and longitude cordinates of the user position
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
        .then(response => response.json())
        .then(result => {
            // console.log(result)
            let allDetails = result.results[0].components;
            // passing components object to allDetails variable 
            let{county, postcode, country} = allDetails;
            // getting country, postcode, country properties value from allDetails obj
            // console.log(county, postcode, country);
            button.innerText = `${county} ${postcode} ${country}`;
            // passing these value to the button innerText
        }).catch (()=> {
            button.innerText = "Something Went Wrong";
        })          
}

function onError(error) {
    // console.log(error)
    if (error.code == 1) {
        // if user denied the request
        button.innerText = "You Denied the request";
    }
    else if (error.code == 2) {
        // if location is not available
        button.innerText = "Location not available";
    } else {
        // if any other error occured
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
    // if user denied the request then button will be disabled

}