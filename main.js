var timeTempList = [];
var $crabgrasslist = $('#crabgrasslist');

function timeTemp(date, tempMax, tempMin){
    this.date = date;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
}

// Get data from JAN1 to date

var dateData = [];


$(function (){
<<<<<<< HEAD

    var $crabgrasslist = $('#crabgrasslist');
=======
    
>>>>>>> master
    var today = new Date(); // Today!
    var start = new Date(new Date().getFullYear(), 0, 1); // Jan 1 of Current Year
    var cur = new Date();
    var newDate = new Date();
    var day = 0;
    var tempMin = 0;
    var tempMax = 0; 
    var heatUnits = 0;
    var incr = 0;
   
    while(start <= today){           

        day = start.getTime() / 1000;
    
        $.ajax({
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
            
            
            var newElement = new timeTemp(cur, tempMax, tempMin);
            timeTempList.push(newElement);
            
            heatUnits = tempMax + tempMin;
            heatUnits = heatUnits / 2; // eventually, subtract base
            
            if (heatUnits < 0) {
                heatUnits = 0;
            }
            
            
            
//            $crabgrasslist.append('<font face="courier"><li>' + cur.toDateString() + ': '+ tempMax.toFixed(2) +' | '+tempMin.toFixed(2) +' | '+ heatUnits.toFixed(2) + '</li></font>');
            
           
            
            }
        }); 
        
        
<<<<<<< HEAD

       
=======
        
>>>>>>> master
       newDate = start.setDate(start.getDate() + 1);
       start = new Date(newDate);
       incr++;
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
     $('#weed1').click(function () {
         var $this = $(this);
         if ($this.is(':checked')) 
         {
             $('#crabgrasslist').show();
             $(function () {
    Highcharts.chart('container', {
        title: {
            text: 'Average Heatpoint Temperature',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: dateData
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});
             
         } 
         else
         
         {
             $('#crabgrasslist').hide();
         }
     });
 });
