var margin = {top: 30, bottom: 30, left: 30, right: 30};
var HEIGHT = 700 - margin.top - margin.bottom;
var WIDTH = 1200 - margin.left - margin.right;

var svg = d3.select('body')
    .append('svg')
    .attr('height', HEIGHT + margin.top + margin.bottom)
    .attr('width', WIDTH + margin.left + margin.right);

var xScale =  new Plottable.Scales.Linear();
var yScale = new Plottable.Scales.Linear();

var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
var yAxis = new Plottable.Axes.Numeric(yScale, "left");

var plot = new Plottable.Plots.Scatter()
    .x(function(d) { return d.Attack; }, xScale)
    .y(function(d) { return d.Defense; }, yScale);

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
  var dataset = new Plottable.Dataset(data);
  plot.addDataset(dataset);

  var chart = new Plottable.Components.Table([
    [yAxis, plot],
    [null, xAxis]
  ]);

  chart.renderTo(svg);

  new Plottable.Components.AxisLabel("Defense")
  .yAlignment('top')
  .xAlignment("left")
  .angle(90)
  .renderTo(svg);

  new Plottable.Components.AxisLabel("Attack")
  .yAlignment('bottom')
  .xAlignment("right")
  .renderTo(svg);
});
