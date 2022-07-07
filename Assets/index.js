var APIKey = '9adbad802fc699b4a4621f4129fdbb6a'
var locations = []

var searchForm = document.getElementById('city-search-form')
var searchInput = document.getElementById('city')
var currentConditionsEl = document.getElementById('current-conditions-container')
var currentConditionsContainer = document.getElementById('current-conditions-container')

var formSubmit = function(event){
    event.preventDefault();
    var cityName = searchInput.value.trim()
    if(cityName){
        getCurrentConditions(cityName);
        getdisplayConditions(cityName);
        locations.unshift({cityName});
        searchInput.value = '';
    }
    savedSearches();
    pastSearches(cityName);

    // To save past searches in local storage
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

// Displays weather in five day forecast
var displayConditions = function(){
    currentConditionsEl.textContent = '';
    searchInput.textContent = searchedCity;
    console.log(weather);

    // Creates date element for 5-day forecast
    var todayDate = document.createElement('span')
    todayDate.textContent = ' (' + moment().format('MM DD, YYYY') + ')';
    searchInput.appendChild(todayDate);

    // Creates weather image element for 5-day forecast
    var conditionIcon = document.createElement('img')
    conditionIcon.setAttribute('src', 'http://openweathermap.org/img/wn/${icon}@2x.png')
    searchInput.appendChild(conditionIcon);

    // Creates temperature element for 5-day forecast
    var temperature = document.createElement('span');
    temperature.textContent = 'Temperature: ' + weather.main.temperature + ' °F';
    temperature.classList = 'list-item';
    currentConditionsContainer.appendChild(temperature);

    // Creates humidity element for 5-day forecast
    var humidity = document.createElement('span');
    humidity.textContent = 'Humidity: ' + weather.main.humidity + ' %';
    humidity.classList = 'list-item';
    currentConditionsContainer.appendChild(humidity);

    // Creates a wind speed element for 5-day forecast
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

    // If statements for changing colors of UV Index dependent on severity

    currentConditionsContainer.appendChild(uvIndex);
}