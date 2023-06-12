var formEl = document.querySelector("#searchForm");
var cityInputEl = document.querySelector("#citySearch");
var searchButtonEl = document.querySelector("#searchButton");
var weatherDetailsEl = document.querySelector("#weatherDetails");

var getWeather = function(city) {
    var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=6da9f270f26dfadb040379c56c4a5070`;
    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    
                    /*for (var i = 0; i < data.list.length; i++) {
                        var weatherDetailsCard = document.createElement("div");
                        weatherDetailsCard.textContent = dayjs.unix(data.list[i].dt);
                        weatherDetailsCard.textContent += ", " + toCelsius(data.list[i].main.temp) + " ° C";
                        weatherDetailsEl.appendChild(weatherDetailsCard);
                    }*/
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
