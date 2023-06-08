var searchUrl = "http://api.openweathermap.org/geo/1.0/direct?q=Fredericton&limit=5&appid=6da9f270f26dfadb040379c56c4a5070";

function getCoordinates(searchUrl) {
    fetch(searchUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                getWeather(data[0].lat, data[0].lon);
            });
        }
        else {
            console.log("Error: " + response.statusText);
        }
    })
    .catch(function (error) {
        console.log("Unable to connect to OpenWeather");
    });
}

var getWeather = function(lat, lon) {
    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6da9f270f26dfadb040379c56c4a5070`;
    
    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                })
            }
            else {
                console.log("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            console.log("Unable to connect to OpenWeather");
        });
};

getCoordinates(searchUrl);
