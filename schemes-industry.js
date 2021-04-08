// set the dimensions and margins of the graph
var marginQ = {top: 20, right: 30, bottom: 250, left: 150},
    widthQ = 900 - marginQ.left - marginQ.right,
    heightQ = 700 - marginQ.top - marginQ.bottom;

// append the svg object to the body of the page
var svgQ = d3.select("#schemes-industry-graph")
  .append("svg")
    .attr("width", widthQ + marginQ.left + marginQ.right)
    .attr("height", heightQ + marginQ.top + marginQ.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginQ.left + "," + marginQ.top + ")");

svgQ.append("circle").attr("cx",640).attr("cy",0).attr("r", 6).style("fill", "#EE442F")
svgQ.append("circle").attr("cx",640).attr("cy",30).attr("r", 6).style("fill", "#63ACBE")
svgQ.append("text").attr("x", 660).attr("y", 0).text("Applied").style("font-size", "15px").attr("alignment-baseline","middle")
svgQ.append("text").attr("x", 660).attr("y", 30).text("Received").style("font-size", "15px").attr("alignment-baseline","middle")

var xQ = d3.scaleBand()
        .range([0, widthQ])
        .padding(0.2);
var xAxisIndustryQ = svgQ.append("g")
        .attr("transform", "translate(0," + heightQ + ")")

var yQ = d3.scaleLinear()
        .domain([0, 100])
        .range([heightQ, 0]);
var yAxisIndustryQ  = svgQ.append("g")
  .attr("class", "myYaxis")

var selectedScheme;

function setSchemeVar(currentScheme) {
    selectedScheme = currentScheme;
    drawSchemeGraphs();
}

function drawSchemeGraphs() {
// Parse the Data
  var csv_file = ""

  if (selectedScheme == "Corona") {
    csv_file = "applied_industry_corona.csv";
    document.getElementById("scheme-industry-title").innerHTML = "...that applied to and received: Coronavirus Job Retention Scheme";
  } else if (selectedScheme == "Business") {
    csv_file = "applied_industry_business.csv";
    document.getElementById("scheme-industry-title").innerHTML = "...that applied to and received: Business rates holiday";
  } else if (selectedScheme == "VAT") {
    csv_file = "applied_industry_vat.csv";
    document.getElementById("scheme-industry-title").innerHTML = "...that applied to and received: Deferring VAT payments";
  } else if (selectedScheme == "HMRC") {
    csv_file = "applied_industry_hmrc.csv";
    document.getElementById("scheme-industry-title").innerHTML = "...that applied to and received: HMRC Time To Pay scheme";
  } else if (selectedScheme == "Grant") {
    csv_file = "applied_industry_grant.csv";
    document.getElementById("scheme-industry-title").innerHTML = "...that applied to and received: Government-funded small business grant or loan schemes";
  } else if (selectedScheme == "Finance") {
    csv_file = "applied_industry_finance.csv";
    document.getElementById("scheme-industry-title").innerHTML = "...that applied to and received: Accredited finance agreements";
  } else if (selectedScheme == "None") {
    csv_file = "applied_industry_none.csv";
    document.getElementById("scheme-industry-title").innerHTML = "...that applied to and received: None";
  }

  d3.csv(csv_file, function (data) {

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function (d) {
      return (d.Industry)
    }).keys();

    xQ.domain(groups);
    // Add X axis

    xAxisIndustryQ.call(d3.axisBottom(xQ).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis

    yAxisIndustryQ.transition().duration(1000).call(d3.axisLeft(yQ));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, xQ.bandwidth()])
        .padding([0.05]);

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#EE442F', '#63ACBE']);



    var barGroups = svgQ.selectAll("g.layer").data(data);
    barGroups.enter().append("g").classed('layer', true)
        .attr("transform", function(d) { return "translate(" + xQ(d.Industry) + ",0)"; });

    barGroups.exit().remove();

    var bars = svgQ.selectAll("g.layer").selectAll("rect")
        .data(function(d) {
            return subgroups.map(function(key) {
                return {key: key, value: d[key]};
            });
        });
    bars.enter().append("rect").attr("width", xSubgroup.bandwidth())
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("fill", function(d) { return color(d.key); })
        .transition().duration(750)
        .attr("y", function(d) { return yQ(d.value); })
        .attr("height", function(d) { return heightQ - yQ(d.value); });

    bars
        .transition().duration(750)
        .attr("y", function(d) { return yQ(d.value); })
        .attr("height", function(d) { return heightQ - yQ(d.value); });

    bars.exit().remove();

  })
}


setSchemeVar("Corona");