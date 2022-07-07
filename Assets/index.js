var APIKey = 'AIzaSyAVHOJqnEWRxvQiJz5y-IO2PRtx2om16Sc'
var locations = []

var searchForm = document.getElementById('city-search-form')
var searchInput = document.getElementById('city')
var currentConditionsEl = document.getElementById('current-conditions-container')

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
var currentConditions = function(){
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}}&appid={API key}'
    fetch(requestUrl).then(function(response){
        response.json().then(function(data){
            displayConditions(data, cityName);
        })
    })
}

// Displays weather in five day forecast
var displayConditions = function(){
    currentConditionsEl.textContent = '';
    searchInput.textContent = searchedCity;
    console.log(weather);

    
}
