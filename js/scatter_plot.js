function run_scatter_build() {
  // globals:

  var margin = {top: 20, right: 20, bottom: 40, left: 50},
      //width = 960 - margin.left - margin.right,
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%d-%b-%yT%H:%M:%S").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var size_scale = d3.scale.linear()
      .range([3,31])

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(d3.time.format("%b-%d"))
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#scatterSVG")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // build graph
  function build_graph(tweetData){
    console.log("MADE IT!")
    // format dates
    tweetData.forEach(function(d) {
        //d.timeStamp = parseDate(d.timeStamp);
        d.timeStamp = new Date(d.timeStamp);
        d.followersCount = +d.followersCount;
        d.followingCount = +d.followingCount;
    });
    console.log(tweetData)
    size_scale.domain(d3.extent(tweetData,function(d) {return d.followersCount}));
    x.domain(d3.extent(tweetData, function(d) { return d.timeStamp; }));
    y.domain(d3.extent(tweetData, function(d) { return d.followingCount; }));

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
        .text("Following Count")
        .style("stroke","white")
        .style("font-size",15);

    svg.selectAll(".dot")
        .data(tweetData)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return size_scale(d.followersCount); })
        .attr("cx", function(d) { return x(d.timeStamp); })
        .attr("cy", function(d) { return y(d.followingCount); })
        .style("fill", function(d) { return color(size_scale(d.followersCount)); })
        .style("opacity",0.9);
  };
  // get data
  console.log("loading data")

  d3.csv("data/sample1000_withHeader.csv", function(error, rawData) {
    console.log("loaded data")
    build_graph(rawData);
  });
};

Reveal.addEventListener('scatterInitial', function(event) {
   if (!d3.select("#scatterSVG").classed("finished")){
      run_scatter_build();
      d3.select("#scatterSVG")
        .classed("finished",true)
   };
});
