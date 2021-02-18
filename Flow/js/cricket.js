var add = document.getElementById("add");
var addteam = document.getElementById("addteam");
var table = document.getElementById("table");
var canvas = document.getElementById("canvas");
var run = document.getElementById("run");

var teamsdiv = document.getElementById("teams");
var remaining = document.getElementById("remaining");
var teams =[];
var color = {};
var exist={};
var dataids =[];
var idn=0;

add.addEventListener("click",function(){
  if(exist[addteam.value]!=null)return;

  teams.push(addteam.value);
  exist[addteam.value]=1;
  dataids.push([]);
  remaining.colSpan=teams.length;
  var newdiv = document.createElement("th");
  newdiv.innerHTML = addteam.value;
  teamsdiv.appendChild(newdiv);

  var e = document.createElement("tr");
  e.id="r"+(teams.length-1);
  for(var i=0;i<teams.length-1+3;i++){
    var ee = document.createElement("td");
    if(i==0)
    ee.innerHTML=addteam.value;
    else if(i==1)
    inp(ee,0,teams.length-1);
    else if(i==2)
    inp(ee,0,teams.length-1);
    else
    inp(ee,0,teams.length-1);
    e.appendChild(ee);
  }
  table.appendChild(e);

  var child = table.childNodes;
  for(var i=2;i<child.length;i++){
    var e = document.createElement("td");
    if(i-2==teams.length-1){
      inp(e,0,i-2);
      e.innerHTML="-";}
    else
    inp(e,0,i-2)
    child[i].appendChild(e);
  }
} );

run.addEventListener("click",solve);

function inp(cont,val,index){
  var e = document.createElement("input");
  e.value=val;
  e.id=idn;
  dataids[index].push(idn);
  idn+=1;
  cont.appendChild(e);
}
function collect(){
  var win=[],loss=[],left=[],match=[];
  for(var i=0;i<teams.length;i++){
    match.push([]);
    win.push(Number(document.getElementById(dataids[i][0]).value));
    loss.push(Number(document.getElementById(dataids[i][1]).value));
    var sum=0;
    for(var j=0;j<teams.length;j++){
      if(i==j){
        match[i].push(0);
        continue;
      }
      match[i].push(Number(document.getElementById(dataids[i][j+2]).value));
      sum+=Number(document.getElementById(dataids[i][j+2]).value);
  }
  left.push(Number(sum));
}
  return [win,loss,left,match];
}

function solve(){
  var data = collect();
  var win=data[0],loss=data[1],left=data[2],match=data[3];

  for(var node=0;node<teams.length;node++){
    var g = new graph(1000);
    var z = win[node]+left[node];
    g.addvertice("source");
    g.addvertice("sink");
    for(var i=0;i<teams.length;i++){
      if(i == node)continue;
      g.addvertice(teams[i]);
      g.addEdged(teams[i],"sink",z-win[i]);
    }
    for(var i=0;i<teams.length;i++){
      if(i==node)continue;
      for(var j=i+1;j<teams.length;j++){
        if(j==node)continue;
        g.addvertice(teams[i]+'-'+teams[j]);
        g.addEdged(teams[i]+'-'+teams[j],teams[i],INT_MAX);
        g.addEdged(teams[i]+'-'+teams[j],teams[j],INT_MAX);
        g.addEdged("source",teams[i]+'-'+teams[j],match[i][j]);
      }
    }

    var flow = DinicMaxflow(g, "source", "sink");
    if(node==0)
    draw(canvas,g);
    var sum = 0;
    for(var i=0;i<g.adj[0].length;sum+=Number(g.adj[0][i].c),i++);

    if(color[node]==null)color[node]=document.getElementById("r"+node).style.background;
    if(sum != flow)
    document.getElementById("r"+node).style.background="#FFDDDD";
    else
    document.getElementById("r"+node).style.background=color[node];
    console.log([flow, sum]);
  }
}
