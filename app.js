var margin = {top: 30, bottom: 30, left: 30, right: 30};
var HEIGHT = 700 - margin.top - margin.bottom;
var WIDTH = 1200 - margin.left - margin.right;

var svg = d3.select('body')
    .append('svg')
    .attr('height', HEIGHT + margin.top + margin.bottom)
    .attr('width', WIDTH + margin.left + margin.right);

var chart = svg.append('g')
    .attr('class', 'chart')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

var xScale = d3.scale.linear()
  .range([0, WIDTH]);

var yScale = d3.scale.linear()
  .range([HEIGHT, 0]);

var rScale = d3.scale.linear()
  .range([3, 6]);

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function type(d) {
  d.Attack = +d.Attack;
  d.Defense = +d.Defense;
  d.HP = +d.HP;
  return d;
}

d3.csv('pokemon.csv', type, function(error, data) {
  if (error) {
    return;
  }

  var xMax = d3.max(data, function(d) {return d.Attack;});
  xScale.domain([0, xMax]);

  var yMax = d3.max(data, function(d) {return d.Defense;});
  yScale.domain([0, yMax]);

  var rMax = d3.max(data, function(d) {return d.HP});
  rScale.domain([0, rMax]);

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom');

  chart.append('g')
      .attr('transform', 'translate(0,' + HEIGHT + ')')
      .attr('class', 'axis date')
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", WIDTH)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Attack");;

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

  chart.append('g')
      .attr('transform', 'translate(0, 0)')
      .attr('class', 'axis date')
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .style("text-anchor", "end")
      .text("Defense");

  chart.selectAll('.dots')
      .data(data)
      .enter()
      .append("svg:circle")
      .attr('cx', function(d) {
        return xScale(d.Attack);
      })
      .attr('cy', function(d) {
         return HEIGHT - yScale(d.Defense);
      })
      .attr('r', function(d) {
        return rScale(d.HP);
      })
      .attr('fill', function(d) {
        return d.Legendary == "True" ? '#2ecc71': 'steelblue';
      })
      .on('mouseover', function(d) {
        this.setAttribute('r', 8);
        tooltip.transition()
                .duration(200)
                .style("opacity", .9);
        tooltip.html(d.Name)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
      })
      .on('mouseout', function(d) {
        this.setAttribute('r', rScale(d.HP));
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
      })
})
