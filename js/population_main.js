/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 3 - CoinStats
*/

var margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");

var t = function(){ return d3.transition().duration(1000); }
var bisectDate = d3.bisector(function(d) { return d.year; }).left;

// Add the line for the first time
g.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", "3px");

// Labels
var xLabel = g.append("text")
    .attr("class", "x axisLabel")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Time");
var yLabel = g.append("text")
    .attr("class", "y axisLabel")
    .attr("transform", "rotate(-90)")
    .attr("y", -60)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Population")

// Scales
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// X-axis
var xAxisCall = d3.axisBottom()
    .ticks(10);
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

// Y-axis
var yAxisCall = d3.axisLeft()
var yAxis = g.append("g")
    .attr("class", "y axis");

// Event listeners
$("#country-select").on("change", update)
$("#var-select").on("change", update)

// Add jQuery UI slider
$("#date-slider").slider({
    range: true,
    max: 1960,
    min: 2018,
    step: 58, // One year
    values: [1960, 2018],
    slide: function(event, ui){
        $("#dateLabel1").text(ui.values[0]);
        $("#dateLabel2").text(ui.values[1]);
        update();
    }
});

d3.json("data/data_small_time.json").then(function(data){
    // console.log(data);

    // Prepare and clean data
    filteredData = {};
    for (var country in data) {
        if (!data.hasOwnProperty(country)) {
            continue;
        }
        filteredData[country] = data[country].filter(function(d){
            return !(d["population"] == null)
        })
        filteredData[country].forEach(function(d){
            d["population"] = +d["population"];
            d["population_male"] = +d["population_male"];
            d["population_female"] = +d["population_female"];
            d["year"] = +d["year"];
        });
    }
    console.log("FD");
    console.log(filteredData);

    // Run the visualization for the first time
    update();
})

function update() {
    // Filter data based on selections
    var country = $("#country-select").val(),
        yValue = $("#var-select").val(),
        sliderValues = $("#date-slider").slider("values");

    var dataTimeFiltered = filteredData[country];  
    
    //console.log("Country: " + country);
    //console.log(dataTimeFiltered);

    // Update scales
    x.domain(d3.extent(dataTimeFiltered, function(d){ return d.year; }));
    y.domain([d3.min(dataTimeFiltered, function(d){ return d.population; }) / 1.005, 
        d3.max(dataTimeFiltered, function(d){ return d.population; }) * 1.005]);

    // Update axes
    xAxisCall.scale(x);
    xAxis.call(xAxisCall);
    yAxisCall.scale(y);
    yAxis.call(yAxisCall);

    // Clear old tooltips
    d3.select(".focus").remove();
    d3.select(".overlay").remove();

    // Tooltip code
    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");
    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);
    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", width);
    focus.append("circle")
        .attr("r", 5);
    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");
    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);
     

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(dataTimeFiltered, x0, 1),
            d0 = dataTimeFiltered[i - 1],
            d1 = dataTimeFiltered[i],
            d = x0 - d0.year > d1.year - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.year) + "," + y(d.population) + ")");
        focus.select("text").text(d.population);
        focus.select(".x-hover-line").attr("y2", height - y(d.population));
        focus.select(".y-hover-line").attr("x2", -x(d.year));
    }

    // Path generator
    line = d3.line()
        .x(function(d){ return x(d.year); })
        .y(function(d){ return y(d.population); });

    // Update our line path
    g.select(".line")
        .transition(t)
        .attr("d", line(dataTimeFiltered));

    // Update y-axis label
    var newText = (yValue == "population") ? "Population" :
        ((yValue == "population_male") ?  "Population Male" : "Population Female")
    yLabel.text(newText);
}