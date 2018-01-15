$.get('../data/originData.json', 'utf-8').done(function(originData) {
var canvas = document.getElementById('myChart');

let label= Array.apply(null, Array(2000)).map(function (_, i) {return i;});

var data = {
    labels: label,
    // labels: _.array(7),
    datasets: [
        {
            label: "C1",
            fill: false,
            lineTension: 0.0,
            // backgroundColor: "rgba(75,192,192,0.4)",
            // backgroundColor: "rgba(75,192,0, 0.2)",
            borderColor: "rgba(75,192,192,1)",
            // borderCapStyle: 'butt',
            borderDash: ["January", "February"],
            // borderDashOffset: 0.0,
            // borderJoinStyle: 'miter',
            // pointBorderColor: "rgba(75,192,192,1)",
            // pointBackgroundColor: "#fff",
            // pointBorderWidth: 1,
            // pointHoverRadius: 5,
            // pointHoverBackgroundColor: "rgba(75,192,192,1)",
            // pointHoverBorderColor: "rgba(220,220,220,1)",
            // pointHoverBorderWidth: 2,
            // pointRadius: 5,
            // pointHitRadius: 10,
            data: originData['C1'],
        }, {
            label: "C2",
            fill: false,
            lineTension: 0.0,
            borderColor: "rgba(75,192,0, 1)",
            data: originData['C2'],
        }, {
            label: "R",
            fill: false,
            lineTension: 0.0,
            borderColor: "rgba(75,0,192, 1)",
            data: originData['R'],
        }, {
            label: "P1",
            fill: false,
            lineTension: 0.0,
            borderColor: "rgba(0,50,192, 1)",
            data: originData['P1'],
        }
    ]
};

var option = {
    showLines: true,
    elements: {
        point: {
            radius: 0,
        },
    },
};
var myLineChart = Chart.Line(canvas,{
	data:data,
    options:option
});

canvas.addEventListener('click', (e) => {
    var item = myLineChart.getElementAtEvent(e);

    if ( item.length > 0 ) {
        //get the internal index of slice in pie chart
        var clickedElementindex = item[0][ '_index' ];

        //get specific label by index
        var label = myLineChart.data.labels[ clickedElementindex ];

        //get value by index
        var value = myLineChart.data.datasets[ 0 ].data[ clickedElementindex ];

        console.log( clickedElementindex );
        console.log( label );
        console.log( value );
        /* other stuff that requires slice's label and value */
    }
});

function adddata(){
    myLineChart.data.datasets[0].data[7] = 50;
    myLineChart.data.labels[7] = "test add";
    myLineChart.update();
}
});
