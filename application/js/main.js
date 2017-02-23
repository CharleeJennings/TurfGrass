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
    $('#tropicalSignalgrassContainer').hide();
    $('#smoothCrabgrassContainer').hide();
    $('#henbitContainer').hide();
    $('#commonChickweedContainer').hide();
    $('#giantFoxtailContainer').hide();
    $('#yellowFoxtailContainer').hide();
    $('#greenFoxtailContainer').hide();
    $('#woolyCupgrassContainer').hide();
    $('#fieldSandburContainer').hide();
    $('#goosegrassContainer').hide();
    $('#bluegrassSeedheadContainer').hide();
        

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
        url: 'https://api.darksky.net/forecast/6bfe44f3468c932e8fe382e413162a45/37.8267,-122.4233,' + day + '?exclude=currently,hourly,minutely,alerts,flags',
        success: function(inputted) 
            
            {
                // Get current Date
                cur = new Date(inputted.daily.data["0"].time * 1000);
                cur.setDate(cur.getDate() + 1); // This prints as a day behind.         
                
                tempMin = parseFloat(inputted.daily.data["0"].temperatureMin);
                tempMax = parseFloat(inputted.daily.data["0"].temperatureMax);
                
                heatUnits = tempMax + tempMin;
                heatUnits = heatUnits / 2;
            
                for (var j=0; j < weeds.length; j++) {
                    heatUnits = heatUnits - weeds[j].base;
                    if (heatUnits > 0) {
                        weeds[j].cumulativeHeatUnits += heatUnits;
                    }
                    weeds[j].datalist.push(parseFloat(weeds[j].cumulativeHeatUnits.toFixed(2)));

                    if (weeds[j].cumulativeHeatUnits >= weeds[j].start) {
                        weeds[j].color = '#FFFFD5'
                    }
                    if (weeds[j].cumulativeHeatUnits >= weeds[j].peak) {
                        weeds[j].color = '#FF9494'
                    }
                    
                    heatUnits += weeds[j].base;
                }              
            
                dateList.push(cur.toDateString());                                
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
     $('#tropicalSignalgrassCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('tropicalSignalgrassContainer', 
                {
                     chart:
                     {
                         backgroundColor: tropicalSignalgrass.color
                     },
                     title: 
                     {
                            text: 'Tropical Signalgrass Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: tropicalSignalgrass.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: tropicalSignalgrass.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: tropicalSignalgrass.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: tropicalSignalgrass.datalist
                     }]
                });
             });
            
             $('#tropicalSignalgrassContainer').show();
         } 
         else
         {
             $('#tropicalSignalgrassContainer').hide();
         }
     });
 });

//Show and hide Smooth Crabgrass
$(function () {
     $('#smoothCrabgrassCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('smoothCrabgrassContainer', 
                {
                     chart:
                     {
                         backgroundColor: smoothCrabgrass.color
                     },
                     title: 
                     {
                            text: 'Smooth Crabgrass Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: smoothCrabgrass.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: smoothCrabgrass.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: smoothCrabgrass.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: smoothCrabgrass.datalist
                     }]
                });
             });
            
             $('#smoothCrabgrassContainer').show();
         } 
         else
         {
             $('#smoothCrabgrassContainer').hide();
         }
     });
 });

//Show and hide Henbit
$(function () {
     $('#henbitCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('henbitContainer', 
                {
                     chart:
                     {
                         backgroundColor: henbit.color
                     },
                     title: 
                     {
                            text: 'Henbit Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: henbit.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: henbit.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: henbit.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: henbit.datalist
                     }]
                });
             });
            
             $('#henbitContainer').show();
         } 
         else
         {
             $('#henbitContainer').hide();
         }
     });
 });

//Show and hide Common Chickweed
$(function () {
     $('#commonChickweedCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('commonChickweedContainer', 
                {
                     chart:
                     {
                         backgroundColor: commonChickweed.color
                     },
                     title: 
                     {
                            text: 'Common Chickweed Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: commonChickweed.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: commonChickweed.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: commonChickweed.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: commonChickweed.datalist
                     }]
                });
             });
            
             $('#commonChickweedContainer').show();
         } 
         else
         {
             $('#commonChickweedContainer').hide();
         }
     });
 });

//Show and hide Giant Foxtail
$(function () {
     $('#giantFoxtailCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('giantFoxtailContainer', 
                {
                     chart:
                     {
                         backgroundColor: giantFoxtail.color
                     },
                     title: 
                     {
                            text: 'Giant Foxtail Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: giantFoxtail.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: giantFoxtail.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: giantFoxtail.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: giantFoxtail.datalist
                     }]
                });
             });
            
             $('#giantFoxtailContainer').show();
         } 
         else
         {
             $('#giantFoxtailContainer').hide();
         }
     });
 });

//Show and hide Yellow Foxtail
$(function () {
     $('#yellowFoxtailCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('yellowFoxtailContainer', 
                {
                     chart:
                     {
                         backgroundColor: yellowFoxtail.color
                     },
                     title: 
                     {
                            text: 'Yellow Foxtail Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: yellowFoxtail.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: yellowFoxtail.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: yellowFoxtail.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: yellowFoxtail.datalist
                     }]
                });
             });
            
             $('#yellowFoxtailContainer').show();
         } 
         else
         {
             $('#yellowFoxtailContainer').hide();
         }
     });
 });

//Hide and Show Green Foxtial
$(function () {
     $('#greenFoxtailCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('greenFoxtailContainer', 
                {
                     chart:
                     {
                         backgroundColor: greenFoxtail.color
                     },
                     title: 
                     {
                            text: 'Green Foxtail Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: greenFoxtail.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: greenFoxtail.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: greenFoxtail.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: greenFoxtail.datalist
                     }]
                });
             });
            
             $('#greenFoxtailContainer').show();
         } 
         else
         {
             $('#greenFoxtailContainer').hide();
         }
     });
 });

//Hide and show Wooly Cupgrass
$(function () {
     $('#woolyCupgrassCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('woolyCupgrassContainer', 
                {
                     chart:
                     {
                         backgroundColor: woolyCupgrass.color
                     },
                     title: 
                     {
                            text: 'Wooly Cupgrass Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: woolyCupgrass.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: woolyCupgrass.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: woolyCupgrass.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: woolyCupgrass.datalist
                     }]
                });
             });
            
             $('#woolyCupgrassContainer').show();
         } 
         else
         {
             $('#woolyCupgrassContainer').hide();
         }
     });
 });

//Show and hide Field Sandbur
$(function () {
     $('#fieldSandburCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('fieldSandburContainer', 
                {
                     chart:
                     {
                         backgroundColor: fieldSanbur.color
                     },
                     title: 
                     {
                            text: 'Field Sandbur Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: fieldSanbur.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: fieldSanbur.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: fieldSanbur.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: fieldSanbur.datalist
                     }]
                });
             });
            
             $('#fieldSandburContainer').show();
         } 
         else
         {
             $('#fieldSandburContainer').hide();
         }
     });
 });

//Show and hide Goosegrass
$(function () {
     $('#goosegrassCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('goosegrassContainer', 
                {
                     chart:
                     {
                         backgroundColor: goosegrass.color
                     },
                     title: 
                     {
                            text: 'Goosegrass Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: goosegrass.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: goosegrass.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: goosegrass.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: goosegrass.datalist
                     }]
                });
             });
            
             $('#goosegrassContainer').show();
         } 
         else
         {
             $('#goosegrassContainer').hide();
         }
     });
 });

//Show and hide Bluegrass Seedhead
$(function () {
     $('#bluegrassSeedheadCheckbox').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $(function () 
             {
                 
                 Highcharts.chart('bluegrassSeedheadContainer', 
                {
                     chart:
                     {
                         backgroundColor: bluegrassSeedhead.color
                     },
                     title: 
                     {
                            text: 'Bluegrass Seedhead Net Heat Units',
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
                            text: 'Total Heat Units'
                         },
                         softMax: bluegrassSeedhead.peak,
                         plotLines: 
                         [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                         },
                         {
                             value: bluegrassSeedhead.start,
                             width: 2,
                             color: '#FFFF00',
                             label:
                             {
                                 text: "Start",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30,
                                 y: 10
                             }
                         },
                         {
                             value: bluegrassSeedhead.peak,
                             width: 2,
                             color: '#FF0000',
                             label:
                             {
                                 text: "Peak",
                                 align: "right",
                                 verticalAlign: "bottom",
                                 x: 30
                             }
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
                         //data: dataList
                         data: bluegrassSeedhead.datalist
                     }]
                });
             });
            
             $('#bluegrassSeedheadContainer').show();
         } 
         else
         {
             $('#bluegrassSeedheadContainer').hide();
         }
     });
 });

