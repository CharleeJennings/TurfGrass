
//Show and hide Common Chickweed
$(function () {
    var $this = $(this);
    $(function () {
        var hu_today = commonChickweed.datalist[commonChickweed.datalist.length - 1];
        var hu_prev = commonChickweed.datalist[commonChickweed.datalist.length - 2];
        if (hu_today - hu_prev > 0) {
            commonChickweed.todayHU = hu_today - hu_prev;
        }
        else {
            commonChickweed.todayHU = 0;
        }
        document.getElementById("daily-heat-unit").innerHTML = commonChickweed.todayHU.toFixed(2);
        document.getElementById("weekly-heat-unit").innerHTML = commonChickweed.weekHU.toFixed(2);
        //Progress Bar
        document.getElementById("daily-heat-unit").innerHTML = commonChickweed.todayHU.toFixed(2);
        document.getElementById("weekly-heat-unit").innerHTML = commonChickweed.weekHU.toFixed(2);
        var green_range = commonChickweed.start;
        var green_percent = (green_range / commonChickweed.peak) * 100;
        commonChickweed.datalist.forEach(function (net_hu) {
            if (net_hu >= commonChickweed.peak) {
                document.getElementById("growth-green").style = "width: 0%";
                document.getElementById("growth-yellow").style = "width: 0%";
                document.getElementById("growth-red").style = "width: 100%";
            }
            else if (net_hu >= green_range) {
                // Green is full
                document.getElementById("growth-green").style = "width: " + green_percent + "%";
                // Modify Yellow
                var yellow_range = commonChickweed.peak - commonChickweed.start;
                var yellow_percent = ((net_hu - commonChickweed.start) / yellow_range) * (100 - green_percent);
                document.getElementById("growth-yellow").style = "width: " + yellow_percent + "%";
            }
            // Have NOT hit Yellow Yet
            else {
                var percent = (net_hu / commonChickweed.start) * green_percent;
                document.getElementById("growth-green").style = "width: " + percent + "%";
            }
        })
        Highcharts.chart('commonChickweedContainer', {
            chart: {
                backgroundColor: commonChickweed.color
            }
            , title: {
                text: 'Net Heat Units'
                , x: -20 //center
            }
            , xAxis: {
                categories: commonChickweed.dateList
            }
            , yAxis: {
                title: {
                    text: 'Total Heat Units'
                }
                , softMax: commonChickweed.peak
                , plotLines: [{
                        value: 0
                        , width: 1
                        , color: '#808080'
                         }
                    , {
                        value: commonChickweed.start
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
                        value: commonChickweed.peak
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
                data: commonChickweed.datalist
                     }]
        });
    });
});