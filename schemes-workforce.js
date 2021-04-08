// Set the dimensions and margins of the graph
var marginT = {top: 20, right: 30, bottom: 250, left: 150},
    widthT = 900 - marginT.left - marginT.right,
    heightT = 700 - marginT.top - marginT.bottom;

// Append the svg object to the body of the page
var svgT = d3.select("#schemes-workforce-graph")
    .append("svg")
    .attr("width", widthT + marginT.left + marginT.right)
    .attr("height", heightT + marginT.top + marginT.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginT.left + "," + marginT.top + ")");

// Add legend
svgT.append("circle").attr("cx", 640).attr("cy", 0).attr("r", 6).style("fill", "#EE442F")
svgT.append("circle").attr("cx", 640).attr("cy", 30).attr("r", 6).style("fill", "#63ACBE")
svgT.append("text").attr("x", 660).attr("y", 0).text("Applied").style("font-size", "15px").attr("alignment-baseline", "middle")
svgT.append("text").attr("x", 660).attr("y", 30).text("Received").style("font-size", "15px").attr("alignment-baseline", "middle")

// Define X axis
var xT = d3.scaleBand()
    .range([0, widthT])
    .padding(0.2);
var xAxisIndustryT = svgT.append("g")
    .attr("transform", "translate(0," + heightT + ")")

// Define Y axis
var yT = d3.scaleLinear()
    .domain([0, 100])
    .range([heightT, 0]);
var yAxisIndustryT = svgT.append("g")
    .attr("class", "myYaxis")

// Define tooltip
var tooltipT = d3.select("body").append("div").attr("id", "tooltipT").attr("class", "toolTip");

var selectedSchemeT;

function setSchemeWorkforceVar(currentScheme) {
    selectedSchemeT = currentScheme;
    drawSchemeWorkforceGraphs();
}

function drawSchemeWorkforceGraphs() {
// Parse the Data
    var csv_file = ""

    if (selectedSchemeT == "Corona") {
        csv_file = "applied_work_corona.csv";
        document.getElementById("scheme-workforce-title").innerHTML = "...that applied to and received: Coronavirus Job Retention Scheme";
    } else if (selectedSchemeT == "Business") {
        csv_file = "applied_work_business.csv";
        document.getElementById("scheme-workforce-title").innerHTML = "...that applied to and received: Business rates holiday";
    } else if (selectedSchemeT == "VAT") {
        csv_file = "applied_work_vat.csv";
        document.getElementById("scheme-workforce-title").innerHTML = "...that applied to and received: Deferring VAT payments";
    } else if (selectedSchemeT == "HMRC") {
        csv_file = "applied_work_hmrc.csv";
        document.getElementById("scheme-workforce-title").innerHTML = "...that applied to and received: HMRC Time To Pay scheme";
    } else if (selectedSchemeT == "Grant") {
        csv_file = "applied_work_grant.csv";
        document.getElementById("scheme-workforce-title").innerHTML = "...that applied to and received: Government-funded small business grant or loan schemes";
    } else if (selectedSchemeT == "Finance") {
        csv_file = "applied_work_finance.csv";
        document.getElementById("scheme-workforce-title").innerHTML = "...that applied to and received: Accredited finance agreements";
    } else if (selectedSchemeT == "None") {
        csv_file = "applied_work_none.csv";
        document.getElementById("scheme-workforce-title").innerHTML = "...that applied to and received: None";
    }

    d3.csv(csv_file, function (data) {

        // List of subgroups = header of the csv files
        var subgroups = data.columns.slice(1);

        // List of groups to show  on the X axis
        var groups = d3.map(data, function (d) {
            return (d.WorkforceSize)
        }).keys();

        xT.domain(groups);

        // Add X axis
        xAxisIndustryT.call(d3.axisBottom(xT).tickSize(0))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        yAxisIndustryT.transition().duration(1000).call(d3.axisLeft(yT));

        // Define subgroups
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, xT.bandwidth()])
            .padding([0.05]);

        // One color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#EE442F', '#63ACBE']);

        // Creating and animating the bars
        var barGroups = svgT.selectAll("g.layer").data(data);
        barGroups.enter().append("g").classed('layer', true)
            .attr("transform", function (d) {
                return "translate(" + xT(d.WorkforceSize) + ",0)";
            });

        barGroups.exit().remove();

        var bars = svgT.selectAll("g.layer").selectAll("rect")
            .data(function (d) {
                return subgroups.map(function (key) {
                    return {key: key, value: d[key]};
                });
            });
        bars.enter().append("rect").attr("width", xSubgroup.bandwidth())
            .attr("x", function (d) {
                return xSubgroup(d.key);
            })
            .attr("fill", function (d) {
                return color(d.key);
            })
            .on("mousemove", function (d) {
                tooltipT
                    .style("left", d3.event.pageX - 200 + "px")
                    .style("top", d3.event.pageY + 50 + "px")
                    .style("display", "inline-block")
                    .html((d.key) + "<br>" + "Percentage of businesses:" + " " + (d.value)); //add industry too
            })
            .on("mouseout", function (d) {
                tooltipT.style("display", "none");
            })
            .transition().duration(750)
            .attr("y", function (d) {
                return yT(d.value);
            })
            .attr("height", function (d) {
                return heightT - yT(d.value);
            });

        bars
            .transition().duration(750)
            .attr("y", function (d) {
                return yT(d.value);
            })
            .attr("height", function (d) {
                return heightT - yT(d.value);
            });

        bars.exit().remove();

    })
}


setSchemeWorkforceVar("Corona");