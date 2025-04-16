import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Graph} from "../Components/Graph.tsx";
import "../styles/UserList.css";

import { ResponsiveNetwork } from '@nivo/network'

 function GraphData(props) {
    const {id} = useParams();

  var data = [];
  var nodes = [];
  var links = [];

  var cont = 0;
  const [data3, setData] = useState({});

  var render = false;

  var newnode = true;
     
    const fetchData = async () => {
     try {
         
          const response = await fetch(`http://localhost:5154/api/graphData/us?user=A5091562570`);
          const result = await response.json();
          data = await result;
    
        } catch (error) {
          console.error("Error fetching data:", error);
        } 
            for (var i = 0; i < 20; i++){
              var graphData = await data[i];
  
              for (var j = 0; j < await graphData.authors.length; j++){               
                newnode = true;
               
                for(var k = 0; k < nodes.length; k++)
                  if(nodes[k].id === await graphData.authors[j].id)
                    newnode = false;
               
                if(newnode){           
                   for (var l = 0; l < await graphData.authors.length; l++){
                    if(await graphData.authors[l].id !== await graphData.authors[j].id){
                      const new_link = {
                      source: await graphData.authors[l].id,
                      target: await graphData.authors[j].id,
                      distance: 100,
                    }
                    links.push(await new_link);
                    }
                    
                  }
                  nodes.push(await graphData.authors[j]);
                }
                else{
                  nodes.forEach(async (element) =>{
                    if(element.id == await graphData.authors[j].id)
                      element.size = element.size +1;
                  })
                  links.forEach(async (element) =>{
                    if((element.target == await graphData.authors[j].id ) || (element.source == await graphData.authors[j].id))
                      element.distance= element.distance+10;
                  })
            }
          }
        }
        
        setData(data3=>({
          "nodes": nodes,
          "links": links
        }))

      };

    useEffect(() => {
      cont++;
      if(cont==1)
      fetchData();
      
    }, []);


    if(data3.nodes != null){
      console.log(data3)
      return (
        <>
        <h3>Papers de {id}  </h3>              
              <div className="graph-cont">
              <ResponsiveNetwork 
                data={data3} 
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                linkDistance={e=>e.distance}
                centeringStrength={0.3}
                repulsivity={6}
                nodeSize={n=>n.size}
                activeNodeSize={n=>1.5*n.size}
                nodeColor={e=>e.color}
                nodeBorderWidth={1}
                nodeBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.8
                        ]
                    ]
                }}
                linkThickness={n=>2+2*n.target.data.height}
                linkBlendMode="multiply"
                motionConfig="wobbly"
             ></ResponsiveNetwork>
              </div>
        </>
      );
    }  
      else{
        render = true;
        return(
          <>
          <p>Cargando Grafo...</p>
          </>
        );
      }
  }
  
  export default GraphData;
