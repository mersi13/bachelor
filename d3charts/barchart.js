var width = 600,
    height = 200;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);


var yScale = d3.scaleLinear()
    .range([height, 0]);


var xScale = d3.scaleBand().range([0, width]).padding(0.2).round(true);

function type(d) {
    d.value = Math.round(+d.value * 1000) / 1000; // coerce to number
    return d;
}


d3.tsv("/d3charts/data.tsv", type, function (error, data) {

    xScale.domain(data.map(function (d) {
        return d.name;
    }));


    yScale.domain([0, d3.max(data, function (d) {
        return d.value;
    })]);


    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + xScale(d.name) + ",0)";
        });


    bar.append("rect")
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("height", function (d) {
            return height - yScale(d.value);
        })

        .attr("width", xScale.bandwidth());


    bar.append("text")
        .attr("x", xScale.bandwidth() / 2)
        .attr("y", function (d) {
            return yScale(d.value) - 10;
        })
        .attr("dy", "0.5em")// it seems change y position
        .text(function (d) {
            return d.value;
        });
});
