$(function() {

  let nodes = []
  let weight = []
  let len = 102
  let displayPercent = 0.5
  console.log("start")

  $.get("place.json", function(data) {
      console.log(data);
    let dataPlace = $.parseJSON(data)
    a = dataPlace[0].x
    console.log(len)
    for (let i = 0; i < len; i++) {
      nodes[i] = {}
      nodes[i].x = parseFloat(dataPlace[i].x) + 50
      nodes[i].y = parseFloat(dataPlace[i].y) + 50
    }

    let cv = $(Cv)[0].getContext('2d')
    for (i = 0; i < len; i++) {
      cv.beginPath()
      cv.arc(nodes[i].x * 7, nodes[i].y * 7, 5, 0, 2 * Math.PI, false)
      cv.fillText(i + 1, nodes[i].x * 7 + -7, nodes[i].y * 7 - 10)
      cv.fill()
      cv.stroke()
    }


    $.get("sortWeight.json", function(data) {
      let dataWeight = $.parseJSON(data)
      console.log(dataWeight[3].from)
      weight.total = parseInt(len * len * displayPercent / 100)
      for (i = 0; i < weight.total; i++) {
        weight[i] = {}
        weight[i] = dataWeight[i].weight
        weight[i].from = parseInt(dataWeight[i].from)
        weight[i].to = parseInt(dataWeight[i].to)
      }
      console.log(weight[3].from)
      console.log(parseInt(dataWeight[3].from))

      let cv = $(Cv)[0].getContext('2d')
      cv.strokeStyle = '#666'
      cv.fillStyle = 'rgb(255, 51, 51)'

      for (i = 0; i < weight.total; i++) {
        let level = weight[i] / weight [0]

        cv.lineWidth = 1*level
        cv.globalAlpha = level
        // cv.beginPath()
        // cv.moveTo(nodes[dataWeight[i].from].x * 7, nodes[dataWeight[i].from].y * 7)
        // cv.lineTo(nodes[dataWeight[i].to].x * 7, nodes[dataWeight[i].to].y * 7)
        // cv.closePath()
        // cv.stroke()
        cv.beginPath();
        cv.arrow(nodes[dataWeight[i].from].x * 7, nodes[dataWeight[i].from].y * 7, nodes[dataWeight[i].to].x * 7, nodes[dataWeight[i].to].y * 7, [0, 0.3, -20*level, 3*level, -25*level, 10*level]);
        cv.fill();
        cv.stroke()
      }
    })
  })
})
