//Show and hide Henbit
$(function () {
    var $this = $(this);
    $(function () {
        var hu_today = henbit.datalist[henbit.datalist.length - 1];
        var hu_prev = henbit.datalist[henbit.datalist.length - 2];
        if (hu_today - hu_prev > 0) {
            henbit.todayHU = hu_today - hu_prev;
        }
        else {
            henbit.todayHU = 0;
        }
        document.getElementById("daily-heat-unit").innerHTML = henbit.todayHU.toFixed(2);
        document.getElementById("weekly-heat-unit").innerHTML = henbit.weekHU.toFixed(2);
        //Progress Bar
        var green_range = henbit.start;
        var green_percent = (green_range / henbit.peak) * 100;
        henbit.datalist.forEach(function (net_hu) {
            if (net_hu >= henbit.peak) {
                document.getElementById("growth-green").style = "width: 0%";
                document.getElementById("growth-yellow").style = "width: 0%";
                document.getElementById("growth-red").style = "width: 100%";
            }
            else if (net_hu >= green_range) {
                // Green is full
                document.getElementById("growth-green").style = "width: " + green_percent + "%";
                // Modify Yellow
                var yellow_range = henbit.peak - henbit.start;
                console.log(yellow_range);
                var yellow_percent = ((net_hu - henbit.start) / yellow_range) * (100 - green_percent);
                console.log(yellow_percent);
                document.getElementById("growth-yellow").style = "width: " + yellow_percent + "%";
            }
            // Have NOT hit Yellow Yet
            else {
                var percent = (net_hu / henbit.start) * green_percent;
                document.getElementById("growth-green").style = "width: " + percent + "%";
            }
        })
        Highcharts.chart('henbitContainer', {
            chart: {
                backgroundColor: henbit.color
            }
            , title: {
                text: 'Net Heat Units'
                , x: -20 //center
            }
            , xAxis: {
                categories: henbit.dateList
            }
            , yAxis: {
                title: {
                    text: 'Total Heat Units'
                }
                , softMax: henbit.peak
                , plotLines: [{
                        value: 0
                        , width: 1
                        , color: '#808080'
                         }
                    , {
                        value: henbit.start
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
                        value: henbit.peak
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
                data: henbit.datalist
                     }]
        });
    });
});