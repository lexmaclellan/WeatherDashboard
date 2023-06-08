var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=6da9f270f26dfadb040379c56c4a5070";

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
        });
      }
      else {
        console.log('Error: ' + response.statusText);
      }
  })
  .catch(function (error) {
    console.log('Unable to connect to OpenWeather');
  });
}

getApi(requestUrl);
