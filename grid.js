function gridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 50;
	var height = 50;
	var click = 0;
	
	// iterate for rows	
	for (var row = 0; row < 17; row++) {
		data.push( new Array() );
		
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

var gridData = gridData();	
// I like to log the data to the console for quick debugging
console.log(gridData);

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
	.attr("general","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", "#fff")
	.style("stroke", "#EB984E")
	.style("stroke-width", 4)
	.on('click', function(d2) {
       d2.click ++;
       if ((d2.click)%4 == 0 ) { d3.select(this).style("fill","#66ccff"); d2.treatment=0; }
	   if ((d2.click)%4 == 1 ) { d3.select(this).style("fill","#2ECC71"); d2.treatment=1; }
	   if ((d2.click)%4 == 2 ) { d3.select(this).style("fill","#D5F5E3"); d2.treatment=2;}
	   if ((d2.click)%4 == 3 ) { d3.select(this).style("fill","#F7DC6F"); d2.treatment=3;}
    })
	.on("contextmenu", function (d, i) {
        d3.event.preventDefault();
		d.click ++;
        if ((d.click)%11 == 0 ) {d3.select(this).style("stroke-dasharray","0").style("stroke","#EB984E"); d.treatment=0; }
		if ((d.click)%11 == 1 ) {d3.select(this).style("stroke-dasharray", "0,150,50").style("stroke","black").style("stroke-width", 6); d.treatment=0; }
		if ((d.click)%11 == 2 ) {d3.select(this).style("stroke-dasharray", "50,150").style("stroke","black").style("stroke-width", 6); d.treatment=1; }
		if ((d.click)%11 == 3 ) {d3.select(this).style("stroke-dasharray", "0,100,50,100").style("stroke","black").style("stroke-width", 6); d.treatment=0; }
		if ((d.click)%11 == 4 ) {d3.select(this).style("stroke-dasharray", "0,50, 50,50").style("stroke","black").style("stroke-width", 6); d.treatment=1; }
		if ((d.click)%11 == 5 ) {d3.select(this).style("stroke-dasharray","50").style("stroke","black").style("stroke-width", 6); d.treatment=0; }
		if ((d.click)%11 == 6 ) {d3.select(this).style("stroke-dasharray", "0,50,50,0" ).style("stroke","black").style("stroke-width", 6); d.treatment=1; }
		if ((d.click)%11 == 7 ) {d3.select(this).style("stroke-dasharray", "0,100,150" ).style("stroke","black").style("stroke-width", 6); d.treatment=0; }
		if ((d.click)%11 == 8 ) {d3.select(this).style("stroke-dasharray", "0,100,150" ).style("stroke","black").style("stroke-width", 6); d.treatment=1; }
		if ((d.click)%11 == 9 ) {d3.select(this).style("stroke-dasharray", "0,50,50" ).style("stroke","black").style("stroke-width", 6); d.treatment=0; }
		if ((d.click)%11 == 10 ) {d3.select(this).style("stroke-dasharray", "100").style("stroke","black").style("stroke-width", 6); d.treatment=1; }
		if ((d.click)%11 == 11 ) {d3.select(this).style("stroke-dasharray", "50,100" ).style("stroke","black").style("stroke-width", 6); d.treatment=1; }
        });

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