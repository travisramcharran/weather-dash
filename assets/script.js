
var cityResultText = $("#cityResult");
var tempResultText = $("#tempResult");
var humidityResult = $("#humidityResult");
var windResultText = $("#windResult");
var UVResultText = $("#UVResult");
var cardTitle = $("h5");
var emptyDate = {}



var today = moment().format('DD' + "/" + 'MM' + '/' + 'YYYY');
$(".btn").on("click", function (event){
    event.preventDefault();
    var userInput = $(".form-control").val().toLowerCase().replace(/ /g,'+');
    console.log("User Search: " + userInput);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=metric&APPID=123babda3bc150d180af748af99ad173";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var city = response.name;
        var country = response.sys.country; 
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var UVindexURL = "http://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&" + "lon=" + lon + "&APPID=123babda3bc150d180af748af99ad173";
        $.ajax({
            url: UVindexURL,
            method: "GET"
        }).then(function(uvIndex){
            var UV = uvIndex.value;
            UVResultText.text("UV Index: " + UV);
        })
        var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=metric&APPID=123babda3bc150d180af748af99ad173";
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response){
            console.log(forecastURL);
            for (var i = 0; i < response.list.length; i += 8){
                
                emptyDate[i] = response.list[i].dt_txt;
                var forecastDate = response.list[i].dt_txt;
                 // var forecastTemp = response.list[i].main.temp; 
                 // var forecastHum = response.list[i].main.humidity;  
                 // var forecastIcon = response.list[i].weather[0].icon;
                 console.log(forecastDate);
                 // console.log(forecastTemp);
                 // console.log(forecastHum);
                 // console.log(forecastIcon);
                };
                // vacio.forEach(element =>{
                    //     console.log(element);
                    // })
                })
                console.log(valueOf(emptyDate));
        
        cityResultText.text(city + ", " + country + " " + today);
        tempResultText.text("Temperature: " + temp + " ºC");
        humidityResult.text("Humidity: " + humidity + " %");
        windResultText.text("Wind Speed: " + wind + " MPH");
        
    })
})
