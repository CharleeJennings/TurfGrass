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
    while(start <= today){           

        day = start.getTime() / 1000;
        
        $.ajax({
        type: 'GET',
        url: 'https://api.darksky.net/forecast/59e5c83564468ec7e2ca593eff7e907c/37.8267,-122.4233,' + day + '?exclude=currently,hourly,minutely,alerts,flags',
        success: function(inputted) {
            console.log('success', inputted);
            console.log(inputted.daily.data["0"].summary); // How to extract data!!
            
            // Get current Date
            cur = new Date(inputted.daily.data["0"].time * 1000);
            cur.setDate(cur.getDate() + 1); // For some reason, this is a day behind. I think it's API based, but we'll see. This is a fix for now.
            
            tempMin = parseFloat(inputted.daily.data["0"].temperatureMin);
            tempMax = parseFloat(inputted.daily.data["0"].temperatureMax);
            
            heatUnits = tempMax + tempMin;
            heatUnits = heatUnits / 2; // eventually, subtract base
            
            if (heatUnits < 0) {
                heatUnits = 0;
            }
            
            $crabgrasslist.append('<font face="courier"><li>' + cur.toDateString() + ': '+ tempMax.toFixed(2) +' | '+tempMin.toFixed(2) +' | '+ heatUnits.toFixed(2) + '</li></font>');
            
            }
        });
        
       newDate = start.setDate(start.getDate() + 1);
       start = new Date(newDate);
    }
});


// Show/Hide the list
$(function () {
     $('#weed1').click(function () {
         var $this = $(this);
         if ($this.is(':checked')) {
             $('#crabgrasslist').show();
         } else {
             $('#crabgrasslist').hide();
         }
     });
 });
