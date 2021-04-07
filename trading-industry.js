// set the dimensions and marginIndustrys of the graph
var marginIndustry = {top: 20, right: 30, bottom: 250, left: 150},
    widthIndustry = 900 - marginIndustry.left - marginIndustry.right,
    heightIndustry  = 700 - marginIndustry.top - marginIndustry.bottom;

// append the svg object to the body of the page
var svgIndustry  = d3.select("#trading-industry-graph")
  .append("svg")
    .attr("width", widthIndustry  + marginIndustry.left + marginIndustry.right)
    .attr("height", heightIndustry  + marginIndustry.top + marginIndustry.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginIndustry.left + "," + marginIndustry.top + ")");

// Initialize the X axis
var xIndustry  = d3.scaleBand()
  .range([ 0, widthIndustry  ])
  .padding(0.2);
var xAxisIndustry  = svgIndustry.append("g")
    .attr("transform", "translate(0," + heightIndustry  + ")")


// Initialize the Y axis
var yIndustry  = d3.scaleLinear()
  .range([ heightIndustry , 0]);
var yAxisIndustry  = svgIndustry.append("g")
  .attr("class", "myYaxis")


var selectedVar;

function setIndustryVar(currentVar) {
    selectedVar = currentVar;
    drawIndustryGraphs();
}

// A function that create / update the plot for a given variable:
function drawIndustryGraphs() {

  // Parse the Data
  d3.csv("trading_status_industry.csv", function(data) {

    // X axis
          xIndustry.domain(data.map(function (d) {
              return d.Industry;
          }))


    xAxisIndustry.transition().duration(1000).call(d3.axisBottom(xIndustry))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Add Y axis
    if (selectedVar == "CeasedValue") {
          yIndustry.domain([0,d3.max(data, function(d) { return +d[selectedVar] })]);
    } else {
          yIndustry.domain([0, Math.ceil(d3.max(data, function(d) { return +d[selectedVar] }) / 10) * 10 ]);
    }

    yAxisIndustry.transition().duration(1000).call(d3.axisLeft(yIndustry));

    // variable u: map data to existing bars
    var u = svgIndustry.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .style("fill", "white")
      .transition()
      .duration(700)
        .attr("x", function(d) { return xIndustry(d.Industry); })
        .attr("y", function(d) { return yIndustry(d[selectedVar]); })
        .attr("width", xIndustry.bandwidth())
        .attr("height", function(d) { return heightIndustry - yIndustry(d[selectedVar]); })
        .style("fill", function(d) {
            if (selectedVar == "ContinuedValue") {
                return "#643E46FF";
            } else if (selectedVar == "CeasedValue") {
                return "#333D79FF";
            } else if (selectedVar == "PausedValue") {
                return "#76528BFF";
            }
         });



  })


}


// Initialize plot
setIndustryVar('ContinuedValue');


