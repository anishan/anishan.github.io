var length = 200;
var width = 500;
var side = 300;
function run()
{
    // drawTriangle(400, 0, 0, 500, 800, 500)
    // drawTriangle(200, 200, 50, 500, 800, 400)
    // drawTriangle(width/2, 0, 0, length, width, length)

    drawTriangle(side/2, 0, 0, side*0.8, side, side*0.8)
    drawTriangle2(side, side*0.8, side/2, 0, 3*side/2, 0)
    drawTriangle(3*side/2, 0, side, side*0.8, 2*side, side*0.8)
    exploreText()
    // drawTriangle(2*side, side*0.8, 3*side/2, 0, 5*side/2, 0)

    // drawTriangle(0, side/2, side*0.8, 0, side*0.8, side)
}
// makeTriangles()

function drawTriangle(topx, topy, leftx, lefty, rightx, righty)
{
    var svg = d3.select("body").select("#main");
    // var path_string = "M 10,25 L 10,75 L 60,75 L 10,25";
    var path_string  = "M" + topx + "," + topy + " "
                      +"L" + leftx + "," + lefty + " "
                      +"L" + rightx + "," + righty + " "
                      + "Z";
    svg.append("path")
        .attr("d", path_string)
        .attr("stroke", "#2a7a89")
        .attr("fill", "#39A5B7")
        .on("mouseover", function() {
            midleftx = topx-(topx-leftx)/2
            midlefty = topy+(lefty-topy)/2
            midrightx = topx+(rightx-topx)/2
            midrighty = topy+(righty-topy)/2
            midbottomx = leftx+(rightx-leftx)/2
            midbottomy = lefty+(righty-lefty)/2
            drawTriangle(topx, topy, midleftx, midlefty, midrightx, midrighty)
            // left
            drawTriangle(midleftx, midlefty, leftx, lefty, midbottomx, midbottomy)
            //right
            drawTriangle(midrightx, midrighty, midbottomx, midbottomy, rightx, righty)
            d3.select(this).remove();
        })
}

function drawTriangle2(topx, topy, leftx, lefty, rightx, righty)
{
    var svg = d3.select("body").select("#main");
    // var path_string = "M 10,25 L 10,75 L 60,75 L 10,25";
    var path_string  = "M" + topx + "," + topy + " "
                      +"L" + leftx + "," + lefty + " "
                      +"L" + rightx + "," + righty + " "
                      + "Z";
    svg.append("path")
        .attr("d", path_string)
        .attr("stroke", "#39A5B7")
        .attr("fill", "#2a7a89")
        .on("mouseover", function() {
            midleftx = topx-(topx-leftx)/2
            midlefty = topy+(lefty-topy)/2
            midrightx = topx+(rightx-topx)/2
            midrighty = topy+(righty-topy)/2
            midbottomx = leftx+(rightx-leftx)/2
            midbottomy = lefty+(righty-lefty)/2
            drawTriangle2(topx, topy, midleftx, midlefty, midrightx, midrighty)
            // left
            drawTriangle2(midleftx, midlefty, leftx, lefty, midbottomx, midbottomy)
            //right
            drawTriangle2(midrightx, midrighty, midbottomx, midbottomy, rightx, righty)
            d3.select(this).remove();
        })
}

function exploreText()
{
    var svg = d3.select("body").select("#main");
    svg.append("text")
        .attr("text", "Explore")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black")
        .attr("x", side/2)
        .attr("y", side/2)
}
