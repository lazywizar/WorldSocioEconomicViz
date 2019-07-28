/*
*    main.js
*/
var first_call = true; 
$("#graph-1-area").hide();
$("#chart-area").hide();
var interval;
var time = 0;

$("#page-1-btn")
    .on("click", function(){
        var button = $(this);
        clearInterval(interval);
        d3.select("#chart-area").select("*").remove();
        $("#graph-1-area").show();
        $("#chart-area").show();
        var button = $("#play-button");
        button.text("Play");
        time = 0;
        $("#story-1").empty();

        $("#story-1").append(
                `Here is the first visualization where we see <strong><font color="blue">Life Expectancy at birth</font>, 
                <font color="green"> GDP per capita </font> and <font color="red">Population </font> </strong> of a country change over year in a single visualization. 
                X-axis and Y-axis are self explanatory, size of the bubble is proportional to the population of the country.

                <br><br>
                Slide the <strong>Year Slider</strong> to observe the transition over time. Hover mouse over the bubbles to see the details,  
                <br><br>
                Play with the <strong>continent</strong> and <strong>country</strong> filter, and focus on a single continent or country you are interested in. Be careful, do not choose a country and a wrong continent! Time to test your geography!!
                `
        );

        $(this).prop('disabled', true);
        life_exp_graph();  
});

$("#page-3-btn")
    .on("click", function(){
        $("#page-1-btn").prop('disabled', false);
        $("#graph-1-area").hide();
        $("#chart-area").hide();
        d3.select("#chart-area").select("*").remove();
        clearInterval(interval);
});


function life_exp_graph() {
    var margin = { left:80, right:20, top:50, bottom:100 };
    var height = 500 - margin.top - margin.bottom, 
        width = 800 - margin.left - margin.right;
    
    var g = d3.select("#chart-area")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + 
                ", " + margin.top + ")");
    
    var formattedData;

    // Tooltip
    var tip = d3.tip().attr('class', 'd3-tip')
        .html(function(d) {
            var text = "<strong>Country:</strong> <span style='color:yellow'>" + d.country + "</span><br>";
            text += "<strong>Life Expectancy:</strong> <span style='color:orange'>" + d3.format(".0f")(d.life_exp) + "</span><br>";
            text += "<strong>GDP per capita:</strong> <span style='color:orange'>" + d3.format("$,.2f")(d.income) + "</span><br>";
            text += "<strong>Population:</strong> <span style='color:red'>" + d3.format(",.0f")(d.population) + "</span><br>";
            return text;
        });
    g.call(tip);

    // Scales
    var x = d3.scaleLog()
        .base(10)
        .range([0, width])
        .domain([20, 150000]);
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 90]);

    var area = d3.scaleLinear()
        .range([25*Math.PI, 1500*Math.PI])
        .domain([2000, 1400000000]);
    var continentColor = d3.scaleOrdinal(d3.schemePastel1);

    // Labels
    var xLabel = g.append("text")
        .attr("y", height + 50)
        .attr("x", width / 2)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("GDP per capita (current US$)");
    var yLabel = g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -170)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Life expectancy at birth (Years)")
    var timeLabel = g.append("text")
        .attr("y", height - 250)
        .attr("x", width - 40)
        .attr("font-size", "40px")
        .attr("opacity", "0.4")
        .attr("text-anchor", "middle")
        .text("1969");

    // X Axis
    var xAxisCall = d3.axisBottom(x)
        .tickValues([100, 1000, 5000, 50000])
        .tickFormat(d3.format("$"));
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height +")")
        .call(xAxisCall);

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return +d; });
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    var continents = ["Europe", "Asia", "North America", "Africa", "South America", "Oceania"];

    var legend = g.append("g")
        .attr("transform", "translate(" + (width - 10) + 
            "," + (height - 200) + ")");

    continents.forEach(function(continent, i){
        var legendRow = legend.append("g")
            .attr("transform", "translate(0, " + (i * 20) + ")");

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", continentColor(continent))
            .style("stroke", "black");

        legendRow.append("text")
            .attr("x", -10)
            .attr("y", 10)
            .attr("text-anchor", "end")
            .style("text-transform", "capitalize")
            .text(continent);
    });

    d3.json("data/World_bank_country_Data_normalized.json").then(function(data){
    //d3.json("data/data_small.json").then(function(data){    
        // Clean data
        formattedData = data.map(function(year){
            return year["countries"].filter(function(country){
                return (country.life_exp && country.income);
            }).map(function(country){
                country.income = +country.income;
                country.life_exp = +country.life_exp;
                country.population = +country.population;            
                return country;            
            })
        });

        // First run of the visualization
        update(formattedData[0]);

    })

    $("#play-button")
        .on("click", function(){
            var button = $(this);
            if (button.text() == "Play"){
                button.text("Pause");
                interval = setInterval(step, 100);            
            }
            else {
                button.text("Play");
                clearInterval(interval);
            }
        })

    $("#reset-button")
        .on("click", function(){
            time = 0;
            update(formattedData[0]);
        })    
    
    $("#page-2-btn")
    .on("click", function(){
        $("#story-1").empty();
        $("#story-1").append(`
            Lets pause the slider at <strong><font color="orange">2008</font></strong>, 
            and select just <strong><font color="orange">Europe</font></strong> as a continent. 
            Now slide by a year or two, see the bubbles going backward for several countries. Meaning a drop in GDP per capita. 
            
            <br>
            Ofcourse! you remember what happened in 2007-2009. Read about <strong><font color="red">'Great Recession in Europe'</font></strong>. 
        `);
        
        $("#page-1-btn").prop('disabled', false);
        //$("#play-button").click();

        time = 48;
        $("#continent-select").val( "Europe" );
        update(formattedData[48]);
    });

    $("#continent-select")
        .on("change", function(){
            update(formattedData[time]);
        })

    $("#country-select")
        .on("change", function(){
            update(formattedData[time]);
        })

    $("#date-slider").slider({
        max: 2017,
        min: 1960,
        step: 1,
        slide: function(event, ui){
            time = ui.value - 1960;
            //console.log(formattedData.length)
            update(formattedData[time]);
        }
    })

    function step(){
        // At the end of our data, loop back
        time = (time < 58) ? time+1 : 0
        update(formattedData[time]);
    }

    function update(data) {
        //console.log(data);

        // Standard transition time for the visualization
        var t = d3.transition()
            .duration(50);

        var country = $("#country-select").val();
        console.log(country);

        var continent = $("#continent-select").val();
        console.log(continent);
        
        data = data.filter(function(d){
            if (country == "All") { 
                return true; 
            } else {
                return d.country == country;
            }
        }).filter(function(d){
                if (continent == "all") { 
                    return true; 
                } else {
                    return d.continent == continent;
                }
        }) 

        // JOIN new data with old elements.
        var circles = g.selectAll("circle").data(data, function(d){
            return d.country;
        });

        // EXIT old elements not present in new data.
        circles.exit()
            .attr("class", "exit")
            .remove();

        // ENTER new elements present in new data.
        circles.enter()
            .append("circle")
            .attr("class", "enter")
            .attr("fill", function(d) { return continentColor(d.continent); })
            .style("stroke", "black")
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .merge(circles)
            .transition(t)
                .attr("cy", function(d){ return y(d.life_exp); })
                .attr("cx", function(d){ return x(d.income); })
                .attr("r", function(d){ return Math.sqrt(area(d.population) / Math.PI) });

        // Update the time label
        timeLabel.text(+(time + 1960))
        $("#year")[0].innerHTML = +(time + 1960)

        $("#date-slider").slider("value", +(time + 1960))
    }
}