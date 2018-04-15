var svg = d3.select(".chart-line")
    .attr("width", 600)
    .attr("height", 200);

var margin = {left: 30, right: 30, top: 10, bottom: 20}
var width = svg.attr("width") - margin.left - margin.right;
var height = svg.attr("height") - margin.bottom - margin.top;

var data = [
    {"date": 0, "a": 28, "b": 20},
    {"date": 1, "a": 43, "b": 35},
    {"date": 2, "a": 81, "b": 10},
    {"date": 3, "a": 19, "b": 15},
    {"date": 4, "a": 52, "b": 48},
    {"date": 5, "a": 24, "b": 28},
    {"date": 6, "a": 87, "b": 66},
    {"date": 7, "a": 17, "b": 27},
    {"date": 8, "a": 68, "b": 16},
    {"date": 9, "a": 49, "b": 25}
];

var x = d3.scaleTime()
    .rangeRound([0, width]);
var x_axis = d3.axisBottom(x);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);
var y_axis = d3.axisBottom(y);


x.domain(d3.extent(data, function (d) {
    return d.date;
}));
y.domain([0,
    d3.max(data, function (d) {
        return d3.max([d.a, d.b]);
    })]);

var a = function (d) {
    return d.a
};

var multiline = function (category) {
    var line = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d[category]);
        });
    return line;
}

var line = d3.line()
    .x(function (d) {
        return x(d.date);
    })
    .y(function (d) {
        return y(d);
    });

var categories = ['a', 'b'];
//var color = d3.scale.category10();  // escala com 10 cores (category10)
var color = d3.scaleOrdinal(d3.schemeCategory10);

var g = svg.append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

for (i in categories) {
    var lineFunction = multiline(categories[i]);
    g.append("path")
        .datum(data)
        .attr("class", "line")
        .style("stroke", color(i))
        .attr("d", lineFunction);
}

// Add the X Axis
g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add the Y Axis
g.append("g")
    .call(d3.axisLeft(y));
