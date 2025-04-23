import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Graph} from "../Components/Graph.tsx";
import "../styles/UserList.css";

import { ResponsiveNetwork } from '@nivo/network'

 function GraphData(props) {
    const {id, type, dates} = useParams();

  var data = [];
  var nodes = [];
  var links = [];
  let names = [];

  var cont = 0;
  const [data2, setData] = useState({});
  const [name, setName] = useState("");

  var newnode = true;
  var usable = true;
     
    const fetchData = async () => {
    if(type === "user"){
      if(dates !== "-"){
        let fecha1 = parseInt(dates.substring(0, dates.indexOf("-")));
        let fecha2 = parseInt(dates.substring(dates.indexOf("-")+1));
        try {
          const response = await fetch(`http://localhost:5154/api/graphData/us?user=${id}&date1=${fecha1}&date2=${fecha2}`);
          const result = await response.json();
          data = await result;
  
          } catch (error) {
            console.error("Error fetching data:", error);
          } 
      }
      else{
        try {
        const response = await fetch(`http://localhost:5154/api/graphData/us?user=${id}`);
        const result = await response.json();
        data = await result;

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
       
        for (var i = 0; i < data.length; i++){
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
                  distance: 200,
                }
                links.push(await new_link);
                }
                    
              }
              nodes.push(await graphData.authors[j]);
            }
            else{
              nodes.forEach(async (element) =>{
                if(element.id == await graphData.authors[j].id){
                  if(element.size < 60)
                  element.size = element.size +2;
                  else{
                    element.color = "rgb(255,0,0)"
                  }
                }
              })
            }
          }
        }
    }
    else if(type === "project" || type == "justusers"){
      try{
        let promise = await fetch(`http://localhost:5154/api/projects/${id}`);
        let result_users =await promise.json();
        let users = await result_users.participantes;
        let openAlexIds = [];

        for(let i = 0; i < users.length; i++){
          let promise = await fetch(`http://localhost:5154/api/users/${users[i]}`);
          let result =await promise.json();
          openAlexIds.push(await result.openAlex_id);
          names.push(await result.name);
        }

        if(dates !== "-"){
          let fecha1 = parseInt(dates.substring(0,dates.indexOf("-")));
          let fecha2 = parseInt(dates.substring(dates.indexOf("-")+1));
            for(let i = 0; i < await openAlexIds.length; i++){
              const response = await fetch(`http://localhost:5154/api/graphData/us?user=${openAlexIds[i]}&date1=${fecha1}&date2=${fecha2}`);
              const result = await response.json();
              data.push(await result);
              }
        }
        else{
          for(let i = 0; i < await openAlexIds.length; i++){
          const response = await fetch(`http://localhost:5154/api/graphData/us?user=${openAlexIds[i]}`);
          const result = await response.json();
          data.push(await result);
          }
        }   
       }catch (error) {
        console.error("Error fetching data:", error);
      } 


      for(let a = 0; a < data.length; a++){
        var dat = data[a] 
      for (var i = 0; i < dat.length; i++){
        var graphData = await dat[i];

        for (var j = 0; j < await graphData.authors.length; j++){               
          newnode = true;
          usable = true;
          if(type == "justusers"){
            usable = false;
            for(var b = 0; b < names.length; b++){
              if(await graphData.authors[j].id == names[b])
                usable = true;
            }
          }
           
          if(usable){
            for(var k = 0; k < nodes.length; k++)
            if(nodes[k].id === await graphData.authors[j].id)
              newnode = false;
             
          if(newnode){           
              for (var l = 0; l < await graphData.authors.length; l++){
              if(await graphData.authors[l].id !== await graphData.authors[j].id){
                const new_link = {
                source: await graphData.authors[l].id,
                target: await graphData.authors[j].id,
                distance: 150,
              }
              links.push(await new_link);
              }
                  
            }
            nodes.push(await graphData.authors[j]);
          }
          else{
            nodes.forEach(async (element) =>{
              if(element.id == await graphData.authors[j].id){
                if(element.size < 60)
                element.size = element.size +2;
              }
            })
          }
        }
          
        }
      }
    }
  }
        
        setData(data2=>({
          "nodes": nodes,
          "links": links
        }))

      };

    useEffect(() => {
      cont++;
      if(cont==1){
        fetchData();
        getName();
      }  
    }, []);

    async function getName(){
      if(type==="user"){
        try {
          const response = await fetch(`http://localhost:5154/api/users/open?id=${id}`);
          const result = await response.json();
          setName(await result.name);
  
          } catch (error) {
            console.error("Error fetching data:", error);
          } 
      }
      else{
        try {
          const response = await fetch(`http://localhost:5154/api/projects/${id}`);
          const result = await response.json();
          setName(await result.name);
  
          } catch (error) {
            console.error("Error fetching data:", error);
          } 
      }
    }


    if(data2.nodes != null &&  name !== ""){
      return (
        <>
        <h3>Papers de {name}  </h3>              
              <div className="graph-cont">
              <ResponsiveNetwork 
                data={data2} 
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
        return(
          <>
          <p>Cargando Grafo...</p>
          </>
        );
      }
  }
  
  export default GraphData;
