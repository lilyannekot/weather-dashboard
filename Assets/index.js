var APIKey = 'AIzaSyAVHOJqnEWRxvQiJz5y-IO2PRtx2om16Sc'
var cities = [];



// Calls to API to get weather data based on cities
// function getWeather(cityName) {
//     var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?q=' + cityName + '&appid=' + APIKey
//     fetch (requestUrl).then(function(response){
//         return response.json();
//     })
//         .then(function(data){
//             var currentConditions = $('#currentConditions');
//             currentConditions.addClass('border');

//             // Creates h2 element for searched city name to display
//             var cityName = $('<h2>');
//             cityName.textContent(currentCity);
//             currentConditions.append(cityName);
//         })
// }