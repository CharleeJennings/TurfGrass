var dateList = [1,2,3,4,5,6];

function Weed(name, start, peak, base) {
    this.name = name;
    this.start = start;
    this.peak = peak;
    this.base = base;
    this.datalist = [];
    this.cumulativeHeatUnits = 0;
    this.color = '#FFFFFF';
}

var bluegrassSeedhead = new Weed("Bluegrass Seedhead",
                                30, 45, 13);

bluegrassSeedhead.datalist = [15,21, 23, 25, 28 ,30, 31];

//Show and hide Bluegrass Seedhead
$(function () {
         var $this = $(this);
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
                            text: 'Net Heat Units',
                            x: -20 //center
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
//                                 x: 30,
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
//                                 x: 30
                             }
                         }]
                    },
                    tooltip: 
                    {
                         valueSuffix: '°C'
                    },
                     series: 
                     [{
                         name: 'Total Heat Units',
                         //data: dataList
                         data: bluegrassSeedhead.datalist
                     }]
                });
             });
 });

// Modify Progress Bar
$(function () {
    var green_range = bluegrassSeedhead.start;
    var green_percent = (green_range / bluegrassSeedhead.peak) * 100;
    bluegrassSeedhead.datalist.forEach(function(net_hu) {
        if (net_hu >= bluegrassSeedhead.peak) {
            document.getElementById("growth-green").style = "width: 0%";
            document.getElementById("growth-yellow").style = "width: 0%";
            document.getElementById("growth-red").style = "width: 100%";
        }
        else if (net_hu >= green_range) {
            // Green is full
            document.getElementById("growth-green").style = "width: " + green_percent + "%";
            // Modify Yellow
            var yellow_range = bluegrassSeedhead.peak - bluegrassSeedhead.start;
            console.log(yellow_range);
            var yellow_percent = ((net_hu - bluegrassSeedhead.start) / yellow_range) * (100 - green_percent);
            
            console.log(yellow_percent);
            document.getElementById("growth-yellow").style = "width: " + yellow_percent + "%";
        }
        // Have NOT hit Yellow Yet
        else {
            var percent = (net_hu / bluegrassSeedhead.start) * green_percent;
            document.getElementById("growth-green").style = "width: " + percent + "%";
        }
    })
});