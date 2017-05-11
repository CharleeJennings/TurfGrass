//Show and hide Goosegrass
$(function () {
    var $this = $(this);
    $(function () {
        var hu_today = goosegrass.datalist[goosegrass.datalist.length - 1];
        var hu_prev = goosegrass.datalist[goosegrass.datalist.length - 2];
        if (hu_today - hu_prev > 0) {
            goosegrass.todayHU = hu_today - hu_prev;
        }
        else {
            goosegrass.todayHU = 0;
        }
        document.getElementById("daily-heat-unit").innerHTML = goosegrass.todayHU.toFixed(2);
        document.getElementById("weekly-heat-unit").innerHTML = goosegrass.weekHU.toFixed(2);
        //Progress Bar
        var green_range = goosegrass.start;
        var green_percent = (green_range / goosegrass.peak) * 100;
        goosegrass.datalist.forEach(function (net_hu) {
            if (net_hu >= goosegrass.peak) {
                document.getElementById("growth-green").style = "width: 0%";
                document.getElementById("growth-yellow").style = "width: 0%";
                document.getElementById("growth-red").style = "width: 100%";
            }
            else if (net_hu >= green_range) {
                // Green is full
                document.getElementById("growth-green").style = "width: " + green_percent + "%";
                // Modify Yellow
                var yellow_range = goosegrass.peak - goosegrass.start;
                console.log(yellow_range);
                var yellow_percent = ((net_hu - goosegrass.start) / yellow_range) * (100 - green_percent);
                console.log(yellow_percent);
                document.getElementById("growth-yellow").style = "width: " + yellow_percent + "%";
            }
            // Have NOT hit Yellow Yet
            else {
                var percent = (net_hu / goosegrass.start) * green_percent;
                document.getElementById("growth-green").style = "width: " + percent + "%";
            }
        })
        Highcharts.chart('goosegrassContainer', {
            chart: {
                backgroundColor: goosegrass.color
            }
            , title: {
                text: 'Net Heat Units'
                , x: -20 //center
            }
            , xAxis: {
                categories: goosegrass.dateList
            }
            , yAxis: {
                title: {
                    text: 'Total Heat Units'
                }
                , softMax: goosegrass.peak
                , plotLines: [{
                        value: 0
                        , width: 1
                        , color: '#808080'
                         }
                    , {
                        value: goosegrass.start
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
                        value: goosegrass.peak
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
                data: goosegrass.datalist
                     }]
        });
    });
});