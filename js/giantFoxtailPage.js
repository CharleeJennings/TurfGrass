//Show and hide Giant Foxtail
$(function () {
    var $this = $(this);
    $(function () {
        var hu_today = giantFoxtail.datalist[giantFoxtail.datalist.length - 1];
        var hu_prev = giantFoxtail.datalist[giantFoxtail.datalist.length - 2];
        if (hu_today - hu_prev > 0) {
            giantFoxtail.todayHU = hu_today - hu_prev;
        }
        else {
            giantFoxtail.todayHU = 0;
        }
        document.getElementById("daily-heat-unit").innerHTML = giantFoxtail.todayHU.toFixed(2);
        document.getElementById("weekly-heat-unit").innerHTML = giantFoxtail.weekHU.toFixed(2);
        //Progress Bar
        var green_range = giantFoxtail.start;
        var green_percent = (green_range / giantFoxtail.peak) * 100;
        giantFoxtail.datalist.forEach(function (net_hu) {
            if (net_hu >= giantFoxtail.peak) {
                document.getElementById("growth-green").style = "width: 0%";
                document.getElementById("growth-yellow").style = "width: 0%";
                document.getElementById("growth-red").style = "width: 100%";
            }
            else if (net_hu >= green_range) {
                // Green is full
                document.getElementById("growth-green").style = "width: " + green_percent + "%";
                // Modify Yellow
                var yellow_range = giantFoxtail.peak - giantFoxtail.start;
                console.log(yellow_range);
                var yellow_percent = ((net_hu - giantFoxtail.start) / yellow_range) * (100 - green_percent);
                console.log(yellow_percent);
                document.getElementById("growth-yellow").style = "width: " + yellow_percent + "%";
            }
            // Have NOT hit Yellow Yet
            else {
                var percent = (net_hu / giantFoxtail.start) * green_percent;
                document.getElementById("growth-green").style = "width: " + percent + "%";
            }
        })
        Highcharts.chart('giantFoxtailContainer', {
            chart: {
                backgroundColor: giantFoxtail.color
            }
            , title: {
                text: 'Net Heat Units'
                , x: -20 //center
            }
            , xAxis: {
                categories: giantFoxtail.dateList
            }
            , yAxis: {
                title: {
                    text: 'Total Heat Units'
                }
                , softMax: giantFoxtail.peak
                , plotLines: [{
                        value: 0
                        , width: 1
                        , color: '#808080'
                         }
                    , {
                        value: giantFoxtail.start
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
                        value: giantFoxtail.peak
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
                data: giantFoxtail.datalist
                     }]
        });
    });
});