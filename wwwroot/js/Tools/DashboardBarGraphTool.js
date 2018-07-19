if (DashboardBarGraphTool == null || typeof (DashboardBarGraphTool) != "object") {
    var DashboardBarGraphTool = new Object();
};

(function ($) {

    (function (context) {

        context.loadTool = function () {

            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardBarGraphTool",
                context:
                    {
                    },
                callback: function (data) {
                }
            });
        };
        context.RefreshServiceResponseOverviewBarChart = function (tableRow) {
            serviceID = $(tableRow).attr("data-serviceid");
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardBarGraphTool",
                action: "GetServiceExecutionOverviewData",
                context:
                    {
                        serviceID: serviceID,
                    },
                callback: function (data) {
                    var result = data[0].getElementsByClassName("hiddenServiceResponseArray")[0].value
                    DashboardBarGraphTool.drawServiceOverviewGraph(result, "divResponseOverviewGraph");
                }
            });
        };
        context.RefreshGuideResponseOverviewBarChart = function (tableRow) {
            guideID = $(tableRow).attr("data-guideid");
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardBarGraphTool",
                action: "GetGuideExecutionOverviewData",
                context:
                    {
                        guideID: guideID,
                    },
                callback: function (data) {
                    var result = data[0].getElementsByClassName("hiddenServiceResponseArray")[0].value
                    DashboardBarGraphTool.drawServiceOverviewGraph(result, "divResponseOverviewGraph");
                }
            });
        };
        context.drawServiceOverviewGraph = function (responseData, divBarGraph) {
            if (responseData == "" || responseData == null) {
                graphData = new Array();
                for (var i = 1; i <= 10; i++) {
                    graphData.push({
                        "label": " ".repeat(i),
                        "value": 0,
                        "ServiceName": "No Recent Activity"
                    });
                }
            }
            else {
                graphData = JSON.parse(responseData);
            }
            context.drawBarChart(graphData, divBarGraph)
        };

        context.drawBarChart = function (graphData, divBarGraph) {
            document.getElementById('pServiceName').innerHTML = graphData[0].ServiceName ? graphData[0].ServiceName : "No Recent Activity";
            $("#" + divBarGraph).empty();
            var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                width = 330 - margin.left - margin.right,
                height = 250 - margin.top - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10)
             .tickFormat(function (d) { return Math.round(d); });
            var svg = d3.select("#" + divBarGraph).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom-10)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            x.domain(graphData.map(function (d) { return d.label; }));
            y.domain([0, d3.max(graphData, function (d) { return d.value; })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -45)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Response Time (ms)");

            svg.selectAll(".bar")
                .data(graphData)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return x(d.label); })
                .attr("width", x.rangeBand())
                .attr("y", function (d) { return y(d.value); })
                .attr("height", function (d) {
                    return height - y(d.value);
                })
             .on("mouseover", function (d) {
                 d3.select("#tooltip")
                     .style("left", d3.event.pageX + "px")
                     .style("top", d3.event.pageY + "px")
                     .style("opacity", 1)
                     .select("#heading")
                     .text(d.value);

             })
            .on("mouseout", function (d) {
                // Hide the tooltip
                d3.select("#tooltip")
                    .style("opacity", 0);
            }) //get the label from our original data array
             .on("mousemove", function (d) {
                 d3.select("#tooltip")
                     .style("left", d3.event.pageX + "px")
                     .style("top", d3.event.pageY + "px")
                     .style("z-index", "10")
                     .style("opacity", 1)
                     .select("#heading")
                     .text(d.value);
             });;


            function type(d) {
                d.value = +d.value;
                return d;
            }

        }



    })(DashboardBarGraphTool);

})(jQuery);