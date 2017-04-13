var timeTempList = [];
var dateList = [];
var dataList = [];
var forecasts = [];
var key = "59e5c83564468ec7e2ca593eff7e907c";
var lat = 32.5933574;
var long = -85.4951663;
var today = new Date(); // today's date
function forecast(date, tempMin, tempMax, icon) {
    this.date = date;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.icon = icon;
};

function convertFtoC(tempF) {
    return (tempF - 32.0) * (5 / 9)
};
// FORECAST
$(window.document).ready(function () {
    // Get Forecast, display in main dashboard
    $.ajax({
        type: 'GET'
        , url: 'https://api.darksky.net/forecast/' + key + '/' + lat + ',' + long
        , success: function (received) {
            var weather_icon = received.hourly.data[0].icon;
            var tempMax = Math.round(received.daily.data[0].temperatureMax);
            var tempMin = Math.round(received.daily.data[0].temperatureMin);
            var image_src = '<img id="svgimg" src="images/weather_icon/' + weather_icon + '.svg" width="80">';
            document.getElementById("forecast-summary").innerHTML = image_src + "<h2> " + tempMax + "° - " + tempMin + "°</h2> ";
            document.getElementById("forecast-summary-minutely").innerHTML = Math.round(received.currently.temperature) + "° " + received.minutely.summary;
            document.getElementById("forecast-summary-hourly").innerHTML = "<h3>" + received.hourly.summary + "</h3>";
            // variables for weekly information
            var avg_tempMax = 0;
            var avg_tempMin = 0;
            var net_hu = 0;
            // get daily 1-6 for weekly forecast
            for (i = 1; i <= 6; i++) {
                net_hu += received.daily.data[i].temperatureMax;
                avg_tempMax += received.daily.data[i].temperatureMax;
                avg_tempMin += received.daily.data[i].temperatureMin;
                var dat = new Date(); // day we're working with
                dat.setDate(today.getDate() + i);
                var icon = '<center><img id="svgimg" src="images/weather_icon/' + received.daily.data[i].icon + '.svg" width="80"><br><h4>' + Math.round(received.daily.data[i].temperatureMax) + '° - ' + Math.round(received.daily.data[i].temperatureMin) + '°</h4></center>';
                document.getElementById("day" + i).innerHTML = '<center>' + (dat.getMonth() + 1) + '-' + dat.getDate() + '</center>';
                document.getElementById("forecast" + i).innerHTML = icon;
            }
            avg_tempMax /= 6;
            avg_tempMin /= 6;
            document.getElementById("daily-heat-unit").innerHTML = Math.round(convertFtoC(received.daily.data[0].temperatureMax));
            document.getElementById("daily-high-low").innerHTML = Math.round(avg_tempMax) + "° / " + Math.round(avg_tempMin) + "°";
            document.getElementById("weekly-heat-unit").innerHTML = Math.round(convertFtoC(net_hu));
            
            // If there are alerts for the area, Create them as alert panels
            if (received.alerts) {
                received.alerts.forEach(function (alert) {
                    document.getElementById("weather-alert").innerHTML += '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>ALERT: <a href="' + alert.uri + '"><strong>' + alert.title + '</strong></a></div>';
                });
            }
        }
    })
});
// Uses LAT & LONG to display DARKSKY map
$(window.document).ready(function () {
    // needs to be rounded to only 3 decimals
    document.getElementById("darksky-map").innerHTML = "<iframe width='100%' frameBorder='0' style='height: 50vh; margin: 25px 0;' src='https://maps.darksky.net/@temperature," + lat.toFixed(3) + "," + long.toFixed(3) + ",11?embed=true&timeControl=true&fieldControl=true&defaultField=temperature&defaultUnits=_f'></iframe>";
});