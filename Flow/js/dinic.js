// graph g;
// g.addvertice("sample");
// g.addEdge("sample1","sample2", capacity)
// DinicMaxflow(g, "source", "sink")

class graph {

  constructor(n){
	this.adj=[]; //n list of adjacent edges
  for(var i =0;i<n;this.adj.push([]),i++);

  this.ver=[];
  this.exist={};
  this.size=0;}

  addvertice(name){
    this.ver.push({name:name});
    this.exist[name]=this.size;
    this.size+=1;
  }
	addEdge(a, b, c, f) {
		this.adj[a].push({ u:a,v:b,rev:-1,c: c,f:f });
		return this.adj[a].length - 1;
	}
	addEdged(a, b, c) {
    a = this.exist[a];
    b = this.exist[b];
		var a1 = this.addEdge(a, b, c, 0);
		var a2 = this.addEdge(b, a, 0, 0);
		this.adj[a][a1].rev = a2;
		this.adj[b][a2].rev = a1;
	}
}

function bfs(g, level, s, t) {
	var queue=[];
	queue.push(s);
  for (var i = 0; i <= g.size; i++)
  	level[i]=-1;
	level[s] = 0;

	while (queue.length) {
		var temp = queue.slice();
    queue=[];
		while (temp.length) {
			var node = temp.pop();
			for (var i = 0; i < g.adj[node].length; i++) {
				var e = g.adj[node][i];
				if (level[e.v] != -1 || e.f >= e.c) continue;
				queue.push(e.v);
				level[e.v] = level[node] + 1;
			}
		}
	}
	return level[t] == -1 ? false : true;
}

function sendFlow(g, start,level, u, flow, t)
{
	if (u == t)
		return flow;

	for (; start[u] < g.adj[u].length; start[u]++)
	{
		var e = g.adj[u][start[u]];

		if (level[e.v] == level[u] + 1 && e.f < e.c)
		{
			var curr_flow = min(flow, e.c - e.f);

			var temp_flow = sendFlow(g, start, level, e.v, curr_flow, t);

			if (temp_flow > 0)
			{
				e.f += temp_flow;
				g.adj[e.v][e.rev].f -= temp_flow;
				return temp_flow;
			}
		}
	}
	return 0;
}

function DinicMaxflow(g, s, t)
{

  s = g.exist[s];
  t = g.exist[t];
	if (s == t)
		return -1;

	var total = 0;
	var level = [];
  for (var i = 0; i <= g.size; i++)
		level.push(-1);

	while (bfs(g, level, s, t))
	{
		var start = [];
    for (var i = 0; i <= g.size; i++)
  		start.push(0);

    var flow;
		while (flow = sendFlow(g, start, level, s, INT_MAX, t))
			total += flow;
	}
	return total;
}
