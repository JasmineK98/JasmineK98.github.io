// set the dimensions and margins of the graph
var marginW = {top: 20, right: 100, bottom: 90, left: 150},
    widthW = 900 - marginW.left - marginW.right,
    heightW = 700 - marginW.top - marginW.bottom;

// append the svg object to the body of the page
var svgW = d3.select("#trading-country-graph")
  .append("svg")
    .attr("width", widthW + marginW.left + marginW.right)
    .attr("height", heightW + marginW.top + marginW.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginW.left + "," + marginW.top + ")");

// Initialize the X axis
var xW = d3.scaleBand()
  .range([ 0, widthW ])
  .padding(0.5);
var xAxisW = svgW.append("g")
    .attr("transform", "translate(0," + heightW + ")")



// Initialize the Y axis
var yW = d3.scaleLinear()
  .range([ heightW, 0]);
var yAxisW = svgW.append("g")
  .attr("class", "myYaxis")


var selectedVarW;

function setCountryVar(currentVar) {
    selectedVarW = currentVar;
    drawCountryGraphs();
}

// A function that create / update the plot for a given variable:
function drawCountryGraphs() {

  // Parse the Data
  d3.csv("trading_status_country.csv", function(data) {

    // X axis
          xW.domain(data.map(function (d) {
              return d.Country;
          }));



    xAxisW.transition().duration(1000).call(d3.axisBottom(xW))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Add Y axis
    if (selectedVarW == "CeasedValue") {
          yW.domain([0,d3.max(data, function(d) { return +d[selectedVarW] })]);
    } else {
          yW.domain([0, Math.ceil(d3.max(data, function(d) { return +d[selectedVarW] }) / 10) * 10 ]);
    }

    yAxisW.transition().duration(1000).call(d3.axisLeft(yW));

    // variable u: map data to existing bars
    var u = svgW.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .style("fill", "white")
      .transition()
      .duration(700)
        .attr("x", function(d) { return xW(d.Country); })
        .attr("y", function(d) { return yW(d[selectedVarW]); })
        .attr("width", xW.bandwidth())
        .attr("height", function(d) { return heightW - yW(d[selectedVarW]); })
        .style("fill", function(d) {
            if (selectedVarW == "ContinuedValue") {
                return "#643E46FF";
            } else if (selectedVarW == "CeasedValue") {
                return "#333D79FF";
            } else if (selectedVarW == "PausedValue") {
                return "#76528BFF";
            }
         });



  })


}


// Initialize plot
setCountryVar('ContinuedValue');


