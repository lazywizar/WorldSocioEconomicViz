/*
*    main.js
*/
var first_call = true; 
var interval;
var time = 0;

$("#page-0-btn").click();
$("#continent-selector-div").hide();
$("#country-selector-div").hide();
$("#ledger-pane").hide();
$("#slider-div").hide();

$("#page-0-btn")
    .on("click", function(){
        $(this).addClass("btn-selected");
        //$("#page-0-btn").removeClass("btn-selected");
        $("#page-1-btn").removeClass("btn-selected");
        $("#page-2-btn").removeClass("btn-selected");
        $("#page-3-btn").removeClass("btn-selected");
        $("#page-4-btn").removeClass("btn-selected");

        console.log("btn-0 clicked");
        d3.select("#chart-area").select("*").remove();
        //clearInterval(interval);
        
        // Hide stuff 
        $("#continent-selector-div").hide();
        $("#country-selector-div").hide();
        $("#slider-div").hide();
        $("#ledger-pane").hide();

        // Message change
        $("#story-foot").empty();
        $("#story-left").empty();

        $("#story-down").empty();
        $("#story-down").append(
                `
                Welcome to the journey of exploring insights into socio economic conditions of the world since 1960 to 2017.
                The visualization tells an interactive story starting with GDP and Life expectancy growth over years. 
                <br>
                User should follow through the buttons on top, or feel free to explore anywhere. Play and deep dive at each slide to see interesting pattens. 

                <br><br></br>
                <strong>Visual structure</strong><br>
                This visualization follows Interactive Slideshow style of narration. 
                The user is guided through author driven sequence of Scenes -
                    but also has the option to skip a section of the flow. 
                    There are plenty of options to interact with the content.
                </br></br>
                <strong>User Interface</strong>
                </br>
                When the site is loaded, the user gets a full walk through of the layout 
                including the buttons used for moving between scene to scene.
                </br></br>
                <strong>Scenes</strong>
                </br>
                The scenes are represented by buttons on top. 
                There is a visual order. 
                The scenes follow a consistent template - the initial walkthorugh describes this visually.
                </br></br>

                <strong>Annotations</strong></br>
                Annotations are used in scenes to indicate specific points on the graph. 
                They are cleared when the user interacts with the dropdown
                    or when the user switches to a different scene.
                    They also manifest as tooltips triggered by mouse hover events.
            </br></br>
            
                <strong>Parameters & Triggers</strong></br>
                Clicking the navigation buttons triggers scene change events - which inturn 
                changes the parameters. Dropdowns for countries, continent, 
                slider for time trigger narrowing-down operations.   
                `
        );        
});

$("#page-1-btn")
    .on("click", function(){
        $("#page-0-btn").removeClass("btn-selected");
        $("#page-1-btn").addClass("btn-selected");
        $("#page-2-btn").removeClass("btn-selected");
        $("#page-3-btn").removeClass("btn-selected");
        $("#page-4-btn").removeClass("btn-selected");

        var button = $(this);
        //clearInterval(interval);
        d3.select("#chart-area").select("*").remove();
        var button = $("#play-button");
        button.text("Play");
        time = 0;

        // Hide stuff
        $("#ledger-pane").hide();
        
        //Show stuff
        $("#continent-selector-div").show();
        $("#country-selector-div").show();
        $("#slider-div").show();
        $("#graph-1-area").show();
        $("#chart-area").show();

        $("#story-left").empty();
        $("#story-left").append(
            `
            Here is the first visualization where we see <strong><font color="blue">Life Expectancy at birth</font>, 
                <font color="green"> GDP per capita </font> and <font color="red">Population </font> </strong> of a country change over year in a single visualization. 
                X-axis and Y-axis are self explanatory, size of the bubble is proportional to the population of the country.
            `
        );

        // Reset message
        $("#story-down").empty();
        $("#story-down").append(
                `Slide the <strong>Year Slider</strong> to observe the transition over time. Hover mouse over the bubbles to see the details,  
                <br><br>
                Play with the <strong>continent</strong> and <strong>country</strong> filter, and focus on a single continent or country you are interested in. Be careful, do not choose a country and a wrong continent! Time to test your geography!!
                `
        );

        $("#story-foot").empty();
        $("#story-foot").append(
        `<font color="grey">
        NOTE: Not all the countries have data for all the years, 
        and the bubbles would not appear if the data is missing for the year. 
        Data is collected from <a href="https://databank.worldbank.org/source/world-development-indicators">
            World Bank DataBank</a>. The visualization idea is inspired by <a href="https://www.gapminder.org">
                GapMinder</a>. 
        </font>
        `);
        $("#country-select").val("All");
        $("#continent-select").val("all");

        //$(this).prop('disabled', true);
        life_exp_graph(0);  
});

$("#page-2-btn")
    .on("click", function(){
        $("#page-0-btn").removeClass("btn-selected");
        $("#page-1-btn").removeClass("btn-selected");
        $("#page-2-btn").addClass("btn-selected");
        $("#page-3-btn").removeClass("btn-selected");
        $("#page-4-btn").removeClass("btn-selected");

        var button = $(this);
        //clearInterval(interval);
        d3.select("#chart-area").select("*").remove();
        var button = $("#play-button");
        button.text("Play");
        time = 0;

        // Hide stuff
        $("#ledger-pane").hide();
        
        //Show stuff
        $("#continent-selector-div").show();
        $("#country-selector-div").show();
        $("#slider-div").show();
        $("#graph-1-area").show();
        $("#chart-area").show();

        // Reset message
        $("#story-down").empty();
        $("#story-down").append(
            `
            Some story here!!
            `
        );


        $("#story-left").empty();
        $("#story-left").append(
                `
                Lets pause the slider at <strong><font color="orange">2008</font></strong>, 
                and select just <strong><font color="orange">Europe</font></strong> as a continent. 
                Now slide by a year or two, see the bubbles going backward for several countries. Meaning a drop in GDP per capita. 
                
                <br>
                Ofcourse! you remember what happened in 2007-2009. Read about <strong><font color="red">'Great Recession in Europe'</font></strong>. 
                `
        );

        $("#story-foot").empty();
        $("#country-select").val("All");
        $("#continent-select").val("Europe");
        time = 48;    
        //$(this).prop('disabled', true);
        life_exp_graph(48);  
});

$("#page-3-btn")
    .on("click", function(){
        $("#page-0-btn").removeClass("btn-selected");
        $("#page-1-btn").removeClass("btn-selected");
        $("#page-2-btn").removeClass("btn-selected");
        $("#page-3-btn").addClass("btn-selected");
        $("#page-4-btn").removeClass("btn-selected");

        d3.select("#chart-area").select("*").remove();
        clearInterval(interval);
        
        // Hide stuff 
        $("#continent-selector-div").hide();
        $("#slider-div").hide();

        // Show stuff
        $("#ledger-pane").show();

        // Message change
        $("#story-foot").empty();
        $("#story-foot").append(
            `
            <font color="grey"> **Gender ratio is calculated as <font color="green">(Population_Male / Population_Female) * 100</font></font>
            `
        );

        $("#story-down").empty();
        $("#story-down").append(
            `
            Some story here!!
            `
        );

        $("#story-left").empty();
        $("#story-left").append(
                `
                This visualization shows the population growth and <strong><font color="green">gender ratio</font></strong> change with it. <br>
                Taking <strong><font color="red">UAE</font></strong> as an default example, it is alarming to see the steep rise in the gender ratio over the last 50 years.

                <br><br>
                Explore how the <i>warm</i> looks for different countries!

                `
        );

        $("#country-select").val( "United Arab Emirates");
        population_graph();
});

$("#page-4-btn")
    .on("click", function(){
        $("#page-0-btn").removeClass("btn-selected");
        $("#page-1-btn").removeClass("btn-selected");
        $("#page-2-btn").removeClass("btn-selected");
        $("#page-3-btn").removeClass("btn-selected");
        $("#page-4-btn").addClass("btn-selected");

        d3.select("#chart-area").select("*").remove();
        clearInterval(interval);
        
        // Hide stuff 
        $("#continent-selector-div").hide();
        $("#slider-div").hide();

        // Show stuff
        $("#ledger-pane").show();

        // Message change
        $("#story-foot").empty();
        $("#story-foot").append(
            `
            <font color="grey"> **Gender ratio is calculated as <font color="green">(Population_Male / Population_Female) * 100</font></font>
            `
        );

        $("#story-down").empty();
        $("#story-down").append(
            `
            Some story here!!
            `
        );
        $("#story-left").empty();
        $("#story-left").append(
                `
                    The above graph clearly points the start of 
                    <font color="red"><strong>Syrian civil war</strong></font> around 2011. 
                    More than 4 million citizens migrated out since then. 
                    
                    <br><br>
                    Hope there be peace, and the graph be back on upward trajectory soon.  
                `
        );

        $("#country-select").val( "Syrian Arab Republic");
        population_graph();
});


function life_exp_graph(init_time) {
    d3.select("#chart-area").select("*").remove();

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
        .text("1960");

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
        update(formattedData[init_time]);
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

    // $("#page-2-btn")
    //     .on("click", function(){
    //         if(formattedData == null) {
    //             life_exp_graph();
    //         }

    //         //$("#page-1-btn").click();
            
    //         $("#story-down").empty();
    //         $("#story-down").append(`
    //             Lets pause the slider at <strong><font color="orange">2008</font></strong>, 
    //             and select just <strong><font color="orange">Europe</font></strong> as a continent. 
    //             Now slide by a year or two, see the bubbles going backward for several countries. Meaning a drop in GDP per capita. 
                
    //             <br>
    //             Ofcourse! you remember what happened in 2007-2009. Read about <strong><font color="red">'Great Recession in Europe'</font></strong>. 
    //         `);
            
    //         //$("#page-1-btn").prop('disabled', false);
    //         //$("#play-button").click();
            
    //         time = 48;
    //         $("#country-select").val( "All" ).change();
    //         $("#continent-select").val( "Europe" ).change();
    //         update(formattedData[48]);
    // });

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

/*
*/
function population_graph() {
    var margin = { left:130, right:150, top:50, bottom:100 },
        height = 500 - margin.top - margin.bottom, 
        width = 900 - margin.left - margin.right;

    d3.select("#chart-area").select("*").remove();    
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

    // Circle Tip
    var tip = d3.tip().attr('class', 'd3-tip')
        .html(function(d) {
            var text = "<strong><span style='color:yellow; align:center'>" + d3.format(".0f")(d.year) + " - " + d3.format(".2s")(d.population) +  "</span><strong><br>";
            text += "<strong>Gender Ratio:</strong> <span style='color:orange'>" + d3.format(".2f")((d.population_male / d.population_female) * 100) + "</span><br>";
            return text;
        });
    g.call(tip);

    // Labels
    var xLabel = g.append("text")
        .attr("class", "x axisLabel")
        .attr("y", height + 50)
        .attr("x", width / 2)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Year");
    var yLabel = g.append("text")
        .attr("class", "y axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("y", -90)
        .attr("x", -170)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Population")

    // Scales
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var color_scale = d3.scaleLinear().range(["blue", "red"]).domain([0, 250]);
    var radius_scale = d3.scaleLinear().domain([70, 300]).range([2.5, 15]);
    var color_opacity = d3.scaleLinear().domain([95.0, 105.0]).range([0.2, 1.0]);

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

    d3.json("data/World_bank_country_time_Data_normalized.json").then(function(data){
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
        //console.log("FD");
        //console.log(filteredData);

        // Run the visualization for the first time
        update();
    })

    function update() {
        // Filter data based on selections
        var country = $("#country-select").val(),
            yValue = $("#var-select").val();

        var dataTimeFiltered = filteredData[country];  
        
        console.log("Country: " + country);
        console.log(dataTimeFiltered);

        // Update scales
        x.domain(d3.extent(dataTimeFiltered, function(d){ return d3.format(".0f")(d.year); }));
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

        /*
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
                .attr("y", 20);
                //.attr("dy", ".31em");
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
                
                var text = d.year + " - Population: " + d3.format(".2s")(d.population) + ", GR: " + d3.format(".2f")((d.population_male / d.population_female) * 100);

                focus.attr("transform", "translate(" + x(d.year) + "," + y(d.population) + ")");
                var focusText = focus.select("text").text(text);

                focus.select(".x-hover-line").attr("y2", height - y(d.population));
                focus.select(".y-hover-line").attr("x2", -x(d.year));
            }
        */
        // Path generator
        line = d3.line()
            .x(function(d){ return x(d.year); })
            .y(function(d){ return y(d.population); });

        // // Update our line path
        g.select(".line")
            .transition(t)
            .attr("d", line(dataTimeFiltered));
        
            
        // JOIN new data with old elements.
        var circles = g.selectAll("circle").data(dataTimeFiltered);

        // EXIT old elements not present in new data.
        circles.exit()
            .attr("class", "exit")
            .remove();

        // ENTER new elements present in new data.
        circles.enter()
            .append("circle")
            .attr("class", "enter")
            .attr("fill", function(d) { return color_scale((d.population_male / d.population_female) * 100); })
            .style("stroke", "black")
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .merge(circles)
            .transition(t)
                .attr("cy", function(d){ return y(d.population); })
                .attr("cx", function(d){ return x(d.year); })
                .attr("r", function(d){ return 2 + radius_scale((d.population_male / d.population_female) * 100); })        
                .attr("fill", function(d) { return color_scale((d.population_male / d.population_female) * 100); })
                //.attr("fill-opacity", function(d) { return color_opacity((d.population_male / d.population_female) * 100); })
        // Update y-axis label
        var newText = (yValue == "population") ? "Population" :
            ((yValue == "population_male") ?  "Population Male" : "Population Female")
        yLabel.text(newText);
    }
}
