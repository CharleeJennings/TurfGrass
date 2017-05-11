//Show and hide Field Sandbur
$(function () {
    var $this = $(this);
    $(function () {
        var hu_today = fieldSanbur.datalist[fieldSanbur.datalist.length - 1];
        var hu_prev = fieldSanbur.datalist[fieldSanbur.datalist.length - 2];
        if (hu_today - hu_prev > 0) {
            fieldSanbur.todayHU = hu_today - hu_prev;
        }
        else {
            fieldSanbur.todayHU = 0;
        }
        document.getElementById("daily-heat-unit").innerHTML = fieldSanbur.todayHU.toFixed(2);
        document.getElementById("weekly-heat-unit").innerHTML = fieldSanbur.weekHU.toFixed(2);
        //Progress Bar
        document.getElementById("daily-heat-unit").innerHTML = fieldSanbur.todayHU.toFixed(0);
        document.getElementById("weekly-heat-unit").innerHTML = fieldSanbur.weekHU.toFixed(0);
        var green_range = fieldSanbur.start;
        var green_percent = (green_range / fieldSanbur.peak) * 100;
        fieldSanbur.datalist.forEach(function (net_hu) {
            if (net_hu >= fieldSanbur.peak) {
                document.getElementById("growth-green").style = "width: 0%";
                document.getElementById("growth-yellow").style = "width: 0%";
                document.getElementById("growth-red").style = "width: 100%";
            }
            else if (net_hu >= green_range) {
                // Green is full
                document.getElementById("growth-green").style = "width: " + green_percent + "%";
                // Modify Yellow
                var yellow_range = fieldSanbur.peak - fieldSanbur.start;
                var yellow_percent = ((net_hu - fieldSanbur.start) / yellow_range) * (100 - green_percent);
                document.getElementById("growth-yellow").style = "width: " + yellow_percent + "%";
            }
            // Have NOT hit Yellow Yet
            else {
                var percent = (net_hu / fieldSanbur.start) * green_percent;
                document.getElementById("growth-green").style = "width: " + percent + "%";
            }
        })
        Highcharts.chart('fieldSandburContainer', {
            chart: {
                backgroundColor: fieldSanbur.color
            }
            , title: {
                text: 'Net Heat Units'
                , x: -20 //center
            }
            , xAxis: {
                categories: fieldSanbur.dateList
            }
            , yAxis: {
                title: {
                    text: 'Total Heat Units'
                }
                , softMax: fieldSanbur.peak
                , plotLines: [{
                        value: 0
                        , width: 1
                        , color: '#808080'
                         }
                    , {
                        value: fieldSanbur.start
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
                        value: fieldSanbur.peak
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
                data: fieldSanbur.datalist
                     }]
        });
    });
});