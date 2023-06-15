// OpenWeather API key
var apiKey = "6da9f270f26dfadb040379c56c4a5070";

// HTML elements
var formEl = document.querySelector("#searchForm");
var cityInputEl = document.querySelector("#citySearch");
var savedSearchesEl = document.getElementById("savedSearches");
var searchButtonEl = document.querySelector("#searchButton");
var weatherDetailsEl = document.querySelector("#weatherDetails");
var userSearch = document.createElement("input");

// Display the current weather in a given city
var getWeather = function(city) {
    var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}`;
    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // First clear the screen of previous results, if any
                    if (document.getElementById("weatherDetailsCard")) {
                        document.getElementById("weatherDetailsCard").remove();
                    }
                    // Create HTML elements
                    var weatherDetailsCard = document.createElement("div");
                    weatherDetailsCard.id = "weatherDetailsCard";
                    var weatherDetailsIcon = document.createElement("img");
                    var weatherDetailsDate = document.createElement("h2");
                    var weatherDetailsTemp = document.createElement("span");
                    var weatherDetailsWind = document.createElement("div");
                    var weatherDetailsHumidity = document.createElement("div");

                    // Load data from the API
                    weatherDetailsIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                    weatherDetailsDate.textContent = data.name + " (" + dayjs.unix(data.dt).format("MMM D, YYYY") + ")";
                    weatherDetailsTemp.textContent = toCelsius(data.main.temp) + " ° C";
                    weatherDetailsWind.textContent = "Wind: " + data.wind.speed + " MpH";
                    weatherDetailsHumidity.textContent = "Humidity: " + data.main.humidity + "%";

                    // Display the results
                    weatherDetailsCard.appendChild(weatherDetailsDate);
                    weatherDetailsCard.appendChild(weatherDetailsIcon);
                    weatherDetailsCard.appendChild(weatherDetailsTemp);
                    weatherDetailsCard.appendChild(weatherDetailsWind);
                    weatherDetailsCard.appendChild(weatherDetailsHumidity);
                    weatherDetailsEl.appendChild(weatherDetailsCard);

                    // Run functions to save the search and get the five day forecast
                    saveSearch(data.name);
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

// Display weather for the next five days at a given longitutde and latitude
var fiveDayForecast = function(lat, lon) {
    var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(forecastUrl)
        .then (function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // First clear the screen of previous results, if any
                    if (document.getElementById("fiveDayContainer")) {
                        while (document.getElementById("fiveDayContainer").hasChildNodes()) {
                            document.getElementById("fiveDayContainer").removeChild(document.getElementById("fiveDayContainer").firstChild);
                        }
                        document.getElementById("fiveDayContainer").remove();
                    }
                    // Create a container for each day's results
                    var fiveDayContainer = document.createElement("div");
                    fiveDayContainer.id = "fiveDayContainer";
                    
                    // Read from the hourly data but display only five results
                    for (var i = 4; i < data.list.length; i+=8) {
                        // Create HTML tags for the current day's weather
                        var oneDayContainer = document.createElement("div");
                        oneDayContainer.id = "oneDayContainer";
                        var oneDayDate = document.createElement("div");
                        var oneDayWeather = document.createElement("div");
                        var oneDayWeatherIcon = document.createElement("img");
                        var oneDayTemp = document.createElement("div");
                        var oneDayWind = document.createElement("div");
                        var oneDayHumidity = document.createElement("div");

                        // Load data from the API
                        oneDayDate.textContent = dayjs.unix(data.list[i].dt).format("MMM D, YYYY");
                        oneDayWeatherIcon.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                        oneDayTemp.textContent = "Temp: " + toCelsius(data.list[i].main.temp) + " ° C";
                        oneDayWind.textContent = "Wind: " + data.list[i].wind.speed + " MpH";
                        oneDayHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";

                        // Display the results
                        oneDayContainer.appendChild(oneDayDate);
                        oneDayWeather.appendChild(oneDayWeatherIcon);
                        oneDayContainer.appendChild(oneDayWeather);
                        oneDayContainer.appendChild(oneDayTemp);
                        oneDayContainer.appendChild(oneDayWind);
                        oneDayContainer.appendChild(oneDayHumidity);
                        fiveDayContainer.appendChild(oneDayContainer);
                    }
                    
                    // Show the five day forecast
                    weatherDetailsEl.appendChild(fiveDayContainer);
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

// Takes the user's city search and gets the weather for that area
var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    if (city) {
        getWeather(city);
    }
}

// Convert degrees kelvin to celsius
var toCelsius = function(kelvins) {
    return Math.round(kelvins - 273.15);
}

// Save the user's input
function saveSearch(name) {
    localStorage.setItem("citySearch", name);
    loadSearch();
}

// Load previous searches, if any
function loadSearch() {
    if (localStorage.getItem("citySearch")) {
        userSearch.id = "userSearch";
        userSearch.type = "button";
        userSearch.value = localStorage.getItem("citySearch");
        console.log(userSearch.value);
        savedSearchesEl.appendChild(userSearch);
    }
}

userSearch.addEventListener("click", function() {
    cityInputEl.value = userSearch.value;
    getWeather(userSearch.value);
})

formEl.addEventListener("submit", formSubmitHandler);
loadSearch();