import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Boton from "../Components/Boton";

function ProjectList(props) {
      const {id} = useParams();

      const [data, setData] = useState([]); 
      var data2 = []; 
      var contador = 0;       

      const fetchData = async () => {
        try {
         
          const response = await fetch(`http://localhost:5154/api/papers?idUser=${id}`);
          const result = await response.json();

          for (let i = 0; i < await result[0].raw.length; i++){
            if(contador < 149){
              data2.push(await JSON.parse(await result[0].raw[i])) 
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
                <h3>Papers de {id}</h3>
                {data.length === 0 ? 
                (<p> Este usuario no ha publicado ningún paper en OpenAlex</p>) : 
                data.map((resp)=>(
                  <li>{resp.title} <a href={resp.id}> Enlace </a> </li> 
                ))}
            </div>
          </>
        );
  }
  
  export default ProjectList;