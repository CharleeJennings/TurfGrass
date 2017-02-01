var timeTempList = [];
var dateList = [];
var dataList =[];
var forecasts = [];

function forecast(date, tempMin, tempMax, icon){
    this.date = date;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.icon = icon;
};

// Get data from JAN1 to date
$(function (){

    var today = new Date(); // Today!
    var start = new Date(new Date().getFullYear(), 0, 1); // Jan 1 of Current Year
    var cur = new Date();
    var newDate = new Date();
    var day = 0;
    var tempMin = 0;
    var tempMax = 0; 
    var heatUnits = 0;
    var cumulativeHeatUnits = 0;
    
    while(start <= today)
    {           
        day = start.getTime() / 1000;
    
        // Get previous data
        $.ajax(
        {
            
        type: 'GET',
        url: 'https://api.darksky.net/forecast/59e5c83564468ec7e2ca593eff7e907c/37.8267,-122.4233,' + day + '?exclude=currently,hourly,minutely,alerts,flags',
        success: function(inputted) 
            
            {
                // Get current Date
                cur = new Date(inputted.daily.data["0"].time * 1000);
                cur.setDate(cur.getDate() + 1); // This prints as a day behind.         
                
                tempMin = parseFloat(inputted.daily.data["0"].temperatureMin);
                tempMax = parseFloat(inputted.daily.data["0"].temperatureMax);
            
                heatUnits = tempMax + tempMin;
                heatUnits = heatUnits / 2;
            
                dateList.push(cur.toDateString());
                cumulativeHeatUnits += heatUnits;
                dataList.push( parseFloat(cumulativeHeatUnits.toFixed(2)) );
//                dataList.push(heatUnits);
                
            }
        }); 
        
       newDate = start.setDate(start.getDate() + 1);
       start = new Date(newDate);

    }
    
    // Get Forecast
    $.ajax(
    {
        type: 'GET',
        url: 'https://api.darksky.net/forecast/59e5c83564468ec7e2ca593eff7e907c/37.8267,-122.4233?exclude=currently,hourly,minutely,alerts,flags',
        success: function(received)
        {
            
            // Loop through results
            for (var i=0; i < received.daily.data.length; i++) {
                fore_tempMin = received.daily.data[i].temperatureMin;
                fore_tempMax = received.daily.data[i].temperatureMax;
                fore_icon = received.daily.data[i].icon;
                fore_date = new Date(received.daily.data[i].time * 1000);
                fore_date.setDate(fore_date.getDate() + 1);
                
                inpt_forecast = new forecast(fore_date, fore_tempMin, fore_tempMax, fore_icon);
                
                // push to forecasts array
                forecasts.push(inpt_forecast);
            }
        }
    })
});

// Show/Hide the list
$(function () {
     $('#weed1').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('container', 
                {
                     title: 
                     {
                            text: 'Net Heat Units',
                            x: -20 //center
                     },
                     subtitle: 
                     {
                        text: 'Powered by DarkSky ',
                         x: -20
                     },
                    xAxis: 
                     {
                         categories: dateList
                     },
                    yAxis: 
                     {
                        title: 
                         {
                            text: 'Total Hean Units'
                         },
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         }]
                    },
                    tooltip: 
                    {
                         valueSuffix: '°C'
                    },
                    legend: 
                     {
                         layout: 'vertical',
                         align: 'right',
                         verticalAlign: 'middle',
                         borderWidth: 0
                     },
                     series: 
                     [{
                         name: 'Total Heat Units',
                         data: dataList                         
                     }]
                });
             });
            
             $('#container').show();
         } 
         else
         {
             $('#container').hide();
         }
     });
 });
