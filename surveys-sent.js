// set the dimensions and margins of the graph
var marginS = {top: 5, right: 100, bottom: 40, left: 350},
    widthS = 900 - marginS.left - marginS.right,
    heightS = 700 - marginS.top - marginS.bottom;

// append the svg object to the body of the page
var svgS = d3.select("#surveys-sent-graph")
  .append("svg")
    .attr("width", widthS + marginS.left + marginS.right)
    .attr("height", heightS + marginS.top + marginS.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginS.left + "," + marginS.top + ")");

// Parse the Data
d3.csv("surveys_sent_industry.csv", function(data) {

   data.sort(function(b, a) {
        return a.Total - b.Total;
    });

  // Add X axis
  var xS = d3.scaleLinear()
    .domain([0,3155])
    .range([ 0, widthS]);
  svgS.append("g")
    .attr("transform", "translate(0," + heightS + ")")
    .call(d3.axisBottom(xS))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var yS = d3.scaleBand()
    .range([ 0, heightS ])
    .domain(data.map(function(d) { return d.Industry; }))
    .padding(0.2);
  svgS.append("g")
    .call(d3.axisLeft(yS))


    // Bars
    svgS.selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return xS(0); })
        .attr("width", 0)
        .attr("fill", "#435E55FF") // #D64161FF for the pink
        // no bar at the beginning thus:
        .attr("height", yS.bandwidth()) // always equal to 0
        .attr("y", function(d) { return yS(d.Industry); })

    // Animation
    svgS.selectAll("rect")
      .transition()
      .duration(700)
      .attr("width", function(d) { return xS(d.Total); })
      .delay(function(d,i){console.log(i) ; return(i*100)})


})

