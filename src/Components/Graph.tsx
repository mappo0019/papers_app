import * as d3 from "d3"; 
import React, { useEffect, useRef } from "react";


export interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

export const Graph = (props) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = props.width;
  const height = props.height;
  const nodes = props.nodes;
  const links = props.links;


  const drawNetwork = (
    context: CanvasRenderingContext2D,
  ) => {
    context.clearRect(0, 0, width,  height);
  
    
    // Draw the links first
    if(links){
      links.forEach((link) => {
      context.beginPath();
      context.moveTo(link.source.x, link.source.y);
      context.lineTo(link.target.x, link.target.y);
      context.stroke();
    });
    }
    
  
    // Draw the nodes
    if (nodes){
      nodes.forEach((node) => {
        if (!node.x || !node.y) {
          return;
        }
    
        context.beginPath();
        context.moveTo(node.x + 10, node.y);
        context.arc(node.x, node.y, 10, 0, 2 * Math.PI);
        context.fillStyle = '#cb1dd1';
        context.fill();
      });
    }
     
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }
    // run d3-force to find the position of nodes on the canvas
    d3.forceSimulation(nodes)
      // list of forces we apply to get node positions
      .force(
        'link',
        d3.forceLink<Node, Link>(links).id((d) => d.id)
      )
      .force('collide', d3.forceCollide().radius(30))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

      // at each iteration of the simulation, draw the network diagram with the new node positions
      .on('tick', () => {
        drawNetwork(context);
      });
}, [ width, height,  nodes,  links]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
        }}
        width={ width}
        height={ height}
      />
    </div>
  );
}