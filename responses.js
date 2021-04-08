// set the dimensions and margins of the graph
var marginR = {top: 5, right: 100, bottom: 90, left: 350},
    widthR = 900 - marginR.left - marginR.right,
    heightR = 700 - marginR.top - marginR.bottom;

// append the svg object to the body of the page
var svgR = d3.select("#responses-graph")
  .append("svg")
    .attr("width", widthR + marginR.left + marginR.right)
    .attr("height", heightR + marginR.top + marginR.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginR.left + "," + marginR.top + ")");

// Parse the Data
d3.csv("responses_industry.csv", function(data) {

   data.sort(function(b, a) {
        return a.Total - b.Total;
    });

  // Add X axis
  var xR = d3.scaleLinear()
    .domain([0,49])
    .range([ 0, widthR]);
  svgR.append("g")
    .attr("transform", "translate(0," + heightR + ")")
    .call(d3.axisBottom(xR))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var yR = d3.scaleBand()
    .range([ 0, heightR ])
    .domain(data.map(function(d) { return d.Industry; }))
    .padding(0.2);
  svgR.append("g")
    .call(d3.axisLeft(yR))


    // Bars
    svgR.selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return xR(0); })
        .attr("width", 0)
        .attr("fill", "#63ACBE")
        // no bar at the beginning thus:
        .attr("height", yR.bandwidth()) // always equal to 0
        .attr("y", function(d) { return yR(d.Industry); })

    // Animation
    svgR.selectAll("rect")
      .transition()
      .duration(700)
      .attr("width", function(d) { return xR(d.Total); })
      .delay(function(d,i){console.log(i) ; return(i*100)})


})

