$(function () {
    let numbers = new Array(2000);
    for (let i = 0; i < 2000; i++) {
        numbers[i] = Math.random();
    }

    var myChart = Highcharts.chart('container', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            // categories: ['Apples', 'Bananas', 'Oranges']
            plotLines: [{
                value: 1000,
                color: 'red',
                width: 2,
                zIndex: 2000,
            }],
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        plotOptions: {
            line: {
                enableMouseTracking: false,
                lineWidth: 1.2,
                marker: {
                    enabled: false,
                    // radius: 0,
                },
            },
        },
        series: [{
            name: 'Jane',
            data: numbers,
            color: 'green',
        }],
        credits: {
            enabled: false,
        },
    });

    $("#random").on("click", function() {
        myChart.update({
            xAxis:{
                plotLines:[{
                    value: 200,
                    color: 'red',
                    width: 2,
                    zIndex: 2000,
                }],
            }
        });
    });
});
