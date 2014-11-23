
// globals:

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%yT%H:%M:%S").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var size_scale = d3.scale.linear()
    .range([1,6])

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// build graph
function build_graph(tweetData){
  console.log("MADE IT!")
  // format dates
  tweetData.forEach(function(d) {
      d.timeStamp = parseDate(d.timeStamp);
      d.followersCount = +d.followersCount;
      d.followingCount = +d.followingCount;
  });
  console.log(tweetData)
  size_scale.domain(d3.extent(tweetData,function(d) {return d.followersCount}));
  x.domain(d3.extent(tweetData, function(d) { return d.timeStamp; }));
  y.domain(d3.extent(tweetData, function(d) { return d.followersCount; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svg.selectAll(".dot")
      .data(tweetData)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) { return size_scale(d.followersCount); })
      .attr("cx", function(d) { return x(d.timeStamp); })
      .attr("cy", function(d) { return y(d.followingCount); })
      .style("fill", function(d) { return color(size_scale(d.followersCount)); });
};
// get data
d3.csv("data/parsed_json_with_header.csv", function(error, rawData) {
  build_graph(rawData);
});

