import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import "../styles/ProjectList.css";

 function ProjectList(props) {
  const {id} = useParams();

  const [data, setData] = useState([]); 

  //AHORA TOCA PROBAR A VER SI PINTA EL GRAFO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const fetchData = async () => {
    try {
     
      const response = await fetch(`http://localhost:5154/api/graphData/2ee6e14c18a35902dd3a9f69`);
      const result = await response.json();
      console.log(await result.authors);
      setData(await result);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

        useEffect(() => {
          fetchData(); 
          console.log(data); 
        }, []);

        return (
          <>
            <div>
                <h3>Papers de {id}  </h3>
            </div>

            {data.length === 0 ? 
                (<p> Este usuario no ha publicado ningún paper en OpenAlex</p>) : 
                data.authors.map((resp)=>(
                  <li>{resp.name} </li> 
                ))}
          </>
        );
  }
  
  export default ProjectList;