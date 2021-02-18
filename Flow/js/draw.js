
function draw(container, g){
var adj = g.adj, ver = g.ver, size = g.size ;
var nodes = [];
var edges = [];
for(var i=0;i<size;i+=1){
  nodes.push({id:i,label:ver[i].name});
  for(var j=0;j<adj[i].length;j++){
    if(!adj[i][j].f)
      var color = "grey";
    else if(adj[i][j].f == adj[i][j].c)
      var color = "red";
    else
      var color = "black";
    if(adj[i][j].c==INT_MAX)
      var inf="inf"
    else var inf = adj[i][j].c

    if(adj[i][j].c)
    edges.push({ from: adj[i][j].u, to: adj[i][j].v, label: (adj[i][j].f + " - " + inf), font: { align: "top" }, color: color, arrows: {
      to: {
        enabled: true,
        type: "arrow",
      }}});
  }
}
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = { physics: false,
    nodes: {
    shape: "dot",
    size: 10*5/size,
    color: "rgb(0,255,140)",
    font: {
      size: 15,
      color: "#000000",
    },
    borderWidth: 2,
  } };

  var network = new vis.Network(container, data, options);
  network.on();}
