if (DashboardPartitionGraphTool == null || typeof (DashboardPartitionGraphTool) != "object") {
    var DashboardPartitionGraphTool = new Object();
};

(function ($) {

    (function (context) {

        var b = {
            w: 107, h: 22, s: 2, t: 10
        };
        var width = 470, height = 250;
        context.loadTool = function () {

            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardPartitionGraphTool",
                context:
                    {
                    },
                callback: function (data) {
                }
            });
        };

        context.ShowGuidePartitionGraph = function (dFlag) {
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardPartitionGraphTool",
                action: "ShowGuidePartitionGraph",
                context:
                    {
                        flag: dFlag,
                    },
                callback: function (data) {
                    var result = data[0].getElementsByClassName("hdnBriefReport")[0].value;
                    DashboardPartitionGraphTool.DrawPartitionGraph(result, DashboardGuideDetailsTool.ShowFilteredGuides);
                },
            });

        };
        context.ShowServicePartitionGraph = function (dFlag) {
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardPartitionGraphTool",
                action: "ShowServicePartitionGraph",
                context:
                    {
                        flag:dFlag,
                    },
                callback: function (data) {
                    var result = data[0].getElementsByClassName("hdnBriefReport")[0].value;
                    DashboardPartitionGraphTool.DrawPartitionGraph(result, DashboardServiceDetailsTool.ShowFilteredServices);
                },
            });

        };

        context.DrawPartitionGraph = function (dataT,filterFunction) {
            $("#divPartitionGraph").empty();
            var width = 470,
            height = 250,
            x = d3.scale.linear().range([0, width]),
            y = d3.scale.linear().range([0, height]);

            var vis = d3.select("#divPartitionGraph").append("div")
                .attr("class", "chart-labels")
                .style("width", width + "px")
                .style("height", height + "px")
              .append("svg:svg")
                .attr("width", width)
                .attr("height", height);

            var partition = d3.layout.partition()
                .value(function (d) { return d.size; });
            try {
                root = JSON.parse(dataT);

                initializeBreadcrumbTrail();

                $("#spanPartitionGraphInfoGlyph")
                    .on("mouseover", function (d) {
                   // d3.select("#divServiceCategory")
                    //.style("left", d3.event.pageX + "px")
                    //.style("top", d3.event.pageY + "px")
                    //.style("opacity", 1)
                    $("#divServiceCategory").slideDown();
                })
                    .on("mouseout", function (d) {
                    $("#divServiceCategory").slideUp();
                    })

                var g = vis.selectAll("g")
                    .data(partition.nodes(root))
                     .attr("class", "briefBar")
                    .enter().append("svg:g")
                    .attr("class", "rectPartition")
                    .attr("transform", function (d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; })
                    .on("click", click);

                var kx = width / root.dx,
                    ky = height / 1;

                g.append("svg:rect")
                    .attr("width", root.dy * kx)
                    .attr("height", function (d) { return d.dx * ky; })
                    .attr("class", function (d) { return d.children ? "parent" : "child"; })
                 .style("fill", function (d) {
                     return d.color;
                 });
                // debugger;
                g.append("svg:text")
                    .attr("transform", transform)
                    .attr("dy", ".35em")
                    .style("opacity", function (d) { return d.dx * ky > 12 ? 1 : 0; })
                    .text(function (d) {
                        if (d.size) {
                            return d.name;
                        }
                        return d.name;
                    })
                vis.selectAll(".rectPartition")
                        .on("mouseover", function (d) {
                            d3.select("#tooltip")
                            .style("left", d3.event.pageX + "px")
                            .style("top", d3.event.pageY + "px")
                            .style("opacity", 1)
                            .select("#heading")
                            .text(d.size);
                        }).on("mouseout", function (d) {
                            // Hide the tooltip
                            d3.select("#tooltip")
                                .style("opacity", 0);
                        }).on("mousemove", function (d) {
                            var lbltext = "";
                            if (d.size) {
                                lbltext = d.name + ": " + d.size;
                            }
                            else {
                                lbltext = d.name
                            }
                            d3.select("#tooltip")
                                .style("left", d3.event.pageX + "px")
                                .style("top", d3.event.pageY + "px")
                                .style("z-index", "10")
                                .style("opacity", 1)
                                .select("#heading")
                            .text(lbltext);
                        });

                d3.select("#DashboardPartitionGraphTool")
                    .on("click", function () { click(root); })


                function click(d) {
                    var arr = [];
                    var darr = [];
                    while (d) {
                        arr.push(d.name);
                        darr.push(d);
                        d = d.parent;

                    }
                    d = darr[0];
                    updateBreadcrumbs(darr.reverse(), d.size.toString());
                    //document.getElementById('pServiceCategory').innerHTML = arr.reverse().join("->");
                    if (!d.children) {
                        filterFunction(d.services);
                        d3.event.stopPropagation();
                    }
                    else {
                        filterFunction(d.services);
                        kx = (d.y ? width - 40 : width) / (1 - d.y);
                        ky = height / d.dx;
                        x.domain([d.y, 1]).range([d.y ? 40 : 0, width]);
                        y.domain([d.x, d.x + d.dx]);

                        var t = g.transition()
                            .duration(d3.event.altKey ? 7500 : 750)
                            .attr("transform", function (d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; });

                        t.select("rect")
                            .attr("width", d.dy * kx)
                            .attr("height", function (d) { return d.dx * ky; });

                        t.select("text")
                            .attr("transform", transform)
                            .style("opacity", function (d) { return d.dx * ky > 12 ? 1 : 0; });

                        d3.event.stopPropagation();
                    }
                }

                function transform(d) {
                    return "translate(8," + d.dx * ky / 2 + ")";
                }
            }
            catch (e) {

            }

        }
        // Generate a string that describes the points of a breadcrumb polygon.
        function breadcrumbPoints(d, i) {
            var points = [];
            points.push("0,0");
            points.push(b.w + ",0");
            points.push(b.w + b.t + "," + (b.h / 2));
            points.push(b.w + "," + b.h);
            points.push("0," + b.h);
            if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
                points.push(b.t + "," + (b.h / 2));
            }
            return points.join(" ");
        };
        function initializeBreadcrumbTrail() {
            // Add the svg area.
            var trail = d3.select("#sequence").append("svg:svg")
                .attr("width", width)
                .attr("height", 22)
                .attr("id", "trail");
            // Add the label at the end, for the percentage.
            trail.append("svg:text")
              .attr("id", "endlabel")
              .style("fill", "#000");
        }

        // Update the breadcrumb trail to show the current sequence and percentage.
        function updateBreadcrumbs(nodeArray, percentageString) {

            // Data join; key function combines name and depth (= position in sequence).
            var g = d3.select("#trail")
                .selectAll("g")
                .data(nodeArray, function (d) { return d.name + d.depth; });

            // Add breadcrumb and label for entering nodes.
            var entering = g.enter().append("svg:g");

            entering.append("svg:polygon")
                .attr("points", breadcrumbPoints)
                .style("fill", function (d) { return d.color; });

            entering.append("svg:text")
                .attr("x", (b.w) / 2)
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function (d) { return d.name; });

            // Set position for entering and updating nodes.
            g.attr("transform", function (d, i) {
                return "translate(" + ((i * (b.w + b.s)) + 15) + ", 0)";
            });

            // Remove exiting nodes.
            g.exit().remove();

            // Now move and update the percentage at the end.
            d3.select("#trail").select("#endlabel")
                .attr("x", (nodeArray.length)*(b.w + b.s)+30)
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(percentageString);

            // Make the breadcrumb trail visible, if it's hidden.
            d3.select("#trail")
                .style("visibility", "");

        }
        

    })(DashboardPartitionGraphTool);

})(jQuery);