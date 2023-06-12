var apiKey = "6da9f270f26dfadb040379c56c4a5070";
var formEl = document.querySelector("#searchForm");
var cityInputEl = document.querySelector("#citySearch");
var searchButtonEl = document.querySelector("#searchButton");
var weatherDetailsEl = document.querySelector("#weatherDetails");

var getWeather = function(city) {
    var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}`;
    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    var weatherDetailsCard = document.createElement("div");
                    var weatherDetailsDate = document.createElement("h2");
                    var weatherDetailsTemp = document.createElement("span");

                    weatherDetailsDate.textContent = dayjs.unix(data.dt).format("MMM D, YYYY");
                    weatherDetailsTemp.textContent = toCelsius(data.main.temp) + " ° C";

                    weatherDetailsCard.appendChild(weatherDetailsDate);
                    weatherDetailsCard.appendChild(weatherDetailsTemp);
                    weatherDetailsEl.appendChild(weatherDetailsCard);

                    fiveDayForecast(data.coord.lat, data.coord.lon);
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

var fiveDayForecast = function(lat, lon) {
    var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(forecastUrl)
        .then (function (response) {
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
        })
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    if (city) {
        getWeather(city);
    }
}

var toCelsius = function(kelvins) {
    return Math.round(kelvins - 273.15);
}

formEl.addEventListener("submit", formSubmitHandler);
