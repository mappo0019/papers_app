import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Graph} from "../Components/Graph.tsx";
import "../styles/ProjectList.css";

 function ProjectList(props) {
  const {id} = useParams();

  const [data, setData] = useState([]); 
  var data2 = []; 
  var contador = 0;       

  const fetchData = async () => {
    try {
     
      const response = await fetch(`http://localhost:5154/api/projectPapers/pr?project=${id}`);
      const result = await response.json();

      for (let i = 0; i < await result.raw.length; i++){
        if(contador < await result.raw.length){
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
              <li>{resp.title} <a href={`/graph_data/38a372e7b051de2ba01aa643`}> Enlace </a> </li> 
            ))}
        </div>
      </>
    );
  }
  
  export default ProjectList; 
  