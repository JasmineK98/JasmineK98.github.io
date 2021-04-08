// Set the dimensions and marginIndustrys of the graph
var marginIndustry = {top: 20, right: 30, bottom: 250, left: 150},
    widthIndustry = 850 - marginIndustry.left - marginIndustry.right,
    heightIndustry = 700 - marginIndustry.top - marginIndustry.bottom;

// Append the svg object to the body of the page
var svgIndustry = d3.select("#trading-industry-graph")
    .append("svg")
    .attr("width", widthIndustry + marginIndustry.left + marginIndustry.right)
    .attr("height", heightIndustry + marginIndustry.top + marginIndustry.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginIndustry.left + "," + marginIndustry.top + ")");

// Initialize the X axis
var xIndustry = d3.scaleBand()
    .range([0, widthIndustry])
    .padding(0.2);
var xAxisIndustry = svgIndustry.append("g")
    .attr("transform", "translate(0," + heightIndustry + ")")


// Initialize the Y axis
var yIndustry = d3.scaleLinear()
    .range([heightIndustry, 0]);
var yAxisIndustry = svgIndustry.append("g")
    .attr("class", "myYaxis")

var tooltipIndustry = d3.select("body").append("div").attr("id", "tooltipIndustry").attr("class", "toolTip");

/*svgIndustry.append("circle").attr("cx",520).attr("cy",0).attr("r", 6).style("fill", "#EE442F")
svgIndustry.append("circle").attr("cx",520).attr("cy",30).attr("r", 6).style("fill", "#63ACBE")
svgIndustry.append("circle").attr("cx",520).attr("cy",60).attr("r", 6).style("fill", "#709A74")
svgIndustry.append("text").attr("x", 540).attr("y", 0).text("Continuing to trade").style("font-size", "15px").attr("alignment-baseline","middle")
svgIndustry.append("text").attr("x", 540).attr("y", 30).text("Permanently ceased trading").style("font-size", "15px").attr("alignment-baseline","middle")
svgIndustry.append("text").attr("x", 540).attr("y", 60).text("Temporarily paused trading").style("font-size", "15px").attr("alignment-baseline","middle")*/

var selectedVar;

function setIndustryVar(currentVar) {
    selectedVar = currentVar;
    drawIndustryGraphs();
}

// A function that creates / updates the plot for a given variable:
function drawIndustryGraphs() {

    // Parse the Data
    d3.csv("trading_status_industry.csv", function (data) {

        if (selectedVar == "ContinuedValue") {
            data.sort(function (b, a) {
                return a.ContinuedValue - b.ContinuedValue;
            });
            document.getElementById("trade-industry-title").innerHTML = "...that are: Continuing to trade";
        } else if (selectedVar == "CeasedValue") {
            data.sort(function (b, a) {
                return a.CeasedValue - b.CeasedValue;
            });
            document.getElementById("trade-industry-title").innerHTML = "...that have: Permanently ceased trading";
        } else if (selectedVar == "PausedValue") {
            data.sort(function (b, a) {
                return a.PausedValue - b.PausedValue;
            });
            document.getElementById("trade-industry-title").innerHTML = "...that have: Temporarily paused trading";
        }

        // Add X axis
        xIndustry.domain(data.map(function (d) {
            return d.Industry;
        }))


        xAxisIndustry.transition().duration(1000).call(d3.axisBottom(xIndustry))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        if (selectedVar == "CeasedValue") {
            yIndustry.domain([0, d3.max(data, function (d) {
                return +d[selectedVar]
            })]);
        } else {
            yIndustry.domain([0, 100]);
        }

        yAxisIndustry.transition().duration(1000).call(d3.axisLeft(yIndustry));


        // Variable u: map data to existing bars
        var u = svgIndustry.selectAll("rect")
            .data(data)

        // Update bars
        u
            .enter()
            .append("rect")
            .merge(u)
            .style("fill", "white")
            .on("mousemove", function (d) {
                tooltipIndustry
                    .style("left", d3.event.pageX - 200 + "px")
                    .style("top", d3.event.pageY + 50 + "px")
                    .style("display", "inline-block")
                    .html((d.Industry) + "<br>" + "Percentage of responding businesses:" + " " + (d[selectedVar])); //add industry too
            })
            .on("mouseout", function (d) {
                tooltipIndustry.style("display", "none");
            })
            .transition()
            .duration(700)
            .attr("x", function (d) {
                return xIndustry(d.Industry);
            })
            .attr("y", function (d) {
                return yIndustry(d[selectedVar]);
            })
            .attr("width", xIndustry.bandwidth())
            .attr("height", function (d) {
                return heightIndustry - yIndustry(d[selectedVar]);
            })
            .style("fill", function (d) {
                if (selectedVar == "ContinuedValue") {
                    return "#601A4A";
                } else if (selectedVar == "CeasedValue") {
                    return "#EE442F";
                } else if (selectedVar == "PausedValue") {
                    return "#63ACBE";
                }
            });


    })


}


// Initialize plot
setIndustryVar('ContinuedValue');


