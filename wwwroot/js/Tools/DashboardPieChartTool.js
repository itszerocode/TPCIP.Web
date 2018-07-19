
if (DashboardPieChartTool == null || typeof (DashboardPieChartTool) != "object") {
    var DashboardPieChartTool = new Object();
};

(function ($) {

    (function (context) {

        context.loadTool = function () {

            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardPieChartTool",
                context:
                    {
                    },
                callback: function (data) {
                }
            });
        };
        context.DrawServiceExecutionPieChart = function (pieData, pieChartPlaceHolder) {
            var obj = context.DrawPieChart(pieData, pieChartPlaceHolder);
            if (!obj.isDefault) {
                obj.arcs.on("click", function (d, i) {
                    DashboardServiceDetailsTool.ShowFilteredServices(obj.pieData[i].services);
                    d3.event.stopPropagation();
                });
                obj.circle.on("click", function (d, i) {
                    DashboardServiceDetailsTool.ShowFilteredServices("NOVA");
                    d3.event.stopPropagation();
                });
                obj.circleText.text("All Services");
            }
        };
        context.DrawGuideExecutionPieChart = function (pieData, pieChartPlaceHolder) {
            var obj = context.DrawPieChart(pieData, pieChartPlaceHolder);
            if (!obj.isDefault) {
                obj.arcs.on("click", function (d, i) {
                    DashboardGuideDetailsTool.ShowFilteredGuides(obj.pieData[i].services);
                    d3.event.stopPropagation();
                });
                obj.circle.on("click", function (d, i) {
                    DashboardGuideDetailsTool.ShowFilteredGuides("NOVA");
                    d3.event.stopPropagation();
                });
                obj.circleText.text("All Guides");
            }
            
        };

        context.DrawPieChart = function (pieData, pieChartPlaceHolder) {
            $("#" + pieChartPlaceHolder).empty();
            var defaultData = [{
                "label": "",
                "value": 1,
                "color": "#E0E0E0"
            }];
            //Initialize Pie Chart Properties
            var width = 300,
            height = 250,
            padAngle = 0.02;
            var outerRadius = 100;
            var innerRadius = outerRadius / 2;
            var x = outerRadius + 5;
            var outerGrownRadius = outerRadius + 10;
            var cornerRadius = 0;
            //initialize Data To be displayed on the chart
            if (pieData == "" || pieData == null) {
                pieData = defaultData;
            }
            else {
                try {
                    pieData = JSON.parse(pieData);
                }
                catch (ex) {
                    pieData = defaultData;
                }
            }
            if (pieData.length == 2 && parseInt(pieData[0].value) > 0 && parseInt(pieData[1].value) > 0) {
                var ratioSucByFail = parseInt(pieData[0].value) / parseInt(pieData[1].value);
                var ratioFailBySuc = parseInt(pieData[1].value) / parseInt(pieData[0].value);
                var ratio = ratioSucByFail < ratioFailBySuc ? ratioSucByFail : ratioFailBySuc;
            }
            else {
                var ratio = 0.01;
            }

            var arcOver = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerGrownRadius)
                .cornerRadius(cornerRadius);

            var vis = d3.select("#" + pieChartPlaceHolder)
                        .append("svg:svg") //create the SVG element inside the <body>
                        .data([pieData]) //associate our data with the document
                        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
                        .attr("height", height)
                        .append("svg:g") //make a group to hold our pie chart
                        .attr("transform", "translate(" + x + "," + x + ")") //move the center of the pie chart from 0, 0 to radius, radius
            var arc = d3.svg.arc() //this will create <path> elements for us using arc data
                        .outerRadius(outerRadius)
                        .innerRadius(innerRadius)
                        .cornerRadius(cornerRadius);
            var pie = d3.layout.pie() //this will create arc data for us given a list of values
                        .padAngle(padAngle)
                        .value(function (d) {
                            if (ratio < 0.009) {
                                if (d.value == 0) return 0;
                                else return d.value + 3;
                            }
                            return d.value;
                        }); //we must tell it out to access the value of each element in our data array
            var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
                        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
                        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
                        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                        .attr("class", "slice"); //allow us to style things in the slices (like text)

            arcs.append("svg:path")
                .attr("fill", function (d, i) {
                    return pieData[i].color;
                }) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function
            arcs.append("svg:text") //add a label to each slice
                .attr("transform", function (d) { //set the label's origin to the center of the arc
                    //we have to make sure to set these before calling arc.centroid
                    d.innerRadius = innerRadius;
                    d.outerRadius = outerRadius;
                    return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
                })
                .attr("class", "chart-labels")
                .attr("text-anchor", "middle") //center the text on it's origin
                .text(function (d, i) {
                    if (d.value > 0 && d.data["label"] != "")
                        return d.value;
                    else
                        return "";
                });
            var isDefault = (defaultData == pieData);
            var circle;
            var circleText;
            if (defaultData != pieData) {
                AttachEvents(arcs, pieChartPlaceHolder, arc, pieData);
                circle = d3.select("svg")
                        .append("g")
                        .attr("class", "NOVA")
                        .append("circle")
                        .attr("transform", "translate(" + x + "," + x + ")")
                        .attr("r", innerRadius - 2)
                        .attr("fill", "#fff");
                        
                circleText=d3.select("g.NOVA")
                    .append("svg:text")
                    .attr("transform", "translate(" + x + "," + x + ")")
                    .attr("class", "chart-labels")
                    .attr("text-anchor", "middle");
                    
            }
            DrawLegend(vis, pieData, outerRadius);
            return { arcs: arcs, isDefault: isDefault, circle: circle,circleText:circleText, pieData:pieData };
        };

        function AttachEvents(arcs, pieChartPlaceHolder, arc, pieData) {
            arcs.on("mouseover", function (d) {
                if (d.data["label"] != "" && d.data["value"] != 0) {
                    var pieChart = document.getElementById(pieChartPlaceHolder);
                    var pieParent = pieChart.offsetParent;
                    d3.select("#tooltip")
                        .style("left", (d3.event.pageX - pieParent.offsetLeft) + "px")
                        .style("top", (d3.event.pageY - pieParent.offsetTop) + "px")
                        .style("opacity", 1)
                        .select("#heading")
                        .text(d.data["label"] + ": " + d.data["value"]);

                    d3.selectAll("path")
                        .transition(1000).style("opacity", 0.2).attr("d", arc);
                    d3.select(this).select("path")
                        .transition(1000)
                        .style("opacity", 1);//.attr("d", arcOver);
                }
            }).on("mouseout", function (d) {
                // Hide the tooltip
                d3.select("#tooltip")
                    .style("opacity", 0);
                d3.selectAll("path")
                    .transition(1000)
                    .style("opacity", 1);//.attr("d", arc);
            }).on("mousemove", function (d) {
                if (d.data["label"] != "" && d.data["value"] != 0) {
                    var pieChart = document.getElementById(pieChartPlaceHolder);
                    var pieParent = pieChart.offsetParent;
                    d3.select("#tooltip")
                        .style("left", (d3.event.pageX - pieParent.offsetLeft) + "px")
                        .style("top", (d3.event.pageX - pieParent.offsetLeft) + "px")
                        .style("opacity", 1)
                        .select("#heading")
                        .text(d.data["label"] + ": " + d.data["value"]);
                }
            });
        };

        function DrawLegend(vis, pieData, recPosition) {
            var legendRectSize = 18; // NEW
            var legendSpacing = 4;
            var legend = vis.append("g")
                .attr("class", "legend")
            .attr("height", 100)
                .attr("width", 100)
                .attr('transform', 'translate(-20,50)')
                .text(function (d, i) {
                    return pieData[i].value;
                }); // NEW
            legend.selectAll('rect')
                .data(pieData)
                .enter()
                .append("rect")
                .attr("x", recPosition)
                .attr("y", function (d, i) {
                    return (i * 20) + 40;
                })
                .attr("width", legendRectSize)
                .attr("height", legendRectSize)
                .style("fill", function (d, i) {
                    return pieData[i].color;
                })
                .style("opacity", 1);
            legend.selectAll('text')
                .data(pieData)
                .attr("class", "legend")
                .enter()
                .append("text")
                .attr("x", recPosition + 20 + legendRectSize + legendSpacing - 20)
                .style("opacity", 1)
                .attr("y", function (d, i) {
                    return (i + 1) * (legendRectSize) - 3 + 40;
                })
                .text(function (d) {
                    return d.label;
                });
        }

    })(DashboardPieChartTool);

})(jQuery);