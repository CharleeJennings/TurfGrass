var forecasts = [];

function forecast(date, tempMin, tempMax, icon){
    this.date = date;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.icon = icon;
};

$(function () {
    // Get Forecast
    $.ajax({
        type: 'GET'
        , url: 'https://api.darksky.net/forecast/59e5c83564468ec7e2ca593eff7e907c/37.8267,-122.4233?exclude=currently,hourly,minutely,alerts,flags'
        , success: function (received) {
            // Loop through results
            for (var i = 0; i < received.daily.data.length; i++) {
                var fore_tempMin = received.daily.data[i].temperatureMin;
                var fore_tempMax = received.daily.data[i].temperatureMax;
                var fore_icon = received.daily.data[i].icon;
                var fore_date = new Date(received.daily.data[i].time * 1000);
                fore_date.setDate(fore_date.getDate() + 1);
                
                var inpt_forecast = new forecast(fore_date, fore_tempMin, fore_tempMax, fore_icon);
                // push to forecasts array
                forecasts.push(inpt_forecast);
            }
        }
    })    
    console.log(forecasts.length);
       var inpt_day = document.getElementById('day1');
    inpt_day.innerHTML += "";
});


function forecastToggle() {
    var x = document.getElementById('forecast-row');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    }
    else {
        x.style.display = 'none';
    }
};