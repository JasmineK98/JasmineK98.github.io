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
  .attr("class", "myYaxis");

svgW.append("circle").attr("cx",520).attr("cy",0).attr("r", 6).style("fill", "#EE442F")
svgW.append("circle").attr("cx",520).attr("cy",30).attr("r", 6).style("fill", "#63ACBE")
svgW.append("circle").attr("cx",520).attr("cy",60).attr("r", 6).style("fill", "#709A74")
svgW.append("text").attr("x", 540).attr("y", 0).text("Continuing to trade").style("font-size", "15px").attr("alignment-baseline","middle")
svgW.append("text").attr("x", 540).attr("y", 30).text("Permanently ceased trading").style("font-size", "15px").attr("alignment-baseline","middle")
svgW.append("text").attr("x", 540).attr("y", 60).text("Temporarily paused trading").style("font-size", "15px").attr("alignment-baseline","middle")



var selectedVarW;

function setCountryVar(currentVar) {
    selectedVarW = currentVar;
    drawCountryGraphs();
}

// A function that create / update the plot for a given variable:
function drawCountryGraphs() {

  // Parse the Data
  d3.csv("trading_status_country.csv", function(data) {

      if (selectedVarW == "ContinuedValue") {
          data.sort(function (b, a) {
              return a.ContinuedValue - b.ContinuedValue;
          });
          document.getElementById("trade-country-title").innerHTML = "that are: Continuing to trade";
      } else if (selectedVarW == "CeasedValue") {
          data.sort(function (b, a) {
              return a.CeasedValue - b.CeasedValue;
          });
          document.getElementById("trade-country-title").innerHTML = "that have: Permanently ceased trading";
      } else if (selectedVarW == "PausedValue") {
          data.sort(function (b, a) {
              return a.PausedValue - b.PausedValue;
          });
          document.getElementById("trade-country-title").innerHTML = "that have: Temporarily paused trading";
      }

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
          yW.domain([0, 100 ]);
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
                return "#EE442F";
            } else if (selectedVarW == "CeasedValue") {
                return "#63ACBE";
            } else if (selectedVarW == "PausedValue") {
                return "#709A74";
            }
         });



  })


}


// Initialize plot
setCountryVar('ContinuedValue');


