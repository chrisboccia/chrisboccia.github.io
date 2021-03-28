//This script creates a grid

function gridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 50;
	var height = 50;
	var click = 0;
	
	// iterate for rows	
	for (var row = 0; row < 17; row++) {
		data.push( new Array() ); //make each element of data an array
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < 17; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click,
				treatment: 0
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}

var columns = ["Land use", "Squares"]

var datatab = [
	{ "Land use" : '200-year mahogany', "Squares" : 0 },
	{ "Land use" : '100-year mahogany', "Squares" : 0 },
	{ "Land use" : 'Eucalyptus plantation', "Squares" : 0 },
	{ "Land use" : 'Ecological reserve', "Squares" : 0 },
	]

function getcolcounts() {
	datatab = [
	{ "Land use" : '200-year mahogany', "Squares" : grid.selectAll('.oldgr').size() },
	{ "Land use" : '100-year mahogany', "Squares" : grid.selectAll('.medgr').size() },
	{ "Land use" : 'Eucalyptus plantation', "Squares" : grid.selectAll('.eucalyp').size() },
	{ "Land use" : 'Ecological reserve', "Squares" : grid.selectAll('.protect').size() },
	]
	
	table.selectAll("tr").remove()
	table.selectAll("th").remove()
	
	thead = table.append("thead");
	tbody = table.append("tbody");
	
	thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
			.text(function(column) { return column; });
	
	trows = tbody.selectAll('tr')
		.data(datatab)
		.enter()
		.append('tr');

	cells = trows.selectAll('td')
		.data(function (row) {
			return columns.map(function (column) {
			return {column: column, value: row[column]};
			});
		})
		.enter()
		.append('td')
			.text(function (d) { return d.value; });

}


var gridData = gridData();
//console.log(gridData);
// I like to log the data to the console for quick debugging

var grid = d3.select("#grid")
	.append("svg")
	.attr("width","867px")
	.attr("height","867px");
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	
var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	//.attr('id', function(d,i){return 'item'+i;})
	.style("fill", "#fff")
	.style("stroke", "#EB984E")
	.style("stroke-width", 3)
	.on('click', function(d) {
       d.click ++;
       if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#66ccff").attr("class","square protect"); getcolcounts();}
	   if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2ECC71").attr("class","square oldgr");getcolcounts(); }
	   if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#D5F5E3").attr("class","square medgr"); getcolcounts();}
	   if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#F7DC6F").attr("class","square eucalyp");getcolcounts();}
	})
	.on("contextmenu", function (d2, i) {
        d3.event.preventDefault();
		d2.click ++;
        if ((d2.click)%11 == 0 ) {d3.select(this).style("stroke-dasharray","0").style("stroke","#EB984E").style("stroke-width", 3); d2.treatment=0; }
		if ((d2.click)%11 == 1 ) {d3.select(this).style("stroke-dasharray", "0,150,50").style("stroke","black").style("stroke-width", 6); d2.treatment=0; }
		if ((d2.click)%11 == 2 ) {d3.select(this).style("stroke-dasharray", "50,150").style("stroke","black").style("stroke-width", 6); d2.treatment=1; }
		if ((d2.click)%11 == 3 ) {d3.select(this).style("stroke-dasharray", "0,100,50,100").style("stroke","black").style("stroke-width", 6); d2.treatment=0; }
		if ((d2.click)%11 == 4 ) {d3.select(this).style("stroke-dasharray", "0,50, 50,50").style("stroke","black").style("stroke-width", 6); d2.treatment=1; }
		if ((d2.click)%11 == 5 ) {d3.select(this).style("stroke-dasharray","50").style("stroke","black").style("stroke-width", 6); d2.treatment=0; }
		if ((d2.click)%11 == 6 ) {d3.select(this).style("stroke-dasharray", "0,50,50,0" ).style("stroke","black").style("stroke-width", 6); d2.treatment=1; }
		if ((d2.click)%11 == 7 ) {d3.select(this).style("stroke-dasharray", "0,100,150" ).style("stroke","black").style("stroke-width", 6); d2.treatment=1; }
		if ((d2.click)%11 == 8 ) {d3.select(this).style("stroke-dasharray", "0,50,50" ).style("stroke","black").style("stroke-width", 6); d2.treatment=0; }
		if ((d2.click)%11 == 9 ) {d3.select(this).style("stroke-dasharray", "100").style("stroke","black").style("stroke-width", 6); d2.treatment=1; }
		if ((d2.click)%11 == 10 ) {d3.select(this).style("stroke-dasharray", "50,100" ).style("stroke","black").style("stroke-width", 6); d2.treatment=1; }
        });
	
var infotab = d3.select("#counters")
	.append("svg")
	.attr("width","1000px")
	.attr("height", "100px")

//scale square
infotab.append("g")
	.append("rect")
	.attr("x", 60)
	.attr("y", 1)
	.attr("width", 50)
	.attr("height", 50)
	.style("fill", "#fff")
	.style("stroke", "#EB984E")
	.style("stroke-width", 3)
	
infotab.append("text")
	.text("1 square km / 100 hectares")
	.attr("x", 1)
	.attr("y", 70)

//200-year mahogany square
infotab.append("g")
	.append("rect")
	.attr("x", 246)
	.attr("y", 1)
	.attr("width", 50)
	.attr("height", 50)
	.style("fill", "#2ECC71")
	.style("stroke", "#EB984E")
	.style("stroke-width", 3)
	
infotab.append("text")
	.text("200-year mahogany")
	.attr("x", 201)
	.attr("y", 70)

//100-year mahogany square
infotab.append("g")
	.append("rect")
	.attr("x", 405)
	.attr("y", 1)
	.attr("width", 50)
	.attr("height", 50)
	.style("fill", "#D5F5E3")
	.style("stroke", "#EB984E")
	.style("stroke-width", 3)
	
infotab.append("text")
	.text("100-year mahogany")
	.attr("x", 360)
	.attr("y", 70)

infotab.append("g")
	.append("rect")
	.attr("x", 570)
	.attr("y", 1)
	.attr("width", 50)
	.attr("height", 50)
	.style("fill", "#F7DC6F")
	.style("stroke", "#EB984E")
	.style("stroke-width", 3)
	
infotab.append("text")
	.text("Eucalyptus plantation")
	.attr("x", 520)
	.attr("y", 70)

infotab.append("g")
	.append("rect")
	.attr("x", 725)
	.attr("y", 1)
	.attr("width", 50)
	.attr("height", 50)
	.style("fill", "#66ccff")
	.style("stroke", "#EB984E")
	.style("stroke-width", 3)
	
infotab.append("text")
	.text("Ecological reserve")
	.attr("x", 690)
	.attr("y", 70)


var table = d3.select("#maintab").append("table"),
	thead = table.append("thead"),
	tbody = table.append("tbody");

	thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
			.text(function(column) { return column; });

	var trows = tbody.selectAll('tr')
		.data(datatab)
		.enter()
		.append('tr');

	var cells = trows.selectAll('td')
		.data(function (row) {
			return columns.map(function (column) {
			return {column: column, value: row[column]};
			});
		})
		.enter()
		.append('td')
			.text(function (d) { return d.value; });

//https://codepen.io/lazd/pen/WNweNwy?editors=1010
//rect { fill: none; stroke: red; }
//.topBottom { stroke-dasharray: 50 }
//.leftRight { stroke-dasharray: 0,50,50,0 }

//.bottomLeft { stroke-dasharray: 0,100,150 }
//.bottomRight { stroke-dasharray: 0,50,50 }
//.topRight { stroke-dasharray: 100 }
//.topLeft { stroke-dasharray: 50,100 }

//.left { stroke-dasharray: 0,150,50 }
//.top { stroke-dasharray: 50,150 }
//.bottom { stroke-dasharray: 0,100,50,100 }
//.right { stroke-dasharray: 0,50, 50,50 }