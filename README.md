# Weather Dashboard

## Project Summary

The following project entailed creating a [Weather Dashboard](https://lilyannekot.github.io/weather-dashboard/) allowing you to search for the current day's weather and 5 day forecast in a specific city. When you search a city, the data is saved to local storage and then displayed under the original search form.

## Languages and Technology Used

* HTML
* CSS
* JavaScript
* Git

## Code Snippet

The code presented below is used to change the background color of the UV Index depending on severity. 

```
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

```

## Author Links

* [GitHub](https://github.com/lilyannekot)
* [Project Website](https://lilyannekot.github.io/weather-dashboard/)
* [LinkedIn](https://www.linkedin.com/in/lilykot/)