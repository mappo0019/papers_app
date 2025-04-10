import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Graph} from "../Components/Graph.tsx";
import "../styles/UserList.css";

 function GraphData(props) {
    const {id} = useParams();

  var data = [];
  var nodes = [];
  var links = [];

  var newnode = true;
     
    const fetchData = async () => {
        try {
         
          const response = await fetch(`http://localhost:5154/api/graphData`);
          const result = await response.json();
          data = await result;
    
        } catch (error) {
          console.error("Error fetching data:", error);
        }   
            for (var i = 0; i < await data.length; i++){
              var graphData = await data[i];

              for (var j = 0; j < await graphData.authors.length; j++){               
                newnode = true;
              
                for(var k = 0; k < nodes.length; k++)
                  if(nodes[k].id === await graphData.authors[j].id)
                    newnode = false;
                      
                
                if(newnode){           
                   for (var l = 0; l < await nodes.length; l++){
                    const new_link = {
                      source: nodes[l].id,
                      target: await graphData.authors[j].id,
                      value: 1,
                    }
                    links.push(await new_link);
                  }
                  nodes.push(await graphData.authors[j]);
                }
                else{
                  links.forEach(async (element) =>{
                    if(((element.target ===await graphData.authors[j].id && element.source ===nodes[l].id)) || ((element.target ===nodes[l].id) && element.source ===await graphData.authors[j].id))
                      element.value++;
                  })
            }
          }
        }
        console.log(nodes);
        console.log(links);
      };

    useEffect(() => {
      fetchData();

      
    }, []);


      return (
        <>
          <div>
              <h3>Papers de {id}  </h3>
              
          </div>
        </>
      );
  }
  
  export default GraphData;
  //<Graph width="2500" height="2000" nodes = {nodes} links = {links}></Graph>