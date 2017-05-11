var timeTempList = [];
var dataList = [];
//var forecasts = [];
//var dateList = [];
var key = "59e5c83564468ec7e2ca593eff7e907c";
var lat = 32.5933574;
var long = -85.4951663;
//var today; // today's date
function forecast(date, tempMin, tempMax, icon) {
    this.date = date;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.icon = icon;
}

function Weed(name, start, peak, base) {
    this.name = name;
    this.start = start;
    this.peak = peak;
    this.base = base;
    this.datalist = [];
    this.dateList = [];
    this.cumulativeHeatUnits = 0;
    this.color = '#FFFFFF';
    this.todayHU = 0;
    this.weekHU = 0;
}
var weeds = [];
var bluegrassSeedhead = new Weed("Bluegrass Seedhead", 30, 45, 13);
var tropicalSignalgrass = new Weed("Tropical Signalgrass", 73, 156, 13);
var smoothCrabgrass = new Weed("Smooth Crabgrass", 42, 140, 12);
var henbit = new Weed("Henbit", 2300, 3200, 0);
var commonChickweed = new Weed("Common Chickweed", 2300, 3200, 0);
var giantFoxtail = new Weed("Giant Foxtail", 83, 245, 9);
var yellowFoxtail = new Weed("Yellow Foxtail", 121, 249, 9);
var greenFoxtail = new Weed("Green Foxtail", 116, 318, 9);
var woolyCupgrass = new Weed("Wooly Cupgrass", 106, 219, 9);
var fieldSanbur = new Weed("Field Sanbur", 99, 286, 9);
var goosegrass = new Weed("Goosegrass", 450, 550, 10);
weeds.push(tropicalSignalgrass);
weeds.push(smoothCrabgrass);
weeds.push(henbit);
weeds.push(commonChickweed);
weeds.push(giantFoxtail);
weeds.push(yellowFoxtail);
weeds.push(greenFoxtail);
weeds.push(woolyCupgrass);
weeds.push(fieldSanbur);
weeds.push(goosegrass);
weeds.push(bluegrassSeedhead);

function convertFtoC(tempF) {
    return (tempF - 32.0) * (5 / 9);
}
// FORECAST
$(window.document).ready(function () {
    var today = new Date(); // Today!
    var start = new Date(new Date().getFullYear(), 3, 1); // Jan 1 of Current Year
    var cur = new Date();
    var newDate = new Date();
    var day = 0;
    var tempMin = 0;
    var tempMax = 0;
    var heatUnits = 0;
    var cumulativeHeatUnits = 0;
    while (start <= today) {
        day = start.getTime() / 1000;
        //        bluegrassSeedhead.datalist.push(5);
        //        bluegrassSeedhead.dateList.push(start.toDateString());
        //        bluegrassSeedhead.cumulativeHeatUnits = 10;
        // Get previous data
        $.ajax({
            type: 'GET'
            , url: 'https://api.darksky.net/forecast/' + key + '/' + lat + ',' + long + ',' + day + '?exclude=currently,hourly,minutely,alerts,flags'
            , success: function (inputted) {
                //                   bluegrassSeedhead.datalist.push(5);
                //                    bluegrassSeedhead.dateList.push(start.toDateString());
                //                    bluegrassSeedhead.cumulativeHeatUnits = 10;
                // Get current Date
                cur = new Date(inputted.daily.data[0].time * 1000);
                cur.setDate(cur.getDate()); // This prints as a day behind.
                tempMin = convertFtoC(parseFloat(inputted.daily.data[0].temperatureMin));
                tempMax = convertFtoC(parseFloat(inputted.daily.data[0].temperatureMax));
                heatUnits = tempMax + tempMin;
                heatUnits = heatUnits / 2;
                for (var j = 0; j < weeds.length; j++) {
                    heatUnits = heatUnits - weeds[j].base;
                    if (heatUnits > 0) {
                        weeds[j].cumulativeHeatUnits = weeds[j].cumulativeHeatUnits + heatUnits;
                    }
                    weeds[j].datalist.push(parseFloat(weeds[j].cumulativeHeatUnits.toFixed(2)));
                    if (weeds[j].cumulativeHeatUnits >= weeds[j].start) {
                        weeds[j].color = '#FFFFD5'
                    }
                    if (weeds[j].cumulativeHeatUnits >= weeds[j].peak) {
                        weeds[j].color = '#FF9494'
                    }
                    heatUnits = heatUnits + weeds[j].base;
                    weeds[j].dateList.push(cur.toDateString());
                }
                //dateList.push(cur.toDateString());
            }
            , async: false
        });
        newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
    }
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
    });
});
// Uses LAT & LONG to display DARKSKY map
$(window.document).ready(function () {
    // needs to be rounded to only 3 decimals
    document.getElementById("darksky-map").innerHTML = "<iframe width='100%' frameBorder='0' style='height: 50vh; margin: 25px 0;' src='https://maps.darksky.net/@temperature," + lat.toFixed(3) + "," + long.toFixed(3) + ",11?embed=true&timeControl=true&fieldControl=true&defaultField=temperature&defaultUnits=_f'></iframe>";
});

function resetHeatPoints(weedID) {
    weedID.datalist.pop();
    weedID.cumulativeHeatUnits = 0;
    weedID.datalist.push(weedID.cumulativeHeatUnits);
}
