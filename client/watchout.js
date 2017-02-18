
// var Player = function (data) {
//     d3.select('.board').append('svg')
//       .data(data, d => d)
//
// }

var options = {
  width: 600,
  height: 600
};

var playerData = [{
  cx: 50,
  cy: 50,
  // cx: Math.random() * 600,
  // cy: Math.random() * 600,
  r: 10,
  color: '#ff6600'
}];

// ***************  Board *****************


var board = d3.select('.board').append('svg')
  .attr("width", 600)
  .attr("height", 600);


// ***************  Enemies *****************

  var createEnemies = function(n) {
    var enemies = [];
    for (var id = 0; id < n; id++) {
      enemies.push(id);
    }
    return enemies.map(id => {
      return {
        id: id,
        cx: Math.random() * 600,
        cy: Math.random() * 600,
        r: 10
      };
    });
  };

  var enemies = createEnemies(15);
  // console.table(enemies);

  var circle = board.selectAll('circle')
              .data(enemies)
              .enter()
              .append('circle')
                .each(function (d) {
                  // console.log('d -', d);
                  d3.select(this).attr({
                    cx: d.cx,
                    cy: d.cy,
                    r: d.r
                  });
                });

// *************** end Enemies *****************


var drag = d3.behavior.drag()
    .on("drag", function(d,i) {
        d.cx += d3.event.dx
        d.cy += d3.event.dy
        d3.select(this).attr("transform", function(d,i){
            return "translate(" + [ d.cx,d.cy ] + ")"
        })
    });

var player = board.selectAll()
    .data(playerData)
    .enter()
    .append('circle')
    .attr("cx", function(d) { return d.cx; })
    .attr("cy", function(d) { return d.cy; })
    .attr("r", function(d) { return d.r; })
    .attr('fill', function(d) { return d.color; })
    .style("cursor", "pointer")
    // .transition()
    // .delay(1000)
    // .attr('transform', 'translate(0, 100)');
    // .attr("transform", "translate(" + x + "," + y + ")")
    .call(drag)
