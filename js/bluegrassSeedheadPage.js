//Show and hide Bluegrass Seedhead
$(function () {
    var $this = $(this);
    $(function () {
        var hu_today = bluegrassSeedhead.datalist[bluegrassSeedhead.datalist.length - 1];
        var hu_prev = bluegrassSeedhead.datalist[bluegrassSeedhead.datalist.length - 2];
        if (hu_today - hu_prev > 0) {
            bluegrassSeedhead.todayHU = hu_today - hu_prev;
        }
        else {
            bluegrassSeedhead.todayHU = 0;
        }
        document.getElementById("daily-heat-unit").innerHTML = bluegrassSeedhead.todayHU.toFixed(2);
        document.getElementById("weekly-heat-unit").innerHTML = bluegrassSeedhead.weekHU.toFixed(2);
        //Progress Bar
        var green_range = bluegrassSeedhead.start;
        var green_percent = (green_range / bluegrassSeedhead.peak) * 100;
        bluegrassSeedhead.datalist.forEach(function (net_hu) {
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
                var yellow_percent = ((net_hu - bluegrassSeedhead.start) / yellow_range) * (100 - green_percent);
                document.getElementById("growth-yellow").style = "width: " + yellow_percent + "%";
            }
            // Have NOT hit Yellow Yet
            else {
                var percent = (net_hu / bluegrassSeedhead.start) * green_percent;
                document.getElementById("growth-green").style = "width: " + percent + "%";
            }
        })
        Highcharts.chart('bluegrassSeedheadContainer', {
            chart: {
                backgroundColor: bluegrassSeedhead.color
            }
            , title: {
                text: 'Net Heat Units'
                , x: -20 //center
            }
            , xAxis: {
                categories: bluegrassSeedhead.dateList
            }
            , yAxis: {
                title: {
                    text: 'Total Heat Units'
                }
                , softMax: bluegrassSeedhead.peak
                , plotLines: [{
                        value: 0
                        , width: 1
                        , color: '#808080'
                         }
                    , {
                        value: bluegrassSeedhead.start
                        , width: 2
                        , color: '#FFFF00'
                        , label: {
                            text: "Start"
                            , align: "right"
                            , verticalAlign: "bottom", //                                 x: 30,
                            y: 10
                        }
                         }
                    , {
                        value: bluegrassSeedhead.peak
                        , width: 2
                        , color: '#FF0000'
                        , label: {
                            text: "Peak"
                            , align: "right"
                            , verticalAlign: "bottom", //                                 x: 30
                        }
                         }]
            }
            , tooltip: {
                valueSuffix: '°C'
            }
            , series: [{
                name: 'Total Heat Units', //data: dataList
                data: bluegrassSeedhead.datalist
                     }]
        });
    });
});