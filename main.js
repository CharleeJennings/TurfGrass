var timeTempList = [];
var dateList = [];
var $crabgrasslist = $('#crabgrasslist');
var dataList =[];
function timeTemp(date, tempMax, tempMin){
    this.date = date;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    
}

// Get data from JAN1 to date



$(function (){


    var $crabgrasslist = $('#crabgrasslist');

 

    var today = new Date(); // Today!
    var start = new Date(new Date().getFullYear(), 0, 1); // Jan 1 of Current Year
    var cur = new Date();
    var newDate = new Date();
    var day = 0;
    var tempMin = 0;
    var tempMax = 0; 
    var heatUnits = 0;
    var newElement = new timeTemp() ;
    while(start <= today)
    {           

        day = start.getTime() / 1000;
    
        $.ajax(
        {
            
        type: 'GET',
        url: 'https://api.darksky.net/forecast/8c96ab646f1284f6e9248c3528fe9146/37.8267,-122.4233,' + day + '?exclude=currently,hourly,minutely,alerts,flags',
        success: function(inputted) 
            
            {
                console.log('success', inputted);
                console.log(inputted.daily.data["0"].summary); // How to extract data!!
            
                // Get current Date
                cur = new Date(inputted.daily.data["0"].time * 1000);
                cur.setDate(cur.getDate() + 1); // For some reason, this is a day behind. I think it's API based, but we'll see. This is a fix for now.
         
                
                tempMin = parseFloat(inputted.daily.data["0"].temperatureMin);
                tempMax = parseFloat(inputted.daily.data["0"].temperatureMax);
            
                
                newElement = new timeTemp(cur, tempMax, tempMin);
                timeTempList.push(newElement);
            
                
                heatUnits = tempMax + tempMin;
                heatUnits = heatUnits / 2; // eventually, subtract base
            
                // if heatUnit is negative default to 0 
                if (heatUnits < 0) 
                {
                    heatUnits = 0;
                }
            
                
                $crabgrasslist.append('<font face="courier"><li>' + cur.toDateString() + ': '+ tempMax.toFixed(2) +' | '+tempMin.toFixed(2) +' | '+ heatUnits.toFixed(2) + '</li></font>');
                dateList.push(cur.toDateString());
                dataList.push(heatUnits);
                
            
            }
            
            
        }); 
        
            
     
       
       newDate = start.setDate(start.getDate() + 1);
       start = new Date(newDate);

    }
  
    
});

function populateList() {
    
    // empty list
    $crabgrasslist.empty();
    
    // repopulate
    timeTempList.forEach(function(entry) {
        $crabgrasslist.append('<font face="courier"><li>' + entry.date.toDateString() + ': '+ entry.tempMax.toFixed(2) +' | '+entry.tempMin.toFixed(2) +' | </li></font>');
    });
}

// Show/Hide the list
$(function () {
     $('#weed1').click(function () 
     {
         
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             populateList();
             $('#crabgrasslist').show();
             $(function () 
             {
                 
                 Highcharts.chart('container', 
                {
                     title: 
                     {
                            text: 'Average Heatpoint Temperature',
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
                            text: 'Temperature (°C)'
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
                         name: 'Crabgrass',
                         data: dataList
                     }]
            });
             });
            
             $('#container').show();
         } 
         else
         
         {
             $('#crabgrasslist').hide();
             $('#container').hide();
         }
     });
 });
