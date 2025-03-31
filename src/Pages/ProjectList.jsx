import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as d3 from "d3";
function ProjectList(props) {
      const {id} = useParams();

      const [data, setData] = useState([]); 
      var data2 = []; 
      var contador = 0; 
      
      var margin = {top: 10, right: 30, bottom: 30, left: 40},
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      
      var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      //SEGUIR EN D3.JSON QUE NO SE QUE HACE

      const fetchData = async () => {
        try {
         
          const response = await fetch(`http://localhost:5154/api/papers/us?user=${id}`);
          const result = await response.json();

          for (let i = 0; i < await result.raw.length; i++){
            if(contador < 149){
              data2.push(await JSON.parse(await result.raw[i])) 
              contador++;
              setData(data2);
            }
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        fetchData();

        
      }, []);


        return (
          <>
            <div>
                <h3>Papers de {id}  </h3>
                {data.length === 0 ? 
                (<p> Este usuario no ha publicado ningún paper en OpenAlex</p>) : 
                data.map((resp)=>(
                  <li>{resp.title} <a href={resp.id}> Enlace </a> </li> 
                ))}
            </div>

            <div id="my_dataviz"></div>
          </>
        );
  }
  
  export default ProjectList;