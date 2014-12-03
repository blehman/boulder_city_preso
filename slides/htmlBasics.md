##HTML Basics for D3
-----
1.  Access the D3 library.
2.  Add/remove elements.
3.  Change elements' attributes.
4.  Modify elements with CSS styling.
----
####**please use a Chrome browser**: <a href="http://blehman.github.io/data_manipulation/" target="_blank">bit.ly/practiceD3</a>

Note:
d3.select("body")
d3.select("body")[0]
d3.select("body").select("text")
d3.select("body").select("text")[0]
SOURCES --> style.css:
body {
    font-size: 30px;
}
d3.select("body").select("text").style("font-size","50px")
d3.select("body").select("text")
d3.select("body").select("text").style("color","red")
d3.select("body").select("text").attr("x",10)
d3.select("body").select("text").attr("y",10)
d3.select("body").select("text").attr("transform","translate(200,300)")
