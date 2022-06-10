function formatDate(timestamp){
 let date = new Date(timestamp);
 let hours = date.getHours();
 if (hours < 10) {
  hours = `0${hours}`;
 }
 
 let minutes = date.getMinutes();
 if (minutes < 10) {
  minutes = `0${minutes}`;
 }
 
 let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
 ];
 
 let day = days[date.getDay()];
  return `${day} ${hours}: ${minutes}`;
}

function formatDay(timestamp) {
  let date =new Date(timestamp*1000);
  let day=date.getDay();
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  return days[day];

}

function displayForecast(response) {
  let forecast=response.data.daily;
  let forecastElement=document.querySelector("#forecast");

  let forecastHTML=`<div class="row">`;
  forecast.forEach(function(forecastDay,index){
if (index < 6){
  
 forecastHTML= 
 forecastHTML+ `
 
  <div class="col-2">
     <div class="weather-forecast-date">${formatDay (forecastDay.dt)}</div>
      <img 
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
      alt="" 
      width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}
          °
        </span>
        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}
          °
        </span>
      </div>
  </div>

`;
}
});


  forecastHTML=forecastHTML+`</div>`;
  forecastElement.innerHTML= forecastHTML;
 
}
function getForecast(coordinates){
  console.log(coordinates);
  let key = "5ed8c1afda66c286f8800a91129964e1";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=5ed8c1afda66c286f8800a91129964e1&units=imperial`;

axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp);
 document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
    document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed/1.609);
    document.querySelector("#current").innerHTML=formatDate(response.data.dt*1000);  
    document.querySelector("#icon").setAttribute(
      "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);  
    fahrenheitTemperature=response.data.main.temp;

      getForecast(response.data.coord);

}
function searchCity(city) {
  let key = "5ed8c1afda66c286f8800a91129964e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let key = "5ed8c1afda66c286f8800a91129964e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayCelsiusTemperature(event){
  event.preventDefault();
  let celsiusTemperature=(fahrenheitTemperature-32)* 5/9;
  document.querySelector("#temp").innerHTML=Math.round(celsiusTemperature);
  
}
function displayFahrenheitTemperature(event){
  event.preventDefault();
  document.querySelector("#temp").innerHTML=Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature=null;



let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiuslink= document.querySelector("#celsius-link");
celsiuslink.addEventListener("click",displayCelsiusTemperature)

let fahrenheitlink= document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click",displayFahrenheitTemperature)

searchCity("New York");

