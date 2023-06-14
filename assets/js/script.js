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
                    if (document.getElementById("weatherDetailsCard")) {
                        document.getElementById("weatherDetailsCard").remove();
                    }
                    var weatherDetailsCard = document.createElement("div");
                    weatherDetailsCard.id = "weatherDetailsCard";
                    var weatherDetailsIcon = document.createElement("img");
                    var weatherDetailsDate = document.createElement("h2");
                    var weatherDetailsTemp = document.createElement("span");
                    var weatherDetailsWind = document.createElement("div");
                    var weatherDetailsHumidity = document.createElement("div");

                    weatherDetailsIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                    weatherDetailsDate.textContent = data.name + " (" + dayjs.unix(data.dt).format("MMM D, YYYY") + ")";
                    weatherDetailsTemp.textContent = toCelsius(data.main.temp) + " ° C";
                    weatherDetailsWind.textContent = "Wind: " + data.wind.speed + " MpH";
                    weatherDetailsHumidity.textContent = "Humidity: " + data.main.humidity + "%";

                    weatherDetailsCard.appendChild(weatherDetailsDate);
                    weatherDetailsCard.appendChild(weatherDetailsIcon);
                    weatherDetailsCard.appendChild(weatherDetailsTemp);
                    weatherDetailsCard.appendChild(weatherDetailsWind);
                    weatherDetailsCard.appendChild(weatherDetailsHumidity);
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
                    if (document.getElementById("fiveDayContainer")) {
                        while (document.getElementById("fiveDayContainer").hasChildNodes()) {
                            document.getElementById("fiveDayContainer").removeChild(document.getElementById("fiveDayContainer").firstChild);
                        }
                        document.getElementById("fiveDayContainer").remove();
                    }
                    var fiveDayContainer = document.createElement("div");
                    fiveDayContainer.id = "fiveDayContainer";
                    
                    for (var i = 4; i < data.list.length; i+=8) {
                        var oneDayContainer = document.createElement("div");
                        oneDayContainer.id = "oneDayContainer";
                        var oneDayDate = document.createElement("div");
                        var oneDayWeather = document.createElement("div");
                        var oneDayWeatherIcon = document.createElement("img");
                        var oneDayTemp = document.createElement("div");
                        var oneDayWind = document.createElement("div");
                        var oneDayHumidity = document.createElement("div");

                        oneDayDate.textContent = dayjs.unix(data.list[i].dt).format("MMM D, YYYY");
                        //oneDayWeather.textContent = data.list[i].weather[0].main;
                        oneDayWeatherIcon.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                        oneDayTemp.textContent = "Temp: " + toCelsius(data.list[i].main.temp) + " ° C";
                        oneDayWind.textContent = "Wind: " + data.list[i].wind.speed + " MpH";
                        oneDayHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";

                        oneDayContainer.appendChild(oneDayDate);
                        oneDayWeather.appendChild(oneDayWeatherIcon);
                        oneDayContainer.appendChild(oneDayWeather);
                        oneDayContainer.appendChild(oneDayTemp);
                        oneDayContainer.appendChild(oneDayWind);
                        oneDayContainer.appendChild(oneDayHumidity);
                        fiveDayContainer.appendChild(oneDayContainer);
                    }
                    
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
