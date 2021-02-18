var canvas = document.getElementById("canvas");
var addvertice = document.getElementById("vertice");
var addedge = document.getElementById("edge");
var maxflow = document.getElementById("maxflow");
var undo = document.getElementById("undo");

var u = document.getElementById("u");
var v = document.getElementById("v");
var cc = document.getElementById("c");

var g = new graph(1000);
g.addvertice("source");
g.addvertice("sink");
draw(canvas,g);

addvertice.addEventListener("click", function(){
  g.addvertice(document.getElementById("name").value);
  document.getElementById("name").value = g.size;
  draw(canvas,g);
});

addedge.addEventListener("click", function(){
  if(g.exist[u.value] == null || g.exist[v.value]==null )
    alert("please add the vertices");
  g.addEdged(u.value,v.value,Number(cc.value));
  draw(canvas,g);
});

maxflow.addEventListener("click",function(){
  DinicMaxflow(g,"source","sink");
  draw(canvas,g);
});

undo.addEventListener("click",function(){
  undone(g);
  draw(canvas,g);
});
