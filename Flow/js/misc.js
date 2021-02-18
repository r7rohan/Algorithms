const INT_MAX = 10000000000;
function min(a,b){
  if(a<b)return a;
  else return b;
}

function undone(g){
  for(var i=0;i<g.size;i++){
    for(var j=0;j<g.adj[i].length;j++){
      g.adj[i][j].f=0;
    }
  }
}
