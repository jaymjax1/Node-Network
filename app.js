function newNetwork(nodeCount,superPeers,messageFrom,messageTo){
var nodes = [];
var superP = [];
var edges = [];
var superEdges = [];
var network = null;

//Create nodes in real network ------------------------------------------->
for (var i = 0; i < nodeCount; i++) {
nodes.push({
id: i,
label: String(i),
color:'blue'
});
}


//create edges in real network-------------------------------------------->
for (var i = 0; i<nodeCount;i++){
  for(var j = 0; j<nodeCount/4;j++){
    var random = Math.floor((Math.random() * (nodeCount)) + 0);4
      if(random==i){
        edges.push({from:i,to:random+1});
      }else{
        edges.push({from:i,to:random});
      }
  }
}


//create superpeers nodes and edges---------------------------------------->
var measure = Math.ceil(nodeCount/superPeers);
var from=0;
var to = measure;
var count = 0;

//Case if only one Super Node
if(superPeers==1){
  nodes.push({id:'super0',label:'Super0',color:'red'});
  for(var k=from; k<to;k++){
    edges.push({from:'super0',to:k});
  }
  from+= measure;
  to+= measure;
}

// Case if more than one Super Node 
if(to < nodeCount){
for(var i=0; i<superPeers; i++){
  nodes.push({id:'super'+i,label:'Super '+String(i),color:'red'});
  count++;
  for(var k=from; k<to;k++){
    edges.push({from:'super'+String(i),to:k});
  }
  from+= measure;
  to+= measure;
}
}

//Connect Superpeers 
if(superPeers>0){
for (var i = 0; i < count-1; i++){
  for (var j =i; j< count-1; j++){
  edges.push({from:'super'+String(i),to:'super'+String(j+1)});
  }
}
  edges.push({from:'super'+String(count-1),to:'super0'});
}



if(messageFrom>-1 && messageTo>-1){
  for(x in edges){
    if(messageFrom == edges[x]['to'] && edges[x]['from'].toString().substring(0,5) == 'super'){
      var superfrom = edges[x]['from']
    }

    if(messageTo == edges[x]['to'] && edges[x]['from'].toString().substring(0,5) == 'super'){
      var superto = edges[x]['from']
    }

    if(messageFrom == edges[x]['to'] && edges[x]['from'].toString().substring(0,5) !== 'super'){
      var regularfrom = edges[x]['from']
    }

    if(messageTo == edges[x]['to'] && edges[x]['from'].toString().substring(0,5) !== 'super'){
      var regularto = edges[x]['from']
    }

   }
     document.getElementById("message").innerHTML = "Overlay Route: Message travels from Node"+messageFrom+" to Superpeer "+superfrom+" to Superpeer "+superto+" to Node"+messageTo;
     document.getElementById("message2").innerHTML = "Real Route: Message travels from Node"+messageFrom+" to Node "+regularfrom+" to Node "+regularto+" to Node"+messageTo;

};



// create a network
var container = document.getElementById('mynetwork');
// provide the data in the vis format
var data = {
nodes: nodes,
edges:edges,
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);

return {nodes:nodes,edges:edges,superP:superP};
}
