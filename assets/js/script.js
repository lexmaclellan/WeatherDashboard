var formEl = document.querySelector("#searchForm");
var cityInputEl = document.querySelector("#citySearch");
var searchButtonEl = document.querySelector("#searchButton");

function getCoordinates(city) {
    searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6da9f270f26dfadb040379c56c4a5070`;
    fetch(searchUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data && data.length > 0) {
                    console.log(data);
                    getWeather(data[0].lat, data[0].lon);
                }
                else {
                    console.log("No data");
                }
            })
        }
        else {
            console.log("Error: " + response.statusText);
        }
    })
    .catch(function (error) {
        console.log("Unable to connect to OpenWeather");
    })
}

var getWeather = function(lat, lon) {
    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6da9f270f26dfadb040379c56c4a5070`;
    
    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    var weatherDetailsEl = document.querySelector("#weatherDetails");
                    var weatherDetailsCard = document.createElement("div");
                    //weatherDetailsCard.textContent = data.list[0]
                    weatherDetailsEl.appendChild(weatherDetailsCard);
                })
            }
            else {
                console.log("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            console.log("Unable to connect to OpenWeather");
        })
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    if (city) {
        getCoordinates(city);
    }
}

formEl.addEventListener("submit", formSubmitHandler);