
var score = 0;
var highScore = 0;
var collisionCount = 0;

var updateScore = function () {
  d3.select('.current span').text(score);
  d3.select('.highscore span').text(highScore);
  d3.select('.collisions span').text(collisionCount);
};

var options = {
  w: 600,
  h: 600,
  nEnemies: 20,
  r: 10,
  duration: 3000
  // width: window.innerWidth,
  // height: window.innerHeight
};

var rand = function (num) {
  return Math.floor(Math.random() * num);
};

var playerData = {
  x: rand(options.w - options.r * 2),
  y: rand(options.h - options.r * 2),
  r: 10
};

// ***************  Board *****************

var board = d3.select('.board').append('svg')
  .attr('width', options.w)
  .attr('height', options.h);

// ***************  Enemies *****************

var createEnemies = function(n) {
  var enemies = [];
  for (var id = 0; id < n; id++) {
    enemies.push(id);
  }
  return enemies.map(id => {
    return {
      id: id,
      x: Math.random() * options.w,
      y: Math.random() * options.h,
      r: 10
    };
  });
};

var enemiesArr = createEnemies(options.nEnemies);

var enemiesAll = board.selectAll('circle')
  .data(enemiesArr)
  .enter()
  .append('circle')
  .attr('class', 'enemy')
    .each(function (d) {
      d3.select(this).attr({
        cx: d.x,
        cy: d.y,
        r: d.r
      });
    });

// *************** end Enemies *****************
// *************** Player *****************
var px = 'px';

var player = d3.select('.mouse').style({
  top: playerData.x + px,
  left: playerData.y + px,
  width: playerData.r * 2 + px,
  height: playerData.r * 2 + px,
  'border-radius': playerData.r * 2 + px
});

// board.on('mousemove', function() {
d3.select('.board').on('mousemove', function() {
  var loc = d3.mouse(this);
  playerData.x = loc[0];
  playerData.y = loc[1];

  player.style({
    top: playerData.y - playerData.r + px,
    left: playerData.x - playerData.r + px
  });
});

var move = function(el) {
  el.transition().duration(options.duration).ease('cubic-in-out').attr({
    cx: rand(options.w - options.r * 2),
    cy: rand(options.h - options.r * 2),
  }).each('end', function() {
    move(d3.select(this));
  });
};

move(d3.selectAll('.enemy'));

var scoreTicker = function () {
  score++;
  highScore = Math.max(score, highScore);
  updateScore();
};
setInterval(scoreTicker, 100);

var prevCollision = false;

var detectCollisions = function () {
  var collision = false;

  d3.selectAll('circle').each(function(d) {
    var node = d3.select(this);
    var cx = node.attr('cx') + options.r;
    var cy = node.attr('cy') + options.r;
    var x = cx - playerData.x;
    var y = cy - playerData.y;
    if (Math.sqrt(x * x + y * y) < options.r * 2) {
      collision = true;
      console.log('COLLISION');
    }
    if (collision) {
      score = 0;
      board.style('background-color', 'red');
      if (prevCollision !== collision) {
        collisionCount++;
      }
    } else {
      board.style('background-color', '#e7e9e7');
    }
    prevCollision = collision;
  });
};

d3.timer(detectCollisions);


// Previous implementation using drag()


// var drag = d3.behavior.drag()
//     .on("drag", function(d,i) {
//         d.cx += d3.event.dx
//         d.cy += d3.event.dy
//         d3.select(this).attr("transform", function(d,i){
//             return "translate(" + [ d.cx,d.cy ] + ")"
//         })
//     });
//
// var player = board.selectAll()
//     .data(playerData)
//     .enter()
//     .append('circle')
//     .attr("cx", function(d) { return d.cx; })
//     .attr("cy", function(d) { return d.cy; })
//     .attr("r", function(d) { return d.r; })
//     .attr('fill', function(d) { return d.color; })
//     .style("cursor", "pointer")
//     // .transition()
//     // .delay(1000)
//     // .attr('transform', 'translate(0, 100)');
//     // .attr("transform", "translate(" + x + "," + y + ")")
//     .call(drag)


// console.log('enemiesArr', d3.selectAll('.enemy'));
// console.log('enemiesAll', enemiesAll);
// var player = board.selectAll()
//     .data(playerData)
//     .enter()
//     .append('circle')
//     .attr('cx', function(d) { return d.x; })
//     .attr('cy', function(d) { return d.y; })
//     .attr('r', function(d) { return d.r; })
//     .attr('fill', function(d) { return d.color; })
//     .style('cursor', 'pointer')
//     .call(drag);
//
//
// var drag = d3.behavior.drag()
//     .on("drag", function(d,i) {
//       console.log('dd1', d);
//         console.log(d3.event);
//         d.cx += d3.event.x
//         d.cy += d3.event.y
//         console.log('dd2', d);
//         d3.select(this).attr("transform", function(d,i){
//             return "translate(" + [ d.x,d.y ] + ")"
//         })
//     });

// var drag = d3.behavior.drag().on('drag', function() {
//   player.attr('x', d3.event.x).attr('y', d3.event.y);
// });
