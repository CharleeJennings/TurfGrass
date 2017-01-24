// Get data from JAN1 to date
$(function timemachine(){
//    Get info for JAN 1
    
    var $crabgrasslist = $('#crabgrasslist');
    
    var start = new Date("01/01/2017");
    var end = new Date("01/05/2017");
    var day = 0;
    
    while(start <= end){           

        day = start.getTime() / 1000;
        
        $.ajax({
        type: 'GET',
        url: 'https://api.darksky.net/forecast/59e5c83564468ec7e2ca593eff7e907c/37.8267,-122.4233,' + day + '?exclude=currently,hourly,minutely,alerts,flags',
        success: function(inputted) {
            console.log('success', inputted);
            console.log(inputted.daily.data["0"].summary); // How to extract data!!

            $crabgrasslist.append('<li>' + inputted.daily.data["0"].temperatureMax +' | '+inputted.daily.data["0"].temperatureMin +'</li>');
            
            }
        });
        
       var newDate = start.setDate(start.getDate() + 1);
       start = new Date(newDate);
        
    }
});


// Show/Hide the list
$(document).ready(function () {
     $('#weed1').click(function () {
         var $this = $(this);
         if ($this.is(':checked')) {
             $('#crabgrasslist').show();
         } else {
             $('#crabgrasslist').hide();
         }
     });
 });

// EPOCH TIME JAN 1: 1483228800
//            JAN 2: 1483315200