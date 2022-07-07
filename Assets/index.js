var APIKey = '9adbad802fc699b4a4621f4129fdbb6a'
var locations = []

var searchForm = document.getElementById('city-search-form')
var searchInput = document.getElementById('city')
var currentConditionsEl = document.getElementById('current-conditions-container')
var currentConditionsContainer = document.getElementById('current-conditions-container')
var fiveDayForecastContainer = document.getElementById('five-day-forecast')
var pastSearchesButton = document.getElementById('past-searches')
var primaryBtn = document.querySelector('.btn-primary')

function submitForm (event){
    event.preventDefault();
    input = searchInput.val();
    console.log(input);

    savedSearches();
    pastSearches(cityName);

    var savedSearches = function() {
        localStorage.setItem('locations', JSON.stringify(locations));
    }
}

// Fetches current weather conditions for specified location
// var currentConditions = function(){
function currentConditions(cityName) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?q={cityName}&appid=adbad802fc699b4a4621f4129fdbb6a'
    fetch(requestUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
            displayConditions(data, cityName);
        })
    })

    currentConditions();
}

// Displays weather in box above 5-day forecast
var displayConditions = function(weather){
    currentConditionsEl.textContent = '';
    searchInput.textContent = searchedCity;
    console.log(weather);

    // Creates date element 
    var todayDate = document.createElement('span')
    todayDate.textContent = ' (' + moment().format('MM DD, YYYY') + ')';
    searchInput.appendChild(todayDate);

    // Creates weather image element
    var conditionIcon = document.createElement('img')
    conditionIcon.setAttribute('src', 'http://openweathermap.org/img/wn/${icon}@2x.png')
    searchInput.appendChild(conditionIcon);

    // Creates temperature element
    var temperature = document.createElement('span');
    temperature.textContent = 'Temperature: ' + weather.main.temperature + ' °F';
    temperature.classList = 'list-item';
    currentConditionsContainer.appendChild(temperature);

    // Creates humidity element
    var humidity = document.createElement('span');
    humidity.textContent = 'Humidity: ' + weather.main.humidity + ' %';
    humidity.classList = 'list-item';
    currentConditionsContainer.appendChild(humidity);

    // Creates a wind speed element 
    var windSpeed = document.createElement('span');
    windSpeed.textContent = 'Wind Speed: ' + weather.wind.speed + ' MPH';
    windSpeed.classList = 'list-item';
    currentConditionsContainer.appendChild(windSpeed);

    // Shows UV index based on latitude and longitude
    var latitude = weather.coord.latitude;
    var longitude = weather.coord.longitude;
    UVIndex(latitude, longitude);
}

// Fetches UV Index information based on latitude and longitude. 
// Do I need to put lat and lon in the function ()?
var currentUvIndex = function(){
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=9adbad802fc699b4a4621f4129fdbb6a'
    fetch(requestUrl).then(function(response){
        response.json().then(function(data){
            displayUVIndex(data)
            console.log(data);
        })
    })
}

var displayCurrentUvIndex = function(index){
    var uvIndex = document.createElement('div');
    uvIndex.textContent = 'UV Index: '
    uvIndex.classList = 'list-item'

    indexValue = document.createElement('span')
    indexValue.textContent = index.value

    // If statements for changing colors of UV Index dependent on severity, connected to CSS
    if(index.value <= 2){
        indexValue.classList = 'low'
    } else if(index.value > 2 && index.value <= 5){
        indexValue.classList = 'moderate'
    } else if(index.value === 6 || index.value === 7){
        indexValue.classList = 'high'
    } else if(index.value > 7 && index.value <= 10){
        indexValue.classList = 'very-high'
    } else if(index.value >= 11) {
        indexValue.classList = 'extreme'
    };

    uvIndex.appendChild(indexValue);

    // Appends UV Index to the current conditions container
    currentConditionsContainer.appendChild(uvIndex);
}

// Function to get 5-day forecast
var fiveDayForecast = function(cityName){
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?q={cityName}&appid=adbad802fc699b4a4621f4129fdbb6a'
    fetch(requestUrl).then(function(response){
        response.json.then(function(data){
            showfiveDayForecast(data);
            console.log(data);
        })
    })
}

// Function to display 5-day forecast below box with text weather information
var showfiveDayForecast = function(weather){
    fiveDayForecastContainer.textContent= ''

    var forecast = weather.list;
    for(var i = 5; i < forecast.length; i++){
        var forecastToday = forecast[i];
    }

    var forecastEl = document.createElement('div');
    forecastEl.classList = 'card bg-primary text-light m-2';

    // Creates date element for 5-day forecast
    var todayDate = document.createElement('h3')
    todayDate.textContent = moment.format('MM DD, YYYY')
    forecastEl.appendChild(todayDate);

    //  Creates weather image element for 5-day forecast
    var conditionIcon = document.createElement('img')
    conditionIcon.setAttribute('src', 'http://openweathermap.org/img/wn/${icon}@2x.png')
    forecastEl.appendChild(conditionIcon);

    // Creates temperature element for 5-day forecast
    var temperature = document.createElement('span');
    temperature.textContent = forecastToday.main.temp + ' °F';
    forecastEl.appendChild(temperature);

    // Creates humidity element for 5-day forecast
    var humidity = document.createElement('span')
    humidity.textContent = forecastToday.main.humidity + ' %';
    forecastEl.appendChild(humidity);

    // Appends all data to the enter 5-day forecast container
    fiveDayForecastContainer.appendChild(forecastEl);
}

// Function to display past searches
var pastSearches = function(){
    localStorage.getItem('locations', JSON.stringify(locations))
}

window.onload = function(){
    searchForm.addEventListener('submit', submitForm);
}