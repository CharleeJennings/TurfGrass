//Show and hide Yellow Foxtail
$(function () {
    var $this = $(this);
    $(function () {
        var hu_today = yellowFoxtail.datalist[yellowFoxtail.datalist.length - 1];
        var hu_prev = yellowFoxtail.datalist[yellowFoxtail.datalist.length - 2];
        if (hu_today - hu_prev > 0) {
            yellowFoxtail.todayHU = hu_today - hu_prev;
        }
        else {
            yellowFoxtail.todayHU = 0;
        }
        document.getElementById("daily-heat-unit").innerHTML = yellowFoxtail.todayHU.toFixed(2);
        document.getElementById("weekly-heat-unit").innerHTML = yellowFoxtail.weekHU.toFixed(2);
        //Progress Bar
        var green_range = yellowFoxtail.start;
        var green_percent = (green_range / yellowFoxtail.peak) * 100;
        yellowFoxtail.datalist.forEach(function (net_hu) {
            if (net_hu >= yellowFoxtail.peak) {
                document.getElementById("growth-green").style = "width: 0%";
                document.getElementById("growth-yellow").style = "width: 0%";
                document.getElementById("growth-red").style = "width: 100%";
            }
            else if (net_hu >= green_range) {
                // Green is full
                document.getElementById("growth-green").style = "width: " + green_percent + "%";
                // Modify Yellow
                var yellow_range = yellowFoxtail.peak - yellowFoxtail.start;
                console.log(yellow_range);
                var yellow_percent = ((net_hu - yellowFoxtail.start) / yellow_range) * (100 - green_percent);
                console.log(yellow_percent);
                document.getElementById("growth-yellow").style = "width: " + yellow_percent + "%";
            }
            // Have NOT hit Yellow Yet
            else {
                var percent = (net_hu / yellowFoxtail.start) * green_percent;
                document.getElementById("growth-green").style = "width: " + percent + "%";
            }
        })
        Highcharts.chart('yellowFoxtailContainer', {
            chart: {
                backgroundColor: yellowFoxtail.color
            }
            , title: {
                text: 'Net Heat Units'
                , x: -20 //center
            }
            , xAxis: {
                categories: yellowFoxtail.dateList
            }
            , yAxis: {
                title: {
                    text: 'Total Heat Units'
                }
                , softMax: yellowFoxtail.peak
                , plotLines: [{
                        value: 0
                        , width: 1
                        , color: '#808080'
                         }
                    , {
                        value: yellowFoxtail.start
                        , width: 2
                        , color: '#FFFF00'
                        , label: {
                            text: "Start"
                            , align: "right"
                            , verticalAlign: "bottom"
                            , //                                 x: 30,
                            y: 10
                        }
                         }
                    , {
                        value: yellowFoxtail.peak
                        , width: 2
                        , color: '#FF0000'
                        , label: {
                            text: "Peak"
                            , align: "right"
                            , verticalAlign: "bottom"
                            , //                                 x: 30
                        }
                         }]
            }
            , tooltip: {
                valueSuffix: '°C'
            }
            , series: [{
                name: 'Total Heat Units'
                , //data: dataList
                data: yellowFoxtail.datalist
                     }]
        });
    });
});