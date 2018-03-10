$(function () {
    let numbers = new Array(20);
    for (let i = 0; i < 20; i++) {
        numbers[i] = [Math.random(), Math.random()];
    }

    colorId = 0;
    colorMap = [
        'red',
        'black',
        'purple',
        '#888888',
    ];

    selectOrZoom = true;

    function selectPointsByDrag(e) {

        if (selectOrZoom) {
            selectedId = [];
            // Select points
            Highcharts.each(this.series, function (series) {
                Highcharts.each(series.points, function (point) {
                    if (point.x >= e.xAxis[0].min && point.x <= e.xAxis[0].max &&
                        point.y >= e.yAxis[0].min && point.y <= e.yAxis[0].max) {
                        // point.select(true, true);
                        // console.log(point.index);
                        point.update({
                            color : colorMap[colorId],
                        });
                        selectedId.push(point.index);
                    }
                });
            });

            console.log(selectedId);
            console.log(colorId++);

            return false; // Don't zoom
        } else {
            return true;
        }
    }

    var myChart = Highcharts.chart('container', {
        chart: {
            type: "scatter",
            events: {
                selection: selectPointsByDrag,
            },
            zoomType: 'xy',
            plotBorderWidth: 1,
        },
        title: {
            text: '2Dplot'
        },
        xAxis: {
            labels: {
                enabled: false,
            },
            tickLength: 0,
        },
        yAxis: {
            gridLineWidth: 0,
            title: {
                text: 'Fruit eaten'
            },
        },
        colorAxis: {
            min: 0,
            max: 20,
            minColor: '#EFEFFF',
            maxColor: '#000022',
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 2,
                    states: {
                        hover: {
                            enabled: false,
                        }
                    }
                },
                enableMouseTracking: false,
            },
        },
        series: [{
            name: 'Jane',
            data: numbers,
            // color: 'green',
        }],
        credits: {
            enabled: false,
        },
    });

    $("#zoom").on("click", function() {
        // console.log(Highcharts.fireEvent(myChart, 'selectPointsByDrag'));
        selectOrZoom = false;
    });

    $("#select").on("click", function() {
        selectOrZoom = true;
    });
});
