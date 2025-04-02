import * as d3 from "d3"; // we will need d3.js
import React, { useEffect, useRef } from "react";


export const Graph = (props) => {

  const canvasRef = useRef(null);

  const width = props.width;
  const height = props.height;
  const nodes = props.nodes;
  const links = props.links;


  const drawNetwork = (
    context: CanvasRenderingContext2D,
  ) => {
    context.clearRect(0, 0, width,  height);
  
    // Draw the links first
     links.forEach((link) => {
      context.beginPath();
      context.moveTo(link.source.x, link.source.y);
      context.lineTo(link.target.x, link.target.y);
      context.stroke();
    });
  
    // Draw the nodes
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

  useEffect(() => {
    // set dimension of the canvas element
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }

  d3.forceSimulation( nodes) // apply the simulation to our array of nodes

  // Force #1: links between nodes
  .force( 'link', d3.forceLink( links).id((d) => d.id))

  // Force #2: avoid node overlaps
  .force('collide', d3.forceCollide().radius(10))

  // Force #3: attraction or repulsion between nodes
  .force('charge', d3.forceManyBody())

  // Force #4: nodes are attracted by the center of the chart area
  .force('center', d3.forceCenter( width / 2,  height / 2))

  .on('tick', () => {
    drawNetwork(context);
  });
}, [width, height,  nodes,  links]);

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